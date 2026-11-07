import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { DiagramProps, Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function CurrencyVaultLaunchDiagram({ lang, step }: DiagramProps) {
  const aaravName = lang === "pl" ? "Adam" : lang === "de" ? "Arne" : "Aarav";
  const label = lang === "pl" ? "Adam bada ewolucję walut od złota po pieniądz fiducjarny" : lang === "de" ? "Arne untersucht die Entwicklung von Gold zu Fiatgeld" : "Aarav inspecting historical currencies from gold coin to modern fiat notes";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#0f172a" stroke="#14b8a6" strokeWidth="2" />
      <g>
        <circle cx="80" cy="110" r="28" fill="#f3cfa6" stroke="#14b8a6" strokeWidth="2" />
        <path d="M 52 105 C 52 70 108 70 108 105" fill="#134e4a" />
        <circle cx="72" cy="107" r="2.5" fill="#0f172a" />
        <circle cx="88" cy="107" r="2.5" fill="#0f172a" />
        <path d="M 76 119 Q 80 125 84 119" stroke="#0f172a" strokeWidth="2" fill="none" />
        <path d="M 56 185 L 62 140 Q 80 135 98 140 L 104 185 Z" fill="#0d9488" stroke="#14b8a6" strokeWidth="2" />
        <text x="80" y="205" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#99f6e4">{aaravName}</text>
      </g>
      <g>
        <rect x="135" y="35" width="230" height="32" rx="6" fill="#1e293b" stroke="#14b8a6" strokeWidth="1.5" />
        <text x="250" y="55" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#ccfbf1">
          💵 {lang === "pl" ? "Ewolucja Walut i Pieniądz Fiducjarny" : lang === "de" ? "Waehrungen und Fiatgeld" : "Currencies & The Nature of Fiat"}
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="135" y="80" width="230" height="52" rx="8" fill="#1e293b" stroke="#0d9488" strokeWidth="1.5" />
          <text x="250" y="102" textAnchor="middle" fontSize="18">🥇 ➡️ 📜 ➡️ 💳</text>
          <text x="250" y="122" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#5eead4">
            {lang === "pl" ? "Kruszec, parytet złota i pieniądz bez pokrycia" : lang === "de" ? "Vom Goldstandard zum reinen Vertrauensgeld" : "Commodity, gold standard, and pure fiat"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="135" y="145" width="230" height="60" rx="8" fill="#115e59" />
          <text x="250" y="170" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Zaufanie i prawny środek płatniczy" : lang === "de" ? "Vertrauen und gesetzliches Zahlungsmittel" : "Legal tender and institutional credibility"}
          </text>
          <text x="250" y="190" textAnchor="middle" fontSize="10.5" fill="#e6fffa">
            {lang === "pl" ? "Pieniądz ma wartość, bo wszyscy w to wierzą" : lang === "de" ? "Geld hat Wert, weil alle daran glauben" : "Money works because of collective social coordination"}
          </text>
        </g>
      )}
    </svg>
  );
}

function CommodityVsFiatDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Pieniądz towarowy a pieniądz fiducjarny (fiat)" : lang === "de" ? "Warengeld vs Fiatgeld: Der Wandel des Geldbegriffs" : "Commodity money backed by metal vs modern fiat money backed by decree";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#fafafa" stroke="#475569" strokeWidth="2" />
      <g>
        <rect x="40" y="45" width="145" height="85" rx="8" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
        <text x="112" y="70" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#92400e">Commodity Money</text>
        <text x="112" y="90" textAnchor="middle" fontSize="14">🪙 ⚖️ ⛏️</text>
        <text x="112" y="112" textAnchor="middle" fontSize="9" fill="#92400e">Gold / Silver Coins</text>
        <text x="112" y="124" textAnchor="middle" fontSize="8" fill="#b45309">Intrinsic melt value</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="215" y="45" width="145" height="85" rx="8" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
          <text x="287" y="70" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#065f46">Fiat Money</text>
          <text x="287" y="90" textAnchor="middle" fontSize="14">💶 📜 🏛️</text>
          <text x="287" y="112" textAnchor="middle" fontSize="9" fill="#065f46">Legal Tender Decree</text>
          <text x="287" y="124" textAnchor="middle" fontSize="8" fill="#047857">Backed by state trust & tax</text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="150" width="320" height="55" rx="8" fill="#1e293b" />
          <text x="200" y="174" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Pieniądz fiducjarny ('fiat' = niech się stanie) nie ma pokrycia w metalu" : lang === "de" ? "Fiatgeld ('fiat' = es geschehe) besitzt keinen inneren Metallwert" : "Fiat money has zero intrinsic metal melt value: its value comes from trust"}
          </text>
          <text x="200" y="193" textAnchor="middle" fontSize="9.5" fill="#94a3b8">
            {lang === "pl" ? "Państwo wymaga płacenia podatków w tej walucie, tworząc stały popyt" : lang === "de" ? "Steuerpflicht in Inlandswaehrung sichert dauerhafte Nachfrage" : "The legal requirement to settle tax obligations in sovereign currency anchors demand"}
          </text>
        </g>
      )}
    </svg>
  );
}

function FunctionsOfMoneyDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Trzy fundamentalne funkcje pieniądza" : lang === "de" ? "Die drei Grundfunktionen des Geldes" : "Three textbook functions of money";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#fffbeb" stroke="#d97706" strokeWidth="2" />
      <g>
        <circle cx="80" cy="90" r="32" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
        <text x="80" y="85" textAnchor="middle" fontSize="16">🤝</text>
        <text x="80" y="102" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#1e40af">Medium of</text>
        <text x="80" y="112" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#1e40af">Exchange</text>
      </g>
      {step >= 2 && (
        <g>
          <circle cx="200" cy="90" r="32" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
          <text x="200" y="85" textAnchor="middle" fontSize="16">📐</text>
          <text x="200" y="102" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#065f46">Unit of</text>
          <text x="200" y="112" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#065f46">Account</text>

          <circle cx="320" cy="90" r="32" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
          <text x="320" y="85" textAnchor="middle" fontSize="16">🏦</text>
          <text x="320" y="102" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#92400e">Store of</text>
          <text x="320" y="112" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#92400e">Value</text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="150" width="320" height="55" rx="8" fill="#78350f" />
          <text x="200" y="174" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Środek wymiany, jednostka rozliczeniowa i magazyn wartości" : lang === "de" ? "Tauschmittel, Recheneinheit und Wertaufbewahrungsmittel" : "Medium of exchange, unit of account, and store of purchasing power"}
          </text>
          <text x="200" y="193" textAnchor="middle" fontSize="9.5" fill="#fde68a">
            {lang === "pl" ? "Gdy szaleje inflacja, funkcja magazynu wartości ulega zniszczeniu" : lang === "de" ? "Bei starker Inflation bricht zuerst die Wertaufbewahrung zusammen" : "Under high inflation, the store-of-value function breaks first"}
          </text>
        </g>
      )}
    </svg>
  );
}

function HyperinflationSpiralDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Spirala hiperinflacji i utrata zaufania do waluty" : lang === "de" ? "Die Hyperinflationsspirale und der Vertrauensverlust" : "The hyperinflation feedback loop and total loss of monetary trust";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#f8fafc" stroke="#334155" strokeWidth="2" />
      <g>
        <circle cx="120" cy="90" r="38" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
        <text x="120" y="85" textAnchor="middle" fontSize="20">🖨️ 💸</text>
        <text x="120" y="105" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#b91c1c">Print Unchecked</text>

        <circle cx="280" cy="90" r="38" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
        <text x="280" y="85" textAnchor="middle" fontSize="20">🥖 📈 💥</text>
        <text x="280" y="105" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#b91c1c">Prices Double Daily</text>

        <path d="M 160 80 Q 200 60 240 80" stroke="#ef4444" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
        <path d="M 240 100 Q 200 120 160 100" stroke="#ef4444" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
      </g>
      {step >= 2 && (
        <g>
          <rect x="50" y="145" width="300" height="40" rx="6" fill="#1e293b" />
          <text x="200" y="163" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Weimar 1923, Zimbabwe 2008, Wenezuela 2018" : lang === "de" ? "Weimar 1923, Simbabwe 2008, Venezuela 2018" : "Weimar 1923, Zimbabwe 2008, Venezuela 2018"}
          </text>
          <text x="200" y="177" textAnchor="middle" fontSize="8.5" fill="#fca5a5">
            {lang === "pl" ? "Gdy zaufanie wyparuje, banknoty nadają się tylko na opał" : lang === "de" ? "Ohne Vertrauen dient Papiergeld nur noch als Heizmaterial" : "When trust evaporates, wheelbarrows of paper cannot buy a loaf of bread"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="198" width="320" height="24" rx="6" fill="#7f1d1d" />
          <text x="200" y="214" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Rygorystyczna dyscyplina mennicza to warunek przetrwania cywilizacji" : lang === "de" ? "Monetaere Disziplin ist die unverzichtbare Basis des Zusammenlebens" : "Strict monetary discipline is the prerequisite of stable civilization"}
          </text>
        </g>
      )}
    </svg>
  );
}

function DigitalMonetaryFutureDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Przyszłość walut: płatności cyfrowe i waluty banków centralnych (CBDC)" : lang === "de" ? "Die Zukunft des Geldes: Digitale Zahlungen und CBDCs" : "The digital monetary frontier: ledger payments and central bank digital currencies";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#faf5ff" stroke="#7e22ce" strokeWidth="2" />
      <g>
        <circle cx="200" cy="90" r="38" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
        <text x="200" y="85" textAnchor="middle" fontSize="20">📱 ⚡</text>
        <text x="200" y="105" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#5b21b6">Digital Ledger</text>
        <rect x="40" y="45" width="105" height="65" rx="6" fill="#fdf4ff" stroke="#c084fc" strokeWidth="1" />
        <text x="92" y="70" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#7e22ce">Cashless Ease</text>
        <text x="92" y="88" textAnchor="middle" fontSize="8" fill="#9333ea">Instant tap</text>
        <rect x="255" y="45" width="105" height="65" rx="6" fill="#fdf4ff" stroke="#c084fc" strokeWidth="1" />
        <text x="307" y="70" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#7e22ce">Digital Euro</text>
        <text x="307" y="88" textAnchor="middle" fontSize="8" fill="#9333ea">CBDC safe</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="50" y="140" width="300" height="42" rx="6" fill="#ede9fe" stroke="#a855f7" strokeWidth="1" />
          <text x="200" y="158" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#581c87">
            Over 95% of money today exists purely as digital bits in bank ledgers
          </text>
          <text x="200" y="172" textAnchor="middle" fontSize="8.5" fill="#7e22ce">
            Bank of International Settlements (BIS)
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="198" width="320" height="24" rx="6" fill="#581c87" />
          <text x="200" y="214" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Forma pieniądza ewoluuje, ale fundamentem zawsze pozostaje wzajemne zaufanie" : lang === "de" ? "Die Form des Geldes wandelt sich, doch sein Kern bleibt das gemeinsame Vertrauen" : "Money form evolves across millennia, but its bedrock remains collective human trust"}
          </text>
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [moneySupply, setMoneySupply] = useState(100);
  const priceOfBread = Math.round((moneySupply / 100) * 2.5 * 10) / 10;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>
        Total Money Supply: {moneySupply} M€ | Price of 1 Bread Loaf: {priceOfBread.toFixed(2)} €
      </p>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setMoneySupply((m) => {
              const next = m + 50;
              if (next >= 250) onDone?.();
              return next;
            });
          }}
        >
          Print Fiat Money (+50 M€)
        </button>
        <button
          type="button"
          className="btn btn-quiet"
          onClick={() => setMoneySupply(100)}
        >
          Reset Money Supply
        </button>
      </div>
      <div style={{ padding: "12px", background: moneySupply <= 150 ? "#eef8ef" : "#fff1f2", borderRadius: "10px", width: "100%", textAlign: "center" }}>
        {moneySupply >= 300
          ? "Hyperinflation Danger! Printing paper without extra goods doubles the price of bread instantly, destroying purchasing power!"
          : moneySupply > 150
          ? "Moderate Inflation: Money supply grew faster than baked bread; prices are climbing!"
          : "Stable Purchasing Power: Money supply matches real goods produced in the economy!"}
      </div>
    </div>
  );
}

function CurrenciesWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>What gives a modern 50-euro paper banknote its actual purchasing power?</p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>The 50 euro note contains 50 grams of pure melted gold hidden inside the paper fibers</button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>Collective trust backed by law: the government declares it legal tender, accepts it for taxes, and central banks maintain its purchasing power</button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>The magical fluorescent ink used to print the serial number</button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "currencies",
  story: [
    animatedBeat(
      [
        T("Meet Aarav. He looks at a crisp 20-euro banknote in his wallet and wonders why a small rectangle of polymer-coated paper can buy warm pizza, train rides, and shoes.", "Das ist Arne. Er betrachtet einen 20-Euro-Schein und fragt sich, warum ein bedrucktes Stueck Baumwollpapier Pizza, Schuhe und Zugtickets kaufen kann.", "Poznaj Adama. Trzyma w dłoni banknot dwudziestoeurowy i zastanawia się, dlaczego zadrukowany kawałek papieru pozwala kupić gorącą pizzę, buty czy bilet na pociąg."),
        T("The paper itself has almost zero intrinsic physical value: you cannot eat it, wear it as a jacket, or build a house with it.", "Das Papier selbst ist praktisch wertlos: Man kann es weder essen, noch daraus eine Jacke naehen oder ein Haus bauen.", "Sam papier nie ma prawie żadnej wartości użytkowej: nie da się go zjeść, nie uszyje się z niego kurtki ani nie zbuduje domu."),
        T("Yet millions of strangers accept it instantly because modern currency is built on the most powerful technology in human history: *collective trust*.", "Dennoch akzeptieren Millionen Fremde das Geld sofort, denn moderne Waehrungen basieren auf *gemeinsamem Vertrauen*.", "Mimo to miliony obcych ludzi bez wahania go przyjmują, ponieważ nowoczesna waluta opiera się na potężnej sile: *społecznym zaufaniu*."),
      ],
      CurrencyVaultLaunchDiagram,
    ),
    animatedBeat(
      [
        T("For thousands of years, civilizations used *commodity money* such as silver drachmas, gold solidi, or cowrie shells.", "Jahrtausende lang nutzten Hochkulturen *Warengeld* wie Gold-, Silber- oder Kupfermünzen.", "Przez tysiąclecia cywilizacje posługiwały się *pieniądzem towarowym*, takim jak złote dukaty, srebrne talary czy muszelki kauri."),
        T("These precious metals had intrinsic melt value, but carrying heavy bags of coins made travel dangerous and trade cumbersome.", "Edelmetalle besassen inneren Wert, doch schwere Beutel machten Reisen gefaehrlich und den Handel muehsam.", "Metale szlachetne miały wartość samą w sobie, lecz noszenie ciężkich sakiewek było niebezpieczne i niewygodne w handlu."),
        T("Today, virtually all global commerce relies on *fiat money*, currency declared legal tender by government decree, not backed by physical gold in a vault.", "Heute nutzt die Welt fast ausschliesslich *Fiatgeld*, Waehrungen, die per Gesetz als Zahlungsmittel gelten, ohne Golddeckung.", "Współcześnie niemal cały świat opiera się na *pieniądzu fiducjarnym* (fiat), czyli walucie uznanej prawem za środek płatniczy, bez pokrycia w złocie."),
      ],
      CommodityVsFiatDiagram,
    ),
    animatedBeat(
      [
        T("Economists define true money through three indispensable functions: medium of exchange, unit of account, and store of value.", "Oekonomen definieren echtes Geld ueber drei Kernfunktionen: Tauschmittel, Recheneinheit und Wertspeicher.", "W ekonomii definiuje się pieniądz poprzez trzy funkcje: środek wymiany, jednostkę rozliczeniową i magazyn wartości."),
        T("As a medium of exchange and unit of account, it eliminates clumsy barter and lets us compare laptops to apples.", "Als Tauschmittel und Recheneinheit beendet es den Tauschhandel und macht Preise sofort vergleichbar.", "Jako środek wymiany i jednostka rozliczeniowa eliminuje uciążliwy handel wymienny i pozwala porównywać ceny."),
        T("As a store of value, it allows workers to save today's earnings and spend them reliably years into the future.", "Als Wertaufbewahrungsmittel sorgt es dafuer, dass Ersparnisse auch nach Jahren noch Kaufkraft besitzen.", "Jako magazyn wartości umożliwia zachowanie owoców dzisiejszej pracy na wiele lat w przyszłość."),
      ],
      FunctionsOfMoneyDiagram,
    ),
    animatedBeat(
      [
        T("Because fiat money relies on trust, irresponsible governments can trigger the nightmare of *hyperinflation*.", "Weil Fiatgeld auf Vertrauen beruht, koennen unverantwortliche Machthaber *Hyperinflation* entfesseln.", "Ponieważ pieniądz fiducjarny opiera się na zaufaniu, nieodpowiedzialna władza może wywołać koszmar *hiperinflacji*."),
        T("When a desperate regime prints trillions of banknotes without any increase in actual goods produced, each individual bill becomes worthless.", "Druckt ein Staat Billionen neuer Scheine ohne mehr Waren zu produzieren, wird der einzelne Schein wertlos.", "Gdy zdesperowany rząd drukuje biliony banknotów bez wzrostu produkcji towarów, pojedynczy banknot traci jakąkolwiek wartość."),
        T("In 1923 Weimar Germany and 2008 Zimbabwe, workers hauled wheelbarrows of cash to buy a single loaf of bread, proving that money is only as strong as institutional credibility.", "1923 in Weimar brauchten Menschen Schubkarren voller Geld fuer ein Brot: Geld ist nur so gut wie das Vertrauen.", "W Niemczech w 1923 r. czy w Zimbabwe w 2008 r. wożono taczki banknotów, by kupić bochenek chleba, co dowodzi, że wartość waluty zależy od wiarygodności państwa."),
      ],
      HyperinflationSpiralDiagram,
    ),
    animatedBeat(
      [
        T("Today, money is undergoing its most radical transformation yet into pure digital code.", "Heute erlebt das Geld den radikalsten Wandel seiner Geschichte hin zu reinen digitalen Daten.", "Dziś pieniądz przechodzi najgłębszą rewolucję w dziejach, zamieniając się w cyfrowe bity."),
        T("More than 95% of modern transactions occur via smartphone taps, contactless cards, and interbank digital ledgers.", "Ueber 95% aller Zahlungen laufen heute kontaktlos per Smartphone, Karte und digitale Bankueberweisungen.", "Ponad 95% transakcji odbywa się dziś zbliżeniowo telefonem, kartą lub w systemach bankowości elektronicznej."),
        T("Whether carved into stone, stamped in silver, printed on cotton, or stored on silicon chips, money remains an extraordinary mirror of human cooperation.", "Ob in Stein gemeisselt, in Silber gepraegt oder als Bit auf dem Chip: Geld spiegelt die Faehigkeit zur Kooperation.", "Niezależnie od tego, czy wyryto go na kamieniu, wybito w srebrze, czy zapisano w procesorze, pieniądz pozostaje pomnikiem ludzkiej współpracy."),
      ],
      DigitalMonetaryFutureDiagram,
    ),
  ],
  toyIntro: T(
    "Experiment with the money printer: increase the money supply and observe how expanding paper currency without more goods causes prices to soar.",
    "Experimentiere mit der Notenpresse: Erhoehe die Geldmenge und erlebe, wie Preise steigen, wenn nicht mehr Gueter entstehen.",
    "Uruchom prasę drukarską: zwiększaj podaż pieniądza i zobacz, jak drukowanie papieru bez dodatkowych towarów prowadzi do skoku cen."),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "What defines 'fiat money' in modern economics?",
        "Was zeichnet 'Fiatgeld' in der modernen Volkswirtschaft aus?",
        "Czym charakteryzuje się 'pieniądz fiducjarny' (fiat) we współczesnej ekonomii?",
      ),
      options: [
        { text: T("Currency that has value because the government declares it legal tender and citizens maintain collective trust in its purchasing power, without being backed by physical gold", "Geld, das seinen Wert aus dem gesetzlichen Status und dem Vertrauen der Buerger bezieht, ohne durch Gold gedeckt zu sein", "Pieniądz, którego wartość wynika z mocy prawa (prawny środek płatniczy) oraz powszechnego zaufania obywateli, bez pokrycia w złocie"), correct: true },
        { text: T("Money manufactured exclusively by Italian automobile companies", "Geld, das ausschliesslich von italienischen Automobilherstellern gepraegt wird", "Pieniądze produkowane wyłącznie przez włoskie fabryki samochodów"), correct: false },
        { text: T("Banknotes that can be exchanged for free ice cream on bank holidays", "Geldscheine, die an Feiertagen gegen kostenlose Eiscreme eingetauscht werden koennen", "Banknoty, które w dni świąteczne można bezpłatnie wymienić na lody"), correct: false },
      ],
      hint: T(
        "Think about why a 10-euro note is accepted in bakeries even though the paper itself has no gold inside it.",
        "Denke daran, warum ein Baecker einen 10-Euro-Schein annimmt, obwohl das Papier keinen Goldfaden enthaelt.",
        "Pomyśl, dlaczego piekarz przyjmuje banknot 10 euro, mimo że papier sam w sobie nie zawiera ani grama złota."),
    },
    {
      kind: "choice",
      prompt: T(
        "Which of the following describes the 'store of value' function of money?",
        "Welche Aussage beschreibt die Funktion des Geldes als 'Wertaufbewahrungsmittel'?",
        "Które zdanie opisuje funkcję pieniądza jako 'magazynu wartości' (store of value)?",
      ),
      options: [
        { text: T("It allows people to save purchasing power earned today to buy goods and services predictably in the future", "Es ermoeglicht, heute verdiente Kaufkraft zu sparen, um spaeter verlaesslich Waren zu kaufen", "Pozwala zachować siłę nabywczą wypracowaną dzisiaj, aby w przyszłości móc kupić za nią potrzebne towary i usługi"), correct: true },
        { text: T("It makes paper bills glow brightly in pitch-black rooms at night", "Es laesst Geldscheine nachts in dunklen Raeumen hell aufleuchten", "Sprawia, że banknoty świecą w ciemności w nocy"), correct: false },
        { text: T("It forces everyone to spend all their cash within three minutes of receiving it", "Es zwingt jeden Buerger, sein Geld innerhalb von drei Minuten auszugeben", "Zmusza każdego do wydania całej gotówki w ciągu trzech minut od jej otrzymania"), correct: false },
      ],
      hint: T(
        "Think about putting savings in a deposit account for next year's summer camp.",
        "Denke an Ersparnisse auf dem Sparkonto fuer das Ferienlager im naechsten Jahr.",
        "Pomyśl o odkładaniu oszczędności na koncie bankowym na przyszłoroczny wyjazd wakacyjny."),
    },
    {
      kind: "widget",
      prompt: T(
        "Identify why fiat currencies hold real purchasing power in everyday commerce.",
        "Erklaere, warum Fiat-Waehrungen im Alltag echte Kaufkraft besitzen.",
        "Wskaż powód, dla którego waluty fiducjarne posiadają realną siłę nabywczą w handlu.",
      ),
      Widget: CurrenciesWidget,
      hint: T(
        "Focus on legal tender status, tax obligations, and institutional monetary credibility.",
        "Achte auf den Status als gesetzliches Zahlungsmittel, Steuerpflicht und Notenbankvertrauen.",
        "Zwróć uwagę na status prawnego środka płatniczego, wymóg płacenia podatków oraz zaufanie do banku centralnego."),
    },
  ],
  askDad: T(
    "Ask your parent: What forms of payment do they use most often (cash, debit cards, mobile wallet apps), and do they remember paying with older legacy currencies?",
    "Frage deine Eltern: Welche Zahlungsmittel nutzen sie am haeufigsten (Bargeld, Girokarte, Smartphone), und erinnern sie sich noch an D-Mark oder Zloty vor der Waehrungsreform?",
    "Zapytaj rodziców: Jakimi środkami płacą najczęściej (gotówka, karta, BLIK/telefon), i czy pamiętają dawne waluty sprzed reform gospodarczych?"),
  realLife: {
    title: T(
      "Real world: The Nixon Shock of 1971 ending the Bretton Woods gold peg and the creation of the Euro in 1999",
      "Echte Welt: Der Nixon-Schock von 1971 und die Geburt des Euro 1999",
      "Prawdziwy świat: Szok Nixona w 1971 r. (koniec parytetu złota) i narodziny waluty Euro w 1999 r.",
    ),
    body: T(
      "On August 15, 1971, US President Richard Nixon severed the US dollar's direct convertibility into gold, permanently ending the post-WWII Bretton Woods monetary system and inaugurating the modern era of pure floating fiat currencies. Three decades later on January 1, 1999, European nations united their sovereign currencies into the Euro, creating the world's second-largest reserve currency managed by the European Central Bank.",
      "Am 15. August 1971 beendete US-Praesident Richard Nixon die Goldeinloesung des US-Dollars, was das Bretton-Woods-Abkommen beendete und das Zeitalter reiner Fiat-Waehrungen einlaeutete. Drei Jahrzehnte spaeter, am 1. Januar 1999, fusionierten europaeische Laender ihre Waehrungen zum Euro, der heute von der EZB gesteuert wird und die zweitwichtigste Leitwaehrung der Welt ist.",
      "15 sierpnia 1971 roku prezydent USA Richard Nixon zerwał powiązanie dolara ze złotem (tzw. szok Nixona), kończąc porozumienie z Bretton Woods i otwierając erę płynnych walut fiducjarnych. Trzydzieści lat później, 1 stycznia 1999 roku, państwa europejskie połączyły swoje waluty narodowe w Euro, tworząc drugą najważniejszą walutę rezerwową na świecie zarządzaną przez EBC."),
  },
  factCard: {
    claims: [
      { text: T("President Richard Nixon suspended the convertibility of the US dollar into gold on August 15, 1971, marking the transition to pure global fiat currency.", "Richard Nixon hob am 15. August 1971 die Goldeinloesung des Dollars auf, was den Uebergang zu reinem Fiatgeld markierte.", "Prezydent Richard Nixon zawiesił wymienialność dolara na złoto 15 sierpnia 1971 r., inaugurując epokę czystego pieniądza fiducjarnego."), source: "https://www.federalreservehistory.org/essays/nixon-shock" },
      { text: T("The Euro was officially launched as an electronic currency on January 1, 1999, with physical banknotes and coins entering circulation on January 1, 2002.", "Der Euro wurde am 1. Januar 1999 bargeldlos und 2002 als Bargeld in der Eurozone eingefuehrt.", "Euro zadebiutowało w rozliczeniach bezgotówkowych 1 stycznia 1999 r., a banknoty i monety weszły do obiegu 1 stycznia 2002 r."), source: "https://economy-finance.ec.europa.eu/euro_en" },
      { text: T("Carl Menger published 'On the Origins of Money' in 1892, demonstrating how precious metals organically emerged as liquid mediums of exchange through spontaneous market order.", "Carl Menger erklaerte 1892 in 'Geld', wie Edelmetalle spontan als marktgerechte Tauschmittel entstanden.", "Carl Menger opublikował w 1892 roku 'O pochodzeniu pieniądza', wyjaśniając ewolucyjne wyłonienie się kruszców jako uniwersalnych środków wymiany."), source: "https://cdn.mises.org/On%20the%20Origins%20of%20Money_5.pdf" },
      { text: T("Weimar Germany's hyperinflation peaked in November 1923, requiring one trillion paper marks to purchase what one mark bought nine years earlier.", "Die deutsche Hyperinflation gipfelte im November 1923, als eine Billion Papiermark den Gegenwert einer Vorkriegsmark erreichten.", "Hiperinflacja w Republice Weimarskiej osiągnęła szczyt w listopadzie 1923 r., gdy bilion marek wart był tyle, co jedna marka przed I wojną światową."), source: "https://www.bundesbank.de/de/aufgaben/themen/100-jahre-hoehepunkt-der-hyperinflation-917124" },
      { text: T("The Bank for International Settlements (BIS) Annual Economic Report analyzes central bank digital currencies (CBDCs) and tokenized deposit ledgers.", "Die Bank fuer Internationalen Zahlungsausgleich (BIZ) untersucht im Jahresbericht digitale Zentralbankwaehrungen (CBDCs).", "Bank Rozrachunków Międzynarodowych (BIS) w swoich raportach rocznych analizuje rozwój cyfrowych walut banków centralnych (CBDC)."), source: "https://www.bis.org/publ/arpdf/ar2023e.htm" },
    ],
    simplified: [
      T(
        "Complex monetary evolution theories and legal tender institutional jurisprudence are framed via clear transitions from gold coins to banknotes and smartphone ledgers.",
        "Komplexe Waehrungshistorie und das Konzept des gesetzlichen Zahlungsmittels wurden durch den Uebergang von Goldmuenzen zu Smartphone-Zahlungen anschaulich gemacht.",
        "Złożoną ewolucję pieniądza i zagadnienia prawnego środka płatniczego zilustrowano poprzez czytelne przejście od złotych monet do banknotów i płatności telefonem."),
    ],
  },
};
