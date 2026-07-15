// ============================================
// PorFraDansk Translator Logic
// ============================================

// Current direction: 'da' = Danish→PorFraDansk, 'pf' = PorFraDansk→Danish
let currentDirection = 'da';

const translationMemory = {
    daToPf: new Map(),
    pfToDa: new Map()
};

// Build lookup maps from DICTIONARY
const danskToPf = new Map();
const pfToDansk = new Map();

// Also store ALL entries (for reverse lookups & multi-meaning words)
const danskToPfAll = new Map();  // key → array of {pf, note}
const pfToDanskAll = new Map();  // key → array of {da, note}

const DANISH_VERB_INFINITIVES = new Set([
    "være", "have", "gøre", "lave", "gå", "spise", "elske", "lide", "dræbe", "sige",
    "fortælle", "bedrage", "forklare", "undervise", "forene", "involvere", "snipe", "træne",
    "øve", "vide", "ville", "burde", "skulle", "føde", "give", "bedømme", "se", "google",
    "tale", "snakke", "behandle", "tvære", "frygte", "bestå", "kunne", "komme", "tænke",
    "drikke", "skrive", "læse", "løbe", "flyve", "sove", "hjælpe", "forstå", "synge",
    "danse", "vente", "købe", "sælge", "åbne", "lukke", "arbejde", "spille", "hedde",
    "lære", "finde", "tro", "prøve", "bruge", "bo", "stoppe", "begynde", "oversætte",
    "flytte", "betale", "lege"
]);

const pfVerbInfinitives = new Set();

const danishVerbsSet = new Set(DANISH_VERB_INFINITIVES);

const DANISH_PREPOSITIONS = new Set([
    "i", "på", "med", "mod", "til", "for", "af", "om", "fra", "efter", "før", "over", "under", "ved", "uden", "mellem", "hos", "bag", "foran"
]);

const PF_PREPOSITIONS = new Set([
    "di", "mek", "kódh", "po", "fur", "å", "dé", "despóis", "ántés", "sóbri", "sótó", "siva", "séng", "éntri", "éng", "átrás", "fréénti", "do"
]);

const DANISH_VERBAL_ADVERBS = new Set([
    "ikke", "aldrig", "altid", "tit", "ofte", "slet", "gerne", "måske"
]);

const PRONOUN_MAP = {
    'shai': { subject: 'jeg', object: 'mig' },
    'tu': { subject: 'du', object: 'dig' },
    'hil': { subject: 'han', object: 'ham' },
    'hel': { subject: 'hun', object: 'hende' },
    'vinos': { subject: 'vi', object: 'os' },
    'ivu': { subject: 'I', object: 'jer' },
    'dil': { subject: 'de', object: 'dem' }
};

const NEUTER_NOUNS = new Set([
    "gymnasie", "vand", "brød", "smør", "internet", "ord", "hus", "tilfælde", "talent", 
    "militær", "angreb", "drab", "helvede", "ur", "mål", "snyd", "hjerte", "hoved", 
    "øje", "problem", "svar", "spørgsmål", "barn", "hav", "land", "sted", "liv", 
    "had", "håb", "spil", "arbejde"
]);

const PLURAL_NOUNS = new Set([
    "mennesker", "personer", "brødre", "rettigheder", "børn", "penge", "typer"
]);

const PLURAL_MODIFIERS = new Set([
    "ul", "maku", "dö", "te", "fo", "fe", "döu", "teu", "fou", "feu", "i",
    "döi", "tei", "foi", "fei", "döui", "teui", "foui", "feui", "sung", "mil",
    "milóó", "milaa", "dil", "vinos", "ivu"
]);

function isPorFraDanskVerb(word) {
    const lower = word.toLowerCase();
    if (pfVerbInfinitives.has(lower)) return true;
    for (const { suffix } of PF_VERB_SUFFIXES) {
        if (lower.endsWith(suffix) && lower.length > suffix.length) {
            return true;
        }
    }
    if (lower.endsWith('a') && lower.length > 1) {
        const stem = lower.slice(0, -1);
        if (pfVerbInfinitives.has(stem + 'e')) return true;
        if (pfVerbInfinitives.has(stem)) return true;
    }
    return false;
}

function buildMaps() {
    for (const [da, pf, note] of DICTIONARY) {
        const daLower = da.toLowerCase();
        const pfLower = pf.toLowerCase();
        const noteLower = note ? note.toLowerCase() : '';
        
        const isVerb = DANISH_VERB_INFINITIVES.has(daLower) || 
                       noteLower.includes('nutid af') || 
                       noteLower.includes('datid af') || 
                       noteLower.includes('fremtid af') || 
                       noteLower.includes('(verb)') || 
                       noteLower.includes('to ');
        if (isVerb) {
            danishVerbsSet.add(daLower);
        }
        
        if (DANISH_VERB_INFINITIVES.has(daLower) && pfLower.endsWith('e')) {
            pfVerbInfinitives.add(pfLower);
        }
        
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

function isDanishVerb(word) {
    const clean = word.toLowerCase().replace(/^[(\[«'"]*(.*?)[.,!?;:'"»«\)\]]*$/, '$1');
    if (danishVerbsSet.has(clean)) return true;
    for (const { pattern } of DA_VERB_SUFFIXES) {
        if (clean.match(pattern)) {
            const inf = clean.replace(pattern, (match, p1) => p1 + 'e');
            if (danishVerbsSet.has(inf)) return true;
        }
    }
    return false;
}

function isDanishAdverb(word) {
    const clean = word.toLowerCase().replace(/^[(\[«'"]*(.*?)[.,!?;:'"»«\)\]]*$/, '$1');
    if (DANISH_VERBAL_ADVERBS.has(clean)) return true;
    const commonDanishAdverbs = new Set(["nu", "her", "der", "langt", "hurtigt", "ofte", "meget", "slet", "gerne", "måske", "tit", "aldrig", "altid", "virkelig"]);
    if (commonDanishAdverbs.has(clean)) return true;
    if (clean.endsWith('t') && clean.length > 2) {
        const base = clean.slice(0, -1);
        if (danskToPf.has(base)) return true;
    }
    return false;
}

function isPorFraDanskAdverb(word) {
    const clean = word.toLowerCase().replace(/^[(\[«'"]*(.*?)[.,!?;:'"»«\)\]]*$/, '$1');
    if (clean.endsWith('mang')) return true;
    const commonPfAdverbs = new Set(["nunang", "tá", "ék", "ek", "étshotfováa", "slet", "gerne", "måske", "tá'étshotfováagang"]);
    if (commonPfAdverbs.has(clean)) return true;
    const entry = pfToDansk.get(clean);
    if (entry && isDanishAdverb(entry.da)) return true;
    return false;
}

function getDanishToPfPermutation(words) {
    const n = words.length;
    const verbIndices = [];
    for (let i = 0; i < n; i++) {
        if (isDanishVerb(words[i])) {
            verbIndices.push(i);
        }
    }
    
    if (verbIndices.length === 0) {
        return Array.from({length: n}, (_, i) => i);
    }
    
    const vStart = verbIndices[0];
    const vEnd = verbIndices[verbIndices.length - 1];
    
    const leading = [];
    const S = [];
    const verbalAdverbs = [];
    const VP = [];
    for (let i = vStart; i <= vEnd; i++) {
        VP.push(i);
    }
    const O = [];
    const PPs = [];
    const adverbs = [];
    
    // Parse before vStart (Subject)
    for (let i = 0; i < vStart; i++) {
        const wLower = words[i].toLowerCase();
        const isLeadingConj = (i === 0 && (wLower === "og" || wLower === "eller" || wLower === "men" || wLower === "at" || wLower === "når" || wLower === "hvis" || wLower === "da" || wLower === "fordi"));
        if (isLeadingConj) {
            leading.push(i);
        } else if (isDanishAdverb(words[i])) {
            verbalAdverbs.push(i);
        } else {
            S.push(i);
        }
    }
    
    // Parse after vEnd (Object, PP, Adverbs)
    let currentPP = null;
    for (let i = vEnd + 1; i < n; i++) {
        const wLower = words[i].toLowerCase();
        
        if (DANISH_PREPOSITIONS.has(wLower)) {
            if (currentPP) {
                PPs.push(...currentPP);
            }
            currentPP = [i];
        } else if (currentPP) {
            if (wLower === "og" || wLower === "eller" || wLower === "men" || isDanishAdverb(words[i])) {
                PPs.push(...currentPP);
                currentPP = null;
                adverbs.push(i);
            } else {
                currentPP.push(i);
            }
        } else if (isDanishAdverb(words[i])) {
            if (O.length === 0) {
                verbalAdverbs.push(i);
            } else {
                adverbs.push(i);
            }
        } else if (wLower === "og" || wLower === "eller" || wLower === "men") {
            adverbs.push(i);
        } else {
            O.push(i);
        }
    }
    if (currentPP) {
        PPs.push(...currentPP);
    }
    
    const perm = [...leading, ...O, ...verbalAdverbs, ...VP, ...PPs, ...S, ...adverbs];
    return perm;
}

function getPfToDanishPermutation(words) {
    const n = words.length;
    const verbIndices = [];
    for (let i = 0; i < n; i++) {
        if (isPorFraDanskVerb(words[i])) {
            verbIndices.push(i);
        }
    }
    
    if (verbIndices.length === 0) {
        return Array.from({length: n}, (_, i) => i);
    }
    
    const vStart = verbIndices[0];
    const vEnd = verbIndices[verbIndices.length - 1];
    
    const leading = [];
    const O = [];
    const verbalAdverbs = [];
    const VP = [];
    for (let i = vStart; i <= vEnd; i++) {
        VP.push(i);
    }
    const S = [];
    const PPs = [];
    const adverbs = [];
    
    // Parse before vStart (Object and leading)
    for (let i = 0; i < vStart; i++) {
        const wLower = words[i].toLowerCase();
        const isLeadingConj = (i === 0 && (wLower === "o" || wLower === "ó" || wLower === "más" || wLower === "ke" || wLower === "ö"));
        
        if (isLeadingConj) {
            leading.push(i);
        } else if (isPorFraDanskAdverb(words[i])) {
            verbalAdverbs.push(i);
        } else {
            O.push(i);
        }
    }
    
    // Parse after vEnd (Subject, PP, Adverbs)
    let currentPP = null;
    for (let i = vEnd + 1; i < n; i++) {
        const wLower = words[i].toLowerCase();
        
        if (PF_PREPOSITIONS.has(wLower)) {
            if (currentPP) {
                PPs.push(...currentPP);
            }
            currentPP = [i];
        } else if (currentPP) {
            if (wLower === "o" || wLower === "ó" || wLower === "más" || isPorFraDanskAdverb(words[i])) {
                PPs.push(...currentPP);
                currentPP = null;
                adverbs.push(i);
            } else {
                currentPP.push(i);
            }
        } else if (isPorFraDanskAdverb(words[i])) {
            adverbs.push(i);
        } else if (wLower === "o" || wLower === "ó" || wLower === "más") {
            adverbs.push(i);
        } else {
            S.push(i);
        }
    }
    if (currentPP) {
        PPs.push(...currentPP);
    }
    
    const perm = [...leading, ...S, ...verbalAdverbs, ...VP, ...O, ...PPs, ...adverbs];
    return perm;
}

function fixCapitalization(originalCores, reorderedCoreStrings, perm, direction) {
    const result = [...reorderedCoreStrings];
    if (result.length === 0) return result;
    
    const originalFirst = originalCores[0];
    const isFirstCapitalized = originalFirst && originalFirst[0] === originalFirst[0].toUpperCase() && originalFirst[0] !== originalFirst[0].toLowerCase();
    
    if (isFirstCapitalized) {
        const newFirst = result[0];
        if (newFirst) {
            result[0] = newFirst[0].toUpperCase() + newFirst.slice(1);
        }
        
        for (let i = 1; i < result.length; i++) {
            if (perm[i] === 0) {
                const w = result[i];
                if (w === "I") break;
                
                const lower = w.toLowerCase();
                if (direction === 'da') {
                    if (pfToDansk.has(lower) || isPorFraDanskVerb(lower)) {
                        result[i] = lower;
                    }
                } else {
                    if (danskToPf.has(lower) || danishVerbsSet.has(lower)) {
                        result[i] = lower;
                    }
                }
                break;
            }
        }
    }
    
    return result;
}

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

function isPrecededByDeterminer(tokens, currentIndex) {
    const determiners = new Set([
        "en", "et", "den", "det", "denne", "dette", "min", "mit", "mine", 
        "din", "dit", "dine", "sin", "sit", "sine", "vores", "jeres", "deres"
    ]);
    const danishAdjectives = new Set([
        "mistænkelig", "sjov", "fri", "frie", "frit", "værdig", "lang", "lille", "høj", "hemmelig", 
        "dygtig", "nem", "god", "godt", "hurtig", "mulig", "hellig", "ussel", "bekræftet", "lige", 
        "lig", "stor", "smuk", "pæn", "gammel", "ung", "ny", "glad", "vred", "sur", "stærk", 
        "svag", "rig", "fattig", "langsom", "træt", "sulten", "tørstig", "dum", "klog", "vigtig", 
        "farlig", "sikker", "rolig", "vild", "ren", "beskidt", "ked af det", "trist", "lykkelig", 
        "syg", "sund", "korrekt", "forkert", "rød", "blå", "grøn", "gul", "lilla", "sort", "hvid", 
        "brun", "lyserød", "meget", "rigtig", "virkelig", "fucking"
    ]);
    
    for (let k = currentIndex - 1; k >= 0; k--) {
        const t = tokens[k];
        if (/^\s+$/.test(t)) continue;
        
        const clean = t.replace(/^[(\[«'"]*(.*?)[.,!?;:'"»«\)\]]*$/, '$1').toLowerCase();
        if (determiners.has(clean)) {
            return true;
        }
        if (danishAdjectives.has(clean) || clean.endsWith('e') || clean.endsWith('ig') || clean.endsWith('t')) {
            continue;
        }
        break;
    }
    return false;
}

function isCopula(clean) {
    const copulas = new Set(["ve", "va", "veró", "vera", "vebo"]);
    const stem = clean.replace(/rómónga|ramónga|bomócanga|rómócanga|rómó|ramó|rónga|ranga|mónga|canga|mócha|ró|ra|bo|mó|ca|nga$/, '');
    return copulas.has(stem) || copulas.has(clean);
}

function getVerbRelationInClause(tokens, index) {
    let start = 0;
    let end = tokens.length;
    const clauseBoundaries = new Set([",", ".", "!", "?", ";", "ke", "o", "ó", "más", "ö"]);
    
    for (let k = index - 1; k >= 0; k--) {
        const clean = tokens[k].replace(/^[(\[«'"]*(.*?)[.,!?;:'"»«\)\]]*$/, '$1').toLowerCase();
        if (clauseBoundaries.has(clean)) {
            start = k + 1;
            break;
        }
    }
    for (let k = index + 1; k < tokens.length; k++) {
        const clean = tokens[k].replace(/^[(\[«'"]*(.*?)[.,!?;:'"»«\)\]]*$/, '$1').toLowerCase();
        if (clauseBoundaries.has(clean)) {
            end = k;
            break;
        }
    }
    
    let verbIdx = -1;
    let verbClean = "";
    for (let k = start; k < end; k++) {
        if (k === index) continue;
        const t = tokens[k];
        if (/^\s+$/.test(t)) continue;
        const clean = t.replace(/^[(\[«'"]*(.*?)[.,!?;:'"»«\)\]]*$/, '$1').toLowerCase();
        if (isPorFraDanskVerb(clean)) {
            verbIdx = k;
            verbClean = clean;
            break;
        }
    }
    
    if (verbIdx === -1) {
        return 'no_verb';
    }
    
    if (isCopula(verbClean)) {
        return 'after_verb';
    }
    
    if (index > verbIdx) {
        return 'after_verb';
    } else {
        let hasSubjectAfter = false;
        for (let k = verbIdx + 1; k < end; k++) {
            const t = tokens[k];
            if (/^\s+$/.test(t)) continue;
            const clean = t.replace(/^[(\[«'"]*(.*?)[.,!?;:'"»«\)\]]*$/, '$1').toLowerCase();
            if (clean && !isPorFraDanskVerb(clean) && !clean.endsWith('i') && !clean.endsWith('si') && clean !== 'béc' && !clauseBoundaries.has(clean) && clean !== 'maa') {
                hasSubjectAfter = true;
                break;
            }
        }
        return hasSubjectAfter ? 'before_verb' : 'after_verb';
    }
}

function findNextNounDanish(tokens, currentIndex) {
    for (let k = currentIndex + 1; k < tokens.length; k++) {
        const token = tokens[k];
        if (/^\s+$/.test(token)) continue;
        
        const clean = token.replace(/^[(\[«'"]*(.*?)[.,!?;:'"»«\)\]]*$/, '$1').toLowerCase();
        if (!clean) continue;
        
        if (isPorFraDanskVerb(clean)) break;
        if (clean === ',' || clean === '.' || clean === '!' || clean === '?' || clean === ';' || 
            clean === 'o' || clean === 'ó' || clean === 'más' || clean === 'ke' || clean === 'ö') break;
        
        if (clean.endsWith('i') || clean.endsWith('si') || clean === 'béc') {
            continue;
        }
        
        if (typeof translationMemory !== 'undefined' && translationMemory.pfToDa.has(clean)) {
            return translationMemory.pfToDa.get(clean);
        }
        
        const entry = pfToDansk.get(clean);
        if (entry) {
            return entry.da.toLowerCase();
        }
    }
    return null;
}

function isPluralNounPhrase(tokens, currentIndex) {
    let nounIdx = -1;
    for (let k = currentIndex + 1; k < tokens.length; k++) {
        const token = tokens[k];
        if (/^\s+$/.test(token)) continue;
        const clean = token.replace(/^[(\[«'"]*(.*?)[.,!?;:'"»«\)\]]*$/, '$1').toLowerCase();
        if (isPorFraDanskVerb(clean) || clean === ',' || clean === '.' || clean === '!' || clean === '?' || clean === ';') {
            break;
        }
        if (clean.endsWith('i') || clean.endsWith('si') || clean === 'béc') {
            continue;
        }
        nounIdx = k;
        break;
    }
    if (nounIdx === -1) return false;
    
    const startScan = Math.max(0, currentIndex - 2);
    for (let k = startScan; k <= nounIdx; k++) {
        const token = tokens[k];
        if (/^\s+$/.test(token)) continue;
        const clean = token.replace(/^[(\[«'"]*(.*?)[.,!?;:'"»«\)\]]*$/, '$1').toLowerCase();
        if (PLURAL_MODIFIERS.has(clean)) {
            return true;
        }
    }
    
    const cleanNoun = tokens[nounIdx].replace(/^[(\[«'"]*(.*?)[.,!?;:'"»«\)\]]*$/, '$1').toLowerCase();
    let daNoun = null;
    if (typeof translationMemory !== 'undefined' && translationMemory.pfToDa.has(cleanNoun)) {
        daNoun = translationMemory.pfToDa.get(cleanNoun);
    } else {
        const entry = pfToDansk.get(cleanNoun);
        if (entry) daNoun = entry.da.toLowerCase();
    }
    
    if (daNoun && PLURAL_NOUNS.has(daNoun)) {
        return true;
    }
    
    return false;
}

function translateWord(word, direction, tokens = null, index = -1) {
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
    
    // 0. Check Translation Memory (Alignment Cache)
    if (direction === 'da') {
        if (translationMemory.daToPf.has(coreLower)) {
            const target = translationMemory.daToPf.get(coreLower);
            return {
                result: leading + matchCase(core, target) + trailing,
                found: true,
                original: core,
                translated: target
            };
        }
    } else {
        if (translationMemory.pfToDa.has(coreLower)) {
            const target = translationMemory.pfToDa.get(coreLower);
            return {
                result: leading + matchCase(core, target) + trailing,
                found: true,
                original: core,
                translated: target
            };
        }
    }
    
    // Context-sensitive overrides (Danish → PorFraDansk)
    if (direction === 'da' && tokens && index !== -1) {
        // 1. Conjunction / Infinitive marker "at"
        if (coreLower === 'at') {
            let nextWord = null;
            for (let k = index + 1; k < tokens.length; k++) {
                if (!/^\s+$/.test(tokens[k])) {
                    nextWord = tokens[k].replace(/^[(\[«'"]*(.*?)[.,!?;:'"»«\)\]]*$/, '$1').toLowerCase();
                    break;
                }
            }
            if (nextWord && DANISH_VERB_INFINITIVES.has(nextWord)) {
                return {
                    result: leading + matchCase(core, 'ö') + trailing,
                    found: true,
                    original: core,
                    translated: 'ö'
                };
            } else {
                return {
                    result: leading + matchCase(core, 'ke') + trailing,
                    found: true,
                    original: core,
                    translated: 'ke'
                };
            }
        }
        
        // 2. Preposition / Verb "ved"
        if (coreLower === 'ved') {
            let prevWord = null;
            for (let k = index - 1; k >= 0; k--) {
                if (!/^\s+$/.test(tokens[k])) {
                    prevWord = tokens[k].replace(/^[(\[«'"]*(.*?)[.,!?;:'"»«\)\]]*$/, '$1');
                    break;
                }
            }
            let nextWord = null;
            let nextWord2 = null;
            let foundNext = 0;
            for (let k = index + 1; k < tokens.length; k++) {
                if (!/^\s+$/.test(tokens[k])) {
                    const clean = tokens[k].replace(/^[(\[«'"]*(.*?)[.,!?;:'"»«\)\]]*$/, '$1').toLowerCase();
                    if (foundNext === 0) {
                        nextWord = clean;
                        foundNext = 1;
                    } else if (foundNext === 1) {
                        nextWord2 = clean;
                        break;
                    }
                }
            }
            
            const subjectPronouns = new Set(["jeg", "du", "han", "hun", "vi", "I", "de", "man"]);
            const sivaObjects = new Set(["det", "alt", "intet", "ingenting", "noget", "hvad", "hvem", "hvorfor", "hvordan", "hvornår", "hvor"]);
            const nonSubjects = new Set(["en", "et", "den", "det", "denne", "dette", "i", "på", "med", "mod", "til", "for", "af", "om", "fra", "efter", "før", "over", "under", "ved", "uden", "mellem", "hos", "bag", "foran", "og", "eller", "men", "at", "som", "der"]);
            
            let isVerb = false;
            if (prevWord) {
                const prevLower = prevWord.toLowerCase();
                if (subjectPronouns.has(prevLower)) {
                    isVerb = true;
                } else if (prevWord[0] === prevWord[0].toUpperCase() && !nonSubjects.has(prevLower)) {
                    isVerb = true;
                }
            }
            if (nextWord && sivaObjects.has(nextWord)) {
                isVerb = true;
            }
            if (nextWord === 'at' && nextWord2 && !DANISH_VERB_INFINITIVES.has(nextWord2)) {
                isVerb = true;
            }
            
            const target = isVerb ? 'siva' : 'juntu';
            return {
                result: leading + matchCase(core, target) + trailing,
                found: true,
                original: core,
                translated: target
            };
        }
        
        // 3. Ambiguous Verb/Noun resolution
        const ambiguousNounsMap = {
            'lærer': { noun: 'åndukongus', verb: 'aprenda' },
            'forklarer': { noun: 'foplikongus', verb: 'foplika' },
            'dræber': { noun: 'teebongus', verb: 'teeba' },
            'spiser': { noun: 'misongus', verb: 'misa' },
            'underviser': { noun: 'åndukongus', verb: 'ånduka' },
            'elsker': { noun: 'ámongus', verb: 'áma' },
            'oversætter': { noun: 'tradusongus', verb: 'tradusa' },
            'arbejde': { noun: 'trabáju', verb: 'trabáje' }
        };
        
        if (ambiguousNounsMap[coreLower]) {
            const isNoun = isPrecededByDeterminer(tokens, index);
            const target = isNoun ? ambiguousNounsMap[coreLower].noun : ambiguousNounsMap[coreLower].verb;
            return {
                result: leading + matchCase(core, target) + trailing,
                found: true,
                original: core,
                translated: target
            };
        }
        
        // 4. Irregular past tense for ville, kunne, skulle
        const irregularVerbsMap = {
            'ville': { past: 'kréleró', inf: 'kréle' },
            'kunne': { past: 'puderó', inf: 'pude' },
            'skulle': { past: 'durderó', inf: 'durde' }
        };
        
        if (irregularVerbsMap[coreLower]) {
            let prevWord = null;
            for (let k = index - 1; k >= 0; k--) {
                if (!/^\s+$/.test(tokens[k])) {
                    prevWord = tokens[k].replace(/^[(\[«'"]*(.*?)[.,!?;:'"»«\)\]]*$/, '$1').toLowerCase();
                    break;
                }
            }
            const subjectPronouns = new Set(["jeg", "du", "han", "hun", "vi", "I", "de", "man"]);
            const isPast = prevWord && subjectPronouns.has(prevWord);
            const target = isPast ? irregularVerbsMap[coreLower].past : irregularVerbsMap[coreLower].inf;
            return {
                result: leading + matchCase(core, target) + trailing,
                found: true,
                original: core,
                translated: target
            };
        }
    }
    
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
        // Context-sensitive overrides (PorFraDansk → Danish)
        if (tokens && index !== -1) {
            // 1. OVS Pronoun Case Resolution
            if (PRONOUN_MAP[coreLower]) {
                const rel = getVerbRelationInClause(tokens, index);
                const target = (rel === 'after_verb' || rel === 'no_verb') ? PRONOUN_MAP[coreLower].subject : PRONOUN_MAP[coreLower].object;
                return {
                    result: leading + matchCase(core, target) + trailing,
                    found: true,
                    original: core,
                    translated: target
                };
            }
            
            // 2. Gender & Number Agreement for Articles/Possessives
            const isPlural = isPluralNounPhrase(tokens, index);
            const nextNoun = findNextNounDanish(tokens, index);
            const isNeuter = nextNoun && NEUTER_NOUNS.has(nextNoun);
            
            if (coreLower === 'un') {
                const target = isNeuter ? 'et' : 'en';
                return {
                    result: leading + matchCase(core, target) + trailing,
                    found: true,
                    original: core,
                    translated: target
                };
            }
            if (coreLower === 'thes') {
                const target = isNeuter ? 'dette' : 'denne';
                return {
                    result: leading + matchCase(core, target) + trailing,
                    found: true,
                    original: core,
                    translated: target
                };
            }
            if (coreLower === 'món') {
                const target = isPlural ? 'mine' : (isNeuter ? 'mit' : 'min');
                return {
                    result: leading + matchCase(core, target) + trailing,
                    found: true,
                    original: core,
                    translated: target
                };
            }
            if (coreLower === 'tón') {
                const target = isPlural ? 'dine' : (isNeuter ? 'dit' : 'din');
                return {
                    result: leading + matchCase(core, target) + trailing,
                    found: true,
                    original: core,
                    translated: target
                };
            }
            if (coreLower === 'dés') {
                const target = isPlural ? 'sine' : (isNeuter ? 'sit' : 'sin');
                return {
                    result: leading + matchCase(core, target) + trailing,
                    found: true,
                    original: core,
                    translated: target
                };
            }
            
            // 3. Plural Noun selection
            if (isPlural) {
                const allTranslations = pfToDanskAll.get(coreLower);
                if (allTranslations) {
                    for (const entry of allTranslations) {
                        if (PLURAL_NOUNS.has(entry.da.toLowerCase())) {
                            return {
                                result: leading + matchCase(core, entry.da) + trailing,
                                found: true,
                                original: core,
                                translated: entry.da
                            };
                        }
                    }
                }
            }
        }

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

function mergeMultiWordTokens(tokens, direction) {
    const sourcePhrases = [];
    for (const [da, pf] of DICTIONARY) {
        const src = (direction === 'da' ? da : pf).toLowerCase();
        if (src.includes(' ')) {
            sourcePhrases.push(src);
        }
    }
    const uniquePhrases = Array.from(new Set(sourcePhrases)).sort((a, b) => b.split(' ').length - a.split(' ').length);

    const wordIndices = [];
    for (let i = 0; i < tokens.length; i++) {
        if (!/^\s+$/.test(tokens[i])) {
            wordIndices.push(i);
        }
    }

    let i = 0;
    while (i < wordIndices.length) {
        let matched = false;
        for (const phrase of uniquePhrases) {
            const phraseWordCount = phrase.split(' ').length;
            if (i + phraseWordCount <= wordIndices.length) {
                const subWordIndices = wordIndices.slice(i, i + phraseWordCount);
                const subWords = subWordIndices.map(idx => {
                    const t = tokens[idx];
                    const cleanMatch = t.match(/^[(\[«'"]*(.*?)[.,!?;:'"»«\)\]]*$/);
                    return cleanMatch ? cleanMatch[1].toLowerCase() : t.toLowerCase();
                });
                
                const candidate = subWords.join(' ');
                if (candidate === phrase) {
                    const startTokenIdx = subWordIndices[0];
                    const endTokenIdx = subWordIndices[subWordIndices.length - 1];
                    const mergedText = tokens.slice(startTokenIdx, endTokenIdx + 1).join('');
                    
                    tokens.splice(startTokenIdx, endTokenIdx - startTokenIdx + 1, mergedText);
                    
                    wordIndices.length = 0;
                    for (let k = 0; k < tokens.length; k++) {
                        if (!/^\s+$/.test(tokens[k])) {
                            wordIndices.push(k);
                        }
                    }
                    
                    matched = true;
                    break;
                }
            }
        }
        if (!matched) {
            i++;
        }
    }
    return tokens;
}

function translateText(text, direction) {
    if (!text.trim()) return { translated: '', words: [] };
    
    // Split while preserving whitespace and structure
    let tokens = text.split(/(\s+)/);
    tokens = mergeMultiWordTokens(tokens, direction);
    
    // Identify clauses and extract original words for each clause
    const clauses = [];
    let currentClause = [];
    
    const isBoundary = (token) => {
        if (/^\s+$/.test(token)) return false;
        const clean = token.replace(/^[(\[«'"]*(.*?)[.,!?;:'"»«\)\]]*$/, '$1').toLowerCase();
        if (direction === 'da') {
            return clean === ',' || clean === '.' || clean === '!' || clean === '?' || clean === ';' ||
                   clean === 'og' || clean === 'eller' || clean === 'men';
        } else {
            return clean === ',' || clean === '.' || clean === '!' || clean === '?' || clean === ';' ||
                   clean === 'o' || clean === 'ó' || clean === 'más' || clean === 'ke' || clean === 'ö' || clean === 'maa' || clean === 'ka';
        }
    };
    
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        if (isBoundary(token)) {
            if (currentClause.length > 0) {
                clauses.push({ type: 'clause', tokens: currentClause });
                currentClause = [];
            }
            clauses.push({ type: 'boundary', tokens: [{ text: token, globalIndex: i }] });
        } else {
            currentClause.push({ text: token, globalIndex: i });
        }
    }
    if (currentClause.length > 0) {
        clauses.push({ type: 'clause', tokens: currentClause });
    }
    
    const results = [];
    const wordBreakdowns = [];
    
    for (const c of clauses) {
        if (c.type === 'boundary') {
            const item = c.tokens[0];
            const { result, found, original, translated } = translateWord(item.text, direction, tokens, item.globalIndex);
            results.push(result);
            if (original && !/^\s+$/.test(original)) {
                wordBreakdowns.push({ original, translated, found });
            }
        } else {
            const clauseTokens = c.tokens;
            const wordInfos = [];
            for (let i = 0; i < clauseTokens.length; i++) {
                const item = clauseTokens[i];
                const token = item.text;
                if (/^\s+$/.test(token)) continue;
                
                const match = token.match(/^([(\[«'"]*)(.*?)([.,!?;:'"»«\)\]]*)$/);
                if (match) {
                    const lead = match[1];
                    const core = match[2];
                    const trail = match[3];
                    if (core) {
                        wordInfos.push({
                            clauseIndex: i,
                            globalIndex: item.globalIndex,
                            originalToken: token,
                            lead: lead,
                            core: core,
                            trail: trail
                        });
                    }
                }
            }
            
            if (wordInfos.length > 0) {
                const originalCores = wordInfos.map(w => w.core);
                const perm = direction === 'da' ? getDanishToPfPermutation(originalCores) : getPfToDanishPermutation(originalCores);
                
                const translatedCores = [];
                for (let i = 0; i < wordInfos.length; i++) {
                    const info = wordInfos[i];
                    const { result, found, original, translated } = translateWord(info.originalToken, direction, tokens, info.globalIndex);
                    
                    const resMatch = result.match(/^([(\[«'"]*)(.*?)([.,!?;:'"»«\)\]]*)$/);
                    let resCore = result;
                    if (resMatch) {
                        resCore = resMatch[2];
                    }
                    
                    translatedCores.push({
                        core: resCore,
                        original: original,
                        translated: translated,
                        found: found
                    });
                    
                    if (found && translated) {
                        saveToTranslationMemory(direction, original, translated);
                    }
                }
                
                const reorderedCores = [];
                for (let i = 0; i < perm.length; i++) {
                    reorderedCores.push(translatedCores[perm[i]]);
                }
                
                const reorderedCoreStrings = reorderedCores.map(c => c.core);
                const fixedCoreStrings = fixCapitalization(originalCores, reorderedCoreStrings, perm, direction);
                
                const newClauseTokens = clauseTokens.map(item => item.text);
                for (let i = 0; i < wordInfos.length; i++) {
                    const slotInfo = wordInfos[i];
                    const reorderedInfo = reorderedCores[i];
                    const fixedCore = fixedCoreStrings[i];
                    
                    newClauseTokens[slotInfo.clauseIndex] = slotInfo.lead + fixedCore + slotInfo.trail;
                    
                    wordBreakdowns.push({
                        original: reorderedInfo.original,
                        translated: reorderedInfo.translated,
                        found: reorderedInfo.found
                    });
                }
                
                results.push(...newClauseTokens);
            } else {
                results.push(...clauseTokens.map(item => item.text));
            }
        }
    }
    
    return {
        translated: results.join(''),
        words: wordBreakdowns
    };
}

function saveToTranslationMemory(direction, src, tgt) {
    const srcClean = src.toLowerCase();
    const tgtClean = tgt.toLowerCase();
    
    const tgtCleanCore = tgtClean.replace(/\s*[\⚙\★\✨].*$/, '').replace(/\s*\(.*?\)/, '').trim();
    const srcCleanCore = srcClean.replace(/\s*[\⚙\★\✨].*$/, '').replace(/\s*\(.*?\)/, '').trim();
    
    const UNCACHEABLE_WORDS = new Set([
        "un", "thes", "món", "tón", "dés", "ló", "shai", "tu", "hil", "hel", "vinos", "ivu", "dil", "at", "ved", "ke", "ö", "hesa",
        "en", "et", "den", "det", "denne", "dette", "min", "mit", "mine", "din", "dit", "dine", "sin", "sit", "sine", "jeg", "mig",
        "du", "dig", "han", "ham", "hun", "hende", "vi", "os", "i", "jer", "de", "dem"
    ]);
    
    if (UNCACHEABLE_WORDS.has(srcCleanCore) || UNCACHEABLE_WORDS.has(tgtCleanCore)) {
        return;
    }
    
    if (direction === 'da') {
        translationMemory.pfToDa.set(tgtCleanCore, srcCleanCore);
    } else {
        translationMemory.daToPf.set(tgtCleanCore, srcCleanCore);
    }
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
    translationMemory.daToPf.clear();
    translationMemory.pfToDa.clear();
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
