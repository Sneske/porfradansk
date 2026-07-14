// ============================================
// PorFraDansk Dictionary Data
// ============================================

// Each entry: [danish, porfradansk, note]
// Note is optional context/disambiguation
const DICTIONARY = [
    // Greetings & basics
    ["hej", "ólhai", ""],
    ["farvel", "fádeus", ""],
    ["velkommen", "velvöny", ""],
    ["ja", "jui", ""],
    ["nej", "nój", ""],
    ["ok", "ákeé", "også: ak"],
    ["okay", "ákeé", "også: ak"],
    ["tillykke", "télösitáshon", ""],
    ["LMAO", "PTAO", "pé-té-a-ó"],
    ["ASAP", "OHP", "Óso Hurpidimang Óso Posili"],

    // Pronouns
    ["jeg", "shai", "1. person singularis"],
    ["du", "tu", "2. person singularis"],
    ["dig", "tu", "2. person singularis"],
    ["han", "hil", "3. person singularis"],
    ["hun", "hel", "3. person singularis"],
    ["den", "hesa", "3. person singularis / upersonligt"],
    ["det", "hesa", "3. person singularis / upersonligt"],
    ["man", "mon", "ubestemt pronomen"],
    ["vi", "vinos", "1. person pluralis"],
    ["os", "vinos", "1. person pluralis"],
    ["i", "ivu", "2. person pluralis"],
    ["jer", "ivu", "2. person pluralis"],
    ["de", "dil", "3. person pluralis"],
    ["dem", "dil", "3. person pluralis"],

    // Possessives
    ["min", "món", "possessiv"],
    ["mit", "món", "possessiv"],
    ["din", "tón", "possessiv"],
    ["dit", "tón", "possessiv"],
    ["hans", "háns", "possessiv"],
    ["hendes", "héns", "possessiv"],
    ["dens", "dés", "possessiv"],
    ["dets", "dés", "possessiv"],
    ["vores", "voos", "possessiv"],
    ["jeres", "jaas", "possessiv"],
    ["deres", "daas", "possessiv"],

    // Interrogatives
    ["hvad", "kádh", "spørgeord"],
    ["hvor", "oze", "spørgeord – sted"],
    ["hvem", "kem", "spørgeord"],
    ["hvornår", "vondó", "spørgeord"],
    ["hvorfor", "pofo", "spørgeord"],

    // Articles & determiners
    ["en", "un", "ubestemt artikel"],
    ["et", "un", "ubestemt artikel"],
    ["denne", "thes", "demonstrativ"],
    ["dette", "thes", "demonstrativ"],
    ["alle", "ul", ""],
    ["alt", "ul", ""],
    ["al", "ul", ""],

    // Conjunctions & prepositions
    ["og", "o", "konjunktion"],
    ["om", "do", "præposition – emne"],
    ["af", "do", "præposition – of/'s"],
    ["i", "di", "præposition – i noget"],
    ["med", "mek", "præposition – hjælpemiddel/ejerskab"],
    ["mod", "kódh", "præposition – mod nogen/noget"],
    ["for", "po", "præposition – for nogens vedkommende"],
    ["på", "å", "præposition"],
    ["end", "ken", "sammenligning"],
    ["som", "som", "som/der (person)"],

    // Verbs (infinitive form ends in -e)
    ["være", "ve", "to be"],
    ["have", "he", "to have"],
    ["gøre", "ge", "to do / bruges til verbification"],
    ["gå", "gále", ""],
    ["spise", "mise", ""],
    ["elske", "áme", ""],
    ["dræbe", "teebe", ""],
    ["sige", "dise", ""],
    ["fortælle", "ratele", ""],
    ["bedrage", "emposte", ""],
    ["forklare", "foplike", ""],
    ["undervise", "ånduke", ""],
    ["forene", "fyne", ""],
    ["involvere", "invope", ""],
    ["snipe", "snaipe", ""],
    ["træne", "treéne", "specifikt sig selv"],
    ["øve", "treéne", "specifikt sig selv"],
    ["vide", "sive", "at vide"],
    ["ville", "kréle", ""],
    ["burde", "durde", "moralsk forpligtelse"],
    ["føde", "nedhe", ""],
    ["give", "góne", "give ting"],
    ["bedømme", "shydöme", ""],
    ["se", "soa'e", ""],
    ["google", "guugle", ""],
    ["tale", "páále", ""],
    ["snakke", "páále", ""],
    ["behandle", "bétráte", "treat/omgås"],
    ["tvære", "téfáse", "tvære ud"],
    ["frygte", "froaje", "frygte/tage i agt for"],
    ["bestå", "brade", "graduate/bestå uddannelse"],

    // Nouns
    ["computer", "kóminatør", ""],
    ["gymnasie", "eskóóla", ""],
    ["skole", "pélil eskóóla", ""],
    ["aflevering", "táshéng", ""],
    ["vand", "vándgua", ""],
    ["brød", "braaó", ""],
    ["smør", "mørgá", ""],
    ["lort", "mórd", ""],
    ["meme", "mimos", ""],
    ["menneske", "yymen", ""],
    ["person", "menson", ""],
    ["penge", "kacééng", ""],
    ["bror", "biao", ""],
    ["internet", "ned", ""],
    ["hund", "dåuz", ""],
    ["grænseværdi", "limvádi", ""],
    ["terrorisme", "táorésmu", ""],
    ["ting", "shéng", ""],
    ["ord", "pólava", ""],
    ["kode", "kód", ""],
    ["gynge", "lögøng", ""],
    ["mad", "báf", ""],
    ["bil", "bityyr", ""],
    ["hus", "hong", ""],
    ["præcision", "práásishon", ""],
    ["tilfælde", "keéfel", "case"],
    ["rettighed", "zitihédh", ""],
    ["evne", "keun", "talent"],
    ["talent", "keun", ""],
    ["samvittighed", "samsjaangs", ""],
    ["logik", "lósjik", "reason/logic"],
    ["ø", "øhá", ""],
    ["stat", "éstát", ""],
    ["militær", "amilitá", ""],
    ["angreb", "ántak", "raid"],
    ["drab", "déll", "kill"],
    ["krig", "griaa", ""],
    ["guerilla", "gerilá", ""],
    ["helvede", "eskóóla", ""],
    ["ur", "lurgi'ó", ""],
    ["klasse", "aus", "skoleklasse"],
    ["karakter", "karanot", "i skolen"],
    ["mål", "myt", "i spil og træning"],
    ["snyd", "nydhbát", ""],
    ["time", "aulame", "skoletime"],
    ["Gud", "gi'aani", ""],
    ["Satan", "kenet", ""],
    ["dæmon", "knudh", ""],
    ["regnbue", "aakangbuu", ""],
    ["Jorden", "tó'on", "planeten"],
    ["Mars", "Ma'as", ""],
    ["Amerika", "Fok'jááo", ""],
    ["USA", "Fynemónga éstat do Fok'jááo", "også: FEF"],
    ["hinanden", "lénglán", ""],

    // Adjectives (end in -i)
    ["mistænkelig", "sosi", ""],
    ["sjov", "sjoli", "adjektiv"],
    ["fri", "libri", ""],
    ["værdig", "viini", ""],
    ["lang", "longi", "distance eller tid"],
    ["lille", "péli", ""],
    ["høj", "hói", ""],
    ["hemmelig", "sökremli", ""],
    ["dygtig", "kompeti", "skilled"],
    ["nem", "nesili", "let"],
    ["god", "góng", ""],
    ["hurtig", "hurpidi", ""],
    ["mulig", "pósili", ""],
    ["hellig", "sali", ""],
    ["ussel", "béc", "svag person"],
    ["bekræftet", "béfirmi", ""],

    // Colors
    ["rød", "rösh", "farve"],
    ["blå", "blø", "farve"],
    ["grøn", "vörn", "farve"],
    ["gul", "shuun", "farve"],
    ["lilla", "léle", "farve"],
    ["sort", "sóaa", "farve"],
    ["hvid", "bli", "farve"],
    ["brun", "maruun", "farve"],
    ["lyserød", "lyys", "farve"],

    // Adverbs & misc
    ["ikke", "ék", ""],
    ["altid", "semtidh", ""],
    ["aldrig", "shadri", ""],
    ["mere", "méis", ""],
    ["mest", "maióst", ""],
    ["rigtig", "muti", "virkelig/very"],
    ["virkelig", "muti", ""],
    ["mange", "maku", "en masse"],
    ["nu", "nunang", ""],
    ["fucking", "fokéng", "adverbium"],
    ["fuck", "pudns", "udråb"],
    ["helt", "hécé", "hele noget"],
    ["hele", "hécé", "hele noget"],
    ["ingenting", "péngshéng", "intet"],
    ["intet", "péngshéng", ""],
    ["ingen", "péngen", "ikke noget af noget"],
    ["andet", "ónédh", "noget andet"],
    ["andre", "ónédh", ""],
    ["klar", "pra", "klar til at"],
    ["ligeså", "óso", ""],

    // Languages
    ["dansk", "dánóask", ""],
    ["engelsk", "angglesk", ""],
    ["portugisisk", "potugesk", ""],

    // Extra words from examples
    ["syntes", "synace", ""],
    ["typer", "typós", ""],
];

// Numeral data
const NUMERALS = {
    digits: ["théthó", "un", "dö", "te", "fo", "fe", "döu", "teu", "fou", "feu"],
    tens: { 10: "i", 20: "döi", 30: "tei", 40: "foi", 50: "fei", 60: "döui", 70: "teui", 80: "foui", 90: "feui" },
    hundred: "sung",
    thousand: "mil",
    million: "milóó",
    billion: "milaa",
    trillion: "bilóó"
};

// Example sentences
const EXAMPLES = [
    {
        pf: "Tu teebe ka!",
        literal: "Du dræber (det er en ordre!) du",
        da: "Dræb dig selv!"
    },
    {
        pf: "tu durda teebe tu nunang!",
        literal: "Nu du bør-[nutid] dræbe du!",
        da: "You should kill yourself now!"
    },
    {
        pf: "Un empostongus sosi veró Silás",
        literal: "En mistænkelig bedrager være-[datid] Silas",
        da: "Silas var en mistænkelig bedrager"
    },
    {
        pf: "Ló empostongus sosi va Simaao?",
        literal: "Den mistænkelige bedrager er Simão?",
        da: "Er Simão den mistænkelige bedrager?"
    },
    {
        pf: "Libri o igááli anté viinité o zitihédh nedhenga venga ul yymen. Losjik o samsjaangs kádógónamó o lénglán durda bétráte som biao dil.",
        literal: "Fri og lige med hensyn til værdighed og rettigheder født-[prog.] være-[prog.] alle mennesker. Logik og samvittighed givet-[passiv] og hinanden burde behandle som brødre de.",
        da: "Alle mennesker er født frie og lige i værdighed og rettigheder. De er udstyret med fornuft og samvittighed og bør handle mod hinanden i en broderskabsånd."
    },
    {
        pf: "Ló douz misebomócanga vinos maa?",
        literal: "hunden spise-[i morgen]-[passiv-causativ]-[prog.] vi [spørgsmål]?",
        da: "Vil vi være i gang med at få hunden til at blive spist imorgen?"
    },
    {
        pf: "Ék áma gále longimang ivu",
        literal: "ikke lide-[nutid] at gå langt",
        da: "I kan ikke lide at gå langt"
    },
    {
        pf: "Tá'étshotfováagang ló limvádi foplika Knudh",
        literal: "Meget ofte [bestemt] grænseværdi forklare-[nutid] Dæmon",
        da: "Dæmon forklarer meget ofte grænseværdien"
    },
    {
        pf: "Ang Pásang guugle ka. Sanli eskóóla!",
        literal: "Google en passant. Hellig helvede!",
        da: "Google en passant. Holy hell!"
    }
];
