import { useState } from "react";
import { animatedBeat } from "../../../lesson/toolkit";
import type { DiagramProps, Lesson, Text, ToyProps, WidgetProps } from "../../../lesson/types";

const T = (en: string, de: string, pl: string): Text => ({ en, de, pl });

function NeuralNetworkWeightsDiagram({ lang, step }: DiagramProps) {
  const name = lang === "pl" ? "Ania" : lang === "de" ? "Anna" : "Aish";
  const label = lang === "pl" ? "Aish i sieci neuronowe: uczenie maszynowe przez optymalizację wag" : lang === "de" ? "Anna und neuronale Netze: Maschinelles Lernen durch Gewichtsanpassung" : "Aish and neural networks: machine learning through weight optimization";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#0f172a" stroke="#8b5cf6" strokeWidth="2" />
      <g>
        <circle cx="80" cy="110" r="28" fill="#f3cfa6" stroke="#8b5cf6" strokeWidth="2" />
        <path d="M 52 105 C 52 70 108 70 108 105" fill="#4c1d95" />
        <circle cx="72" cy="107" r="2.5" fill="#0f172a" />
        <circle cx="88" cy="107" r="2.5" fill="#0f172a" />
        <path d="M 76 119 Q 80 125 84 119" stroke="#0f172a" strokeWidth="2" fill="none" />
        <path d="M 56 185 L 62 140 Q 80 135 98 140 L 104 185 Z" fill="#7c3aed" stroke="#8b5cf6" strokeWidth="2" />
        <text x="80" y="205" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ddd6fe">{name}</text>
      </g>
      <g>
        <rect x="135" y="35" width="230" height="32" rx="6" fill="#1e293b" stroke="#8b5cf6" strokeWidth="1.5" />
        <text x="250" y="55" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#ede9fe">
          🧠 {lang === "pl" ? "Sztuczna Inteligencja" : lang === "de" ? "Kuenstliche Intelligenz" : "Artificial Intelligence"}
        </text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="135" y="80" width="230" height="52" rx="8" fill="#1e293b" stroke="#7c3aed" strokeWidth="1.5" />
          <text x="250" y="102" textAnchor="middle" fontSize="16">📊 ➡️ 🧮 ➡️ 💡</text>
          <text x="250" y="122" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#a78bfa">
            {lang === "pl" ? "Rozpoznawanie wzorców z danych" : lang === "de" ? "Mustererkennung aus Daten" : "Learning Patterns From Data"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="135" y="145" width="230" height="60" rx="8" fill="#4c1d95" />
          <text x="250" y="170" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Uczenie zamiast sztywnego kodowania" : lang === "de" ? "Lernen statt starrer Regeln" : "Learning Instead of Hardcoded Rules"}
          </text>
          <text x="250" y="190" textAnchor="middle" fontSize="10" fill="#ddd6fe">
            {lang === "pl" ? "Dopasowywanie miliardów wag w sieci" : lang === "de" ? "Milliarden Parameter optimieren Vorhersagen" : "Gradient descent tuning billions of parameters"}
          </text>
        </g>
      )}
    </svg>
  );
}

function SymbolicRulesVsDeepLearningDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Klasyczne programowanie regułowe kontra głębokie sieci neuronowe" : lang === "de" ? "Klassische Regelprogrammierung gegen Deep Learning" : "Rule-based expert systems versus deep neural learning";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#fafafa" stroke="#475569" strokeWidth="2" />
      <g>
        <rect x="40" y="45" width="140" height="65" rx="8" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
        <text x="110" y="70" textAnchor="middle" fontSize="14">📜 ❓</text>
        <text x="110" y="88" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#991b1b">Rule-Based Code</text>
        <text x="110" y="102" textAnchor="middle" fontSize="8" fill="#b91c1c">If-else breaks on real chaos</text>

        <rect x="220" y="45" width="140" height="65" rx="8" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
        <text x="290" y="70" textAnchor="middle" fontSize="14">🕸️ ⚡</text>
        <text x="290" y="88" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#5b21b6">Deep Learning</text>
        <text x="290" y="102" textAnchor="middle" fontSize="8" fill="#6d28d9">Infers latent features directly</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="130" width="320" height="46" rx="6" fill="#1e293b" />
          <text x="200" y="150" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#c084fc">
            Statistical Generalization Across Unseen Data
          </text>
          <text x="200" y="165" textAnchor="middle" fontSize="8" fill="#cbd5e1">
            {lang === "pl" ? "Model uczy się cech z milionów zdjęć; nie trzeba opisywać każdego piksela ręcznie" : lang === "de" ? "Modelle lernen Merkmale aus Beispielen statt aus handgeschriebenen Regeln" : "Neural layers discover abstractions: edges, textures, objects, concepts"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="190" width="320" height="26" rx="6" fill="#5b21b6" />
          <text x="200" y="207" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Przełom w rozpoznawaniu mowy, obrazu i języka" : lang === "de" ? "Durchbruch bei Sprache, Bildern und Textverstaendnis" : "Mastering vision, natural language, and protein folding"}
          </text>
        </g>
      )}
    </svg>
  );
}

function TransformerAttentionMechanismDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Architektura Transformera i mechanizm uwagi (Attention)" : lang === "de" ? "Transformer-Architektur und Attention-Mechanismus" : "Transformer architecture and self-attention mechanism";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#f8fafc" stroke="#334155" strokeWidth="2" />
      <g>
        <rect x="50" y="55" width="70" height="35" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
        <text x="85" y="77" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1e40af">Token 1: The</text>

        <rect x="140" y="55" width="70" height="35" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
        <text x="175" y="77" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1e40af">Token 2: bank</text>

        <rect x="230" y="55" width="70" height="35" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
        <text x="265" y="77" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1e40af">Token 3: of</text>

        <rect x="320" y="55" width="60" height="35" rx="6" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
        <text x="350" y="77" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#5b21b6">river</text>

        <path d="M 175 55 Q 260 20 350 55" fill="none" stroke="#7c3aed" strokeWidth="2.5" />
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="130" width="320" height="44" rx="6" fill="#1e293b" />
          <text x="200" y="148" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#a78bfa">
            Self-Attention Calculates Context Between All Words in Parallel
          </text>
          <text x="200" y="163" textAnchor="middle" fontSize="8" fill="#e2e8f0">
            {lang === "pl" ? "Model wie, czy 'bank' oznacza brzeg rzeki czy instytucję finansową" : lang === "de" ? "Attention erkennt Kontext: 'Bank' als Flussufer oder Geldinstitut" : "Attention weights determine semantic context dynamically across long sequences"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="190" width="320" height="26" rx="6" fill="#4c1d95" />
          <text x="200" y="207" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Podstawa współczesnych modeli językowych (LLM)" : lang === "de" ? "Die Basis aller modernen grossen Sprachmodelle (LLMs)" : "The structural foundation of modern generative AI and LLMs"}
          </text>
        </g>
      )}
    </svg>
  );
}

function ComputeDataScalingLawsDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Prawa skalowania AI: moc obliczeniowa, dane i parametry" : lang === "de" ? "Skalierungsgesetze der KI: Rechenleistung, Daten und Modellgroesse" : "Scaling laws of AI: compute, training data, and parameter count";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#fdf4ff" stroke="#a21caf" strokeWidth="2" />
      <g>
        <circle cx="90" cy="85" r="28" fill="#fae8ff" stroke="#a21caf" strokeWidth="1.5" />
        <text x="90" y="80" textAnchor="middle" fontSize="14">⚡ 💻</text>
        <text x="90" y="98" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#701a75">Compute (FLOPs)</text>

        <circle cx="200" cy="85" r="28" fill="#fae8ff" stroke="#a21caf" strokeWidth="1.5" />
        <text x="200" y="80" textAnchor="middle" fontSize="14">📚 🔤</text>
        <text x="200" y="98" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#701a75">Tokens (Data)</text>

        <circle cx="310" cy="85" r="28" fill="#fae8ff" stroke="#a21caf" strokeWidth="1.5" />
        <text x="310" y="80" textAnchor="middle" fontSize="14">🕸️ 🧮</text>
        <text x="310" y="98" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#701a75">Parameters</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="130" width="320" height="44" rx="6" fill="#1e293b" />
          <text x="200" y="148" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#f472b6">
            Predictable Power-Law Loss Reductions
          </text>
          <text x="200" y="163" textAnchor="middle" fontSize="8" fill="#cbd5e1">
            {lang === "pl" ? "Zwiększanie skali obliczeń systematycznie obniża błąd przewidywania kolejnego tokena" : lang === "de" ? "Mehr Rechenleistung fuehrt mathematisch praezise zu besseren Antworten" : "Loss smoothly decreases as a power-law function of compute and parameters"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="190" width="320" height="26" rx="6" fill="#86198f" />
          <text x="200" y="207" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#ffffff">
            {lang === "pl" ? "Inwestycje w klastry GPU napędzają postęp modeli" : lang === "de" ? "Gigantische Rechenzentren treiben neue Faehigkeiten voran" : "Massive data-center clusters unlock emergent reasoning capabilities"}
          </text>
        </g>
      )}
    </svg>
  );
}

function AlignmentEthicsGuardrailsDiagram({ lang, step }: DiagramProps) {
  const label = lang === "pl" ? "Dopasowanie i etyka AI: bezpieczne kierowanie potężnymi modelami" : lang === "de" ? "KI-Alignment und Ethik: Verlaessliche Leitplanken fuer maechtige Systeme" : "AI alignment and ethics: reliable safety guardrails for powerful intelligence";

  return (
    <svg viewBox="0 0 400 240" className="diagram-svg" role="img" aria-label={label}>
      <rect x="10" y="10" width="380" height="220" rx="14" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
      <g>
        <circle cx="200" cy="80" r="34" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
        <text x="200" y="75" textAnchor="middle" fontSize="18">🛡️ ⚖️</text>
        <text x="200" y="95" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#15803d">AI Alignment</text>
      </g>
      {step >= 2 && (
        <g>
          <rect x="40" y="130" width="320" height="46" rx="6" fill="#15803d" />
          <text x="200" y="148" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff">
            Ensuring Systems Are Helpful, Honest, and Harmless
          </text>
          <text x="200" y="163" textAnchor="middle" fontSize="8" fill="#bbf7d0">
            {lang === "pl" ? "Modele muszą być zgodne z prawami człowieka, prawdą naukową i dobrem społecznym" : lang === "de" ? "Systeme muessen Menschenrechten, Wahrheit und gesellschaftlichem Nutzen dienen" : "Tuning models to resist deception, mitigate bias, and respect fundamental human dignity"}
          </text>
        </g>
      )}
      {step >= 3 && (
        <g>
          <rect x="40" y="195" width="320" height="26" rx="6" fill="#1e293b" />
          <text x="200" y="212" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#f8fafc">
            {lang === "pl" ? "Sztuczna inteligencja jako wzmacniacz ludzkiej mądrości" : lang === "de" ? "Kuenstliche Intelligenz als Verstaerker menschlicher Weitsicht" : "Artificial intelligence as a transformative cognitive partner"}
          </text>
        </g>
      )}
    </svg>
  );
}

function Toy({ onDone }: ToyProps) {
  const [trainingEpochs, setTrainingEpochs] = useState(1);
  const accuracy = Math.min(99, 45 + trainingEpochs * 11);
  const isWellTrained = trainingEpochs >= 5;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
      <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>
        Neural Model Training: Epoch {trainingEpochs}/5 | Benchmark Accuracy: {accuracy}%
      </p>
      <div style={{ display: "flex", gap: "8px" }}>
        <button
          type="button"
          className="btn"
          onClick={() => {
            const next = Math.min(5, trainingEpochs + 1);
            setTrainingEpochs(next);
            if (next >= 5) onDone?.();
          }}
        >
          Run Gradient Descent Batch (+Scale Compute)
        </button>
        <button
          type="button"
          className="btn btn-quiet"
          onClick={() => setTrainingEpochs(1)}
        >
          Reset Model Weights (Random Noise)
        </button>
      </div>
      <div style={{ padding: "12px", background: isWellTrained ? "#eef8ef" : "#faf5ff", borderRadius: "10px", width: "100%", textAlign: "center" }}>
        {isWellTrained
          ? "Convergence Reached: Transformer model tunes billions of self-attention weights to achieve 99% accuracy across complex linguistic, coding, and mathematical reasoning tasks!"
          : "Untrained Initialization: Model outputs random sequences with 45% accuracy."}
      </div>
    </div>
  );
}

function AIWidget({ onAnswer }: WidgetProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <p style={{ margin: 0 }}>What makes deep learning and neural network transformers fundamentally different from classical rule-based software programming?</p>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>They only function when computers are wrapped in aluminum foil</button>
      <button type="button" className="btn" onClick={() => onAnswer(true)}>Instead of humans explicitly hand-writing if-then rules for every scenario, neural networks learn complex representations directly from vast data through gradient descent, tuning billions of parameters</button>
      <button type="button" className="btn btn-quiet" onClick={() => onAnswer(false)}>They were invented by 19th-century chimney sweeps to predict the price of coal</button>
    </div>
  );
}

export const lesson: Lesson = {
  id: "ai",
  story: [
    animatedBeat(
      [
        T("Meet Aish. She inputs a complex coding problem into an AI model and watches in astonishment as it explains the mathematical proof in plain language.", "Das ist Anna. Sie stellt einer KI eine knifflige Programmieraufgabe und staunt, wie das System in Sekunden den mathematischen Beweis liefert.", "Poznaj Aish. Wpisuje skomplikowany problem programistyczny do modelu AI i ze zdumieniem obserwuje, jak w kilka sekund wyjaśnia on dowód matematyczny."),
        T("For decades, computer science struggled with tasks that any five-year-old child finds effortless: recognizing a cat, understanding spoken sarcasm, or writing a poem.", "Jahrzehntelang scheiterten Computer an Dingen, die jedes Kind spielend kann: eine Katze erkennen oder feine Ironie verstehen.", "Przez dziesięciolecia komputery ponosiły porażkę przy zadaniach, z którymi radzi sobie pięcioletnie dziecko: rozpoznaniu kota, zrozumieniu ironii czy napisaniu wiersza."),
        T("Classical software required human programmers to anticipate every edge case and write rigid, explicit conditional instructions.", "Klassische Software brauchte von Entwicklern handgeschriebene Regeln fuer jede noch so kleine Ausnahmesituation.", "Klasyczne oprogramowanie wymagało od człowieka przewidzenia każdej sytuacji i ręcznego napisania sztywnych reguł warunkowych."),
      ],
      NeuralNetworkWeightsDiagram,
    ),
    animatedBeat(
      [
        T("Deep learning broke this impasse by emulating the interconnected architecture of biological brain neurons.", "Deep Learning durchbrach diese Mauer, indem es die Architektur biologischer Nervenzellen im Gehirn nachbildete.", "Głębokie uczenie maszynowe przełamało tę barierę, naśladując połączoną sieć neuronów w biologicznym mózgu."),
        T("An artificial neural network consists of layers of mathematical nodes linked by numerical weights.", "Ein kuenstliches neuronales Netz besteht aus Schichten mathematischer Knoten, die ueber Zahlenwerte verbunden sind.", "Sztuczna sieć neuronowa składa się z warstw węzłów matematycznych połączonych liczbowymi wagami."),
        T("During training, the algorithm evaluates millions of examples, calculating its error and adjusting its weights via backpropagation until patterns emerge.", "Beim Training korrigiert der Algorithmus ueber Backpropagation seine Gewichte, bis feine Muster sichtbar werden.", "Podczas treningu algorytm analizuje miliony przykładów, obliczając błąd i korygując wagi metodą wstecznej propagacji, aż wyłonią się wzorce."),
      ],
      SymbolicRulesVsDeepLearningDiagram,
    ),
    animatedBeat(
      [
        T("In 2017, computer scientists at Google introduced the Transformer architecture in the landmark paper 'Attention Is All You Need'.", "2017 revolutionierten Forscher bei Google die KI mit dem Aufsatz 'Attention Is All You Need' und der Transformer-Architektur.", "W 2017 roku naukowcy z Google zrewolucjonizowali sztuczną inteligencję publikacją 'Attention Is All You Need', wprowadzającą architekturę Transformera."),
        T("Transformers replaced sequential processing with 'self-attention', allowing models to weigh the relationship between every word in a sentence simultaneously.", "Transformer ersetzten sequenzielle Schritte durch Self-Attention: Das Modell erfasst alle Woerter eines Satzes gleichzeitig im Kontext.", "Transformery zastąpiły przetwarzanie sekwencyjne mechanizmem uwagi (self-attention), analizując powiązania między wszystkimi słowami naraz."),
        T("This allowed large language models to master nuanced syntactic context, reasoning analogies, and computer code across vast document libraries.", "Dadurch verstehen Sprachmodelle feinste Sprachzusammenhaenge, Analogien und Programmiercode ueber Millionen Dokumente hinweg.", "Pozwoliło to dużym modelom językowym bezbłędnie chwytać kontekst, rozumować przez analogię i pisać kod na bazie bibliotek wiedzy."),
      ],
      TransformerAttentionMechanismDiagram,
    ),
    animatedBeat(
      [
        T("Researchers discovered empirical 'scaling laws': model intelligence scales predictably with compute power, data tokens, and parameter count.", "Forscher entdeckten verlaessliche Skalierungsgesetze: Die Faehigkeiten steigen messbar mit Rechenleistung, Daten und Parametern.", "Badacze odkryli empiryczne prawa skalowania: inteligencja modeli rośnie przewidywalnie wraz z mocą obliczeniową, liczbą danych i parametrów."),
        T("By training models on thousands of high-speed GPUs, systems developed emergent abilities, solving university-level logic exams.", "Auf tausenden Spezialprozessoren trainiert, entwickelten Modelle neue Faehigkeiten und loesten akademische Pruefungen.", "Trenowane na tysiącach procesorów graficznych modele zyskały niespotykane zdolności, rozwiązując testy logiczne na poziomie akademickim."),
        T("AI evolved from a narrow perception tool into a general reasoning engine capable of accelerating scientific discovery in medicine and energy.", "KI wuchs vom einfachen Werkzeug zum vielseitigen Denker heran, der Forschung in Medizin und Physik rasant beschleunigt.", "AI ewoluowała z wąskiego narzędzia klasyfikacji w uniwersalny silnik wnioskowania, przyspieszający odkrycia w medycynie i fizyce."),
      ],
      ComputeDataScalingLawsDiagram,
    ),
    animatedBeat(
      [
        T("With immense technological capability comes profound civic and ethical responsibility.", "Mit dieser enormen Faehigkeit waechst auch die ethische und gesellschaftliche Verantwortung.", "Wraz z ogromną mocą technologiczną pojawia się fundamentalna odpowiedzialność obywatelska i etyczna."),
        T("Ensuring that AI systems remain aligned with human values, fairness, transparency, truthfulness, and safety, is among humanity's greatest frontiers.", "Sicherzustellen, dass KI dem Wohl der Menschen dient, ehrlich bleibt und fair entscheidet, ist eine Jahrhundertaufgabe.", "Dbanie o to, by modele AI były bezpieczne, sprawiedliwe, prawdomówne i służyły dobru człowieka, to kluczowe wyzwanie naszej cywilizacji."),
        T("When guided by human wisdom, artificial intelligence becomes our most powerful cognitive amplifier in solving global challenges.", "Klug und verantwortungsvoll gefuehrt, wird KI zum maechtigsten Werkzeug der Menschheit zur Loesung globaler Krisen.", "Gdy kieruje nią ludzka mądrość i etyka, sztuczna inteligencja staje się najpotężniejszym narzędziem rozwiązywania globalnych wyzwań."),
      ],
      AlignmentEthicsGuardrailsDiagram,
    ),
  ],
  toyIntro: T(
    "Train a deep neural transformer: run gradient descent epochs across vast data batches to adjust self-attention weights and achieve 99% reasoning accuracy.",
    "Trainiere einen Transformer: Fuehre Trainingsschritte ueber grosse Datenmengen aus, optimiere die Gewichte und erreiche 99% Genauigkeit.",
    "Trenuj głęboki model transformera: wykonuj epoki spadku w gradientzie na zbiorach danych, dostrajając wagi uwagi, by osiągnąć 99% dokładności wnioskowania."),
  Toy,
  questions: [
    {
      kind: "choice",
      prompt: T(
        "Why was the introduction of the self-attention mechanism in the 2017 Transformer architecture so revolutionary for machine learning?",
        "Warum war der Attention-Mechanismus in der Transformer-Architektur von 2017 so bahnbrechend?",
        "Dlaczego wprowadzenie mechanizmu uwagi (self-attention) w architekturze Transformera w 2017 roku było przełomem w uczeniu maszynowym?",
      ),
      options: [
        { text: T("It enabled models to process entire textual sequences simultaneously, computing semantic attention weights between all words in parallel rather than word-by-word", "Es ermoeglichte, ganze Texte parallel zu verarbeiten und die Beziehungen zwischen allen Woertern gleichzeitig zu berechnen", "Umożliwiło równoległe przetwarzanie całych sekwencji tekstu, obliczając wagi powiązań między wszystkimi słowami naraz, zamiast słowo po słowie"), correct: true },
        { text: T("It forced computer monitors to turn upside down whenever a question mark was detected", "Es drehte den Bildschirm automatisch auf den Kopf, sobald ein Fragezeichen auftauchte", "Obracało monitor do góry nogami za każdym razem, gdy wykryto znak zapytania"), correct: false },
        { text: T("It replaced all computer microchips with ceramic coffee cups filled with black ink", "Es ersetzte Computerchips durch Kaffeetassen voller Tinte", "Zastąpiło procesory ceramicznymi kubkami pełnymi czarnego atramentu"), correct: false },
      ],
      hint: T(
        "Think about parallel contextual processing versus slow sequential recurrent scanning.",
        "Achte auf parallele Verarbeitung aller Woerter im Kontext gegenueber schrittweiser Analyse.",
        "Zwróć uwagę na równoległą analizę całego kontekstu w porównaniu z powolnym czytaniem krok po kroku."),
    },
    {
      kind: "choice",
      prompt: T(
        "What do empirical AI 'scaling laws' demonstrate regarding the training of large foundational models?",
        "Was zeigen die empirischen KI-Skalierungsgesetze beim Training grosser Modelle?",
        "Co wykazują empiryczne prawa skalowania AI podczas trenowania wielkich modeli fundamentowych?",
      ),
      options: [
        { text: T("Model loss and capabilities scale with mathematical predictability as a power-law function of compute budget, training tokens, and parameter count", "Modellfaehigkeiten und Fehlerraten verbessern sich mathematisch praezise als Potenzgesetz von Rechenaufwand, Daten und Parametern", "Zdolności modeli i spadek błędów skalują się z matematyczną przewidywalnością jako funkcja potęgowa budżetu obliczeń, danych i parametrów"), correct: true },
        { text: T("Models immediately forget all human languages if fed more than two sentences per hour", "Modelle vergessen sofort alle Sprachen, wenn sie mehr als zwei Saetze pro Stunde lesen", "Modele natychmiast zapominają języki, jeśli przeczytają więcej niż dwa zdania na godzinę"), correct: false },
        { text: T("Artificial intelligence can only operate when powered by solar panels on the Moon", "KI funktioniert ausschliesslich mit Solarmodulen auf dem Mond", "Sztuczna inteligencja może działać tylko wtedy, gdy zasilają ją panele słoneczne na Księżycu"), correct: false },
      ],
      hint: T(
        "Think about predictable performance improvements driven by compute and data scale.",
        "Denke an die messbare Leistungssteigerung durch mehr Rechenzeit, Daten und Modellgroesse.",
        "Pomyśl o przewidywalnym wzroście możliwości wraz ze wzrostem mocy obliczeniowej i ilości danych."),
    },
    {
      kind: "widget",
      prompt: T(
        "Examine why gradient descent on deep neural networks represents a paradigm shift away from classical explicit programming.",
        "Untersuche, warum Gradientenverfahren und neuronale Netze einen Paradigmenwechsel gegenueber klassischer Programmierung darstellen.",
        "Zbadaj, dlaczego metoda spadku w gradientzie w sieciach neuronowych stanowi zmianę paradygmatu w stosunku do klasycznego kodowania reguł.",
      ),
      Widget: AIWidget,
      hint: T(
        "Focus on learning representations directly from data rather than handcrafting brittle rules.",
        "Achte darauf, wie Modelle Merkmale selbst aus Daten lernen, statt starre Wenn-Dann-Regeln zu brauchen.",
        "Skup się na samodzielnym uczeniu się cech z danych zamiast pisania sztywnych reguł warunkowych."),
    },
  ],
  askDad: T(
    "Ask your parent: What is the most impressive or surprising thing you have seen artificial intelligence do recently?",
    "Frage deine Eltern: Was war das Beeindruckendste oder Ueberraschendste, was ihr in letzter Zeit von einer KI gesehen habt?",
    "Zapytaj rodziców: Co było najbardziej zaskakującą lub imponującą rzeczą, jaką widzieliście w wykonaniu sztucznej inteligencji w ostatnim czasie?"),
  realLife: {
    title: T(
      "Real world: Google's Transformer Paper 'Attention Is All You Need' (2017)",
      "Echte Welt: Googles Transformer-Veroeffentlichung 'Attention Is All You Need' (2017)",
      "Prawdziwy świat: Publikacja Google o architekturze Transformera 'Attention Is All You Need' (2017)",
    ),
    body: T(
      "In June 2017, eight researchers at Google Brain and Google Research published 'Attention Is All You Need', introducing the Transformer network architecture. By abandoning recurrent and convolutional architectures in favor of multi-head self-attention, Transformers unlocked unprecedented parallel training on massive GPU clusters. This single structural breakthrough sparked the modern revolution in generative AI, powering models that draft software, synthesize vaccines, and translate languages across the globe.",
      "Im Juni 2017 veroeffentlichten acht Google-Forscher den Aufsatz 'Attention Is All You Need' und stellten die Transformer-Architektur vor. Durch den Verzicht auf rekurrente Netze ermoeglichte Transformer massives paralleles Training auf GPU-Clustern. Dieser Durchbruch entfachte die moderne Revolution der generativen KI, die heute Software schreibt, Proteine faltet und Sprachen weltweit uebersetzt.",
      "W czerwcu 2017 roku zespół ośmiu badaczy z Google opublikował artykuł 'Attention Is All You Need', przedstawiający architekturę Transformera. Dzięki zastąpieniu sieci rekurencyjnych mechanizmem uwagi (multi-head self-attention), stało się możliwe równoległe trenowanie na wielkich klastrach GPU. Ten pojedynczy przełom dał początek współczesnej rewolucji generatywnej AI, zasilając modele piszące kod, projektujące leki i tłumaczące języki świata."),
  },
  factCard: {
    claims: [
      { text: T("Vaswani et al. published 'Attention Is All You Need' at the NeurIPS conference in December 2017, introducing the Transformer architecture.", "Vaswani et al. praesentierten im Dezember 2017 auf der NeurIPS-Konferenz die Transformer-Architektur.", "Vaswani i współautorzy opublikowali w grudniu 2017 r. na konferencji NeurIPS artykuł 'Attention Is All You Need', wprowadzając architekturę Transformera."), source: "https://arxiv.org/abs/1706.03762" },
      { text: T("Jared Kaplan et al. at OpenAI published 'Scaling Laws for Neural Language Models' in January 2020, formalizing power-law loss trends.", "Jared Kaplan und Kollegen formulierten im Januar 2020 die Skalierungsgesetze fuer neuronale Sprachmodelle.", "Jared Kaplan i współpracownicy z OpenAI sformalizowali prawa skalowania dla neuronowych modeli językowych w styczniu 2020 r."), source: "https://arxiv.org/abs/2001.08361" },
      { text: T("DeepMind's AlphaFold 2 accurately predicted the 3D structure of over 200 million cataloged proteins in July 2022.", "DeepMinds AlphaFold 2 sagte im Juli 2022 die 3D-Struktur von ueber 200 Millionen Proteinen praezise voraus.", "Opracowany przez DeepMind system AlphaFold 2 przewidział w lipcu 2022 r. strukturę trójwymiarową ponad 200 milionów białek."), source: "https://www.nature.com/articles/s41586-021-03819-2" },
      { text: T("Yann LeCun, Yoshua Bengio, and Geoffrey Hinton received the ACM A.M. Turing Award in 2018 for conceptual breakthroughs in deep neural networks.", "LeCun, Bengio und Hinton erhielten 2018 den Turing-Preis fuer fundamentale Durchbrueche im Deep Learning.", "Yann LeCun, Yoshua Bengio i Geoffrey Hinton otrzymali w 2018 r. Nagrodę Turinga za przełomowe prace nad głębokimi sieciami neuronowymi."), source: "https://amturing.acm.org/award_winners/hinton_4791679.cfm" },
      { text: T("The European Union enacted the Artificial Intelligence Act (Regulation 2024/1689) in July 2024, setting risk-based global safety standards.", "Die Europaeische Union verabschiedete im Juli 2024 das KI-Gesetz zur risikobasierten Regulierung von Systemen.", "Unia Europejska przyjęła w lipcu 2024 r. Akt o sztucznej inteligencji (AI Act), wprowadzający pierwsze na świecie standardy bezpieczeństwa oparte na ryzyku."), source: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689" },
    ],
    simplified: [
      T(
        "High-dimensional vector embedding calculus, stochastic gradient descent backpropagation, and multi-head attention math are translated into intuitive model training toys and clear ethical principles.",
        "Vektoreinbettungen, stochastische Gradientenverfahren und Attention-Matrizen wurden in spielerische Trainingssimulationen und klare ethische Leitlinien uebersetzt.",
        "Wielowymiarowe przestrzenie wektorowe, metoda wstecznej propagacji błędu i macierze uwagi zostały przedstawione w formie przystępnych symulatorów uczenia modeli i jasnych zasad etycznych."),
    ],
  },
};
