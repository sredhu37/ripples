# ADR 0006: Multilingual i18n Architecture and Cultural Localization (EN-India, DE-Germany, PL-Poland)

## Status

Accepted

## Context

Ripples began as a bilingual (English and German) financial and civic literacy application for 8-year-old children. To support Polish speakers while improving cultural relevance, we are adding Polish (`pl`) as a first-class language.

During this expansion, key architectural and cultural decisions were evaluated:

1. **i18n Implementation Approach:** Whether to introduce third-party libraries (e.g. `react-i18next`, `formatjs`) or stick with standard web APIs and TypeScript compile-time safety.
2. **Cultural Anchoring:** Whether translations should be literal mirrors of the original German/Euro context or localized to real-world anchors familiar to children in each language community.
3. **Fact Cards Multilingualism:** Whether parent verification cards behind the math gate stay English-only or become multilingual.
4. **Language Switcher Ergonomics:** Whether language selection is restricted to the map/name screen or accessible globally on every screen.

## Decision

We establish the following standards:

### 1. Zero External Dependencies & Web Standards

- Avoid external i18n libraries.
- Rely on native browser standards:
  - BCP 47 language tags (`pl-PL`, `en-IN`, `de-DE`).
  - Standard `Intl` APIs (`Intl.NumberFormat`) for number and currency formatting.
  - Native Web Speech API (`SpeechSynthesis`) with regional voices.
- Rely on TypeScript `Record<Lang, string>` for exhaustive compile-time checking so missing translations produce compiler errors before build.

### 2. The Cultural Localization Triad

- **Ripple Town Stories:** Universal and currency-neutral across all languages using coins and tokens.
- **German (`de`):** Localized to Germany, using euros (€), cents, the Bundesbank, and SEPA. Informal address ("du", "Frag Papa"). Speech voice `de-DE`.
- **Polish (`pl`):** Localized to Poland, using Polish złoty (zł), grosze, Narodowy Bank Polski (NBP), and BLIK. Informal address ("ty", "Zapytaj tatę"). Speech voice `pl-PL`.
- **English (`en`):** Localized to India, using Indian rupees (₹), paise, the Reserve Bank of India (RBI), and UPI. Speech voice `en-IN` (fallback to `en-US`).
- Names: The guide "Otto" and the setting "Ripple Town" remain unchanged in all three languages.

### 3. Multilingual Fact Cards

- Fact cards in the parent area will provide verified claims, primary sources, and age-appropriate simplifications in English, German, and Polish.

### 4. Global Language Switcher

- The `LangSwitch` component (`EN | DE | PL`) will be placed in the header of every screen (Name screen, Trail Map, Lesson Runner, Parent Panel, and Fact Cards).
- Switching languages mid-lesson preserves current progress, step, and state while instantly updating UI text and speech synthesis voice.

### 5. Phased Rollout Strategy

- Implementation proceeds in phases:
  - Phase 0: Core infrastructure, global language switcher, speech synthesis tags, and backward-compatible save/restore code.
  - Phases 1 to 6: Lesson content and fact cards localized group by group (Groups 1 through 6).
  - Phase 7: Strict compile-time type lock (`Record<Lang, string>`) and test suite verification.
