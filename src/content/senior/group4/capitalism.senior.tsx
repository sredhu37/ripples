import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { DiagramProps, Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function MarketEngineLaunchDiagram({ lang, step }: DiagramProps) {
  const kritiName = lang === "pl" ? "Kasia" : lang === "de" ? "Klara" : "Kriti";
  const label = lang === "pl" ? "Kasia analizuje mechanizmy gospodarki rynkowej i kapitalizmu" : lang === "de" ? "Klara analysiert die Mechanismen von Kapitalismus und Marktwirtschaft" : "Kriti studying the core institutions of market capitalism";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#0f172a" stroke="#059669" strokeWidth="2" />
      <g>
        <circle cx="80" cy="110" r="28" fill="#f3cfa6" stroke="#059669" strokeWidth="2" />
        <path d="M 52 105 C 52 70 108 70 108 105" fill="#064e3b" />
        <circle cx="72" cy="107" r="2.5" fill="#0f172a" />
        <circle cx="88" cy="107" r="2.5" fill="#0f172a" />
        <path d="M 76 119 Q 80 125 84 119" stroke="#0f172a" strokeWidth="2" fill="none" />
        <path d="M 56 185 L 62 140 Q 80 135 98 140 L 104 185 Z" fill="#047857" stroke="#059669" strokeWidth="2" />
        <text x="80" y="205" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#a7f3d0">{kritiName}</text>
      </g>
      <g>
        <rect x="135" y="35" width="230" height="32" rx="6" fill="#1e293b" stroke="#059669" strokeWidth="1.5" />
        <text x="250" y="55" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#d1fae5">
          📈 {lang === "pl" ? "Kapitalizm: Własność i Bodźce" : lang === "de" ? "Kapitalismus: Eigentum & Anreize" : "Capitalism: Property & Incentives"}
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="135" y="80" width="230" height="52" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
          <text x="250" y="102" textAnchor="middle" fontSize="18">🏭 💡 🤝 ⚖️</text>
          <text x="250" y="122" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#6ee7b7">
            {lang === "pl" ? "Własność prywatna, zyski i wolny handel" : lang === "de" ? "Privateigentum, Gewinnanreiz und freier Tausch" : "Private ownership, price signals, and competition"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="135" y="145" width="230" height="60" rx="8" fill="#064e3b" />
          <text x="250" y="170" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Zalety: innowacje i obfitość dóbr" : lang === "de" ? "Staerken: Innovation und Ueberfluss" : "Dynamism: innovation and production"}
          </text>
          <text x="250" y="190" textAnchor="middle" fontSize="10.5" fill="#a7f3d0">
            {lang === "pl" ? "Wady: monopole, nierówności i zanieczyszczenia" : lang === "de" ? "Grenzen: Monopole, Ungleichheit und Umwelt" : "Market failures: monopolies, externalities, safety nets"}
          </text>
        </g>
      )}
    </svg>
  );
}

function PrivatePropertyIncentiveDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Własność prywatna a dbałość o kapitał i innowacje" : lang === "de" ? "Privateigentum als Motor fuer Pflege und Innovation" : "Private property rights as catalyst for capital care and innovation";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#fafafa" stroke="#475569" strokeWidth="2" />
      <g>
        <rect x="35" y="45" width="150" height="85" rx="8" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
        <text x="110" y="70" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#065f46">Owner-Operator</text>
        <text x="110" y="92" textAnchor="middle" fontSize="16">🚜 🔧 ⭐</text>
        <text x="110" y="112" textAnchor="middle" fontSize="8.5" fill="#047857">Maintains tractor carefully</text>
        <text x="110" y="124" textAnchor="middle" fontSize="7.5" fill="#065f46">Direct reward for diligence</text>

        <rect x="215" y="45" width="150" height="85" rx="8" fill="#fef2f2" stroke="#ef4444" strokeWidth="1.5" />
        <text x="290" y="70" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#991b1b">Unassigned Property</text>
        <text x="290" y="92" textAnchor="middle" fontSize="16">🚜 💨 🏚️</text>
        <text x="290" y="112" textAnchor="middle" fontSize="8.5" fill="#b91c1c">Nobody changes the engine oil</text>
        <text x="290" y="124" textAnchor="middle" fontSize="7.5" fill="#ef4444">Tragedy of the commons</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="145" width="320" height="42" rx="6" fill="#1e293b" />
          <text x="200" y="163" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#34d399">
            Private ownership links personal effort directly to economic outcome
          </text>
          <text x="200" y="177" textAnchor="middle" fontSize="8.5" fill="#94a3b8">
            {lang === "pl" ? "Przedsiębiorca ryzykuje własny majątek i zyskuje, gdy tworzy wartość dla klientów" : lang === "de" ? "Unternehmer haften persoenlich und profitieren von echten Kundenloesungen" : "Entrepreneurs bear financial risk and reap rewards when serving customers well"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="198" width="320" height="24" rx="6" fill="#065f46" />
          <text x="200" y="214" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Bezpieczna własność jest fundamentem długoterminowych inwestycji" : lang === "de" ? "Rechtssicherheit fuer Eigentum ist die Basis jeder zukunftsfaehigen Investition" : "Secure property rights form the bedrock of multi-decade capital formation"}
          </text>
        </g>
      )}
    </svg>
  );
}

function CompetitionDisciplineDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Konkurencja rynkowa: lepsza jakość, niższe ceny i innowacje" : lang === "de" ? "Wettbewerb diszipliniert Anbieter zu Qualitaet und fairen Preisen" : "Market competition driving quality improvements and lower costs";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
      <g>
        <rect x="35" y="45" width="100" height="75" rx="6" fill="#ffffff" stroke="#16a34a" strokeWidth="1.5" />
        <text x="85" y="70" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#15803d">Bakery A</text>
        <text x="85" y="90" textAnchor="middle" fontSize="16">🥖 💰</text>
        <text x="85" y="108" textAnchor="middle" fontSize="8" fill="#166534">Crusty sourdough</text>

        <circle cx="200" cy="82" r="22" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
        <text x="200" y="87" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#15803d">VS</text>

        <rect x="265" y="45" width="100" height="75" rx="6" fill="#ffffff" stroke="#16a34a" strokeWidth="1.5" />
        <text x="315" y="70" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#15803d">Bakery B</text>
        <text x="315" y="90" textAnchor="middle" fontSize="16">🥐 ✨</text>
        <text x="315" y="108" textAnchor="middle" fontSize="8" fill="#166534">Fresh croissants</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="135" width="320" height="42" rx="6" fill="#14532d" />
          <text x="200" y="153" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Żadna piekarnia nie może zawyżać cen, bo klienci natychmiast przejdą do konkurenta" : lang === "de" ? "Keine Baeckerei kann ueberhoehte Preise verlangen: Kunden gehen zur Konkurrenz" : "Neither bakery can gouge prices because consumers hold the power to switch"}
          </text>
          <text x="200" y="167" textAnchor="middle" fontSize="8.5" fill="#bbf7d0">
            {lang === "pl" ? "Konkurencja zmusza firmy do szacunku dla klienta i nieustannej poprawy jakości" : lang === "de" ? "Wettbewerb zwingt Unternehmen zu Kundennutzen und Innovation" : "Competition constantly pressures sellers toward higher quality and lower prices"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="195" width="320" height="26" rx="6" fill="#1e293b" />
          <text x="200" y="212" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#f8fafc">
            {lang === "pl" ? "Konsument jest suwerenem decydującym o sukcesie przedsiębiorstw" : lang === "de" ? "Der Konsument bestimmt taeglich mit seinem Geldbeutel den Markterfolg" : "Consumers vote daily with their currency, directing productive capital across society"}
          </text>
        </g>
      )}
    </svg>
  );
}

function SocialMarketEconomyDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Społeczna gospodarka rynkowa: wolny rynek z zasadami fair play i osłoną socjalną" : lang === "de" ? "Soziale Marktwirtschaft: Freier Markt mit klaren Spielregeln und sozialem Schutz" : "Social market economy: free competition balanced with regulatory guardrails";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#f8fafc" stroke="#334155" strokeWidth="2" />
      <g>
        <rect x="35" y="45" width="95" height="75" rx="6" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
        <text x="82" y="70" textAnchor="middle" fontSize="16">💡 🚀</text>
        <text x="82" y="90" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#065f46">Free Enterprise</text>
        <text x="82" y="105" textAnchor="middle" fontSize="7.5" fill="#059669">Dynamic growth</text>

        <rect x="152" y="45" width="95" height="75" rx="6" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
        <text x="199" y="70" textAnchor="middle" fontSize="16">🛡️ ⚖️</text>
        <text x="199" y="90" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1e40af">Antitrust Rules</text>
        <text x="199" y="105" textAnchor="middle" fontSize="7.5" fill="#2563eb">Bans monopolies</text>

        <rect x="270" y="45" width="95" height="75" rx="6" fill="#faf5ff" stroke="#7c3aed" strokeWidth="1.5" />
        <text x="317" y="70" textAnchor="middle" fontSize="16">🩺 🤝</text>
        <text x="317" y="90" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#581c87">Safety Net</text>
        <text x="317" y="105" textAnchor="middle" fontSize="7.5" fill="#7c3aed">Healthcare & pensions</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="135" width="320" height="42" rx="6" fill="#1e293b" />
          <text x="200" y="153" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#38bdf8">
            The German ordoliberal 'Soziale Marktwirtschaft' model
          </text>
          <text x="200" y="167" textAnchor="middle" fontSize="8.5" fill="#94a3b8">
            {lang === "pl" ? "Państwo pilnuje zasad konkurencji, zapobiega monopolom i chroni środowisko" : lang === "de" ? "Der Staat setzt den Rechtsrahmen gegen Monopole und sichert Buerger sozial ab" : "The state acts as referee ensuring competition stays open while protecting workers"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="195" width="320" height="26" rx="6" fill="#0f766e" />
          <text x="200" y="212" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Harmonia przedsiębiorczości i sprawiedliwości społecznej" : lang === "de" ? "Wohlstand fuer alle durch unternehmerische Freiheit und Solidaritaet" : "Prosperity for all through dynamic enterprise paired with social solidarity"}
          </text>
        </g>
      )}
    </svg>
  );
}

function GlobalAbundanceCreationDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Globalna redukcja ubóstwa i eksplozja dobrobytu w gospodarce rynkowej" : lang === "de" ? "Globale Armutsreduktion und Wohlstandswachstum durch offene Maerkte" : "Global poverty reduction and material abundance generated by market exchange";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#faf5ff" stroke="#059669" strokeWidth="2" />
      <g>
        <circle cx="200" cy="85" r="35" fill="#d1fae5" stroke="#059669" strokeWidth="2" />
        <text x="200" y="80" textAnchor="middle" fontSize="20">🌐 📈</text>
        <text x="200" y="100" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#065f46">Global Prosperity</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="50" y="135" width="300" height="42" rx="6" fill="#064e3b" />
          <text x="200" y="153" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff">
            "It is not from the benevolence of the butcher... that we expect our dinner"
          </text>
          <text x="200" y="168" textAnchor="middle" fontSize="8.5" fill="#a7f3d0">
            Adam Smith, The Wealth of Nations (1776)
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="195" width="320" height="26" rx="6" fill="#1e293b" />
          <text x="200" y="212" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#f8fafc">
            {lang === "pl" ? "W ciągu ostatnich 200 lat rynki wydźwignęły z nędzy ponad miliard ludzi" : lang === "de" ? "In den letzten 200 Jahren befreiten offene Maerkte ueber eine Milliarde Menschen aus der Not" : "Over the past two centuries, market innovation lifted over one billion people from extreme poverty"}
          </text>
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [competition, setCompetition] = useState(2);
  const [safetyNet, setSafetyNet] = useState(40);
  const isHealthy = competition >= 4 && safetyNet >= 60;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>
        Active Competitors: {competition} bakeries | Social Safety Net: {safetyNet}%
      </p>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setCompetition((c) => {
              const next = Math.min(8, c + 1);
              if (next >= 4 && safetyNet >= 60) onDone?.();
              return next;
            });
          }}
        >
          Encourage New Startups (+1 Competitor)
        </button>
        <button
          type="button"
          className="btn btn-quiet"
          onClick={() => {
            setSafetyNet((s) => {
              const next = Math.min(100, s + 20);
              if (competition >= 4 && next >= 60) onDone?.();
              return next;
            });
          }}
        >
          Strengthen Social Safety Net (+20%)
        </button>
      </div>
      <div style={{ padding: "12px", background: isHealthy ? "#eef8ef" : "#fef3c7", borderRadius: "10px", width: "100%", textAlign: "center" }}>
        {isHealthy
          ? "Thriving Social Market Economy: Vigorous competition drives down bread prices and spurs recipe innovations, while healthcare protects all citizens!"
          : "Unbalanced Market: Either monopoly dominance keeps prices high, or an inadequate safety net leaves vulnerable families exposed to economic shocks."}
      </div>
    </div>
  );
}

function CapitalismWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>What makes competitive market capitalism such a powerful engine for technical innovation?</p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>Because governments issue daily instructions to invent faster smartphones</button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>Because private ownership and open competition incentivize entrepreneurs to solve customer problems better and cheaper than rivals</button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>Because banks only provide loans to companies with blue company logos</button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "capitalism",
  story: [
    animatedBeat(
      [
        T("Meet Kriti. She walks past a bustling street filled with independent coffee roasters, robotics software startups, and family-owned tailor shops.", "Das ist Klara. Sie spaziert durch ein lebendiges Stadtviertel voller Kaffeeroestereien, Software-Start-ups und Schneiderwerkstaetten.", "Poznaj Kasię. Spaceruje tętniącą życiem ulicą, przy której działają rzemieślnicze palarnie kawy, innowacyjne startupy technologiczne i zakłady krawieckie."),
        T("Every one of these storefronts was built by citizens risking their own savings, purchasing equipment, and hiring skilled workers.", "Jeder dieser Betriebe entstand, weil Buerger eigene Ersparnisse riskierten, Geraete kauften und Mitarbeiter einstellten.", "Każdy z tych punktów powstał dzięki ludziom, którzy zaryzykowali własne oszczędności, kupili maszyny i zatrudnili pracowników."),
        T("*Capitalism* is an economic system based on private ownership of capital goods, voluntary market exchange, and competitive prices determined by supply and demand.", "Der *Kapitalismus* ist ein Wirtschaftssystem, das auf Privateigentum, freiem Markttausch und Marktpreisen durch Angebot und Nachfrage beruht.", "*Kapitalizm* to ustrój gospodarczy oparty na prywatnej własności środków produkcji, dobrowolnej wymianie rynkowej oraz cenach kształtowanych przez popyt i podaż."),
      ],
      MarketEngineLaunchDiagram,
    ),
    animatedBeat(
      [
        T("The fundamental driving engine of capitalism is secure private property rights.", "Der entscheidende Antrieb des Kapitalismus sind verlaesslich geschuetzte Eigentumsrechte.", "Fundamentem napędowym gospodarki rynkowej są prawnie chronione prawa własności prywatnej."),
        T("When an entrepreneur owns their tools, factory machinery, or code patents, they have an immense personal incentive to maintain them carefully and innovate.", "Wer seine Werkzeuge, Maschinen oder Patente selbst besitzt, hegt und pflegt sie sorgfaeltig und investiert in Innovation.", "Gdy przedsiębiorca jest właścicielem swoich narzędzi, maszyn czy patentów, ma bezpośrednią motywację, by dbać o nie i nieustannie je ulepszać."),
        T("By contrast, when property is unassigned or controlled by distant committees, nobody feels responsible for maintenance, leading to the tragedy of the commons.", "Gehoert Eigentum hingegen allen und niemandem, fuehlt sich keiner zustaendig: Geraete verrotten und Ressourcen werden verschwendet.", "Gdy majątek jest niczyj lub zarządzany przez odległych urzędników, nikt nie czuje za niego odpowiedzialności, co prowadzi do marnotrawstwa i ruiny."),
      ],
      PrivatePropertyIncentiveDiagram,
    ),
    animatedBeat(
      [
        T("The indispensable disciplining force in a healthy capitalist system is *open competition*.", "Die unverzichtbare Kontrollkraft eines gesunden Marktes ist der *freie Wettbewerb*.", "Niezbędną siłą dyscyplinującą w zdrowej gospodarce rynkowej jest *otwarta konkurencja*."),
        T("If a single bakery attempts to charge abusive, sky-high prices for bread, a rival bakery immediately opens across the street to offer fresher loaves at fair rates.", "Verlangt eine Baeckerei ueberzogene Preise, eroeffnet gegenueber sofort ein Konkurrent und bietet knuspriges Brot zu fairen Konditionen an.", "Gdyby jedyna piekarnia w miasteczku zaczęła windować ceny chleba, naprzeciwko natychmiast otworzy się druga, oferując smaczniejsze pieczywo po uczciwych cenach."),
        T("Competition strips business owners of coercive power: consumers vote daily with their spending, effortlessly rewarding excellence and penalizing inefficiency.", "Wettbewerb entzieht Firmen die Macht: Konsumenten stimmen taeglich mit ihrem Geld ab und belohnen Qualitaet und faire Preise.", "Konkurencja odbiera przedsiębiorcom monopol: klienci głosują codziennie portfelami, nagradzając rzetelność i bezlitośnie eliminując partactwo."),
      ],
      CompetitionDisciplineDiagram,
    ),
    animatedBeat(
      [
        T("However, economists recognize that unconstrained, unregulated markets produce severe market failures.", "Allerdings erkennen Oekonomen an, dass voellig unregulierte Maerkte zu schwerwiegendem Marktversagen fuehren.", "Ekonomiści wiedzą jednak, że całkowicie dziki, pozbawiony reguł rynek cierpi na poważne niedoskonałości, zwane zawodnością rynku."),
        T("Without statutory rules, aggressive monopolies crush smaller competitors, factories dump toxic effluents into rivers, and low-income families lack healthcare.", "Ohne Gesetze zerstoeren Monopole den Wettbewerb, Fabriken vergiften Fluesse und mittellose Familien haben keinen Zugang zu Medizin.", "Bez jasnych praw wielkie korporacje mogą tworzyć kartele, fabryki bezkarnie zatruwają rzeki, a ubodzy ludzie zostają bez opieki medycznej."),
        T("To balance dynamism with fairness, modern European democracies established the *Social Market Economy* (Soziale Marktwirtschaft).", "Um Wohlstand mit Gerechtigkeit zu verbinden, schufen moderne Demokratien die *Soziale Marktwirtschaft*.", "Dlatego nowoczesne kraje europejskie wykształciły model *Społecznej Gospodarki Rynkowej* (Soziale Marktwirtschaft)."),
      ],
      SocialMarketEconomyDiagram,
    ),
    animatedBeat(
      [
        T("Under a social market economy, the state acts as a strict referee enforcing antitrust laws while providing public education, healthcare, and safety nets.", "Darin fungiert der Staat als unparteiischer Schiedsrichter gegen Monopole und garantiert Bildung, Gesundheit und soziale Absicherung.", "W ustroju tym państwo działa jak bezstronny sędzia: rozbija monopole, chroni czyste powietrze i gwarantuje edukację oraz ubezpieczenia społeczne."),
        T("Capitalism provides the wealth-generating engine, while democratic institutions ensure that the fruits of productivity support the whole of society.", "Der Markt liefert den dynamischen Wohlstandsmotor, waehrend demokratische Institutionen dafuer sorgen, dass alle Buerger profitieren.", "Kapitalizm stanowi dynamiczny silnik wytwarzający bogactwo, a demokratyczne państwo dba o to, by owoce rozwoju służyły całemu narodowi."),
        T("Mastering the principles of market economics equips you to build enterprises, evaluate public policy, and create enduring value for others.", "Wer die Mechanismen der Marktwirtschaft versteht, kann eigene Unternehmen gruenden, Politik beurteilen und nachhaltigen Wert fuer andere schaffen.", "Zrozumienie mechanizmów rynkowych pozwala budować własne firmy, krytycznie oceniać prawo i tworzyć trwałą wartość dla całego społeczeństwa."),
      ],
      GlobalAbundanceCreationDiagram,
    ),
  ],
  toyIntro: T(
    "Calibrate the social market economy: foster competitive enterprise while reinforcing the public social safety net to achieve broadly shared prosperity.",
    "Balanciere die Soziale Marktwirtschaft: Foerdere freien Wettbewerb und staerke gleichzeitig das soziale Netz fuer breiten Wohlstand.",
    "Zarządzaj społeczną gospodarką rynkową: wspieraj powstawanie nowych firm i wzmacniaj osłonę socjalną, by budować powszechny dobrobyt."),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Why is secure private property ownership such an essential foundation for economic innovation?",
        "Warum ist geschuetztes Privateigentum ein so unverzichtbares Fundament fuer Innovation?",
        "Dlaczego bezpieczna własność prywatna stanowi fundament innowacji i rozwoju gospodarczego?",
      ),
      options: [
        { text: T("Because individuals who bear the risks and directly reap the financial rewards of diligence are strongly motivated to care for equipment, reduce waste, and invent new solutions", "Weil Menschen, die das Risiko tragen und vom Ertrag profitieren, motiviert sind Geraete zu pflegen, Verschwendung zu vermeiden und Neues zu erfinden", "Ponieważ ludzie, którzy ponoszą ryzyko i bezpośrednio korzystają z owoców swojej pracy, mają ogromną motywację do dbania o sprzęt i wdrażania innowacji"), correct: true },
        { text: T("Because private property deeds are printed on rare, waterproof parchment made from golden seaweed", "Weil Grundbuecher auf wasserfestem Papier aus goldenen Algen gedruckt werden", "Ponieważ akty własności spisuje się na rzadkim pergaminie ze złotych wodorostów"), correct: false },
        { text: T("Because owning tools legally forces workers to sing traditional folk songs every morning", "Weil der Besitz von Werkzeugen zum taeglichen Singen von Volksliedern verpflichtet", "Ponieważ posiadanie narzędzi zmusza prawnie do śpiewania pieśni ludowych o poranku"), correct: false },
      ],
      hint: T(
        "Remember the contrast between owning a tractor yourself versus sharing an unmaintained vehicle that belongs to everyone and no one.",
        "Denke an den Unterschied: Pflegst du deinen eigenen Traktor besser oder ein Gemeinschaftsgeraet, fuer das sich niemand verantwortlich fuehlt?",
        "Przypomnij sobie różnicę między posiadaniem własnego ciągnika a korzystaniem ze sprzętu wspólnego, za który nikt nie odpowiada."),
    },
    {
      kind: "choice",
      prompt: T(
        "What is the primary role of the state in a 'Social Market Economy' (Soziale Marktwirtschaft)?",
        "Was ist die primaere Rolle des Staates in einer 'Sozialen Marktwirtschaft'?",
        "Jaka jest podstawowa rola państwa w 'Społecznej Gospodarce Rynkowej'?",
      ),
      options: [
        { text: T("To act as an impartial referee enforcing fair antitrust competition and protecting the environment, while providing essential safety nets and public goods", "Als unparteiischer Schiedsrichter fairen Wettbewerb gegen Monopole zu sichern und gleichzeitig soziale Netze und oeffentliche Gueter bereitzustellen", "Działanie jako bezstronny sędzia chroniący wolną konkurencję przed monopolami i dbający o przyrodę, przy jednoczesnym zapewnieniu osłony socjalnej"), correct: true },
        { text: T("To dictate the exact daily price of every loaf of bread, shoe, and bicycle in the nation", "Jedem Geschaeft taeglich die exakten Preise fuer jedes Brot und Fahrrad vorzuschreiben", "Odgórne ustalanie codziennych cen każdego bochenka chleba, buta czy roweru w kraju"), correct: false },
        { text: T("To ban all private businesses and force all citizens to work exclusively in government post offices", "Alle Privatbetriebe zu schliessen und alle Buerger bei der Post einzustellen", "Likwidacja wszelkich prywatnych firm i nakaz pracy dla wszystkich obywateli na poczcie"), correct: false },
      ],
      hint: T(
        "Look for the balanced framework combining dynamic competition with social protection and antitrust oversight.",
        "Achte auf das Zusammenspiel von freiem Wettbewerb, Kartellaufsicht und sozialer Sicherung.",
        "Zwróć uwagę na harmonijne połączenie wolnej konkurencji, ochrony antymonopolowej i bezpieczeństwa socjalnego."),
    },
    {
      kind: "widget",
      prompt: T(
        "Analyze why competitive market dynamics consistently spur technological innovation and consumer value.",
        "Analysiere, warum marktwirtschaftlicher Wettbewerb kontinuierlich technologische Innovation und Kundenvorteile antreibt.",
        "Przeanalizuj, dlaczego rynkowa konkurencja nieustannie napędza innowacje technologiczne i obniża koszty dla konsumentów.",
      ),
      Widget: CapitalismWidget,
      hint: T(
        "Focus on how rivalry among private producers forces them to solve customer needs better and cheaper than competitors.",
        "Achte darauf, wie der Wettbewerb Anbieter zwingt, Kundenprobleme besser und preiswerter als die Konkurrenz zu loesen.",
        "Zwróć uwagę na to, jak rywalizacja zmusza producentów do oferowania klientom lepszych rozwiązań po niższych cenach."),
    },
  ],
  askDad: T(
    "Ask your parent: What is the difference between a pure free market and the social market economy model practiced in Europe today?",
    "Frage deine Eltern: Was ist der Unterschied zwischen einem reinen, unregulierten Markt und der in Europa gelebten Sozialen Marktwirtschaft?",
    "Zapytaj rodziców: Czym różni się całkowicie wolny, dziki rynek od modelu społecznej gospodarki rynkowej funkcjonującego dziś w Europie?"),
  realLife: {
    title: T(
      "Real world: Ludwig Erhard, the 1948 German currency reform, and the 'Wirtschaftswunder'",
      "Echte Welt: Ludwig Erhard, die Waehrungsreform von 1948 und das deutsche Wirtschaftswunder",
      "Prawdziwy świat: Ludwig Erhard, reforma walutowa z 1948 r. i niemiecki cud gospodarczy",
    ),
    body: T(
      "On Sunday, June 20, 1948, economics director Ludwig Erhard abolished rationing and price controls across West Germany overnight while introducing the Deutsche Mark. Critics predicted immediate chaos and hyperinflation. Instead, store shelves that had been completely empty for years filled with fresh bread, vegetables, and household goods within 48 hours. By unleashing market incentives anchored by ordoliberal antitrust rules, Erhard launched the legendary 'Wirtschaftswunder' (economic miracle), transforming war-devastated Germany into an economic powerhouse.",
      "Am 20. Juni 1948 schaffte Ludwig Erhard ueber Nacht die Zwangsbewirtschaftung und Preiskontrollen in Westdeutschland ab und fuehrte die D-Mark ein. Skeptiker warnten vor Chaos. Doch innerhalb von 48 Stunden fuellten sich die jahrelang leeren Schaufenster wie von Zauberhand mit Lebensmitteln und Werkzeugen. Das Entfesseln der Marktkraefte im Rahmen der Sozialen Marktwirtschaft legte den Grundstein fuer das deutsche Wirtschaftswunder.",
      "20 czerwca 1948 roku Ludwig Erhard zniósł w Niemczech Zachodnich odgórną reglamentację i kontrolę cen, wprowadzając markę niemiecką. Choć krytycy wieszczyli chaos, w ciągu 48 godzin puste od lat półki sklepowe zapełniły się świeżym chlebem i towarami. Uwolnienie sił rynkowych w ramach Społecznej Gospodarki Rynkowej zapoczątkowało legendarny 'cud gospodarczy' (Wirtschaftswunder)."),
  },
  factCard: {
    claims: [
      { text: T("Adam Smith published 'The Wealth of Nations' on March 9, 1776, outlining the role of market division of labor, competition, and the invisible hand.", "Adam Smith veroeffentlichte am 9. Maerz 1776 'Der Wohlstand der Nationen' ueber Arbeitsteilung und die unsichtbare Hand des Marktes.", "Adam Smith opublikował 'Bogactwo narodów' 9 marca 1776 r., opisując podział pracy, konkurencję i działanie niewidzialnej ręki rynku."), source: "https://www.adamsmith.org/the-wealth-of-nations" },
      { text: T("Economist Walter Eucken and the Freiburg School developed Ordoliberalism in the 1930s and 1940s, providing the theoretical foundation for the Social Market Economy.", "Walter Eucken und die Freiburger Schule begruendeten den Ordoliberalismus als theoretische Basis der Sozialen Marktwirtschaft.", "Walter Eucken i szkoła fryburska stworzyli ordoliberalizm w latach 30. i 40. XX w., dając podwaliny pod Społeczną Gospodarkę Rynkową."), source: "https://www.eucken.de/ueber-uns/walter-eucken/" },
      { text: T("Ludwig Erhard served as West Germany's Federal Minister for Economic Affairs from 1949 to 1963, popularizing the guiding principle 'Wohlstand für alle' (Prosperity for All).", "Ludwig Erhard praegte als Wirtschaftsminister von 1949 bis 1963 das Leitbild 'Wohlstand fuer alle'.", "Ludwig Erhard jako minister gospodarki w latach 1949-1963 spopularyzował ideę 'Dobrobytu dla wszystkich' (Wohlstand für alle)."), source: "https://www.bundeskanzler.de/bk-de/kanzleramt/bundeskanzler-seit-1949/ludwig-erhard" },
      { text: T("The World Bank reports that the global extreme poverty rate plummeted from over 35% in 1990 to under 9% by 2019, driven primarily by market expansion across Asia.", "Die Weltbank dokumentiert den Rueckgang der extremen weltweiten Armut von 35% (1990) auf unter 9% (2019) durch wirtschaftliche Marktintegration.", "Bank Światowy odnotowuje spadek skrajnego ubóstwa z ponad 35% w 1990 r. do poniżej 9% w 2019 r., głównie dzięki rozwojowi wolnego handlu w Azji."), source: "https://www.worldbank.org/en/topic/poverty/overview" },
      { text: T("The Treaty of Rome (1957) codified the European Economic Community's commitment to the free movement of goods, capital, services, and labor.", "Die Roemischen Vertraege von 1957 verankerten den freien Verkehr von Waren, Kapital, Dienstleistungen und Arbeitskraeften in Europa.", "Traktaty Rzymskie z 1957 r. ustanowiły swobodny przepływ towarów, kapitału, usług i pracowników we wspólnym rynku europejskim."), source: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=LEGISSUM:xy0023" },
    ],
    simplified: [
      T(
        "Complex Austrian price discovery equations, ordoliberal constitutional antitrust doctrines, and capital accumulation models are translated into intuitive neighborhood bakeries and competitive startup dials.",
        "Komplexe Preistheorien und ordoliberale Kartellmodelle wurden durch lebendige Baeckereien und verstaendliche Wettbewerbsregler veranschaulicht.",
        "Skomplikowaną teorię cen, ordoliberalną doktrynę ochrony konkurencji oraz modele akumulacji kapitału wyjaśniono za pomocą przykładu lokalnych piekarni i czytelnych wskaźników wolnego rynku."),
    ],
  },
};
