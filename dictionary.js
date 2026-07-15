// ============================================
// PorFraDansk Dictionary Data
// ============================================

// Each entry: [danish, porfradansk, note]
// Note is optional context/disambiguation
//
// VIGTIGT: Rækkefølgen har betydning! Oversætteren bruger
// den FØRSTE forekomst den finder for et givet ord. Derfor
// står de mest almindelige betydninger først.

const DICTIONARY = [
    // ============================================
    // HILSNER & BASALE ORD
    // ============================================
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
    ["tak", "grási", ""],

    // ============================================
    // PRONOMENER
    // ============================================
    ["jeg", "shai", "1. person singularis"],
    ["mig", "shai", "1. person singularis"],
    ["du", "tu", "2. person singularis"],
    ["dig", "tu", "2. person singularis"],
    ["han", "hil", "3. person singularis"],
    ["ham", "hil", "3. person singularis"],
    ["hun", "hel", "3. person singularis"],
    ["hende", "hel", "3. person singularis"],
    ["man", "mon", "ubestemt pronomen"],
    ["vi", "vinos", "1. person pluralis"],
    ["os", "vinos", "1. person pluralis"],
    ["I", "ivu", "2. person pluralis"],
    ["jer", "ivu", "2. person pluralis"],
    ["de", "dil", "3. person pluralis"],
    ["dem", "dil", "3. person pluralis"],
    ["den", "hesa", "3. person singularis"],
    ["det", "hesa", "3. person singularis"],

    // ============================================
    // POSSESSIVE PRONOMENER
    // ============================================
    ["min", "món", "possessiv"],
    ["mit", "món", "possessiv"],
    ["mine", "món", "possessiv"],
    ["din", "tón", "possessiv"],
    ["dit", "tón", "possessiv"],
    ["dine", "tón", "possessiv"],
    ["hans", "háns", "possessiv"],
    ["hendes", "héns", "possessiv"],
    ["dens", "dés", "possessiv"],
    ["dets", "dés", "possessiv"],
    ["sin", "dés", "possessiv refleksiv"],
    ["sit", "dés", "possessiv refleksiv"],
    ["sine", "dés", "possessiv refleksiv"],
    ["vores", "voos", "possessiv"],
    ["jeres", "jaas", "possessiv"],
    ["deres", "daas", "possessiv"],

    // ============================================
    // SPØRGEORD (interrogative pronomener)
    // ============================================
    ["hvad", "kádh", "spørgeord"],
    ["hvor", "oze", "spørgeord – sted"],
    ["hvem", "kem", "spørgeord"],
    ["hvornår", "vondó", "spørgeord"],
    ["hvorfor", "pofo", "spørgeord"],
    ["hvordan", "kómó", "spørgeord – afledt"],

    // ============================================
    // ARTIKLER & DETERMINERE
    // ============================================
    ["en", "un", "ubestemt artikel"],
    ["et", "un", "ubestemt artikel"],
    ["den", "ló", "bestemt artikel"],
    ["det", "ló", "bestemt artikel"],
    ["denne", "thes", "demonstrativ"],
    ["dette", "thes", "demonstrativ"],
    ["den der", "thédér", "demonstrativ"],
    ["det der", "thédér", "demonstrativ"],
    ["alle", "ul", ""],
    ["alt", "ul", ""],
    ["al", "ul", ""],
    ["hver", "káda", ""],
    ["enhver", "káda", ""],

    // ============================================
    // KONJUNKTIONER & PRÆPOSITIONER
    // ============================================
    ["og", "o", "konjunktion"],
    ["eller", "ó", "konjunktion"],
    ["men", "más", "konjunktion"],
    ["om", "do", "præposition – emne"],
    ["af", "do", "præposition – of/'s"],
    ["i", "di", "præposition – i noget"],
    ["med", "mek", "præposition – hjælpemiddel/ejerskab"],
    ["mod", "kódh", "præposition – mod nogen/noget"],
    ["for", "po", "præposition – for nogens vedkommende"],
    ["til", "fur", "præposition – til at/for at"],
    ["på", "å", "præposition"],
    ["end", "ken", "sammenligning"],
    ["som", "sim", "relativt pronomen – en person som…"],
    ["der", "sim", "relativt pronomen – en person der…"],
    ["fra", "dé", "præposition – oprindelse"],
    ["efter", "despóis", "præposition"],
    ["før", "ántés", "præposition"],
    ["over", "sóbri", "præposition"],
    ["under", "sótó", "præposition"],
    ["ved", "siva", "nutid af sive (vide)"],
    ["uden", "séng", "præposition"],
    ["mellem", "éntri", "præposition"],
    ["hos", "éng", "præposition"],
    ["bag", "átrás", "præposition"],
    ["foran", "fréénti", "præposition"],
    ["om", "do", "præposition – emne"],
    ["anté", "anté", "med hensyn til / in regards to"],

    // ============================================
    // VERBER (infinitiv) – fra PDF'en
    // ============================================
    ["være", "ve", "to be"],
    ["have", "he", "to have"],
    ["gøre", "ge", "to do / bruges til verbification"],
    ["lave", "ge", "at gøre/lave"],
    ["gå", "gále", ""],
    ["spise", "mise", ""],
    ["elske", "áme", ""],
    ["lide", "áme", "at kunne lide / at elske"],
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
    ["skulle", "durde", "moralsk forpligtelse"],
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
    ["kunne", "pude", "at have evnen til"],
    ["komme", "vinge", ""],

    // ============================================
    // BØJEDE VERBER – NUTID (fjern -e, tilføj -a)
    // ============================================
    ["er", "va", "nutid af ve (være)"],
    ["har", "ha", "nutid af he (have)"],
    ["gør", "ga", "nutid af ge (gøre)"],
    ["laver", "ga", "nutid af ge (gøre)"],
    ["går", "gála", "nutid af gále (gå)"],
    ["spiser", "misa", "nutid af mise (spise)"],
    ["elsker", "áma", "nutid af áme (elske)"],
    ["dræber", "teeba", "nutid af teebe (dræbe)"],
    ["siger", "disa", "nutid af dise (sige)"],
    ["fortæller", "ratela", "nutid af ratele"],
    ["forklarer", "foplika", "nutid af foplike"],
    ["giver", "góna", "nutid af góne (give)"],
    ["ser", "soa'a", "nutid af soa'e (se)"],
    ["vil", "kréla", "nutid af kréle (ville)"],
    ["bør", "durda", "nutid af durde (burde)"],
    ["skal", "durda", "nutid af durde"],
    ["ved", "juntu", "præposition – nær ved"],
    ["kan", "puda", "nutid af pude (kunne)"],
    ["føder", "nedha", "nutid af nedhe (føde)"],
    ["kommer", "vinga", "nutid af vinge (komme)"],
    ["taler", "páálea", "nutid af páále (tale)"],
    ["snakker", "páálea", "nutid af páále"],
    ["behandler", "bétráta", "nutid af bétráte"],
    ["underviser", "ånduka", "nutid af ånduke"],

    // ============================================
    // BØJEDE VERBER – DATID (+ró)
    // ============================================
    ["var", "veró", "datid af ve (være)"],
    ["havde", "heró", "datid af he (have)"],
    ["gjorde", "geró", "datid af ge (gøre)"],
    ["lavede", "geró", "datid af ge"],
    ["gik", "gáleró", "datid af gále (gå)"],
    ["spiste", "miseró", "datid af mise (spise)"],
    ["elskede", "ámeró", "datid af áme (elske)"],
    ["dræbte", "teeberó", "datid af teebe (dræbe)"],
    ["sagde", "diseró", "datid af dise (sige)"],
    ["fortalte", "rateleró", "datid af ratele"],
    ["forklarede", "foplikeró", "datid af foplike"],
    ["gav", "góneró", "datid af góne (give)"],
    ["så", "soa'eró", "datid af soa'e (se)"],
    ["ville", "kréleró", "datid af kréle (ville)"],
    ["vidste", "siveró", "datid af sive (vide)"],
    ["kunne", "puderó", "datid af pude (kunne)"],
    ["bestod", "braderó", "datid af brade (bestå)"],
    ["kom", "vingeró", "datid af vinge (komme)"],
    ["fødte", "nedheró", "datid af nedhe (føde)"],

    // ============================================
    // BØJEDE VERBER – FREMTID (+ra)
    // ============================================
    ["vil være", "vera", "fremtid af ve"],
    ["vil have", "hera", "fremtid af he"],
    ["vil gøre", "gera", "fremtid af ge"],
    ["vil gå", "gálera", "fremtid af gále"],
    ["vil spise", "misera", "fremtid af mise"],

    // ============================================
    // NAVNEORD – fra PDF'en
    // ============================================
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
    ["mennesker", "yymen", "ingen flertalsændring"],
    ["person", "menson", ""],
    ["personer", "menson", ""],
    ["penge", "kacééng", ""],
    ["bror", "biao", ""],
    ["broder", "biao", ""],
    ["brødre", "biao", ""],
    ["internet", "ned", ""],
    ["hund", "dåuz", ""],
    ["hunden", "ló dåuz", "bestemt form"],
    ["grænseværdi", "limvádi", ""],
    ["grænseværdien", "ló limvádi", "bestemt form"],
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
    ["rettigheder", "zitihédh", ""],
    ["evne", "keun", "talent"],
    ["talent", "keun", ""],
    ["samvittighed", "samsjaangs", ""],
    ["logik", "lósjik", "reason/logic"],
    ["fornuft", "lósjik", "reason/logic"],
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
    ["jord", "tó'on", ""],
    ["Mars", "Ma'as", ""],
    ["Amerika", "Fok'jááo", ""],
    ["USA", "FEF", "Fynemónga éstat do Fok'jááo"],
    ["hinanden", "lénglán", ""],

    // ============================================
    // NOUNIFICATIONER – fra PDF-grammatik
    // verb → person der gør det: fjern -e, tilføj -ongus
    // verb → handlingen: fjern -e, tilføj -éng
    // adjektiv → koncept: tilføj -té
    // ============================================
    ["bedrager", "empostongus", "en der bedrager (emposte → empostongus)"],
    ["forklarer", "foplikongus", "en der forklarer (person)"],
    ["forklaring", "foplikéng", "handlingen at forklare"],
    ["sniper", "snaipongus", "en der sniper"],
    ["dræber", "teebongus", "en der dræber (person)"],
    ["dræbning", "teebéng", "handlingen at dræbe"],
    ["spiser", "misongus", "en der spiser (person)"],
    ["spisning", "miséng", "handlingen at spise"],
    ["underviser", "åndukongus", "en der underviser"],
    ["lærer", "åndukongus", "en der underviser"],
    ["undervisning", "åndukéng", "handlingen at undervise"],
    ["elsker", "ámongus", "en der elsker (person)"],
    ["bedrageri", "emposténg", "handlingen at bedrage"],
    ["oversætter", "tradusongus", "en der oversætter (person)"],
    ["oversættelse", "traduséng", "handlingen at oversætte"],

    // Adjektiv → navneord (+té)
    ["frihed", "librité", "libri + té"],
    ["værdighed", "viinité", "viini + té"],
    ["højde", "hóité", "hói + té"],
    ["længde", "longité", "longi + té"],
    ["hurtighed", "hurpidité", "hurpidi + té"],
    ["mulighed", "posillité", "pósili + té"],
    ["godhed", "góngte", "góng + té"],
    ["skønhed", "bélité", "béli + té"],
    ["styrke", "fortité", "forti + té"],
    ["svaghed", "frákité", "fráki + té"],
    ["rigdom", "ríkité", "ríki + té"],
    ["fattigdom", "póbrité", "póbri + té"],
    ["glæde", "félisité", "félisi + té"],
    ["dumhed", "estúpidité", "estúpidi + té"],
    ["kloghed", "intéligéntité", "intéligénti + té"],

    // ============================================
    // ADJEKTIVER (ender på -i) – fra PDF'en
    // ============================================
    ["mistænkelig", "sosi", ""],
    ["sjov", "sjoli", "adjektiv"],
    ["fri", "libri", ""],
    ["frie", "libri", ""],
    ["frit", "libri", ""],
    ["værdig", "viini", ""],
    ["lang", "longi", "distance eller tid"],
    ["lille", "péli", ""],
    ["lille", "péli", ""],
    ["høj", "hói", ""],
    ["hemmelig", "sökremli", ""],
    ["dygtig", "kompeti", "skilled"],
    ["nem", "nesili", "let"],
    ["god", "góng", ""],
    ["godt", "góngmang", "adverbium"],
    ["hurtig", "hurpidi", ""],
    ["mulig", "pósili", ""],
    ["hellig", "sali", ""],
    ["ussel", "béc", "svag person"],
    ["bekræftet", "béfirmi", ""],
    ["lige", "igááli", "equal/lig"],
    ["lig", "igááli", "equal"],

    // Afledte adjektiver (fra PDF-grammatik)
    ["stor", "grandi", "fra grande"],
    ["smuk", "béli", "pæn/smuk"],
    ["pæn", "béli", ""],
    ["gammel", "vélhi", "fra velho"],
    ["ung", "jóveni", "fra jovem"],
    ["ny", "nóvi", "fra novo"],
    ["glad", "félisi", "fra feliz"],
    ["vred", "furiosi", "sur/vred"],
    ["sur", "furiosi", ""],
    ["stærk", "forti", "fra forte"],
    ["svag", "fráki", "fra fraco"],
    ["rig", "ríki", "fra rico"],
    ["fattig", "póbri", "fra pobre"],
    ["langsom", "lénti", "fra lento"],
    ["træt", "kansadi", "fra cansado"],
    ["sulten", "famintu", ""],
    ["tørstig", "sedénti", "fra sedento"],
    ["dum", "estúpidi", ""],
    ["klog", "intéligénti", ""],
    ["vigtig", "importánti", "fra importante"],
    ["farlig", "périgósi", "fra perigoso"],
    ["sikker", "ségúri", "fra seguro"],
    ["rolig", "kálmi", "fra calmo"],
    ["vild", "selvági", "fra selvagem"],
    ["ren", "límpi", "fra limpo"],
    ["beskidt", "súji", "fra sujo"],
    ["ked af det", "trísti", "fra triste"],
    ["trist", "trísti", "fra triste"],
    ["lykkelig", "félisi", "fra feliz"],
    ["syg", "doénti", "fra doente"],
    ["sund", "sáudávéli", "fra saudável"],
    ["korrekt", "kóréti", "fra correto"],
    ["forkert", "érrádi", "fra errado"],

    // ============================================
    // FARVER
    // ============================================
    ["rød", "rösh", "farve"],
    ["blå", "blø", "farve"],
    ["grøn", "vörn", "farve"],
    ["gul", "shuun", "farve"],
    ["lilla", "léle", "farve"],
    ["sort", "sóaa", "farve"],
    ["hvid", "bli", "farve"],
    ["brun", "maruun", "farve"],
    ["lyserød", "lyys", "farve"],

    // ============================================
    // ADVERBIER & DIVERSE
    // ============================================
    ["ikke", "ék", ""],
    ["altid", "semtidh", ""],
    ["aldrig", "shadri", ""],
    ["mere", "méis", ""],
    ["mest", "maióst", ""],
    ["rigtig", "muti", "virkelig/very"],
    ["virkelig", "muti", ""],
    ["mange", "maku", "en masse"],
    ["meget", "maku", ""],
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
    ["også", "tanbéng", ""],
    ["kun", "solmánti", ""],
    ["bare", "solmánti", ""],
    ["snart", "lógu", ""],
    ["allerede", "já", ""],
    ["stadig", "aindá", ""],
    ["endnu", "aindá", ""],
    ["sammen", "juntumang", ""],
    ["alene", "sósinyumang", ""],
    ["her", "akimang", ""],
    ["der", "álimang", "derhen"],
    ["ofte", "tá'étshotfováagang", "meget ofte/hver dag"],

    // Adverbier afledt fra adjektiver (+mang)
    ["langt", "longimang", "longi + mang"],
    ["hurtigt", "hurpidimang", "hurpidi + mang"],
    ["nemt", "nesilimang", "nesili + mang"],
    ["hemmeligt", "sökremlimang", "sökremli + mang"],
    ["langsomt", "léntimang", "lénti + mang"],
    ["farligt", "périgósimang", "périgósi + mang"],
    ["sikkert", "ségúrimang", "ségúri + mang"],
    ["roligt", "kálmimang", "kálmi + mang"],

    // ============================================
    // SPROG
    // ============================================
    ["dansk", "dánóask", ""],
    ["engelsk", "angglesk", ""],
    ["portugisisk", "potugesk", ""],
    ["porfradansk", "porfradánóask", ""],
    ["spansk", "éspányósk", ""],
    ["fransk", "fránsóask", ""],
    ["tysk", "álemanósk", ""],

    // ============================================
    // GRAMMATISKE PARTIKLER & MARKØRER
    // ============================================
    ["at", "ö", "infinitivmarkør – at [gøre noget]"],
    ["at", "ke", "komplementør – [jeg ved] at [du...]"],

    // ============================================
    // FAMILIE
    // ============================================
    ["mor", "máe", "fra mãe"],
    ["moder", "máe", ""],
    ["far", "páe", "fra pai"],
    ["fader", "páe", ""],
    ["søster", "irmá", "fra irmã"],
    ["barn", "kriansá", "fra criança"],
    ["børn", "kriansá", "fra criança"],
    ["familie", "famíliá", ""],
    ["forældre", "páeomáe", "far+og+mor"],

    // ============================================
    // NATUR & STEDER
    // ============================================
    ["sol", "sóli", "fra sol"],
    ["måne", "luná", "fra lua/luna"],
    ["stjerne", "éstrélá", "fra estrela"],
    ["himmel", "séli", "fra céu"],
    ["hav", "oshánu", "fra oceano"],
    ["skov", "floréstá", "fra floresta"],
    ["bjerg", "montányá", "fra montanha"],
    ["verden", "múndo", "fra mundo"],
    ["by", "sidádi", "fra cidade"],
    ["land", "páís", "fra país"],
    ["sted", "lugá", "fra lugar"],

    // ============================================
    // ABSTRAKTE ORD & BEGREBER
    // ============================================
    ["dag", "díá", "fra dia"],
    ["nat", "noishi", "fra noite"],
    ["morgen", "amányá", "fra manhã"],
    ["aften", "noishi", "fra noite"],
    ["tid", "témpo", "fra tempo"],
    ["liv", "vídá", "fra vida"],
    ["død", "morti", "fra morte"],
    ["kærlighed", "ámor", "fra amor"],
    ["had", "ódiu", "fra ódio"],
    ["frygt", "froajéng", "fra froaje + éng"],
    ["håb", "éspéránsá", "fra esperança"],
    ["drøm", "sónyu", "fra sonho"],
    ["sandhed", "vérdádi", "fra verdade"],
    ["løgn", "méntírá", "fra mentira"],
    ["fred", "pási", "fra paz"],
    ["bog", "lívru", "fra livro"],
    ["historie", "istóriá", "fra história"],
    ["musik", "músíká", "fra música"],
    ["film", "fílmi", ""],
    ["spil", "jógu", "fra jogo"],
    ["arbejde", "trabáju", "fra trabalho"],
    ["ven", "amígu", "fra amigo"],
    ["fjende", "inimígu", "fra inimigo"],
    ["dreng", "gárótu", "fra garoto"],
    ["pige", "gárótá", "fra garota"],
    ["kvinde", "mulyéri", "fra mulher"],
    ["mand", "fek", "fra eksisterende PF-ord"],
    ["problem", "problémá", "fra problema"],
    ["svar", "respóstá", "fra resposta"],
    ["spørgsmål", "pergúntá", "fra pergunta"],
    ["hjerte", "korasau", "fra coração"],
    ["hoved", "kabésá", "fra cabeça"],
    ["hånd", "máo", "fra mão"],
    ["øje", "ólhu", "fra olho"],
    ["mund", "bóká", "fra boca"],
    ["krop", "kóópu", "fra corpo"],
    ["sjæl", "álmá", "fra alma"],

    // ============================================
    // FLERE VERBER – afledt fra Romance-mønstre
    // ============================================
    ["tænke", "pense", "fra pensar"],
    ["tænker", "pensa", "nutid af pense"],
    ["drikke", "bébe", "fra beber"],
    ["drikker", "béba", "nutid af bébe"],
    ["skrive", "eskrive", "fra escrever"],
    ["skriver", "eskriva", "nutid af eskrive"],
    ["læse", "lée", "fra ler"],
    ["læser", "léa", "nutid af lée"],
    ["løbe", "kóre", "fra correr"],
    ["løber", "kóra", "nutid af kóre"],
    ["flyve", "vóe", "fra voar"],
    ["flyver", "vóa", "nutid af vóe"],
    ["sove", "dormíe", "fra dormir"],
    ["sover", "dormía", "nutid af dormíe"],
    ["hjælpe", "ajude", "fra ajudar"],
    ["hjælper", "ajuda", "nutid af ajude"],
    ["forstå", "entende", "fra entender"],
    ["forstår", "entenda", "nutid af entende"],
    ["synge", "kante", "fra cantar"],
    ["synger", "kanta", "nutid af kante"],
    ["danse", "dansáe", "fra dançar"],
    ["danser", "dansáa", "nutid af dansáe"],
    ["vente", "éspéráe", "fra esperar"],
    ["venter", "éspéráa", "nutid af éspéráe"],
    ["købe", "kompre", "fra comprar"],
    ["køber", "kompra", "nutid af kompre"],
    ["sælge", "vende", "fra vender"],
    ["sælger", "venda", "nutid af vende"],
    ["åbne", "ábrire", "fra abrir"],
    ["åbner", "ábrira", "nutid af ábrire"],
    ["lukke", "féshe", "fra fechar"],
    ["lukker", "fésha", "nutid af féshe"],
    ["arbejde", "trabáje", "fra trabalhar"],
    ["arbejder", "trabája", "nutid af trabáje"],
    ["spille", "jóge", "fra jogar"],
    ["spiller", "jóga", "nutid af jóge"],
    ["hedde", "sháme", "fra chamar"],
    ["hedder", "sháma", "nutid af sháme"],
    ["lære", "aprende", "fra aprender"],
    ["lærer", "aprenda", "nutid af aprende (verb)"],
    ["finde", "énkóntráe", "fra encontrar"],
    ["finder", "énkóntráa", "nutid af énkóntráe"],
    ["tro", "ákredite", "fra acreditar"],
    ["tror", "ákredita", "nutid af ákredite"],
    ["prøve", "téntáe", "fra tentar"],
    ["prøver", "téntáa", "nutid af téntáe"],
    ["bruge", "usáe", "fra usar"],
    ["bruger", "usáa", "nutid af usáe"],
    ["bo", "moráe", "fra morar"],
    ["bor", "moráa", "nutid af moráe"],
    ["stoppe", "páráe", "fra parar"],
    ["stopper", "páráa", "nutid af páráe"],
    ["begynde", "koménse", "fra começar"],
    ["begynder", "koménsa", "nutid af koménse"],
    ["oversætte", "traduse", "fra traduzir"],
    ["oversætter", "tradusa", "nutid af traduse (verb)"],
    ["flytte", "mudáe", "fra mudar"],
    ["flytter", "mudáa", "nutid af mudáe"],
    ["betale", "pagáe", "fra pagar"],
    ["betaler", "pagáa", "nutid af pagáe"],
    ["lege", "brínke", "fra brincar"],
    ["leger", "brínka", "nutid af brínke"],

    // ============================================
    // EKSTRA ORD FRA EKSEMPLER
    // ============================================
    ["syntes", "synace", ""],
    ["typer", "typós", ""],

    // Specifikke ord fra eksempelsætning 9 (Navy Seals)
    ["bitch", "béc", ""],
    ["Navy Seals", "Neévi Siills", ""],
    ["Al-Qaeda", "Ál-Kaidá", ""],

    // Specifikke ord fra eksempelsætning 10
    ["passant", "Pásang", "en passant"],
    ["holy", "sali", "hellig"],

    // Tal som ord
    ["nul", "théthó", "0"],
    ["en", "un", "1 / ubestemt artikel"],
    ["to", "dö", "2"],
    ["tre", "te", "3"],
    ["fire", "fo", "4"],
    ["fem", "fe", "5"],
    ["seks", "döu", "6"],
    ["syv", "teu", "7"],
    ["otte", "fou", "8"],
    ["ni", "feu", "9"],
    ["ti", "i", "10"],
    ["hundrede", "sung", "100"],
    ["tusind", "mil", "1000"],
    ["million", "milóó", "10^6"],
    ["milliard", "milaa", "10^9"],
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
        literal: "Du dræbe [imperativ]!",
        da: "Dræb dig selv!"
    },
    {
        pf: "tu durda teebe tu nunang!",
        literal: "du bør-[nutid] dræbe du nu!",
        da: "Du burde dræbe dig selv nu!"
    },
    {
        pf: "Un empostongus sosi veró Silás",
        literal: "En bedrager mistænkelig være-[datid] Silas",
        da: "Silas var en mistænkelig bedrager"
    },
    {
        pf: "Ló empostongus sosi va Simaao?",
        literal: "Den bedrager mistænkelig er Simão?",
        da: "Er Simão den mistænkelige bedrager?"
    },
    {
        pf: "Libri o igááli anté viinité o zitihédh nedhenga venga ul yymen. Losjik o samsjaangs kádógónamó o lénglán durda bétráte som biao dil.",
        literal: "Fri og lige mht. værdighed og rettigheder født-[prog.] være-[prog.] alle mennesker. Logik og samvittighed give-[nutid]-[passiv] og hinanden burde behandle som brødre de.",
        da: "Alle mennesker er født frie og lige i værdighed og rettigheder. De er udstyret med fornuft og samvittighed og bør handle mod hinanden i en broderskabsånd."
    },
    {
        pf: "Ló dåuz misebomócanga vinos maa?",
        literal: "hunden spise-[i morgen]-[passiv-causativ]-[prog.] vi [spørgsmål]?",
        da: "Vil vi være i gang med at få hunden til at blive spist imorgen?"
    },
    {
        pf: "Ék áma gále longimang ivu",
        literal: "ikke lide-[nutid] gå langt-[adv] jer",
        da: "I kan ikke lide at gå langt"
    },
    {
        pf: "Tá'étshotfováagang ló limvádi foplika Knudh",
        literal: "Meget-ofte den grænseværdi forklare-[nutid] Dæmon",
        da: "Dæmon forklarer meget ofte grænseværdien"
    },
    {
        pf: "Kádh ga tu maa?",
        literal: "Hvad gøre-[nutid] du [spørgsmål]?",
        da: "Hvad gør/laver du?"
    },
    {
        pf: "Ang Pásang guugle ka. Sali eskóóla!",
        literal: "En Passant google [imperativ]. Hellig helvede!",
        da: "Google en passant. Holy hell!"
    }
];
