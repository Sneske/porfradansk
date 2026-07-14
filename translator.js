// ============================================
// PorFraDansk Translator Logic
// ============================================

// Current direction: 'da' = Danish→PorFraDansk, 'pf' = PorFraDansk→Danish
let currentDirection = 'da';

// Build lookup maps from DICTIONARY
const danskToPf = new Map();
const pfToDansk = new Map();

// Also store ALL entries (for reverse lookups & multi-meaning words)
const danskToPfAll = new Map();  // key → array of {pf, note}
const pfToDanskAll = new Map();  // key → array of {da, note}

function buildMaps() {
    for (const [da, pf, note] of DICTIONARY) {
        const daLower = da.toLowerCase();
        const pfLower = pf.toLowerCase();
        
        // Danish → PorFraDansk (store first match for primary lookup)
        if (!danskToPf.has(daLower)) {
            danskToPf.set(daLower, { pf, note });
        }
        
        // PorFraDansk → Danish (store first match for primary lookup)
        if (!pfToDansk.has(pfLower)) {
            pfToDansk.set(pfLower, { da, note });
        }
        
        // Store all matches
        if (!danskToPfAll.has(daLower)) {
            danskToPfAll.set(daLower, []);
        }
        danskToPfAll.get(daLower).push({ pf, note });
        
        if (!pfToDanskAll.has(pfLower)) {
            pfToDanskAll.set(pfLower, []);
        }
        pfToDanskAll.get(pfLower).push({ da, note });
    }
}

buildMaps();

// ============================================
// Morphological Analysis for PorFraDansk
// ============================================
// Tries to strip verb conjugation suffixes and find the root

// Conjugation suffixes (order matters - try longest/outermost first)
const PF_VERB_SUFFIXES = [
    // Complex combinations (progressive + passive + tense)
    { suffix: 'rómónga', label: 'datid+passiv+progressiv', tenseInfo: ' (datid, passiv, progressiv)' },
    { suffix: 'ramónga', label: 'fremtid+passiv+progressiv', tenseInfo: ' (fremtid, passiv, progressiv)' },
    { suffix: 'bomócanga', label: 'i morgen+passiv-causativ+progressiv', tenseInfo: ' (i morgen, passiv-causativ, progressiv)' },
    { suffix: 'rómócanga', label: 'datid+passiv-causativ+progressiv', tenseInfo: ' (datid, passiv-causativ, progressiv)' },
    // Double combinations
    { suffix: 'rómó', label: 'datid+passiv', tenseInfo: ' (datid, passiv)' },
    { suffix: 'ramó', label: 'fremtid+passiv', tenseInfo: ' (fremtid, passiv)' },
    { suffix: 'rónga', label: 'datid+progressiv', tenseInfo: ' (datid, progressiv)' },
    { suffix: 'ranga', label: 'fremtid+progressiv', tenseInfo: ' (fremtid, progressiv)' },
    { suffix: 'mónga', label: 'passiv+progressiv', tenseInfo: ' (passiv, progressiv)' },
    { suffix: 'canga', label: 'causativ+progressiv', tenseInfo: ' (causativ, progressiv)' },
    { suffix: 'mócha', label: 'passiv-causativ', tenseInfo: ' (passiv-causativ)' },
    // Single suffixes
    { suffix: 'ró', label: 'datid', tenseInfo: ' (datid)' },
    { suffix: 'ra', label: 'fremtid', tenseInfo: ' (fremtid)' },
    { suffix: 'bo', label: 'i morgen', tenseInfo: ' (i morgen)' },
    { suffix: 'mó', label: 'passiv', tenseInfo: ' (passiv)' },
    { suffix: 'ca', label: 'causativ', tenseInfo: ' (causativ)' },
    { suffix: 'nga', label: 'progressiv', tenseInfo: ' (progressiv)' },
];

// Derivation suffixes (noun/adj/adv formation)
const PF_DERIVATION_SUFFIXES = [
    { suffix: 'ongus', label: 'en der [verb]', transform: (root) => root + 'e' },
    { suffix: 'éng', label: 'handlingen at [verb]', transform: (root) => root + 'e' },
    { suffix: 'mang', label: 'adverbium af [adj]', transform: (root) => root },
    { suffix: 'té', label: 'konceptet af [adj]', transform: (root) => root },
];

function tryMorphologicalLookup(word) {
    const lower = word.toLowerCase();
    
    // 1. Try stripping verb conjugation suffixes
    for (const { suffix, label, tenseInfo } of PF_VERB_SUFFIXES) {
        if (lower.endsWith(suffix) && lower.length > suffix.length + 1) {
            const stem = lower.slice(0, -suffix.length);
            // The stem should be the root; infinitive is root + 'e'
            const infinitive = stem + 'e';
            const entry = pfToDansk.get(infinitive);
            if (entry) {
                return {
                    da: entry.da + tenseInfo,
                    note: `${infinitive} → ${entry.da}, bøjet: ${label}`,
                    found: true
                };
            }
            // Also try without adding 'e' (for roots that don't end in consonant)
            const entryDirect = pfToDansk.get(stem);
            if (entryDirect) {
                return {
                    da: entryDirect.da + tenseInfo,
                    note: `${stem} → ${entryDirect.da}, bøjet: ${label}`,
                    found: true
                };
            }
        }
    }
    
    // 2. Try present tense: if word ends in 'a', try replacing with 'e' for infinitive
    if (lower.endsWith('a') && lower.length > 2) {
        const possibleInfinitive = lower.slice(0, -1) + 'e';
        const entry = pfToDansk.get(possibleInfinitive);
        if (entry) {
            return {
                da: entry.da + ' (nutid)',
                note: `${possibleInfinitive} → ${entry.da}, bøjet: nutid`,
                found: true
            };
        }
    }
    
    // 3. Try derivation suffixes
    for (const { suffix, label, transform } of PF_DERIVATION_SUFFIXES) {
        if (lower.endsWith(suffix) && lower.length > suffix.length + 1) {
            const stem = lower.slice(0, -suffix.length);
            const lookupForm = transform(stem);
            const entry = pfToDansk.get(lookupForm);
            if (entry) {
                return {
                    da: `${label.replace('[verb]', entry.da).replace('[adj]', entry.da)}`,
                    note: `afledt fra ${lookupForm} (${entry.da})`,
                    found: true
                };
            }
            // Also try stem directly
            const entryDirect = pfToDansk.get(stem);
            if (entryDirect) {
                return {
                    da: `${label.replace('[verb]', entryDirect.da).replace('[adj]', entryDirect.da)}`,
                    note: `afledt fra ${stem} (${entryDirect.da})`,
                    found: true
                };
            }
        }
    }
    
    return null;
}

// ============================================
// Danish Morphological Guessing
// ============================================
// Try to handle common Danish word forms

const DA_VERB_SUFFIXES = [
    // Past tense patterns
    { pattern: /^(.+)ede$/, getInfinitive: (m) => m[1] + 'e', tense: 'datid' },
    { pattern: /^(.+)te$/, getInfinitive: (m) => m[1] + 'e', tense: 'datid' },
    // Present tense patterns  
    { pattern: /^(.+)er$/, getInfinitive: (m) => m[1] + 'e', tense: 'nutid' },
    // Past participle
    { pattern: /^(.+)et$/, getInfinitive: (m) => m[1] + 'e', tense: 'datid (tillægsform)' },
];

const DA_NOUN_SUFFIXES = [
    // Definite forms
    { pattern: /^(.+)en$/, getBase: (m) => m[1], note: 'bestemt form' },
    { pattern: /^(.+)et$/, getBase: (m) => m[1], note: 'bestemt form' },
    // Plural
    { pattern: /^(.+)erne$/, getBase: (m) => m[1], note: 'flertal bestemt' },
    { pattern: /^(.+)ene$/, getBase: (m) => m[1], note: 'flertal bestemt' },
    { pattern: /^(.+)er$/, getBase: (m) => m[1], note: 'flertal' },
];

const DA_ADJ_SUFFIXES = [
    // Definite / plural adjective (e.g. "mistænkelige" -> "mistænkelig")
    { pattern: /^(.+)e$/, getBase: (m) => m[1], note: 'bestemt/flertal adjektiv' },
];

function tryDanishMorphology(word) {
    const lower = word.toLowerCase();
    
    // Try verb patterns
    for (const { pattern, getInfinitive, tense } of DA_VERB_SUFFIXES) {
        const match = lower.match(pattern);
        if (match) {
            const infinitive = getInfinitive(match);
            const entry = danskToPf.get(infinitive);
            if (entry) {
                // Apply PorFraDansk tense conjugation
                const pfInfinitive = entry.pf;
                let pfConjugated = pfInfinitive;
                
                if (tense === 'nutid') {
                    // Remove final 'e', add 'a'
                    if (pfInfinitive.endsWith('e')) {
                        pfConjugated = pfInfinitive.slice(0, -1) + 'a';
                    }
                } else if (tense === 'datid' || tense === 'datid (tillægsform)') {
                    pfConjugated = pfInfinitive + 'ró';
                }
                
                return {
                    pf: pfConjugated,
                    note: `${infinitive} → ${entry.pf}, bøjet: ${tense}`,
                    found: true
                };
            }
        }
    }
    
    // Try adjective patterns
    for (const { pattern, getBase, note } of DA_ADJ_SUFFIXES) {
        const match = lower.match(pattern);
        if (match) {
            const base = getBase(match);
            const entry = danskToPf.get(base);
            if (entry) {
                return {
                    pf: entry.pf,
                    note: `${base} → ${entry.pf}, ${note}`,
                    found: true
                };
            }
        }
    }
    
    // Try noun patterns (definite/plural)
    for (const { pattern, getBase, note } of DA_NOUN_SUFFIXES) {
        const match = lower.match(pattern);
        if (match) {
            const base = getBase(match);
            const entry = danskToPf.get(base);
            if (entry) {
                let pfResult = entry.pf;
                if (note.includes('bestemt')) {
                    pfResult = 'ló ' + entry.pf;
                }
                return {
                    pf: pfResult,
                    note: `${base} → ${entry.pf}, ${note}`,
                    found: true
                };
            }
        }
    }
    
    return null;
}

// ============================================
// Fallback Phonetic Transliteration Engine
// ============================================
// Guesses translations based on the phonology rules in the PDF

function phoneticTransliterateDanish(word) {
    let result = word.toLowerCase();
    
    // Consonant clusters
    result = result.replace(/sj/g, 'sh');
    result = result.replace(/ch/g, 'c');
    result = result.replace(/ph/g, 'f');
    result = result.replace(/w/g, 'v');
    result = result.replace(/x/g, 'ks');
    result = result.replace(/q/g, 'k');
    
    // soft d/g at the end of syllables
    result = result.replace(/d$/g, 'dh');
    result = result.replace(/d([^aeiouyæøåáóéö])/g, 'dh$1');
    
    // post-vocalic r -> rh (r can only come before vowels, not after)
    result = result.replace(/([aeiouyæøå])r([^aeiouyæøå]|$)/g, '$1rh$2');
    
    // Vowels mapping preserving double vowels
    let builder = "";
    for (let i = 0; i < result.length; i++) {
        let char = result[i];
        let next = result[i+1];
        
        if (char === next && /[aeiouyæøå]/.test(char)) {
            let mapped = mapVowel(char);
            builder += mapped + mapped;
            i++;
        } else {
            builder += mapVowel(char);
        }
    }
    
    return builder;
}

function mapVowel(char) {
    switch (char) {
        case 'æ': return 'e';
        case 'ø': return 'ö';
        case 'e': return 'é';
        case 'o': return 'ó';
        case 'a': return 'á';
        default: return char;
    }
}

function phoneticTransliteratePorFraDansk(word) {
    let result = word.toLowerCase();
    
    result = result.replace(/sh/g, 'sj');
    result = result.replace(/c/g, 'ch');
    result = result.replace(/dh/g, 'd');
    result = result.replace(/rh/g, 'r');
    
    let builder = "";
    for (let i = 0; i < result.length; i++) {
        let char = result[i];
        let next = result[i+1];
        
        if (char === next && /[eöóá]/.test(char)) {
            let mapped = mapReverseVowel(char);
            builder += mapped + mapped;
            i++;
        } else {
            builder += mapReverseVowel(char);
        }
    }
    
    return builder;
}

function mapReverseVowel(char) {
    switch (char) {
        case 'e': return 'æ';
        case 'ö': return 'ø';
        case 'é': return 'e';
        case 'ó': return 'o';
        case 'á': return 'a';
        default: return char;
    }
}

// ============================================
// Translation Functions
// ============================================

function translateWord(word, direction) {
    // Strip trailing punctuation for lookup
    const punctMatch = word.match(/^(.*?)([.,!?;:'"»«\)\]]+)$/);
    let core = word;
    let trailing = '';
    if (punctMatch) {
        core = punctMatch[1];
        trailing = punctMatch[2];
    }
    
    // Strip leading punctuation
    const leadMatch = core.match(/^([(\[«'"]+)(.*)$/);
    let leading = '';
    if (leadMatch) {
        leading = leadMatch[1];
        core = leadMatch[2];
    }
    
    const coreLower = core.toLowerCase();
    
    if (direction === 'da') {
        // Danish → PorFraDansk
        // 1. Direct dictionary lookup
        const entry = danskToPf.get(coreLower);
        if (entry) {
            return {
                result: leading + matchCase(core, entry.pf) + trailing,
                found: true,
                original: core,
                translated: entry.pf
            };
        }
        
        // 2. Try Danish morphological analysis
        const morphResult = tryDanishMorphology(core);
        if (morphResult) {
            return {
                result: leading + matchCase(core, morphResult.pf) + trailing,
                found: true,
                original: core,
                translated: morphResult.pf + ' ⚙'
            };
        }

        // 3. Fallback: Phonetic guessing based on PDF rules
        const guessed = phoneticTransliterateDanish(core);
        return {
            result: leading + matchCase(core, guessed) + trailing,
            found: true,
            original: core,
            translated: guessed + ' ✨'
        };
    } else {
        // PorFraDansk → Danish
        // 1. Direct dictionary lookup
        const entry = pfToDansk.get(coreLower);
        if (entry) {
            return {
                result: leading + matchCase(core, entry.da) + trailing,
                found: true,
                original: core,
                translated: entry.da
            };
        }
        
        // 2. Try PorFraDansk morphological analysis
        const morphResult = tryMorphologicalLookup(core);
        if (morphResult) {
            return {
                result: leading + matchCase(core, morphResult.da) + trailing,
                found: true,
                original: core,
                translated: morphResult.da + ' ⚙'
            };
        }

        // 3. Fallback: Phonetic guessing based on PDF rules
        const guessed = phoneticTransliteratePorFraDansk(core);
        return {
            result: leading + matchCase(core, guessed) + trailing,
            found: true,
            original: core,
            translated: guessed + ' ✨'
        };
    }
}

function matchCase(source, target) {
    if (!source || !target) return target;
    if (source === source.toUpperCase() && source.length > 1) {
        return target.toUpperCase();
    }
    if (source[0] === source[0].toUpperCase()) {
        return target[0].toUpperCase() + target.slice(1);
    }
    return target;
}

function translateText(text, direction) {
    if (!text.trim()) return { translated: '', words: [] };
    
    // Split while preserving whitespace and structure
    const tokens = text.split(/(\s+)/);
    const results = [];
    const wordBreakdowns = [];
    
    for (const token of tokens) {
        if (/^\s+$/.test(token)) {
            results.push(token);
        } else {
            const { result, found, original, translated } = translateWord(token, direction);
            results.push(result);
            wordBreakdowns.push({ original, translated, found });
        }
    }
    
    return {
        translated: results.join(''),
        words: wordBreakdowns
    };
}

// ============================================
// UI Controllers
// ============================================

function setDirection(dir) {
    currentDirection = dir;
    const btnDa = document.getElementById('btn-da');
    const btnPf = document.getElementById('btn-pf');
    
    if (dir === 'da') {
        btnDa.classList.add('active');
        btnPf.classList.remove('active');
    } else {
        btnPf.classList.add('active');
        btnDa.classList.remove('active');
    }
    
    // Re-translate current text
    doTranslation();
}

function swapDirection() {
    const input = document.getElementById('input-text');
    const output = document.getElementById('output-text');
    
    // Swap text
    const outputText = output.textContent;
    const placeholderEl = output.querySelector('.placeholder-text');
    if (!placeholderEl && outputText) {
        input.value = outputText;
    }
    
    // Swap direction
    setDirection(currentDirection === 'da' ? 'pf' : 'da');
}

function clearInput() {
    document.getElementById('input-text').value = '';
    document.getElementById('output-text').innerHTML = '<span class="placeholder-text">Oversættelsen vises her…</span>';
    document.getElementById('char-count').textContent = '0 tegn';
    document.getElementById('breakdown-section').style.display = 'none';
}

function copyOutput() {
    const output = document.getElementById('output-text');
    const placeholder = output.querySelector('.placeholder-text');
    if (placeholder) return;
    
    const text = output.textContent;
    navigator.clipboard.writeText(text).then(() => {
        showToast('Kopieret til udklipsholder ✓');
    }).catch(() => {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('Kopieret til udklipsholder ✓');
    });
}

function showToast(msg) {
    // Remove any existing toast
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    document.body.appendChild(toast);
    
    requestAnimationFrame(() => {
        toast.classList.add('show');
    });
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

function doTranslation() {
    const input = document.getElementById('input-text');
    const output = document.getElementById('output-text');
    const breakdownSection = document.getElementById('breakdown-section');
    const breakdownGrid = document.getElementById('breakdown-grid');
    
    const text = input.value;
    document.getElementById('char-count').textContent = `${text.length} tegn`;
    
    if (!text.trim()) {
        output.innerHTML = '<span class="placeholder-text">Oversættelsen vises her…</span>';
        breakdownSection.style.display = 'none';
        return;
    }
    
    const { translated, words } = translateText(text, currentDirection);
    output.textContent = translated;
    
    // Build word breakdown
    if (words.length > 0) {
        breakdownSection.style.display = 'block';
        breakdownGrid.innerHTML = '';
        
        for (const w of words) {
            const el = document.createElement('div');
            const isMorphed = w.translated.includes('⚙');
            const isGuessed = w.translated.includes('✨');
            let statusClass = '';
            if (isMorphed) {
                statusClass = 'morphed';
            } else if (isGuessed) {
                statusClass = 'guessed';
            } else if (!w.found) {
                statusClass = 'unknown';
            }
            
            el.className = `breakdown-word ${statusClass}`;
            el.innerHTML = `
                <span class="original">${escapeHtml(w.original)}</span>
                <span class="arrow">↓</span>
                <span class="translated">${escapeHtml(w.translated)}${!w.found ? ' ⚠' : ''}</span>
            `;
            breakdownGrid.appendChild(el);
        }
    } else {
        breakdownSection.style.display = 'none';
    }
}

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// ============================================
// Dictionary Table
// ============================================

function populateDictionary() {
    const tbody = document.getElementById('dict-tbody');
    tbody.innerHTML = '';
    
    for (const [da, pf, note] of DICTIONARY) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${escapeHtml(da)}</td>
            <td>${escapeHtml(pf)}</td>
            <td>${note ? escapeHtml(note) : ''}</td>
        `;
        // Click to insert into translator
        tr.style.cursor = 'pointer';
        tr.addEventListener('click', () => {
            const input = document.getElementById('input-text');
            const word = currentDirection === 'da' ? da : pf;
            input.value = input.value ? input.value + ' ' + word : word;
            doTranslation();
            document.getElementById('translator').scrollIntoView({ behavior: 'smooth' });
        });
        tbody.appendChild(tr);
    }
}

function filterDictionary() {
    const query = document.getElementById('dict-search').value.toLowerCase();
    const rows = document.querySelectorAll('#dict-tbody tr');
    
    for (const row of rows) {
        const cells = row.querySelectorAll('td');
        const text = Array.from(cells).map(c => c.textContent.toLowerCase()).join(' ');
        row.style.display = text.includes(query) ? '' : 'none';
    }
}

// ============================================
// Example Sentences
// ============================================

function populateExamples() {
    const list = document.getElementById('examples-list');
    list.innerHTML = '';
    
    EXAMPLES.forEach((ex, idx) => {
        const el = document.createElement('div');
        el.className = 'example-item';
        el.innerHTML = `
            <div class="example-num">${idx + 1}</div>
            <div class="example-content">
                <div class="example-pf">${escapeHtml(ex.pf)}</div>
                <div class="example-da">${escapeHtml(ex.da)}</div>
                <div class="example-literal">${escapeHtml(ex.literal)}</div>
            </div>
        `;
        // Click to load into translator
        el.style.cursor = 'pointer';
        el.addEventListener('click', () => {
            const input = document.getElementById('input-text');
            if (currentDirection === 'pf') {
                input.value = ex.pf;
            } else {
                input.value = ex.da;
            }
            doTranslation();
            document.getElementById('translator').scrollIntoView({ behavior: 'smooth' });
        });
        list.appendChild(el);
    });
}

// ============================================
// Event Listeners
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('input-text');
    
    // Real-time translation on input
    let debounceTimer;
    input.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(doTranslation, 150);
    });
    
    // Populate dictionary and examples
    populateDictionary();
    populateExamples();
});
