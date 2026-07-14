// ============================================
// PorFraDansk Translator Logic
// ============================================

// Current direction: 'da' = Danish→PorFraDansk, 'pf' = PorFraDansk→Danish
let currentDirection = 'da';

// Build lookup maps from DICTIONARY
const danskToPf = new Map();
const pfToDansk = new Map();

function buildMaps() {
    for (const [da, pf, note] of DICTIONARY) {
        const daLower = da.toLowerCase();
        const pfLower = pf.toLowerCase();
        
        // Danish → PorFraDansk (store first match)
        if (!danskToPf.has(daLower)) {
            danskToPf.set(daLower, { pf, note });
        }
        
        // PorFraDansk → Danish (store first match)
        if (!pfToDansk.has(pfLower)) {
            pfToDansk.set(pfLower, { da, note });
        }
    }
}

buildMaps();

// ============================================
// Translation Functions
// ============================================

function translateWord(word, direction) {
    const lower = word.toLowerCase();
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
        const entry = danskToPf.get(coreLower);
        if (entry) {
            return {
                result: leading + matchCase(core, entry.pf) + trailing,
                found: true,
                original: core,
                translated: entry.pf
            };
        }
    } else {
        // PorFraDansk → Danish
        const entry = pfToDansk.get(coreLower);
        if (entry) {
            return {
                result: leading + matchCase(core, entry.da) + trailing,
                found: true,
                original: core,
                translated: entry.da
            };
        }
    }
    
    return {
        result: word,
        found: false,
        original: core,
        translated: core
    };
}

function matchCase(source, target) {
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
            el.className = `breakdown-word ${w.found ? '' : 'unknown'}`;
            el.innerHTML = `
                <span class="original">${escapeHtml(w.original)}</span>
                <span class="arrow">↓</span>
                <span class="translated">${escapeHtml(w.translated)}${w.found ? '' : ' ⚠'}</span>
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
