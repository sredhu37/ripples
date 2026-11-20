import type { Lang } from "../i18n";

export type LegalPage = "impressum" | "privacy" | "terms";

export interface Section {
  heading: string;
  paragraphs: string[];
}

export interface PageText {
  title: string;
  sections: Section[];
}

/** Labels for the Impressum details, which come from the API (`GET /api/legal`), not from this file. */
export interface ImpressumLabels {
  name: string;
  address: string;
  email: string;
  phone: string;
  vatId: string;
  missing: string;
}

/**
 * DRAFT texts. Sunny has to approve them before the first family signs up (#224).
 * Legal references in brackets are from the drafter's knowledge and are NOT verified by a lawyer.
 * Impressum details (name, address, phone, VAT ID) are never written here: the repo is public.
 */
export const UPDATED = "2026-11-20";

export const IMPRESSUM_LABELS: Record<Lang, ImpressumLabels> = {
  en: {
    name: "Provider",
    address: "Address",
    email: "Email",
    phone: "Phone",
    vatId: "VAT ID",
    missing: "The provider details are not available right now. Please try again later.",
  },
  de: {
    name: "Anbieter",
    address: "Anschrift",
    email: "E-Mail",
    phone: "Telefon",
    vatId: "Umsatzsteuer-Identifikationsnummer",
    missing:
      "Die Anbieterangaben sind gerade nicht verfügbar. Bitte versuche es später noch einmal.",
  },
  pl: {
    name: "Usługodawca",
    address: "Adres",
    email: "E-mail",
    phone: "Telefon",
    vatId: "Numer VAT",
    missing: "Dane usługodawcy są teraz niedostępne. Spróbuj ponownie później.",
  },
};

export const UPDATED_LABEL: Record<Lang, string> = {
  en: "Last updated",
  de: "Stand",
  pl: "Ostatnia aktualizacja",
};

export const TEXTS: Record<LegalPage, Record<Lang, PageText>> = {
  impressum: {
    en: {
      title: "Legal notice (Impressum)",
      sections: [
        {
          heading: "Information under Section 5 DDG",
          paragraphs: [
            "Ripples is offered by the provider below (Section 5 of the German Digital Services Act, DDG).",
          ],
        },
        {
          heading: "Contact",
          paragraphs: [
            "You can reach us by email. For questions about your data, use the same address (see the privacy policy).",
          ],
        },
      ],
    },
    de: {
      title: "Impressum",
      sections: [
        {
          heading: "Angaben nach § 5 DDG",
          paragraphs: [
            "Ripples wird vom unten genannten Anbieter betrieben (§ 5 Digitale-Dienste-Gesetz, DDG).",
          ],
        },
        {
          heading: "Kontakt",
          paragraphs: [
            "Du erreichst uns per E-Mail. Für Fragen zu deinen Daten nutze dieselbe Adresse (siehe Datenschutzerklärung).",
          ],
        },
      ],
    },
    pl: {
      title: "Dane prawne (Impressum)",
      sections: [
        {
          heading: "Informacje według § 5 DDG",
          paragraphs: [
            "Ripples udostępnia usługodawca wskazany poniżej (§ 5 niemieckiej ustawy o usługach cyfrowych, DDG).",
          ],
        },
        {
          heading: "Kontakt",
          paragraphs: [
            "Możesz napisać do nas e-mailem. W sprawach dotyczących danych użyj tego samego adresu (zobacz politykę prywatności).",
          ],
        },
      ],
    },
  },

  privacy: {
    en: {
      title: "Privacy policy",
      sections: [
        {
          heading: "Who is responsible",
          paragraphs: [
            "The provider named in the legal notice is the controller for your data (Art. 4(7) GDPR).",
          ],
        },
        {
          heading: "What we store",
          paragraphs: [
            "Parent: your email address, and the 6-digit login code we send you (we keep only a scrambled copy, and it expires after 5 minutes).",
            "Kids: for each kid profile a nickname, a villager picture, the language, the sound setting, the badges earned and the lessons you switched off. Please use a nickname, not a real name.",
            "Subscription: the status of your plan and the customer and subscription ids of the payment provider. We never see or store card numbers.",
            "Login cookie: after login we set one cookie so you stay logged in for up to 90 days. It is needed for the login to work. Without an account, the app keeps progress only in your device's browser storage, and nothing is sent to us.",
            "We use no advertising and no tracking or analytics cookies.",
          ],
        },
        {
          heading: "Why, and on what legal basis",
          paragraphs: [
            "To run your account, the login and the kid profiles, and to provide the paid plan: performance of a contract (Art. 6(1)(b) GDPR).",
            "To keep the service secure and to answer your messages: our legitimate interest (Art. 6(1)(f) GDPR).",
            "The login cookie is strictly necessary for the service you asked for, so it needs no separate consent (Section 25(2) No. 2 TDDDG).",
            "Kids' profiles are created and controlled by the parent. The app is meant for children with a parent's involvement (see Art. 8 GDPR).",
          ],
        },
        {
          heading: "Who processes data for us",
          paragraphs: [
            "Google Cloud (Cloud Run, region Frankfurt): runs the app and the API.",
            "Neon (Postgres database, region AWS Frankfurt): stores the data listed above.",
            "Resend: sends the login emails, so it sees your email address.",
            "Stripe (payments outside India) and Razorpay (payments in India): process payments and subscriptions.",
            "We have processing agreements with these providers (Art. 28 GDPR). Some of them are US companies. Where data goes outside the EU, we rely on the transfer safeguards in Art. 44 to 46 GDPR, for example standard contractual clauses. This list is to be confirmed against the signed agreements.",
            "We store your data in Frankfurt, Germany.",
          ],
        },
        {
          heading: "How long we keep it, and deletion",
          paragraphs: [
            "We keep the data while your account exists. Email us and we delete your account with all kid profiles and progress. Login codes expire after 5 minutes.",
            "Payment records may have to be kept longer by us or by the payment provider because of tax law.",
          ],
        },
        {
          heading: "Your rights",
          paragraphs: [
            "You may ask for access, correction, deletion, restriction, a copy of your data, and you may object (Art. 15 to 21 GDPR). Write to the address in the legal notice.",
            "You may complain to a data protection authority (Art. 77 GDPR).",
          ],
        },
      ],
    },
    de: {
      title: "Datenschutzerklärung",
      sections: [
        {
          heading: "Verantwortlicher",
          paragraphs: [
            "Verantwortlich für deine Daten ist der im Impressum genannte Anbieter (Art. 4 Nr. 7 DSGVO).",
          ],
        },
        {
          heading: "Welche Daten wir speichern",
          paragraphs: [
            "Eltern: deine E-Mail-Adresse und der 6-stellige Login-Code, den wir dir schicken (wir speichern nur eine verschlüsselte Fassung, sie läuft nach 5 Minuten ab).",
            "Kinder: pro Kinderprofil ein Spitzname, ein Dorfbewohner-Bild, die Sprache, die Toneinstellung, die verdienten Abzeichen und die Lektionen, die du abgeschaltet hast. Bitte nimm einen Spitznamen, keinen echten Namen.",
            "Abo: der Status deines Tarifs sowie die Kunden- und Abo-Nummern beim Zahlungsanbieter. Kartennummern sehen und speichern wir nie.",
            "Login-Cookie: nach dem Login setzen wir ein Cookie, damit du bis zu 90 Tage angemeldet bleibst. Es ist für den Login nötig. Ohne Konto speichert die App den Fortschritt nur im Browser-Speicher deines Geräts, und es wird nichts an uns gesendet.",
            "Wir nutzen keine Werbung und keine Tracking- oder Analyse-Cookies.",
          ],
        },
        {
          heading: "Zweck und Rechtsgrundlage",
          paragraphs: [
            "Für Konto, Login, Kinderprofile und den bezahlten Tarif: Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO).",
            "Für die Sicherheit des Dienstes und die Beantwortung deiner Nachrichten: unser berechtigtes Interesse (Art. 6 Abs. 1 lit. f DSGVO).",
            "Das Login-Cookie ist für den von dir gewünschten Dienst unbedingt erforderlich und braucht keine Einwilligung (§ 25 Abs. 2 Nr. 2 TDDDG).",
            "Kinderprofile werden von den Eltern angelegt und verwaltet. Die App ist für Kinder gedacht, mit Beteiligung der Eltern (siehe Art. 8 DSGVO).",
          ],
        },
        {
          heading: "Auftragsverarbeiter",
          paragraphs: [
            "Google Cloud (Cloud Run, Region Frankfurt): betreibt die App und die API.",
            "Neon (Postgres-Datenbank, Region AWS Frankfurt): speichert die oben genannten Daten.",
            "Resend: verschickt die Login-E-Mails und sieht dabei deine E-Mail-Adresse.",
            "Stripe (Zahlungen außerhalb Indiens) und Razorpay (Zahlungen in Indien): wickeln Zahlungen und Abos ab.",
            "Mit diesen Anbietern bestehen Auftragsverarbeitungsverträge (Art. 28 DSGVO). Einige sind US-Unternehmen. Gehen Daten aus der EU hinaus, stützen wir uns auf die Garantien nach Art. 44 bis 46 DSGVO, zum Beispiel Standardvertragsklauseln. Diese Liste ist noch mit den unterschriebenen Verträgen abzugleichen.",
            "Wir speichern deine Daten in Frankfurt, Deutschland.",
          ],
        },
        {
          heading: "Speicherdauer und Löschung",
          paragraphs: [
            "Wir speichern die Daten, solange dein Konto besteht. Schreib uns, dann löschen wir dein Konto mit allen Kinderprofilen und dem Fortschritt. Login-Codes laufen nach 5 Minuten ab.",
            "Zahlungsbelege müssen wir oder der Zahlungsanbieter wegen des Steuerrechts unter Umständen länger aufbewahren.",
          ],
        },
        {
          heading: "Deine Rechte",
          paragraphs: [
            "Du kannst Auskunft, Berichtigung, Löschung, Einschränkung und eine Kopie deiner Daten verlangen und widersprechen (Art. 15 bis 21 DSGVO). Schreib an die Adresse im Impressum.",
            "Du kannst dich bei einer Datenschutzaufsichtsbehörde beschweren (Art. 77 DSGVO).",
          ],
        },
      ],
    },
    pl: {
      title: "Polityka prywatności",
      sections: [
        {
          heading: "Administrator danych",
          paragraphs: [
            "Administratorem twoich danych jest usługodawca wskazany w danych prawnych (art. 4 pkt 7 RODO).",
          ],
        },
        {
          heading: "Jakie dane przechowujemy",
          paragraphs: [
            "Rodzic: twój adres e-mail oraz 6-cyfrowy kod logowania, który ci wysyłamy (zapisujemy tylko jego zaszyfrowaną kopię, a kod wygasa po 5 minutach).",
            "Dzieci: dla każdego profilu dziecka pseudonim, obrazek mieszkańca wioski, język, ustawienie dźwięku, zdobyte odznaki i wyłączone lekcje. Użyj pseudonimu, a nie prawdziwego imienia.",
            "Subskrypcja: status planu oraz numery klienta i subskrypcji u operatora płatności. Nigdy nie widzimy ani nie zapisujemy numerów kart.",
            "Ciasteczko logowania: po zalogowaniu ustawiamy jedno ciasteczko, żebyś pozostał(a) zalogowany(a) do 90 dni. Jest potrzebne do działania logowania. Bez konta aplikacja zapisuje postępy tylko w pamięci przeglądarki na twoim urządzeniu i nic do nas nie wysyła.",
            "Nie używamy reklam ani ciasteczek śledzących czy analitycznych.",
          ],
        },
        {
          heading: "Cel i podstawa prawna",
          paragraphs: [
            "Konto, logowanie, profile dzieci i płatny plan: wykonanie umowy (art. 6 ust. 1 lit. b RODO).",
            "Bezpieczeństwo usługi i odpowiedzi na twoje wiadomości: nasz prawnie uzasadniony interes (art. 6 ust. 1 lit. f RODO).",
            "Ciasteczko logowania jest niezbędne do usługi, o którą prosisz, więc nie wymaga zgody (§ 25 ust. 2 pkt 2 niemieckiej ustawy TDDDG).",
            "Profile dzieci zakłada i prowadzi rodzic. Aplikacja jest przeznaczona dla dzieci z udziałem rodziców (zobacz art. 8 RODO).",
          ],
        },
        {
          heading: "Podmioty przetwarzające dane",
          paragraphs: [
            "Google Cloud (Cloud Run, region Frankfurt): uruchamia aplikację i API.",
            "Neon (baza Postgres, region AWS Frankfurt): przechowuje wymienione wyżej dane.",
            "Resend: wysyła e-maile z kodem logowania, więc widzi twój adres e-mail.",
            "Stripe (płatności poza Indiami) i Razorpay (płatności w Indiach): obsługują płatności i subskrypcje.",
            "Z tymi podmiotami mamy umowy powierzenia przetwarzania (art. 28 RODO). Niektóre to firmy z USA. Gdy dane trafiają poza UE, opieramy się na zabezpieczeniach z art. 44 do 46 RODO, na przykład standardowych klauzulach umownych. Tę listę trzeba jeszcze sprawdzić z podpisanymi umowami.",
            "Twoje dane przechowujemy we Frankfurcie w Niemczech.",
          ],
        },
        {
          heading: "Jak długo i usuwanie",
          paragraphs: [
            "Dane przechowujemy, dopóki istnieje twoje konto. Napisz do nas, a usuniemy konto razem ze wszystkimi profilami dzieci i postępami. Kody logowania wygasają po 5 minutach.",
            "Dokumenty płatności możemy my lub operator płatności musieć przechowywać dłużej z powodu prawa podatkowego.",
          ],
        },
        {
          heading: "Twoje prawa",
          paragraphs: [
            "Możesz żądać dostępu, sprostowania, usunięcia, ograniczenia przetwarzania i kopii danych oraz wnieść sprzeciw (art. 15 do 21 RODO). Napisz na adres podany w danych prawnych.",
            "Możesz złożyć skargę do organu ochrony danych (art. 77 RODO).",
          ],
        },
      ],
    },
  },

  terms: {
    en: {
      title: "Terms",
      sections: [
        {
          heading: "Who this is for",
          paragraphs: [
            "Ripples is for children who learn with a parent. An account belongs to an adult (18 or older) who creates up to 6 kid profiles and is responsible for them.",
          ],
        },
        {
          heading: "Free month and paid plan",
          paragraphs: [
            "Every new family gets a free month. After that, a paid plan is needed to keep using the account features. The price and the payment provider are shown before you pay, and you can cancel before the next period starts.",
            "Your legal rights as a consumer, including any right of withdrawal, stay as the law gives them (for example Section 355 BGB in Germany).",
          ],
        },
        {
          heading: "What the lessons are",
          paragraphs: [
            "The lessons explain ideas about money and the world in simple words. They are simplified on purpose. They are teaching material, not financial, tax or legal advice. Each lesson has a fact card with sources.",
          ],
        },
        {
          heading: "Using the service",
          paragraphs: [
            "Do not try to break the service or use it to harm others. We may close an account that does this.",
            "You can delete your account at any time by writing to us.",
          ],
        },
        {
          heading: "Liability",
          paragraphs: [
            "Nothing in these terms limits liability that cannot be limited by law, for example for injury to life, body or health, or for intent.",
          ],
        },
        {
          heading: "Law",
          paragraphs: [
            "German law applies. If you are a consumer, the mandatory consumer protection of the country where you live stays in place (Art. 6 Rome I Regulation).",
            "The lesson texts and code have their own licences: see the LICENSING file in the project repository.",
          ],
        },
      ],
    },
    de: {
      title: "Nutzungsbedingungen",
      sections: [
        {
          heading: "Für wen die App ist",
          paragraphs: [
            "Ripples ist für Kinder, die mit einem Elternteil lernen. Ein Konto gehört einer erwachsenen Person (ab 18), die bis zu 6 Kinderprofile anlegt und dafür verantwortlich ist.",
          ],
        },
        {
          heading: "Gratismonat und bezahlter Tarif",
          paragraphs: [
            "Jede neue Familie bekommt einen Gratismonat. Danach braucht es einen bezahlten Tarif, um die Konto-Funktionen weiter zu nutzen. Preis und Zahlungsanbieter siehst du vor der Zahlung, und du kannst vor Beginn der nächsten Laufzeit kündigen.",
            "Deine gesetzlichen Verbraucherrechte, auch ein mögliches Widerrufsrecht, bleiben so, wie das Gesetz sie vorsieht (zum Beispiel § 355 BGB).",
          ],
        },
        {
          heading: "Was die Lektionen sind",
          paragraphs: [
            "Die Lektionen erklären Ideen über Geld und die Welt in einfachen Worten. Sie sind mit Absicht vereinfacht. Sie sind Lernmaterial, keine Finanz-, Steuer- oder Rechtsberatung. Zu jeder Lektion gibt es eine Faktenkarte mit Quellen.",
          ],
        },
        {
          heading: "Nutzung des Dienstes",
          paragraphs: [
            "Versuche nicht, den Dienst zu stören oder andere damit zu schädigen. Ein Konto, bei dem das geschieht, können wir schließen.",
            "Du kannst dein Konto jederzeit löschen lassen, indem du uns schreibst.",
          ],
        },
        {
          heading: "Haftung",
          paragraphs: [
            "Diese Bedingungen schließen keine Haftung aus, die sich gesetzlich nicht ausschließen lässt, zum Beispiel bei Verletzung von Leben, Körper oder Gesundheit oder bei Vorsatz.",
          ],
        },
        {
          heading: "Recht",
          paragraphs: [
            "Es gilt deutsches Recht. Bist du Verbraucher, bleibt der zwingende Verbraucherschutz deines Wohnsitzlandes bestehen (Art. 6 Rom-I-Verordnung).",
            "Lektionstexte und Code haben eigene Lizenzen: siehe die Datei LICENSING im Projekt-Repository.",
          ],
        },
      ],
    },
    pl: {
      title: "Regulamin",
      sections: [
        {
          heading: "Dla kogo jest aplikacja",
          paragraphs: [
            "Ripples jest dla dzieci, które uczą się z rodzicem. Konto należy do osoby dorosłej (od 18 lat), która zakłada do 6 profili dzieci i za nie odpowiada.",
          ],
        },
        {
          heading: "Darmowy miesiąc i płatny plan",
          paragraphs: [
            "Każda nowa rodzina dostaje darmowy miesiąc. Potem do korzystania z funkcji konta potrzebny jest płatny plan. Cenę i operatora płatności zobaczysz przed zapłatą, a subskrypcję możesz anulować przed początkiem kolejnego okresu.",
            "Twoje ustawowe prawa konsumenta, w tym ewentualne prawo odstąpienia od umowy, pozostają takie, jak przewiduje prawo (na przykład § 355 BGB w Niemczech).",
          ],
        },
        {
          heading: "Czym są lekcje",
          paragraphs: [
            "Lekcje tłumaczą pomysły o pieniądzach i świecie prostymi słowami. Są celowo uproszczone. To materiał do nauki, a nie porada finansowa, podatkowa ani prawna. Do każdej lekcji jest karta faktów ze źródłami.",
          ],
        },
        {
          heading: "Korzystanie z usługi",
          paragraphs: [
            "Nie próbuj psuć usługi ani używać jej, by szkodzić innym. Konto, z którego to robisz, możemy zamknąć.",
            "Konto możesz w każdej chwili usunąć, pisząc do nas.",
          ],
        },
        {
          heading: "Odpowiedzialność",
          paragraphs: [
            "Regulamin nie wyłącza odpowiedzialności, której nie można wyłączyć z mocy prawa, na przykład za szkody na życiu, ciele lub zdrowiu albo za winę umyślną.",
          ],
        },
        {
          heading: "Prawo",
          paragraphs: [
            "Stosuje się prawo niemieckie. Jeśli jesteś konsumentem, obowiązkowa ochrona konsumentów w kraju twojego zamieszkania pozostaje w mocy (art. 6 rozporządzenia Rzym I).",
            "Teksty lekcji i kod mają własne licencje: zobacz plik LICENSING w repozytorium projektu.",
          ],
        },
      ],
    },
  },
};
