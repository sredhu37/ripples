import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { DiagramProps, Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function IndustrializedWarfareDiagram({ lang, step }: DiagramProps) {
  const arjunName = lang === "pl" ? "Artur" : lang === "de" ? "Arno" : "Arjun";
  const label = lang === "pl" ? "Artur bada I wojnę światową: mechanizację walki, obligacje wojenne i upadek imperiów" : lang === "de" ? "Arno analysiert den Ersten Weltkrieg: Industrialisierte Ruestung, Kriegsanleihen und den Zerfall von Grossreichen" : "Arjun examining World War 1: industrialized warfare, war bonds, and the collapse of empires";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#0f172a" stroke="#64748b" strokeWidth="2" />
      <g>
        <circle cx="80" cy="110" r="28" fill="#f3cfa6" stroke="#64748b" strokeWidth="2" />
        <path d="M 52 105 C 52 70 108 70 108 105" fill="#334155" />
        <circle cx="72" cy="107" r="2.5" fill="#0f172a" />
        <circle cx="88" cy="107" r="2.5" fill="#0f172a" />
        <path d="M 76 119 Q 80 125 84 119" stroke="#0f172a" strokeWidth="2" fill="none" />
        <path d="M 56 185 L 62 140 Q 80 135 98 140 L 104 185 Z" fill="#475569" stroke="#64748b" strokeWidth="2" />
        <text x="80" y="205" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#cbd5e1">{arjunName}</text>
      </g>
      <g>
        <rect x="135" y="35" width="230" height="32" rx="6" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
        <text x="250" y="55" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#f1f5f9">
          ⚙️ {lang === "pl" ? "I Wojna Światowa: Wojna Fabryk (1914)" : lang === "de" ? "Erster Weltkrieg: Krieg der Fabriken" : "World War 1: Industrialized Total War"}
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="135" y="80" width="230" height="52" rx="8" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
          <text x="250" y="102" textAnchor="middle" fontSize="16">🏭 💣 📜</text>
          <text x="250" y="122" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#94a3b8">
            {lang === "pl" ? "Masowa amunicja • Obligacje wojenne" : lang === "de" ? "Massenproduktion • Kriegsanleihen" : "Mass Munitions • War Bond Financing"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="135" y="145" width="230" height="60" rx="8" fill="#334155" />
          <text x="250" y="170" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Upadek czterech wielkich cesarstw" : lang === "de" ? "Der Zusammenbruch von vier Reichen" : "The collapse of four great empires"}
          </text>
          <text x="250" y="190" textAnchor="middle" fontSize="10" fill="#e2e8f0">
            {lang === "pl" ? "Romanowowie, Hohenzollernowie, Habsburgowie, Osmanowie" : lang === "de" ? "Zarenreich, Kaiserreich, Habsburg, Osmanen" : "Russia, Germany, Austria-Hungary, and the Ottomans"}
          </text>
        </g>
      )}
    </svg>
  );
}

function AllianceCascadeDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Kaskada sojuszy w 1914 roku: efekt domina i brak dyplomatycznej mediacji" : lang === "de" ? "Die Buendniskaskade von 1914: Dominoeffekt und fehlende Deeskalation" : "The alliance domino cascade of 1914: systemic lock-in without diplomatic off-ramps";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#fafafa" stroke="#475569" strokeWidth="2" />
      <g>
        <rect x="40" y="55" width="85" height="60" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
        <text x="82" y="80" textAnchor="middle" fontSize="14">🇦🇹 🇷🇸</text>
        <text x="82" y="100" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#991b1b">Balkans Crisis</text>

        <rect x="155" y="55" width="90" height="60" rx="6" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
        <text x="200" y="80" textAnchor="middle" fontSize="14">🇷🇺 🇩🇪 🇫🇷</text>
        <text x="200" y="100" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#1e40af">Mobilization</text>

        <rect x="275" y="55" width="85" height="60" rx="6" fill="#fef2f2" stroke="#991b1b" strokeWidth="1.5" />
        <text x="317" y="80" textAnchor="middle" fontSize="14">🇬🇧 🇹🇷 🇮🇹</text>
        <text x="317" y="100" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#7f1d1d">World War</text>

        <line x1="125" y1="85" x2="155" y2="85" stroke="#dc2626" strokeWidth="2.5" />
        <line x1="245" y1="85" x2="275" y2="85" stroke="#dc2626" strokeWidth="2.5" />
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="135" width="320" height="42" rx="6" fill="#1e293b" />
          <text x="200" y="153" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#f87171">
            Secret treaties turned a regional dispute into global catastrophe
          </text>
          <text x="200" y="168" textAnchor="middle" fontSize="8" fill="#cbd5e1">
            {lang === "pl" ? "Żadne mocarstwo nie potrafiło zatrzymać automatycznych planów wojennych" : lang === "de" ? "Automatische Aufmarschplaene liessen Diplomaten keinen Spielraum" : "Rigid military timetables precluded diplomatic negotiation"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="195" width="320" height="26" rx="6" fill="#991b1b" />
          <text x="200" y="212" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Architektura bezpieczeństwa bez jawnych instytucji jest śmiertelnie niebezpieczna" : lang === "de" ? "Sicherheitsbuendnisse ohne transparente Vertraege fuehren ins Verderben" : "Collective security requires transparent communication and robust mediation"}
          </text>
        </g>
      )}
    </svg>
  );
}

function WarFinanceInflationDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Finansowanie wojny: druk pieniądza, obligacje i późniejsza hiperinflacja" : lang === "de" ? "Kriegsfinanzierung: Geldpresse, Schulden und spaetere Hyperinflation" : "War financing: printing presses, sovereign bonds, and subsequent hyperinflation";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#fefce8" stroke="#ca8a04" strokeWidth="2" />
      <g>
        <circle cx="100" cy="90" r="32" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />
        <text x="100" y="85" textAnchor="middle" fontSize="18">📜 💸</text>
        <text x="100" y="105" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#854d0e">War Bonds</text>

        <circle cx="300" cy="90" r="32" fill="#fee2e2" stroke="#dc2626" strokeWidth="2" />
        <text x="300" y="85" textAnchor="middle" fontSize="18">📈 🔥</text>
        <text x="300" y="105" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#991b1b">Hyperinflation</text>

        <path d="M 135 90 L 265 90" stroke="#dc2626" strokeWidth="2.5" markerEnd="url(#arrow)" />
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="135" width="320" height="44" rx="6" fill="#713f12" />
          <text x="200" y="153" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff">
            Abandoning the Gold Standard to print unbacked banknotes
          </text>
          <text x="200" y="168" textAnchor="middle" fontSize="8" fill="#fef08a">
            {lang === "pl" ? "Wszystkie walczące strony odeszły od pokrycia w złocie, finansując armie długiem" : lang === "de" ? "Alle Kriegsparteien verliessen den Goldstandard und druckten masslos Papiergeld" : "Combatants suspended gold convertibility and borrowed astronomically"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="195" width="320" height="26" rx="6" fill="#1e293b" />
          <text x="200" y="212" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#f8fafc">
            {lang === "pl" ? "Destabilizacja waluty zniszczyła oszczędności klasy średniej w Europie" : lang === "de" ? "Waehrungszerfall vernichtete die Ersparnisse der europaeischen Buerger" : "Monetary devastation destroyed middle-class savings across Central Europe"}
          </text>
        </g>
      )}
    </svg>
  );
}

function CollapseOfDynastiesDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Upadek monarchii absolutnych: rewolucja w Rosji, Niemczech i rozpad Austro-Węgier" : lang === "de" ? "Zusammenbruch der Monarchien: Revolutionen in Russland, Deutschland und Oesterreich" : "Fall of hereditary dynasties: revolutions in Russia, Germany, and Austro-Hungarian dissolution";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#f8fafc" stroke="#475569" strokeWidth="2" />
      <g>
        <circle cx="200" cy="80" r="34" fill="#fee2e2" stroke="#dc2626" strokeWidth="2" />
        <text x="200" y="75" textAnchor="middle" fontSize="18">👑 💥</text>
        <text x="200" y="95" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#991b1b">Fallen Thrones</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="130" width="320" height="46" rx="6" fill="#1e293b" />
          <text x="200" y="148" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#f87171">
            Century-old aristocratic autocracies shattered under industrial strain
          </text>
          <text x="200" y="163" textAnchor="middle" fontSize="8" fill="#94a3b8">
            {lang === "pl" ? "Klęska wojenna zmiotła carów, cesarzy i sułtanów, dając początek nowym republikom" : lang === "de" ? "Niederlage und Hunger fegten Zaren, Kaiser und Sultane hinweg" : "Exhaustion and starvation swept away emperors, creating vulnerable new republics"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="195" width="320" height="26" rx="6" fill="#b91c1c" />
          <text x="200" y="212" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Kruche traktaty pokojowe zasiały ziarno pod kolejny konflikt" : lang === "de" ? "Instabile Friedensvertraege legten den Keim fuer den naechsten Krieg" : "Flawed peace settlements planted the ideological seeds of future conflict"}
          </text>
        </g>
      )}
    </svg>
  );
}

function LeagueOfNationsEarlyAttemptDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Liga Narodów: pierwsza próba powołania globalnego arbitrażu pokojowego" : lang === "de" ? "Der Voelkerbund: Erster Versuch einer globalen Schiedsgerichtsbarkeit" : "The League of Nations: mankind's first attempt at collective international arbitration";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" />
      <g>
        <circle cx="200" cy="80" r="34" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
        <text x="200" y="75" textAnchor="middle" fontSize="18">🏛️ 🌐</text>
        <text x="200" y="95" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#1e40af">League of Nations</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="130" width="320" height="46" rx="6" fill="#1e40af" />
          <text x="200" y="148" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff">
            Woodrow Wilson's 14 Points: Striving for collective security
          </text>
          <text x="200" y="163" textAnchor="middle" fontSize="8" fill="#dbeafe">
            {lang === "pl" ? "Bez mechanizmów egzekwowania prawa i udziału kluczowych mocarstw Liga pozostała słaba" : lang === "de" ? "Ohne Durchsetzungskraft und die USA blieb der Bund zahnlos" : "Without enforcement mechanisms and US participation, the institution struggled"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="195" width="320" height="26" rx="6" fill="#1e293b" />
          <text x="200" y="212" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#f8fafc">
            {lang === "pl" ? "Zrozumienie słabości Ligi pozwoliło stworzyć silniejsze ONZ w 1945 r." : lang === "de" ? "Aus Fehlern lernen: Der Voelkerbund ebnete den Weg fuer die UN" : "Studying past institutional shortcomings enabled the architects of the UN to build more durable rules"}
          </text>
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [hasIncident, setHasIncident] = useState(false);
  const [hasMediation, setHasMediation] = useState(false);

  let conflict = 0;
  let fallenDominoes = 0;
  let status = "calm";

  if (hasIncident) {
    if (hasMediation) {
      conflict = 0;
      fallenDominoes = 0;
      status = "defused";
    } else {
      conflict = 100;
      fallenDominoes = 6;
      status = "cascade";
    }
  }

  const isResolved = status === "defused" || (!hasIncident && hasMediation);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>
        Incident: {hasIncident ? "Triggered" : "None"} | Mediation Table: {hasMediation ? "Active" : "Absent"} | Status: {isResolved ? "Peaceful" : "War Risk"} ({conflict}%)
      </p>
      <div style={{ display: "flex", gap: "8px" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setHasIncident(true);
            setHasMediation(true);
            onDone?.();
          }}
        >
          Deploy Diplomatic Mediation Table
        </button>
        <button
          type="button"
          className="btn btn-quiet"
          onClick={() => {
            setHasIncident(true);
            setHasMediation(false);
          }}
        >
          Trigger Regional Balkan Incident (No Mediation)
        </button>
      </div>
      <div style={{ padding: "12px", background: status === "cascade" ? "#fef2f2" : "#eef8ef", borderRadius: "10px", width: "100%", textAlign: "center" }}>
        {status === "cascade"
          ? `Alliance Domino Cascade: Secret treaties and rigid rail mobilization drag ${fallenDominoes} nations into automatic total warfare!`
          : status === "defused"
            ? "Crisis Defused: Transparent dialogue, multilateral mediation, and verified communication stop the alliance cascade from igniting!"
            : "Peaceful Status Quo: Stable regional diplomatic communication."}
      </div>
    </div>
  );
}

function WW1Widget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>What turned a regional crisis into a world war within weeks in 1914?</p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>Pigeons delivered all telegraphs backwards in mirror writing</button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>Secret alliance pacts and rigid train schedules triggered an automatic domino reaction</button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>European rulers challenged each other to a game of lawn croquet</button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "ww1",
  story: [
    animatedBeat(
      [
        T("Meet Arjun. He studies photographs from 1914 and notices an unprecedented shift in human warfare.", "Das ist Arno. Er betrachtet Fotos von 1914 und erkennt einen dramatischen Wendepunkt in der Geschichte des Krieges.", "Poznaj Artura. Bada fotografie z 1914 roku i zauważa bezprecedensowy przełom w historii wojen."),
        T("World War 1 was not fought with knights on horses, but with factory machines: heavy artillery, machine guns, and tanks.", "Der Erste Weltkrieg wurde nicht von Rittern zu Pferd gefuehrt, sondern von Fabriken: Maschinengewehre, Giftgas und Panzer.", "I wojna światowa nie była starciem rycerzy na koniach, lecz wojną fabryk: ciężkich karabinów, armat i czołgów."),
        T("Steel mills, chemical laboratories, and coal plants operated around the clock, channeling entire national economies into total war.", "Stahlwerke und Chemiefabriken liefen rund um die Uhr, um die gesamte Volkswirtschaft in den Kriegseinsatz zu zwingen.", "Huty, zakłady chemiczne i kopalnie węgla pracowały dzień i noc, przestawiając całe gospodarki na tory wojny totalnej."),
      ],
      IndustrializedWarfareDiagram,
    ),
    animatedBeat(
      [
        T("In July 1914, a regional crisis in Sarajevo ignited a fatal chain reaction across Europe.", "Im Juli 1914 loeste eine regionale Krise in Sarajevo eine toedliche Kettenreaktion in Europa aus.", "W lipcu 1914 r. kryzys po zamachu w Sarajewie wywołał śmiertelną reakcję łańcuchową w Europie."),
        T("Interlocking secret treaties bound the major powers: Austria attacked Serbia, bringing in Russia, which pulled in Germany, France, and Britain.", "Geheime Beistandspakte fesselten die Staaten: Oesterreich griff Serbien an, Russland mobilisierte, Deutschland, Frankreich und London folgten.", "Siatka tajnych układów wojskowych związała mocarstwa: atak na Serbię uruchomił mobilizację Rosji, co wciągnęło Niemcy, Francję i Wielką Brytanię."),
        T("Rigid railway mobilization schedules meant generals felt that stopping troop trains would leave them defenseless, eliminating diplomatic pause.", "Starre Fahrplaene der militaerischen Eisenbahnen liessen Diplomaten keine Zeit fuer Verhandlungen.", "Sztywne rozkłady jazdy wojskowych pociągów sprawiły, że generałowie nie dali dyplomacji czasu na negocjacje."),
      ],
      AllianceCascadeDiagram,
    ),
    animatedBeat(
      [
        T("To pay for millions of artillery shells and soldier rations, governments turned to revolutionary monetary tools.", "Um Millionen Granaten und Rationen zu bezahlen, griffen Regierungen zu drastischen Finanzmitteln.", "Aby opłacić miliony pocisków artyleryjskich i zaopatrzenie, rządy sięgnęły po bezprecedensowe narzędzia finansowe."),
        T("Nations suspended the Gold Standard, issued billions in 'War Bonds' to citizens, and turned on government printing presses.", "Sie setzten den Goldstandard aus, verkauften Kriegsanleihen an Buerger und warfen die Notenpresse an.", "Zawieszono wymienialność walut na złoto, wyemitowano miliardy długu w obligacjach wojennych i uruchomiono drukarnie banknotów."),
        T("This reckless debt and unbacked currency expansion planted the fiscal seeds for devastating postwar hyperinflation in Germany and Austria.", "Diese ungebremste Verschuldung fuehrte nach dem Krieg direkt in die verheerende Hyperinflation in Deutschland.", "Ten gigantyczny dług i dodruk pustego pieniądza stały się bezpośrednią przyczyną powojennej hiperinflacji w Niemczech i Austrii."),
      ],
      WarFinanceInflationDiagram,
    ),
    animatedBeat(
      [
        T("The catastrophic strain of total industrialized warfare destroyed centuries of hereditary dynastic rule across the globe.", "Die brutale Last des industrialisierten Krieges zerbrach jahrhundertealte Herrscherdynastien.", "Niewyobrażalny ciężar wojny totalnej doprowadził do upadku wielowiekowych dynastii arystokratycznych."),
        T("By 1918, four venerable empires collapsed completely: the Russian Romanovs, German Hohenzollerns, Austro-Hungarian Habsburgs, and the Ottoman Empire.", "Bis 1918 stuerzten vier maechtige Kaiserreiche: das russische Zarenreich, das Deutsche Reich, Habsburg und das Osmanische Reich.", "Do 1918 roku runęły cztery wielkie cesarstwa: carska Rosja, Cesarstwo Niemieckie, monarchia austro-węgierska oraz imperium osmańskie."),
        T("Out of their ruins emerged fragile newly independent nations in Central and Eastern Europe, including Poland and Czechoslovakia.", "Aus den Truemmern erstanden junge, freie Nationen wie Polen und die Tschechoslowakei neu.", "Na ich gruzach odrodziły się lub powstały niepodległe republiki Europy Środkowej, w tym odrodzona Rzeczpospolita Polska."),
      ],
      CollapseOfDynastiesDiagram,
    ),
    animatedBeat(
      [
        T("Horrified by the slaughter of twenty million lives, world leaders gathered in Paris in 1919 to construct a new international architecture.", "Erschuettert ueber 20 Millionen Tote trafen sich die Staatschefs 1919 in Paris, um eine neue Friedensordnung zu gruenden.", "Wstrząśnięci śmiercią dwudziestu milionów ludzi przywódcy zebrali się w 1919 r. w Paryżu, by zbudować nową architekturę bezpieczeństwa."),
        T("They founded the League of Nations, humanity's first global organization dedicated to resolving disputes through calm peace talks.", "Sie gruendeten den Voelkerbund als erste globale Organisation fuer Schiedsgerichte und friedliche Gespraeche.", "Powołali Ligę Narodów, pierwszą w dziejach globalną organizację mającą rozwiązywać spory drogą pokojowych rozmów."),
        T("Though the League proved too weak to prevent future aggression, it established the foundational legal concepts that today guide the United Nations.", "Obwohl der Bund zu schwach war, schuf er die rechtlichen Grundlagen, auf denen heute die Vereinten Nationen aufbauen.", "Choć Liga okazała się zbyt słaba, by powstrzymać kolejnych agresorów, stworzyła podwaliny prawa międzynarodowego i dzisiejszego ONZ."),
      ],
      LeagueOfNationsEarlyAttemptDiagram,
    ),
  ],
  toyIntro: T(
    "Operate the alliance domino simulator: test how diplomatic mediation tables can defuse escalating regional crises before total conflict erupts.",
    "Bediene den Buendnis-Simulator: Pruefe, wie diplomatische Vermittlungstische eine regionale Eskalation vor dem Weltkrieg stoppen koennen.",
    "Zbadaj symulator domina sojuszy: sprawdź, jak dyplomatyczny stół mediacyjny może powstrzymać eskalację konfliktu przed wybuchem wojny totalnej."),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Why did the regional crisis in Sarajevo rapidly cascade into a global conflict in July-August 1914?",
        "Warum fuehrte die Balkankrise im Sommer 1914 so rasch zu einem weltweiten Krieg?",
        "Dlaczego regionalny kryzys w Sarajewie latem 1914 roku tak błyskawicznie przerodził się w wojnę światową?",
      ),
      options: [
        { text: T("Secret alliance pacts and rigid train schedules triggered an automatic chain reaction", "Geheime Buendnisse und starre Aufmaersche loesten eine automatische Kettenreaktion aus", "Tajne sojusze i sztywne plany mobilizacji wywołały automatyczną reakcję łańcuchową"), correct: true },
        { text: T("Because European post offices ran out of stamps for peace letters", "Weil den europaeischen Postaemtern die Briefmarken fuer Friedensbriefe ausgingen", "Ponieważ urzędom pocztowym w Europie zabrakło znaczków do listów pokojowych"), correct: false },
        { text: T("Because a mysterious meteor turned all European iron bridges into rubber", "Weil ein Komet alle Eisenbahnbruecken ueber Nacht in Weichgummi verwandelt hatte", "Ponieważ tajemniczy meteor zamienił żelazne mosty kolejowe w elastyczną gumę"), correct: false },
      ],
      hint: T(
        "Focus on interlocking alliance commitments and inflexible military timetables.",
        "Denke an automatische Beistandspflichten und militaerische Aufmarschplaene.",
        "Zwróć uwagę na mechanizm automatycznych sojuszy i sztywne wojskowe rozkłady mobilizacji."),
    },
    {
      kind: "choice",
      prompt: T(
        "What major fiscal consequence resulted from governments suspending the Gold Standard to print unbacked money during World War 1?",
        "Welche gravierende Folge hatte das Verlassen des Goldstandards und der Gelddruck im Ersten Weltkrieg?",
        "Jaki był poważny skutek fiskalny zawieszenia wymienialności na złoto i dodruku pustego pieniądza podczas I wojny światowej?",
      ),
      options: [
        { text: T("Massive national debt accumulation and severe postwar currency depreciation leading to devastating hyperinflation in Central Europe", "Riesige Staatsverschuldung und spaetere Hyperinflation, die Ersparnisse der Bevoelkerung vernichtete", "Gigantyczne zadłużenie państw i gwałtowny spadek wartości walut, co doprowadziło do rujnującej hiperinflacji w Europie Środkowej"), correct: true },
        { text: T("Banks began exchanging paper banknotes for chocolate bars", "Banken tauschten Papiergeld ploetzlich gegen Schokoladentafeln ein", "Banki zaczęły wymieniać banknoty na tabliczki mlecznej czekolady"), correct: false },
        { text: T("Every tree in European forests sprouted silver coins instead of leaves", "An den Baeumen wuchsen ploetzlich Silbermuenzen statt gruener Blaetter", "Na drzewach w europejskich lasach zamiast liści wyrosły srebrne monety"), correct: false },
      ],
      hint: T(
        "Think about what happens when paper money is created far faster than real economic output.",
        "Achte darauf, was passiert, wenn viel mehr Geld gedruckt wird, als Waren existieren.",
        "Pomyśl o tym, co dzieje się, gdy podaż pieniądza papierowego rośnie bez pokrycia w towarach."),
    },
    {
      kind: "widget",
      prompt: T(
        "Analyze the structural mechanism behind the rapid alliance escalation in 1914.",
        "Analysiere den Mechanismus hinter der rasanten Eskalation der Buendnissysteme im Jahr 1914.",
        "Przeanalizuj mechanizm stojący za błyskawiczną eskalacją sojuszy w 1914 roku.",
      ),
      Widget: WW1Widget,
      hint: T(
        "Focus on secret treaties and inflexible military mobilization timetables.",
        "Achte auf Geheimvertraege und starre Aufmarschplaene.",
        "Zwróć uwagę na tajne pakty obronne i sztywny kalendarz mobilizacji wojskowej."),
    },
  ],
  askDad: T(
    "Ask your parent: Why is open, honest international communication between countries so important to stop small arguments from spiraling into huge conflicts?",
    "Frage deine Eltern: Warum ist offene Diplomatie zwischen Staaten so wichtig, damit aus kleinen Streitigkeiten keine grossen Kriege werden?",
    "Zapytaj rodziców: Dlaczego otwarta dyplomacja i mediacje międzynarodowe są tak ważne, by lokalny spór nie przerodził się w wojnę światową?"),
  realLife: {
    title: T(
      "Real world: Christopher Clark's 'The Sleepwalkers: How Europe Went to War in 1914'",
      "Echte Welt: Christopher Clarks 'Die Schlafwandler: Wie Europa in den Ersten Weltkrieg zog'",
      "Prawdziwy świat: Christopher Clark i 'Lunatycy: Jak Europa poszła na wojnę w 1914 r.'",
    ),
    body: T(
      "In his acclaimed 2012 historical masterpiece 'The Sleepwalkers', Cambridge historian Sir Christopher Clark dissected the intricate diplomatic miscalculations, paranoid military doctrines, and institutional vulnerabilities that allowed the July 1914 crisis to engulf the continent. Rather than conscious conspiracy, Clark demonstrated that European statesmen stumbled into catastrophe like 'sleepwalkers', blind to the reality of the mutual destruction they were triggering.",
      "In seinem Bestseller 'Die Schlafwandler' (2012) analysiert der Historiker Christopher Clark die diplomatischen Fehlurteile und militaerischen Automatismen im Sommer 1914. Er zeigt, wie fuehrende Politiker wie Schlafwandler in die Katastrophe steuerten, ohne die vernichtenden Konsequenzen ihrer Buendnispflichten voll zu ermessen.",
      "W wybitnej pracy 'Lunatycy' (2012) historyk z Cambridge Christopher Clark drobiazgowo przeanalizował błędy dyplomatyczne i paranoję sztabów generalnych latem 1914 roku. Wykazał, że przywódcy europejscy weszli w otchłań wojny niczym 'lunatycy', nieświadomi, że uruchomione przez nich mechanizmy sojuszy zniszczą ich własny świat."),
  },
  factCard: {
    claims: [
      { text: T("Sir Christopher Clark published 'The Sleepwalkers: How Europe Went to War in 1914' with Penguin Books in 2012.", "Christopher Clarks 'Die Schlafwandler' erschien 2012 bei Penguin Books.", "Książka Christophera Clarka 'The Sleepwalkers' ukazała się w 2012 r. nakładem Penguin Books."), source: "https://www.penguin.co.uk/books/56434/the-sleepwalkers-by-christopher-clark/9780141027821" },
      { text: T("The assassination of Archduke Franz Ferdinand in Sarajevo occurred on June 28, 1914, triggering the July diplomatic crisis.", "Das Attentat von Sarajevo am 28. Juni 1914 fuehrte zur Julikrise und zum Weltkrieg.", "Zamach na arcyksięcia Franciszka Ferdynanda w Sarajewie miał miejsce 28 czerwca 1914 r., wywołując lipcowy kryzys dyplomatyczny."), source: "https://www.britannica.com/event/assassination-of-Franz-Ferdinand" },
      { text: T("Historian Niall Ferguson's 'The Pity of War' (1998) examined war finance, military economics, and debt mobilization during WW1.", "Niall Fergusons 'The Pity of War' (1998) untersuchte Kriegsanleihen und Wirtschaftsressourcen im Ersten Weltkrieg.", "Niall Ferguson w książce 'The Pity of War' (1998) szczegółowo zbadał mechanizmy finansowania wojny i emisji długu."), source: "https://www.basicbooks.com/titles/niall-ferguson/the-pity-of-war/9780465057122/" },
      { text: T("The League of Nations Covenant was incorporated into the 1919 Treaty of Versailles, initiating formal international assembly sessions in Geneva in 1920.", "Die Satzung des Voelkerbunds wurde 1919 in den Versailler Vertrag aufgenommen.", "Statut Ligi Narodów stał się integralną częścią traktatu wersalskiego w 1919 r., inaugurując sesje zgromadzenia w Genewie w 1920 r."), source: "https://www.ungeneva.org/en/about/league-of-nations" },
      { text: T("Over 65 million military personnel were mobilized globally between 1914 and 1918, resulting in over 8.5 million combat deaths.", "Zwischen 1914 und 1918 wurden weltweit ueber 65 Millionen Soldaten mobilisiert.", "W latach 1914-1918 zmobilizowano na świecie ponad 65 milionów żołnierzy, a straty bojowe przekroczyły 8,5 miliona poległych."), source: "https://www.britannica.com/event/World-War-I/Killed-wounded-and-missing" },
    ],
    simplified: [
      T(
        "Complex multilateral treaty obligations, war treasury bond amortizations, and railway troop logistics schedules are translated into interactive alliance domino toys and accessible diplomatic analyses.",
        "Komplexe Buendnisvertraege und historische Finanzplaene wurden in anschauliche Domino-Spiele und packende Geschichtsanalysen verstaendlich uebersetzt.",
        "Skomplikowane zobowiązania traktatowe, amortyzacje obligacji wojennych i logistyka wojskowa zostały przedstawione w formie interaktywnego domina i przejrzystej narracji historycznej."),
    ],
  },
};
