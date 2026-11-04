// Search pages (GoHighLevel, GoHighLevel expert, n8n, RevOps) in Estonian.
import type { PlatformId, PlatformLabels, PlatformPage } from "../../platforms";

export const labels: PlatformLabels = {
  fits: "Sobib hästi, kui",
  notFits: "Ei ole parim valik, kui",
  cases: "Mida oleme klientidele ehitanud",
  allWork: "Kõik meie tööd",
  faq: "Korduvad küsimused",
};

export const pages: Record<PlatformId, PlatformPage> = {
  "gohighlevel-agency-europe": {
    meta: {
      title: "GoHighLeveli agentuur Eestis ja Euroopas | Alopex Digital",
      description: "Seadistame ja hooldame GoHighLevelit Eesti, Poola ja teiste Euroopa ettevõtete jaoks: müügitoru, kalendrid, e-kirjad ja SMS-id, andmete kolimine vanast CRM-ist ning ühendused Merit Aktivaga.",
    },
    crumb: "GoHighLeveli agentuur · Euroopa",
    title: "GoHighLeveli seadistus Euroopa ettevõtetele",
    lead: "GoHighLevel on CRM, kus e-post, SMS, kalendrid ja automaatika on ühes kohas. Seadistame selle nii, nagu su tiim päriselt müüb, kolime andmed üle ja ühendame selle Euroopas levinud tööriistadega, näiteks Merit Aktivaga.",
    what: {
      title: "Mis on GoHighLevel",
      text: "Üks süsteem kontaktide, tehingute, e-kirjade, SMS-ide, broneerimiskalendrite, vormide ja lihtsate veebilehtede jaoks. See asendab mitu eraldi tööriista ja kogu tiim näeb iga kliendi kohta sama ajalugu.",
      fits: ["Võtad ühendust paljude kontaktidega e-posti, SMS-i või telefoni teel", "Su tiim broneerib klientidega kõnesid või kohtumisi", "Tahad hoida päringud, tehingud ja sõnumid ühes kohas", "Tahad tabelitelt, Pipedrive'ilt või HubSpotilt üle kolida"],
      notFits: ["Vajad ERP-d lao ja tootmise jaoks", "Su müük käib suurettevõtte CRM-is, mis on tugevalt kohandatud", "Müüb ainult üks inimene ja tabelist piisab"],
    },
    doTitle: "Mida me GoHighLeveliga teeme",
    do: [
      { title: "Seadistus sinu müügi jaoks", text: "Müügitoru, tehingute etapid, meeldetuletused, kalendrid ja e-kirja põhjad, mis vastavad sellele, kuidas su tiim päriselt müüb." },
      { title: "Andmete kolimine", text: "Kontaktid, tehingud ja märkmed Pipedrive'ist, HubSpotist, Salesforce'ist või Excelist. Kontrollime tulemuse koos sinuga enne üleminekut." },
      { title: "Ühendused teiste tööriistadega", text: "Arved Merit Aktivasse, päringud veebilehelt, andmed ERP-st ja ERP-sse. Kus GoHighLevelil valmis ühendust pole, ehitame selle n8n-iga." },
      { title: "Iga postkast CRM-is", text: "Alopex Email Sync, meie enda Marketplace'i rakendus, sünkroonib GoHighLeveliga kahes suunas iga IMAP/SMTP postkasti, mitte ainult Gmaili ja Outlooki." },
      { title: "GDPR-i seaded", text: "Nõusoleku väljad, loobumiste haldus ja andmetöötluslepingud. Seadistame need kohe alguses ja paneme kirja." },
      { title: "Koolitus ja tugi", text: "Koolitus su tiimile eesti, inglise või poola keeles ja igakuine ülevaade, kui süsteem on kasutusel." },
    ],
    faq: [
      { q: "Kas GoHighLevel vastab GDPR-i nõuetele?", a: "Jah, kui see on õigesti seadistatud: nõusolek, loobumiste haldus ja andmetöötlusleping. Seadistame need ja paneme kirja." },
      { q: "Kas saate meie andmed teisest CRM-ist üle kolida?", a: "Jah. Kolime kontaktid, tehingud ja märkmed Pipedrive'ist, HubSpotist, Salesforce'ist või tabelitest ja kontrollime tulemuse koos sinuga enne üleminekut." },
      { q: "Kas see töötab Eesti raamatupidamistarkvaraga?", a: "Valmis ühendust ei ole. Ühendame selle Merit Aktiva ja sarnaste programmidega ise." },
      { q: "Kui kaua seadistus võtab?", a: "Tavaliselt 2–8 nädalat, olenevalt andmete hulgast ja sellest, mitu tööriista tuleb ühendada. Pärast kavandit saad kindla hinna." },
    ],
  },

  "gohighlevel-expert": {
    meta: {
      title: "GoHighLeveli ekspert | Parandused, integratsioonid ja aruanded | Alopex Digital",
      description: "GoHighLeveli eksperdid olemasolevale kontole: töövood, mis käivituvad valesti, aruanded, mida keegi ei usalda, ja ühendused, mis seiskuvad. Vaatame konto üle, parandame vead ja ehitame puuduva.",
    },
    crumb: "GoHighLeveli ekspert",
    title: "Saa rohkem kasu GoHighLeveli kontost, mis sul juba on",
    lead: "Paljud ettevõtted seadistavad GoHighLeveli ise ja jäävad siis hätta: töövood käivituvad kaks korda, aruandeid ei usalda keegi ja ühendused seiskuvad. Vaatame konto üle, parandame vead ja ehitame puuduva.",
    what: {
      title: "Millal on vaja GoHighLeveli eksperti",
      text: "GoHighLevel oskab palju ja seetõttu läheb konto kergesti segaseks. Ülevaatusest selgub tavaliselt paar parandust, mis muudavad kõige rohkem.",
      fits: ["Töövood käivituvad kaks korda, käivad ringiratast või seiskuvad hoiatuseta", "GoHighLeveli müüginumbrid ei klapi tegelikkusega", "Vajad ühendust, mida GoHighLevel ei paku", "Su tiim teeb tööd CRM-ist mööda"],
      notFits: ["Vajad ainult lihtsat müügitoru ja broneerimiskalendrit", "GoHighLeveli enda õpetused katavad juba su olukorra"],
    },
    doTitle: "Mida me sinu kontol teeme",
    do: [
      { title: "Konto ülevaatus", text: "Vaatame läbi müügitorud, töövood, kohandatud väljad ja ühendused ning ütleme, mida esimesena parandada." },
      { title: "Töövoogude parandused", text: "Valesti käivituvad töövood ehitame ümber ja testime päris kontaktidel, enne kui need uuesti tööle lähevad." },
      { title: "Aruanded, mida saab usaldada", text: "Töölauad ja hommikused aruanded müüginumbritega, mis vastavad sellele, mis päriselt juhtus." },
      { title: "Integratsioonid", text: "Ühendused raamatupidamise, ERP, veebivormide ja teiste tööriistadega, ehitatud GoHighLeveli API ja n8n-iga." },
      { title: "Meie oma rakendused", text: "Kui GoHighLevel midagi ei oska, ehitame selle ise. Alopex Email Sync on üks meie Marketplace'i rakendustest." },
      { title: "Koolitus", text: "Su tiim õpib asju ise muutma, nii et keegi ei pea meid ootama." },
    ],
    faq: [
      { q: "Kas saate töötada meie olemasoleval kontol?", a: "Jah. Töötame su kontol oma kasutajaga ja paneme iga muudatuse kirja." },
      { q: "Kas peame sõlmima pika lepingu?", a: "Ei. Võid alustada ülevaatuse ja kindla paranduste nimekirjaga. Igakuine tugi on valikuline." },
      { q: "Mis ülevaatus maksab?", a: "Ülevaatus on kavandi samm: väike kindel tasu, mille lepime kokku enne algust. Kui ehitad seejärel koos meiega, arvame selle ehituse hinnast maha." },
      { q: "Kas seadistate ka uusi kontosid?", a: "Jah. Vaata meie GoHighLeveli seadistuse lehte, kuidas uut kontot alustame." },
    ],
  },

  "n8n-automation-agency": {
    meta: {
      title: "n8n-i automatiseerimise agentuur | Töövood ELi serverites | Alopex Digital",
      description: "Ehitame n8n-i töövooge päris äriprotsesside jaoks, hoiame neid töös ELi serverites ja parandame, kui midagi seiskub. Ühendame omavahel CRM-i, e-posti, raamatupidamise, tabelid ja AI.",
    },
    crumb: "n8n-i automatiseerimise agentuur",
    title: "n8n-i automaatika: ehitame ja hoiame töös",
    lead: "n8n on avatud lähtekoodiga tarkvara, mis viib andmeid su tööriistade vahel. Ehitame n8n-i töövooge päris äriprotsesside jaoks, hoiame neid töös ELi serverites ja saame kohe teada, kui midagi seiskub.",
    what: {
      title: "Mis on n8n",
      text: "Tööriist, mis ühendab kõik süsteemid, millel on API: CRM-i, e-posti, raamatupidamise, tabelid ja AI-mudelid. See võib töötada sinu enda serveris. Siis ei maksa sa iga ülesande eest eraldi ja andmed jäävad sinna, kuhu ise valid.",
      fits: ["Protsess käib läbi mitme tööriista", "Ülesandeid on kuus nii palju, et ülesandepõhine hind läheb kalliks", "Andmed peavad jääma ELi", "Protsessis on palju reegleid ja erandeid"],
      notFits: ["Vaja on ainult üht lihtsat ühendust kahe rakenduse vahel ja Zapieri või Make'iga saab selle kiiremini tehtud", "Tööriistas, mida juba kasutad, on see võimalus olemas"],
    },
    doTitle: "Mida me n8n-iga teeme",
    do: [
      { title: "Töövood ühe protsessi jaoks", text: "Sissetulevast kirjast või vormist CRM-i, raamatupidamisse ja vastuseni. Arvestame ka erandeid, mille peale lihtne automaatika katki läheb." },
      { title: "AI-sammud", text: "AI, mis loeb töövoo sees kirju, PDF-e ja jooniseid. Inimene kontrollib tulemust seal, kus see on oluline." },
      { title: "Majutus ELis", text: "n8n töötab ELi serveris. Teeme varukoopiad ja uuendused ning saame teavituse, kui mõni töövoog ebaõnnestub." },
      { title: "Üleminek Zapierist või Make'ist", text: "Olemasolevad automaatikad kolime n8n-i, kui ülesannete hulk teeb ülesandepõhise hinna kalliks." },
      { title: "Olemasolevate töövoogude parandamine", text: "Aeglased, ebaõnnestuvad või dokumenteerimata töövood vaatame üle ja ehitame ümber." },
      { title: "Dokumentatsioon", text: "Iga töövoog on kirjeldatud: mis selle käivitab, mida see teeb ja mida teha, kui see seiskub." },
    ],
    faq: [
      { q: "Kas valida oma server või n8n Cloud?", a: "Mõlemad sobivad. Oma ELi serveris on suur hulk ülesandeid odavam ja andmed jäävad sinu kontrolli alla. n8n Cloud vajab vähem hooldust. Pärast kavandit soovitame, kumb sulle sobib." },
      { q: "Kellele töövood kuuluvad?", a: "Sulle, kui töö on tasutud. Need töötavad sinu n8n-is või serveris, mida haldame sinu eest, ja võid need igal ajal eksportida." },
      { q: "Mis saab, kui midagi läheb katki?", a: "Saame teavituse, parandame vea ja ütleme sulle, mis juhtus. See kuulub igakuise toe juurde." },
      { q: "Kas vajame enda poolelt arendajat?", a: "Ei. Piisab ühest inimesest, kes protsessi tunneb ja saab meie küsimustele vastata." },
    ],
  },

  "revops-agency-europe": {
    meta: {
      title: "RevOpsi agentuur Eestis ja Euroopas | Revenue operations | Alopex Digital",
      description: "Revenue operations Euroopa ettevõtetele: üks protsess ja samad andmed turundusele, müügile ja klienditeenindusele. Kaardistame, kuidas päringust saab klient, ja ehitame selle põhjal CRM-i, automaatika ja aruanded.",
    },
    crumb: "Revenue operations · Euroopa",
    title: "Revenue operations Euroopa ettevõtetele",
    lead: "Revenue operations tähendab, et turundus, müük ja klienditeenindus töötavad samade andmete ja sama protsessiga. Kaardistame, kuidas su ettevõttes päringust saab klient, ja ehitame CRM-i, automaatika ja aruanded, mis seda koostööd toetavad.",
    what: {
      title: "Mida RevOps tähendab praktikas",
      text: "Ükski päring ei jää vastuseta, iga pakkumise järel küsitakse üle ja juhtkond näeb samu numbreid mis müügitiim. Selleks ei ole tavaliselt vaja uut tööriista. Piisab, kui olemasolevad omavahel ühendada.",
      fits: ["Päringud tulevad mitmest kanalist ja osa läheb kaduma", "Pakkumised saadetakse, aga keegi ei küsi järele", "Müüginumbreid peetakse tabelites", "Turundus ja müük ei ole ühel meelel, mis toimib"],
      notFits: ["Sul on üks müügikanal ja käputäis kliente", "Tegelik probleem on toode või hind, mitte protsess"],
    },
    doTitle: "Mida me ehitame",
    do: [
      { title: "Protsessi kaart", text: "Kuidas päringust saab täna klient, kus see ootab ja kus kaduma läheb." },
      { title: "Üks CRM kõigi kanalite jaoks", text: "Veebileht, e-post, telefon ja messid ühes müügitorus, etappidega, milles tiim on kokku leppinud." },
      { title: "Järeltegevused, mis käivad ise", text: "Meeldetuletused ja kirjad pärast iga pakkumist, nii et ükski pakkumine ei unune." },
      { title: "Uute klientide leidmine", text: "Õigete ettevõtete ja kontaktide nimekirjad ning esimesed kirjad nende emakeeles." },
      { title: "Aruanded igal hommikul", text: "Müüginumbrid otse CRM-ist, mitte tabelist, mida keegi käsitsi uuendab." },
      { title: "Tehingust arveni", text: "Kui tehing on võidetud, algavad arve ja järgmised sammud ise." },
    ],
    faq: [
      { q: "Kas vajame RevOpsi tiimi?", a: "Ei. Meie seadistame protsessi ja süsteemid. Sinu poolel vastutab nende eest üks inimene." },
      { q: "Millist CRM-i kasutate?", a: "Sageli GoHighLevelit, aga töötame ka CRM-iga, mis sul juba on, kui see teeb oma töö ära." },
      { q: "Kuidas tulemust näeme?", a: "Enne ehitust lepime kokku kaks või kolm numbrit, näiteks vastamisaja või selle, kui paljude pakkumiste järel küsitakse üle, ja jälgime neid aruandes." },
      { q: "Kus te töötate?", a: "Asume Eestis ja töötame ettevõtetega Eestis, Poolas, Soomes, Rootsis ja Taanis." },
    ],
  },
};
