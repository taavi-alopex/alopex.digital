// Search pages (GoHighLevel, GoHighLevel expert, n8n, RevOps) in Polish.
import type { PlatformId, PlatformLabels, PlatformPage } from "../../platforms";

export const labels: PlatformLabels = {
  fits: "Dobrze się sprawdzi, gdy",
  notFits: "Nie jest najlepszym wyborem, gdy",
  cases: "Zbudowane dla naszych klientów",
  allWork: "Wszystkie nasze prace",
  faq: "Najczęstsze pytania",
};

export const pages: Record<PlatformId, PlatformPage> = {
  "gohighlevel-agency-europe": {
    meta: {
      title: "Agencja GoHighLevel w Polsce i Europie | Alopex Digital",
      description: "Wdrażamy i utrzymujemy GoHighLevel dla firm w Polsce, Estonii i całej Europie: lejki sprzedaży, kalendarze, e-maile i SMS-y, przeniesienie danych ze starego CRM i połączenia z systemami księgowymi.",
    },
    crumb: "Agencja GoHighLevel · Europa",
    title: "GoHighLevel skonfigurowany dla firm z Europy",
    lead: "GoHighLevel to CRM, w którym e-mail, SMS, kalendarze i automatyzacja są w jednym miejscu. Konfigurujemy go pod to, jak Twój zespół naprawdę sprzedaje, przenosimy dane i łączymy go z narzędziami, których już używasz.",
    what: {
      title: "Czym jest GoHighLevel",
      text: "Jeden system na kontakty, szanse sprzedaży, e-maile, SMS-y, kalendarze rezerwacji, formularze i proste strony. Zastępuje kilka osobnych narzędzi, a cały zespół widzi tę samą historię każdego klienta.",
      fits: ["Kontaktujesz się z wieloma osobami przez e-mail, SMS lub telefon", "Twój zespół umawia rozmowy lub spotkania z klientami", "Chcesz mieć zapytania, szanse i wiadomości w jednym miejscu", "Odchodzisz od arkuszy, Pipedrive albo HubSpot"],
      notFits: ["Potrzebujesz ERP do magazynu i produkcji", "Twoja sprzedaż zależy od mocno dostosowanego CRM dla dużych firm", "Sprzedaje tylko jedna osoba i arkusz w zupełności wystarcza"],
    },
    doTitle: "Co robimy z GoHighLevel",
    do: [
      { title: "Konfiguracja pod Twoją sprzedaż", text: "Lejki, etapy, przypomnienia, kalendarze i szablony e-maili dopasowane do tego, jak Twój zespół naprawdę sprzedaje." },
      { title: "Przeniesienie danych", text: "Kontakty, szanse i notatki z Pipedrive, HubSpot, Salesforce lub Excela, sprawdzone razem z Tobą przed przejściem." },
      { title: "Połączenia z innymi narzędziami", text: "Faktury do programu księgowego, zapytania ze strony, dane z ERP i do ERP. Tam, gdzie GoHighLevel nie ma gotowego połączenia, budujemy je w n8n." },
      { title: "Każda skrzynka w CRM", text: "Alopex Email Sync, nasza aplikacja z Marketplace, synchronizuje z GoHighLevel w obie strony każdą skrzynkę IMAP/SMTP, nie tylko Gmaila i Outlooka." },
      { title: "Ustawienia RODO", text: "Pola zgód, obsługa rezygnacji i umowy powierzenia, ustawione od początku i opisane." },
      { title: "Szkolenie i wsparcie", text: "Szkolenie dla zespołu po polsku, angielsku lub estońsku i comiesięczne spotkanie, gdy system już działa." },
    ],
    faq: [
      { q: "Czy GoHighLevel można używać zgodnie z RODO?", a: "Tak, jeśli jest poprawnie skonfigurowany: zgody, obsługa rezygnacji i umowa powierzenia. Ustawiamy to i opisujemy." },
      { q: "Czy przeniesiecie nasze dane z innego CRM?", a: "Tak. Przenosimy kontakty, szanse i notatki z Pipedrive, HubSpot, Salesforce lub arkuszy i sprawdzamy wynik razem z Tobą przed przejściem." },
      { q: "Czy działa z polskim programem księgowym?", a: "Nie od razu. Łączymy go z systemami księgowymi przez własne integracje. Na rozmowie sprawdzimy, czy Twój program ma API." },
      { q: "Ile trwa wdrożenie?", a: "Zwykle 2–8 tygodni, zależnie od ilości danych i liczby narzędzi do połączenia. Stałą cenę dostajesz po projekcie." },
    ],
  },

  "gohighlevel-expert": {
    meta: {
      title: "Ekspert GoHighLevel | Poprawki, integracje i raporty | Alopex Digital",
      description: "Eksperci GoHighLevel dla konta, które już masz: automatyzacje, które działają źle, raporty, którym nikt nie ufa, i połączenia, które się zatrzymują. Przeglądamy konto, naprawiamy błędy i budujemy to, czego brakuje.",
    },
    crumb: "Ekspert GoHighLevel",
    title: "Więcej z konta GoHighLevel, które już masz",
    lead: "Wiele firm konfiguruje GoHighLevel samodzielnie i potem utyka: automatyzacje uruchamiają się dwa razy, raportom nikt nie ufa, a połączenia się zatrzymują. Przeglądamy konto, naprawiamy błędy i budujemy to, czego brakuje.",
    what: {
      title: "Kiedy wezwać eksperta GoHighLevel",
      text: "GoHighLevel potrafi bardzo dużo, dlatego łatwo o bałagan na koncie. Przegląd zwykle pokazuje kilka poprawek, które dają największą różnicę.",
      fits: ["Automatyzacje uruchamiają się dwa razy, zapętlają się albo zatrzymują bez ostrzeżenia", "Liczby sprzedaży w GoHighLevel nie zgadzają się z rzeczywistością", "Potrzebujesz połączenia, którego GoHighLevel nie oferuje", "Zespół pracuje obok CRM, a nie w nim"],
      notFits: ["Potrzebujesz tylko prostego lejka i kalendarza rezerwacji", "Oficjalne poradniki GoHighLevel już opisują Twój przypadek"],
    },
    doTitle: "Co robimy na Twoim koncie",
    do: [
      { title: "Przegląd konta", text: "Sprawdzamy lejki, automatyzacje, pola i połączenia, i mówimy, co naprawić najpierw." },
      { title: "Naprawa automatyzacji", text: "Automatyzacje, które działają źle, przebudowujemy i testujemy na prawdziwych kontaktach, zanim znów ruszą." },
      { title: "Raporty, którym można ufać", text: "Pulpity i poranne raporty z liczbami sprzedaży, które zgadzają się z tym, co naprawdę się wydarzyło." },
      { title: "Integracje", text: "Połączenia z księgowością, ERP, formularzami na stronie i innymi narzędziami, zbudowane na API GoHighLevel i w n8n." },
      { title: "Nasze własne aplikacje", text: "Gdy GoHighLevel czegoś nie potrafi, budujemy to sami. Alopex Email Sync to jedna z naszych aplikacji w Marketplace." },
      { title: "Szkolenie", text: "Twój zespół uczy się zmieniać rzeczy samodzielnie, więc nie musi czekać na nas." },
    ],
    faq: [
      { q: "Czy możecie pracować na naszym obecnym koncie?", a: "Tak. Pracujemy na Twoim koncie z własnym użytkownikiem i zapisujemy każdą zmianę." },
      { q: "Czy musimy podpisać długą umowę?", a: "Nie. Możesz zacząć od przeglądu i ustalonej listy poprawek. Comiesięczne wsparcie jest opcjonalne." },
      { q: "Ile kosztuje przegląd?", a: "Przegląd to etap projektu: niewielka stała opłata ustalona przed startem. Jeśli potem budujesz z nami, odejmujemy ją od ceny wdrożenia." },
      { q: "Czy konfigurujecie też nowe konta?", a: "Tak. Zobacz naszą stronę o wdrożeniu GoHighLevel, jak zaczynamy nowe konto." },
    ],
  },

  "n8n-automation-agency": {
    meta: {
      title: "Agencja automatyzacji n8n | Przepływy na serwerach w UE | Alopex Digital",
      description: "Budujemy przepływy n8n dla prawdziwych procesów firmowych, uruchamiamy je na serwerach w UE i naprawiamy, gdy coś się zatrzyma. CRM, poczta, księgowość, arkusze i AI połączone ze sobą.",
    },
    crumb: "Agencja automatyzacji n8n",
    title: "Automatyzacja w n8n, zbudowana i utrzymywana",
    lead: "n8n to oprogramowanie open source, które przenosi dane między Twoimi narzędziami. Budujemy przepływy n8n dla prawdziwych procesów firmowych, uruchamiamy je na serwerach w UE i dostajemy alert, gdy coś się zatrzyma.",
    what: {
      title: "Czym jest n8n",
      text: "Narzędzie, które łączy każdy system z API: CRM, pocztę, księgowość, arkusze i modele AI. Może działać na Twoim własnym serwerze, więc nie płacisz za każde zadanie, a dane zostają tam, gdzie chcesz.",
      fits: ["Proces przechodzi przez kilka narzędzi", "Zadań w miesiącu jest tyle, że opłata za zadanie robi się droga", "Dane muszą zostać w UE", "Proces ma wiele reguł i wyjątków"],
      notFits: ["To jedno proste połączenie dwóch aplikacji, a Zapier lub Make da się ustawić szybciej", "Narzędzie, którego już używasz, ma tę funkcję wbudowaną"],
    },
    doTitle: "Co robimy z n8n",
    do: [
      { title: "Przepływy dla jednego procesu", text: "Od przychodzącego maila lub formularza do CRM, księgowości i odpowiedzi, razem z przypadkami, na których proste automatyzacje się wywracają." },
      { title: "Kroki z AI", text: "AI, które w przepływie czyta maile, PDF-y i rysunki. Człowiek sprawdza wynik tam, gdzie to ważne." },
      { title: "Hosting w UE", text: "n8n na serwerze w UE, z kopiami zapasowymi, aktualizacjami i alertem, gdy przepływ się nie uda." },
      { title: "Przejście z Zapier lub Make", text: "Istniejące automatyzacje przenosimy do n8n, gdy liczba zadań sprawia, że opłata za zadanie robi się droga." },
      { title: "Naprawa istniejących przepływów", text: "Wolne, zawodne lub nieopisane przepływy przeglądamy i przebudowujemy." },
      { title: "Dokumentacja", text: "Każdy przepływ jest opisany: co go uruchamia, co robi i co zrobić, gdy się zatrzyma." },
    ],
    faq: [
      { q: "Własny serwer czy n8n Cloud?", a: "Oba się sprawdzają. Własny serwer w UE kosztuje mniej przy wielu zadaniach i daje kontrolę nad danymi. n8n Cloud wymaga mniej utrzymania. Polecimy jedno po projekcie." },
      { q: "Do kogo należą przepływy?", a: "Do Ciebie, gdy praca jest opłacona. Działają w Twoim n8n albo na serwerze, który dla Ciebie utrzymujemy, i możesz je w każdej chwili wyeksportować." },
      { q: "Co się dzieje, gdy coś się zepsuje?", a: "Dostajemy alert, naprawiamy to i mówimy Ci, co się stało. To część comiesięcznego wsparcia." },
      { q: "Czy potrzebujemy programisty po naszej stronie?", a: "Nie. Wystarczy jedna osoba, która zna proces i odpowie na nasze pytania." },
    ],
  },

  "revops-agency-europe": {
    meta: {
      title: "Agencja RevOps w Polsce i Europie | Revenue operations | Alopex Digital",
      description: "Revenue operations dla firm z Europy: jeden proces i te same dane dla marketingu, sprzedaży i obsługi klienta. Rozpisujemy, jak zapytanie staje się klientem, i budujemy wokół tego CRM, automatyzację i raporty.",
    },
    crumb: "Revenue operations · Europa",
    title: "Revenue operations dla firm z Europy",
    lead: "Revenue operations oznacza, że marketing, sprzedaż i obsługa klienta pracują na tych samych danych i według tego samego procesu. Rozpisujemy, jak w Twojej firmie zapytanie staje się klientem, i budujemy CRM, automatyzację i raporty, które to utrzymują.",
    what: {
      title: "Co RevOps oznacza w praktyce",
      text: "Żadne zapytanie nie czeka na odpowiedź, każda oferta dostaje przypomnienie, a zarząd widzi te same liczby co zespół sprzedaży. Chodzi mniej o zakup nowego narzędzia, a bardziej o połączenie tych, które już masz.",
      fits: ["Zapytania przychodzą z kilku kanałów i część się gubi", "Oferty są wysyłane, ale nikt o nie nie dopytuje", "Liczby sprzedaży są w arkuszach", "Marketing i sprzedaż nie zgadzają się, co działa"],
      notFits: ["Masz jeden kanał sprzedaży i kilku klientów", "Prawdziwym problemem jest produkt albo cena, a nie proces"],
    },
    doTitle: "Co budujemy",
    do: [
      { title: "Mapa procesu", text: "Jak dziś zapytanie staje się klientem, gdzie czeka i gdzie się gubi." },
      { title: "Jeden CRM dla wszystkich kanałów", text: "Strona, e-mail, telefon i targi w jednym lejku, z etapami, na które zgadza się zespół." },
      { title: "Przypomnienia, które działają same", text: "Przypomnienia i maile po każdej ofercie, żeby żadna nie została zapomniana." },
      { title: "Szukanie nowych klientów", text: "Listy właściwych firm i kontaktów oraz pierwsze maile w ich własnym języku." },
      { title: "Raporty co rano", text: "Liczby sprzedaży prosto z CRM, a nie z arkusza, który ktoś aktualizuje ręcznie." },
      { title: "Od szansy do faktury", text: "Gdy szansa jest wygrana, faktura i kolejne kroki uruchamiają się same." },
    ],
    faq: [
      { q: "Czy potrzebujemy zespołu RevOps?", a: "Nie. My ustawiamy proces i systemy. Po Twojej stronie odpowiada za nie jedna osoba." },
      { q: "Jakiego CRM używacie?", a: "Często GoHighLevel, ale pracujemy też z CRM, który już masz, jeśli dobrze się sprawdza." },
      { q: "Jak zobaczymy efekt?", a: "Przed wdrożeniem ustalamy dwie lub trzy liczby, na przykład czas odpowiedzi albo odsetek ofert z przypomnieniem, i śledzimy je w raporcie." },
      { q: "Gdzie działacie?", a: "Działamy w Estonii i pracujemy z firmami w Estonii, Polsce, Finlandii, Szwecji i Danii." },
    ],
  },
};
