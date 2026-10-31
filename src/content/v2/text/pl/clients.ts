// Teksty klientów (PL). Klucze i kolejność systemów muszą odpowiadać CLIENT_DATA.
import type { ClientText } from "../types";

export const clients: Record<string, ClientText> = {
  packtailor: {
    name: "Packtailor",
    industry: "Opakowania · UE",
    status: "Klient od 2026",
    title: "Od szukania nowych marek po odpowiedzi na ich maile, w jednym systemie",
    result: "Każdy kontakt jest sprawdzony przed kampanią, a każda odpowiedź idzie w języku klienta.",
    systems: [
      { title: "Szukanie kontaktów", before: "Kontakty zbierano ręcznie, a wiele maili wracało.", built: "Wyszukiwarka i mapy znajdują marki. System sprawdza każdą stronę, czy marka pakuje w saszetki, dodaje osoby kontaktowe i weryfikuje każdy adres e-mail.", now: "Do kampanii trafiają tylko sprawdzone, pasujące kontakty." },
      { title: "Skrzynka sprzedażowa z odpowiedziami AI", before: "Odpowiedzi z pięciu skrzynek czytano i odpisywano ręcznie.", built: "Jedna skrzynka dla całego zespołu. Odpowiedzi są segregowane według treści, szkic odpowiedzi powstaje w języku klienta, a pliki i zdjęcia zostają w wątku.", now: "Handlowiec czyta szkic, poprawia i klika „Wyślij”." },
      { title: "Przypomnienia o ofertach", before: "Oferty wychodziły, a przypomnienia zależały od tego, czy ktoś pamiętał.", built: "Przypomnienie co tydzień w ten sam dzień, maksymalnie trzy, także dla transakcji, które przyszły telefonem lub mailem.", now: "Żadna oferta nie utknie niezauważona." },
      { title: "Rezygnacje i odpowiedzi urlopowe", before: "Maile „usuńcie mnie” i autoodpowiedzi wymagały czyjejś uwagi.", built: "Rezygnacje trafiają na listę blokad i do CRM. Osoba z odpowiedzią urlopową dostaje w dniu powrotu krótki mail powitalny.", now: "Wszystko dzieje się bez niczyjego udziału." },
    ],
  },
  woodnest: {
    name: "Woodnest",
    industry: "Sauny · eksport",
    status: "Klient od 2026",
    title: "Nowi dystrybutorzy w całej Europie, maile w ich własnym języku",
    result: "Kontakt z 1523 firmami. Mniej więcej co 11. odpowiedziała „zainteresowani”.",
    systems: [
      { title: "Listy dystrybutorów dla każdego kraju", before: "Nie było listy firm, które sprzedają sauny na danym rynku.", built: "Sprawdzone listy dystrybutorów i producentów w każdym kraju, z osobą decyzyjną i zweryfikowanym mailem.", now: "Listy w lokalnym języku dla krajów nordyckich, bałtyckich, Polski i Niemiec." },
      { title: "Kampanie w lokalnym języku", before: "Ten sam angielski mail szedł do wszystkich i mało kto odpowiadał.", built: "Kampanie w języku każdego rynku, a przypomnienia w tym samym wątku.", now: "Małe listy w lokalnym języku dają najlepsze wyniki." },
      { title: "Panel odpowiedzi i powiadomienia", before: "Odpowiedzi były rozrzucone po ośmiu skrzynkach.", built: "Szybki panel ze wszystkimi odpowiedziami w jednym miejscu i mail do handlowca przy każdej pozytywnej odpowiedzi.", now: "Panel otwiera się w mniej niż sekundę." },
    ],
  },
  ovision: {
    name: "Ovision",
    industry: "Druk i gadżety reklamowe · Estonia",
    status: "Działa",
    title: "Faktury, produkcja i własny CRM",
    result: "Faktura zajmuje sekundy zamiast 10–15 minut.",
    systems: [
      { title: "Faktury w Merit Aktiva", before: "Dane klienta, numery rejestrowe i pozycje wpisywano ręcznie.", built: "Gdy zamówienie trafia do etapu „czeka na fakturę”, faktura powstaje z danymi z rejestru firm i właściwym numerem referencyjnym.", now: "Faktury powstają w kilka sekund i wychodzą na czas." },
      { title: "Karty produkcyjne", before: "Produkcję śledzono z pamięci, a projekty graficzne leżały w mailach.", built: "Karta dla każdego produktu z terminem i metodą druku. Projekty zapisują się w SharePoint, a fakturowanie startuje, gdy ostatni produkt jest gotowy.", now: "Nic nie ginie." },
      { title: "Oferty i kalkulacje w jednym miejscu", before: "Koszty liczono w arkuszach, a oferty robiono w innym narzędziu.", built: "Kalkulacja i oferta powstają w jednym miejscu, na podstawie katalogu produktów.", now: "Oferta to jedno kliknięcie zamiast godziny." },
      { title: "Własny CRM, podsumowanie i asystent AI", before: "Sprzedaż była w Trello, a płatności sprawdzano ręcznie.", built: "CRM zbudowany dla nich i podsumowanie na żywo. Opłacone faktury same przechodzą do „opłacone”, a asystent przesuwa transakcje między etapami.", now: "Podsumowanie działa, CRM jest w budowie." },
      { title: "Mapa cyfryzacji i dotacja", before: "Do wniosku o dotację potrzebny był plan.", built: "Mapa cyfryzacji i wniosek o dotację na wdrożenie.", now: "Wniosek złożony." },
    ],
  },
  gemoss: {
    name: "Gemoss",
    industry: "Ekspresy do kawy · Estonia",
    status: "Działa",
    title: "Wyniki sprzedaży, którym zespół ufa",
    result: "Raport każdego ranka zamiast miesięcznego Excela.",
    systems: [
      { title: "Uczciwe wyniki sprzedaży każdego ranka", before: "Miesięczny Excel liczył czas odpowiedzi także w nocy i w weekendy, a od tego zależała pensja.", built: "Czas odpowiedzi liczony tylko w godzinach pracy i codzienny raport dla każdego handlowca.", now: "Pensja opiera się na prawdziwych liczbach." },
      { title: "Newslettery z CRM", before: "Newslettery wysyłano z osobnego narzędzia.", built: "Newslettery wychodzą z CRM, ze sprawdzaniem doręczenia.", now: "Klienci i kampanie są w jednym miejscu." },
    ],
  },
  security: {
    name: "Dial Security",
    industry: "Usługi ochrony · Estonia",
    status: "Działa",
    title: "Nowe budowy znalezione, zanim zobaczy je konkurencja",
    result: "Nowe budowy same pojawiają się w podsumowaniu.",
    systems: [
      { title: "Radar budów", before: "Nowe budowy znajdowano przypadkiem, często dopiero po podpisaniu umowy przez konkurenta.", built: "System sprawdza rejestr budowlany i wiadomości branżowe i znajduje budowy, które nie mają jeszcze firmy ochroniarskiej.", now: "Świeża lista, bez szukania." },
      { title: "Maile i zadania telefoniczne", before: "Ogólne maile i brak przypomnień.", built: "Osobiste maile w imieniu kierownika ochrony, a potem zadanie telefoniczne, jeśli nikt nie odpowie.", now: "Z każdą budową jest nawiązany kontakt." },
      { title: "Podsumowanie sprzedaży", before: "Brak przeglądu budów i rozmów.", built: "Podsumowanie ze statusem każdej budowy, wynikami rozmów i przyciskiem, który dodaje budowę do wysyłki maili.", now: "Jeden ekran dla całego zespołu sprzedaży." },
    ],
  },
  moso: {
    name: "MOSO Bambuskeskus",
    industry: "Materiały budowlane · Estonia",
    status: "W toku",
    title: "Nowa strona, a zapytania prosto do CRM",
    result: "Prototyp zatwierdzony. Następny krok to start.",
    systems: [
      { title: "Ścieżka klienta i marka", before: "Brak wspólnego obrazu tego, jak klienci wybierają i kupują.", built: "Mapa ścieżki klienta, brand board i przegląd marketingu.", now: "Plan dla każdej podstrony." },
      { title: "Nowa strona", before: "Stara strona, którą trudno było edytować.", built: "Nowa strona, którą zespół edytuje sam, i plan, żeby stare linki dalej działały.", now: "Zespół aktualizuje strony bez pomocy." },
      { title: "Zapytania do CRM", before: "Zapytania przychodziły mailem i nikt ich nie śledził.", built: "Zapytania z maila i formularzy stają się transakcjami w CRM.", now: "Zaplanowane po starcie." },
    ],
  },
  spetselektroodi: {
    name: "Spetselektroodi",
    industry: "Artykuły przemysłowe · Estonia",
    status: "W toku",
    title: "Mapa cyfryzacji, dotacja, a potem nowi klienci",
    result: "Trzy etapy, częściowo finansowane z dotacji.",
    systems: [
      { title: "Mapa cyfryzacji i dotacja", before: "Dużo pomysłów, ale brak planu i budżetu na wszystkie.", built: "Mapa cyfryzacji i wniosek o dotację na wdrożenie.", now: "W toku." },
      { title: "Nowi klienci z rejestru firm", before: "Nowi klienci przychodzili tylko z polecenia.", built: "Etap 2: szukanie w rejestrze firm podobnych do ich najlepszych klientów.", now: "Zaplanowane." },
    ],
  },
  swa: {
    name: "SWA Poland",
    industry: "Rekrutacja studentów · Polska",
    status: "Działa",
    title: "Kampanie rekrutacyjne w trzech językach",
    result: "Rekruterzy dostają tylko pasujących kandydatów, oznaczonych i gotowych do telefonu.",
    systems: [
      { title: "Reklamy i formularze dla każdego miasta", before: "Formularze zbierały wiele osób, które nie spełniały wymagań.", built: "Reklamy Meta dla każdego miasta i formularze z właściwymi pytaniami. Budżet przechodzi do miast, które działają.", now: "Do rekruterów trafiają tylko pasujący kandydaci." },
      { title: "Seria SMS-ów z testami A/B", before: "O każdym kandydacie przypominano ręcznie.", built: "Seria SMS-ów z testami A/B i powiadomienie dla rekrutera, gdy ktoś odpowie.", now: "Gotowe do użycia w każdej nowej kampanii." },
      { title: "Proces wizowy", before: "Kroki wizowe załatwiano mailem.", built: "Formularz, przekierowania, kalendarze i maile dla każdego kroku procesu wizowego.", now: "Zaplanowane." },
    ],
  },
  kastoram: {
    name: "Kastoram",
    industry: "Palety drewniane · Estonia",
    status: "Działa",
    title: "Strona, z którą można porozmawiać",
    result: "Zapytania przychodzą kompletne i gotowe do wyceny.",
    systems: [
      { title: "Strona z zapytaniami głosowymi", before: "W zapytaniach telefonicznych i mailowych często brakowało wymiarów i ilości.", built: "Nowa strona, na której klient opisuje zamówienie głosem. Dociera ono jako kompletne, uporządkowane zapytanie.", now: "Działa." },
      { title: "Narzędzie do ofert", before: "Oferty robiono ręcznie w Excelu.", built: "Narzędzie do ofert i CRM, zaproponowane jako kolejny etap.", now: "Oferta wysłana." },
    ],
  },
  koduaken: {
    name: "Koduaken",
    industry: "Okna · Estonia",
    status: "Działa",
    title: "Każda oferta dostaje przypomnienie",
    result: "16% więcej ofert zamienia się w zamówienia: z 9,5% do 11,1%.",
    systems: [
      { title: "Przypomnienia o ofertach", before: "Oferty wysyłano i nikt o nie nie dopytywał.", built: "Osobiste maile przypominające we właściwym momencie i zadanie dla handlowca, gdy klient milczy.", now: "Około 388 ofert miesięcznie. 16% więcej z nich kończy się zamówieniem, bez nowych pracowników." },
    ],
  },
  consolis: {
    name: "Consolis",
    industry: "Prefabrykaty betonowe · kraje bałtyckie",
    status: "Pilotaż",
    title: "Zestawienia ilości z modeli przetargowych i rysunków",
    result: "98,9% zgodności z tabelą inżyniera dla 73 paneli ściennych.",
    systems: [
      { title: "Ilości do przetargów", before: "Inżynier wpisywał każdy element do Excela, około 12 godzin na przetarg.", built: "Oprogramowanie czyta modele 3D i rysunki PDF, wypełnia szablon fabryki i zaznacza wątpliwe wiersze na żółto.", now: "W pilotażu inżynier sprawdzał tabelę zamiast ją przepisywać." },
    ],
  },
};
