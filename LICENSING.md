# Licensing

Ripples is source-available, not open source. You can read it, run it and learn from it. You cannot use it to make money.

| What           | License                      | File                                       |
| -------------- | ---------------------------- | ------------------------------------------ |
| Code           | PolyForm Noncommercial 1.0.0 | [LICENSE](LICENSE)                         |
| Lesson content | CC BY-NC-ND 4.0              | [LICENSE-CONTENT.txt](LICENSE-CONTENT.txt) |

## Lesson content

These files are covered by CC BY-NC-ND 4.0 (share with credit, no commercial use, no modified copies shared):

- `src/content/**` (stories, questions, fact cards, diagrams, toys, all languages)
- `src/timeline/data.ts`
- `src/components/Otto.tsx` and `src/components/cast.tsx` (Otto and the cast of characters)
- `public/icon.svg` and `public/apple-touch-icon.png`
- `public/audio/**` (Otto's voice files, see below)

Everything else is code under PolyForm Noncommercial.

## What you can do

- Clone it and run it locally.
- Containerise it, deploy it to your own cluster, break it, rebuild it: practising DevOps, cloud and CI/CD on it is fine.
- Use it for study, research, teaching and hobby projects.
- Fork it for your own noncommercial learning.

## What you cannot do

- Sell it, or sell access to it, as an app, a subscription, an ad-supported site or a service.
- Use it inside a for-profit product or business.
- Publish the lessons as your own, or sell translated or edited copies.

## Commercial use

Want to use Ripples commercially? Ask first: open an issue on this repository. Sunny Redhu holds the copyright and can grant a separate commercial license.

## Third-party code

The npm dependencies keep their own licenses (mostly MIT). They are not covered by the licenses above.

## Otto's voice files

`web/public/audio/**` holds Otto reading the lesson lines aloud. They are lesson content (CC BY-NC-ND 4.0), made on a computer with free text-to-speech voices by `npm run voices` (`scripts/voices/`).

| Language | Voice                          | Model and license                                                                                                                                                |
| -------- | ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| English  | `af_bella`                     | [Kokoro-82M](https://huggingface.co/hexgrad/Kokoro-82M) by hexgrad, Apache-2.0                                                                                   |
| German   | `df_kerstin`                   | [Kokoro-82M v1.0 German](https://huggingface.co/crane-local-ai/Kokoro-82M-v1.0-German-ONNX), Apache-2.0, fine-tuned on the Kerstin 1.0 dataset (CC0-1.0)         |
| Polish   | `pl_PL-justyna_wg_glos-medium` | [Piper Polish models](https://huggingface.co/WitoldG/polish_piper_models) by WitoldG, declared MIT; training data and speaker not published (see the risk below) |

- Neither Kokoro repository ships a NOTICE file (checked 2026-11-24), so there is no NOTICE text to reproduce. This section is the credit.
- **Known risk, accepted by Sunny:** the Polish voice is a fine-tune of the Piper `lessac` checkpoint, which Piper does not list as cleared for commercial use, and its speaker and consent are not documented. If it has to go, the clean replacement is Piper `pl_PL-gosia-medium` (CC0): change `web/src/voice/voices.json` and `scripts/voices/models.json`, then run `npm run voices -- pl`.
- The tools that make the files are not part of the app: `kokoro-onnx` (MIT) and `piper-tts` (GPL-3.0). The GPL covers the tool, not the audio it outputs (reading of the GPL FAQ, not legal advice).

## Contributions

By opening a pull request you agree that your contribution is licensed under the same terms as the files it changes, and that Sunny Redhu may also relicense it.
