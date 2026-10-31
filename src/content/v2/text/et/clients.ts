// Klientide tekstid (ET). Võtmed ja süsteemide järjekord peavad vastama CLIENT_DATA-le.
import type { ClientText } from "../types";

export const clients: Record<string, ClientText> = {
  packtailor: {
    name: "Packtailor",
    industry: "Pakendid · EL",
    status: "Klient alates 2026",
    title: "Uute brändide leidmisest nende vastusteni, ühes süsteemis",
    result: "Iga kontakt on enne kampaaniat kontrollitud ja igale vastusele vastatakse kliendi keeles.",
    systems: [
      { title: "Kontaktide leidmine", before: "Kontakte koguti käsitsi ja paljud kirjad põrkusid tagasi.", built: "Otsing ja kaardid leiavad brändid. Süsteem kontrollib iga kodulehte, kas bränd pakendab kottidesse, lisab kontaktisikud ja kontrollib iga e-posti aadressi.", now: "Kampaaniatesse jõuavad ainult kontrollitud ja sobivad kontaktid." },
      { title: "Müügipostkast AI vastustega", before: "Viie postkasti vastused loeti ja neile vastati käsitsi.", built: "Üks postkast kogu tiimile. Vastused sorteeritakse sisu järgi, vastuse mustand kirjutatakse kliendi keeles ning failid ja fotod jäävad vestlusesse.", now: "Müügiinimene loeb mustandi, parandab ja vajutab „Saada“." },
      { title: "Pakkumiste meeldetuletused", before: "Pakkumised läksid välja ja meeldetuletus sõltus sellest, kas keegi mäletas.", built: "Meeldetuletus igal nädalal samal päeval, kõige rohkem kolm, ka tehingutele, mis tulid telefoni või e-posti teel.", now: "Ükski pakkumine ei jää märkamatult vaikselt seisma." },
      { title: "Loobumised ja puhkusevastused", before: "„Eemaldage mind“ kirjad ja automaatvastused vajasid kellegi tähelepanu.", built: "Loobumised lähevad blokeeringunimekirja ja CRM-i. Puhkusevastuse saatjale läheb tagasituleku päeval lühike tervituskiri.", now: "Kõik toimub ilma, et keegi peaks sekkuma." },
    ],
  },
  woodnest: {
    name: "Woodnest",
    industry: "Saunad · eksport",
    status: "Klient alates 2026",
    title: "Uued edasimüüjad üle Euroopa, kirjad nende emakeeles",
    result: "1523 ettevõttega võeti ühendust. Umbes iga 11. vastas „huvitatud“.",
    systems: [
      { title: "Edasimüüjate nimekirjad riigiti", before: "Polnud nimekirja, kes igal turul saunu müüb.", built: "Uuritud nimekirjad edasimüüjatest ja tootjatest igas riigis, igaühel otsustaja ja kontrollitud e-post.", now: "Kohaliku keele nimekirjad Põhjamaadele, Baltikumile, Poolale ja Saksamaale." },
      { title: "Kampaaniad kohalikus keeles", before: "Kõigile läks sama ingliskeelne kiri ja vähesed vastasid.", built: "Kampaaniad iga turu keeles ja meeldetuletused samas kirjavahetuses.", now: "Väikesed kohaliku keele nimekirjad annavad parima tulemuse." },
      { title: "Vastuste paneel ja teavitused", before: "Vastused olid laiali kaheksas postkastis.", built: "Kiire paneel, kus on kõik vastused ühes kohas, ja e-kiri müügile iga positiivse vastuse kohta.", now: "Paneel avaneb alla sekundiga." },
    ],
  },
  ovision: {
    name: "Ovision",
    industry: "Trükk ja meened · Eesti",
    status: "Töös",
    title: "Arved, tootmine ja oma CRM",
    result: "Arve võtab sekundeid, mitte 10–15 minutit.",
    systems: [
      { title: "Arved Merit Aktivas", before: "Kliendi andmed, registrikoodid ja tooteread trükiti käsitsi.", built: "Kui tellimus jõuab staatusesse „ootab arvet“, tehakse arve äriregistri andmete ja õige viitenumbriga.", now: "Arved valmivad sekunditega ja lähevad õigel ajal välja." },
      { title: "Tootmiskaardid", before: "Tootmist jälgiti peast ja kujundusfailid olid e-kirjades.", built: "Iga toote jaoks kaart tähtaja ja trükiviisiga. Kujundusfailid salvestuvad SharePointi ja arveldamine algab, kui viimane toode on valmis.", now: "Midagi ei unune." },
      { title: "Pakkumised ja kalkulatsioonid ühes kohas", before: "Kulud arvutati tabelites ja pakkumised tehti teises tööriistas.", built: "Kalkulatsioon ja pakkumine tehakse ühes kohas, tootekataloogi põhjal.", now: "Pakkumine võtab ühe kliki, mitte tunni." },
      { title: "Oma CRM, ülevaade ja AI assistent", before: "Müük oli Trellos ja makseid kontrolliti käsitsi.", built: "Neile ehitatud CRM ja reaalajas ülevaade. Makstud arved liiguvad ise staatusesse „makstud“ ja assistent oskab tehinguid etappide vahel liigutada.", now: "Ülevaade töötab, CRM on ehitamisel." },
      { title: "Digiteekaart ja toetus", before: "Toetuse taotlemiseks oli vaja plaani.", built: "Digiteekaart ja arendustoetuse taotlus.", now: "Taotlus esitatud." },
    ],
  },
  gemoss: {
    name: "Gemoss",
    industry: "Kohvimasinad · Eesti",
    status: "Töös",
    title: "Müüginumbrid, mida tiim usaldab",
    result: "Aruanne igal hommikul, mitte kord kuus Excelis.",
    systems: [
      { title: "Õiglased müüginumbrid igal hommikul", before: "Igakuine Excel arvestas vastamisaega ka öösel ja nädalavahetusel ning palk sõltus sellest.", built: "Vastamisaeg arvestatakse ainult tööajas ja iga müügiinimene saab igapäevase aruande.", now: "Palk põhineb päris numbritel." },
      { title: "Uudiskirjad CRM-ist", before: "Uudiskirjad saadeti eraldi tööriistast.", built: "Uudiskirjad lähevad välja CRM-ist ja kohale jõudmist kontrollitakse.", now: "Kliendid ja kampaaniad on ühes kohas." },
    ],
  },
  security: {
    name: "Dial Security",
    industry: "Turvateenused · Eesti",
    status: "Töös",
    title: "Uued ehitusplatsid leitud enne, kui konkurendid neid näevad",
    result: "Uued platsid ilmuvad ülevaatesse ise.",
    systems: [
      { title: "Ehitusplatside radar", before: "Uued platsid leiti juhuslikult, sageli alles siis, kui konkurent oli lepingu juba sõlminud.", built: "Süsteem kontrollib ehitisregistrit ja ehitusuudiseid ning leiab platsid, kus turvafirmat veel pole.", now: "Värske nimekiri, ilma otsimata." },
      { title: "Kirjad ja kõneülesanded", before: "Üldised kirjad ja järeltegevus puudus.", built: "Isiklikud kirjad turvajuhi nimel ja kõneülesanne, kui keegi ei vasta.", now: "Iga platsiga võetakse ühendust." },
      { title: "Müügi ülevaade", before: "Platsidest ja kõnedest puudus ülevaade.", built: "Ülevaade iga platsi staatuse ja kõnede tulemustega ning nupp, millega plats kirjade nimekirja lisada.", now: "Üks ekraan kogu müügitiimile." },
    ],
  },
  moso: {
    name: "MOSO Bambuskeskus",
    industry: "Ehitusmaterjalid · Eesti",
    status: "Pooleli",
    title: "Uus koduleht, päringud otse CRM-i",
    result: "Prototüüp on kinnitatud. Järgmisena käivitus.",
    systems: [
      { title: "Kliendi teekond ja bränd", before: "Polnud ühist pilti sellest, kuidas kliendid valivad ja ostavad.", built: "Kliendi teekonna kaart, brändilaud ja turunduse ülevaatus.", now: "Plaan iga lehe jaoks." },
      { title: "Uus koduleht", before: "Vana koduleht, mida oli raske muuta.", built: "Uus koduleht, mida tiim saab ise muuta, ja plaan, et vanad lingid edasi töötaksid.", now: "Tiim uuendab lehti ilma abita." },
      { title: "Päringud CRM-i", before: "Päringud tulid e-postiga ja keegi neid ei jälginud.", built: "E-posti ja vormi päringutest saavad CRM-is tehingud.", now: "Plaanis pärast käivitust." },
    ],
  },
  spetselektroodi: {
    name: "Spetselektroodi",
    industry: "Tööstustarvikud · Eesti",
    status: "Pooleli",
    title: "Digiteekaart, toetus ja siis uued kliendid",
    result: "Kolm etappi, osaliselt toetuse rahastusel.",
    systems: [
      { title: "Teekaart ja toetus", before: "Ideid palju, aga polnud plaani ega eelarvet kõigeks.", built: "Digiteekaart ja arendustoetuse taotlus.", now: "Pooleli." },
      { title: "Uued kliendid äriregistrist", before: "Uued kliendid tulid ainult soovituste kaudu.", built: "Teine etapp: äriregistrist ettevõtete leidmine, kes sarnanevad nende parimatele klientidele.", now: "Plaanis." },
    ],
  },
  swa: {
    name: "SWA Poland",
    industry: "Üliõpilaste värbamine · Poola",
    status: "Töös",
    title: "Värbamiskampaaniad kolmes keeles",
    result: "Värbajad saavad ainult sobivad kandidaadid, sildistatud ja helistamiseks valmis.",
    systems: [
      { title: "Kuulutused ja vormid igale linnale", before: "Vormid kogusid palju inimesi, kes ei sobinud.", built: "Meta kuulutused igale linnale ja vormid, mis küsivad õigeid küsimusi. Eelarve liigub linnadesse, mis toimivad.", now: "Värbajateni jõuavad ainult sobivad kandidaadid." },
      { title: "SMS-ide jada A/B testidega", before: "Igale kandidaadile tuletati käsitsi meelde.", built: "SMS-ide jada A/B testidega ja teavitus värbajale, kui keegi vastab.", now: "Valmis iga uue kampaania jaoks." },
      { title: "Viisaprotsess", before: "Viisa sammud käisid e-posti teel.", built: "Vorm, suunamine, kalendrid ja kirjad viisaprotsessi igaks sammuks.", now: "Plaanis." },
    ],
  },
  kastoram: {
    name: "Kastoram",
    industry: "Puitkaubaalused · Eesti",
    status: "Töös",
    title: "Koduleht, millega saab rääkida",
    result: "Päringud tulevad terviklikult ja on kohe hinnastamiseks valmis.",
    systems: [
      { title: "Koduleht häälpäringutega", before: "Telefoni ja e-posti päringutest jäid sageli mõõdud ja kogused puudu.", built: "Uus koduleht, kus klient saab tellimuse häälega kirjeldada. See jõuab kohale tervikliku ja korrastatud päringuna.", now: "Töös." },
      { title: "Pakkumiste tööriist", before: "Pakkumised tehti käsitsi Excelis.", built: "Pakkumiste tööriist ja CRM, pakutud järgmise etapina.", now: "Pakkumine saadetud." },
    ],
  },
  koduaken: {
    name: "Koduaken",
    industry: "Aknad · Eesti",
    status: "Töös",
    title: "Iga pakkumine saab meeldetuletuse",
    result: "16 % rohkem pakkumisi muutub tellimuseks: 9,5 %-lt 11,1 %-le.",
    systems: [
      { title: "Pakkumiste meeldetuletused", before: "Pakkumised saadeti ja keegi ei küsinud järele.", built: "Isiklikud järelkirjad õigel ajal ja ülesanne müügile, kui klient vaikib.", now: "Umbes 388 pakkumist kuus. Neist 16 % rohkem muutub tellimuseks, ilma uute töötajateta." },
    ],
  },
  consolis: {
    name: "Consolis",
    industry: "Betoonelemendid · Baltikum",
    status: "Pilootprojekt",
    title: "Kogusetabelid hankemudelitest ja joonistest",
    result: "73 seinapaneeli puhul 98,9 % kattuvus inseneri enda tabeliga.",
    systems: [
      { title: "Kogused hangete jaoks", before: "Insener trükkis iga elemendi Excelisse, umbes 12 tundi hanke kohta.", built: "Tarkvara loeb 3D-mudeleid ja PDF-jooniseid, täidab tehase enda põhja ja märgib kahtlased read kollasega.", now: "Piloodis kontrollis insener tabelit, mitte ei trükkinud seda." },
    ],
  },
};
