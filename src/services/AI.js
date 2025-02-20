export async function detectLanguage(text) {
  if ("ai" in self && "languageDetector" in self.ai) {
    const languageDetectorCapabilities =
      await self.ai.languageDetector.capabilities();
    const canDetect = languageDetectorCapabilities.capabilities;

    let detector;
    if (canDetect === "no") {
      // The language detector isn't usable.
      return;
    }

    if (canDetect === "readily") {
      // The language detector can immediately be used.
      detector = await self.ai.languageDetector.create();
    } else {
      // The language detector can be used after model download.
      detector = await self.ai.languageDetector.create({
        monitor(m) {
          m.addEventListener("downloadprogress", (e) => {
            console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
          });
        },
      });
      await detector.ready;
    }

    const results = await detector.detect(text);

    return results[0];
  }
}

export async function translateLanguage({
  sourceLanguage,
  targetLanguage,
  value,
}) {
  if ("ai" in self && "translator" in self.ai) {
    try {
      const translatorCapabilities = await self.ai.translator.capabilities();
      const available = translatorCapabilities.languagePairAvailable(
        sourceLanguage,
        targetLanguage
      );

      let translator;
      if (available === "no") {
        // language translator isn't useable
        return;
      }

      if (available === "readily") {
        // Create a translator that translates from English to French.
        translator = await self.ai.translator.create({
          sourceLanguage,
          targetLanguage,
        });
      } else {
        // The language translator can be used after model download.
        translator = await self.ai.translator.create({
          sourceLanguage,
          targetLanguage,
          monitor(m) {
            m.addEventListener("downloadprogress", (e) => {
              console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
            });
          },
        });
      }

      return await translator.translate(value);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export async function summarizeText(text) {
  if ("ai" in self && "summarizer" in self.ai) {
    const options = {
      type: "key-points",
      format: "plain-text",
      length: "short",
    };

    let summarizer;
    const available = (await self.ai.summarizer.capabilities()).available;
    if (available === "no") {
      // The Summarizer API isn't usable.
      return;
    }

    if (available === "readily") {
      // The Summarizer API can be used immediately .
      summarizer = await self.ai.summarizer.create(options);
    } else {
      // The Summarizer API can be used after the model is downloaded.
      summarizer = await self.ai.summarizer.create(options);
      summarizer.addEventListener("downloadprogress", (e) => {
        console.log(e.loaded, e.total);
      });
      await summarizer.ready;
    }

    return await summarizer.summarize(text);
  }
}
