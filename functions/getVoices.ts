export async function getVoices() {
  if (process.browser) {
    const synth = window.speechSynthesis;
    const ptBR = [];
    const enUS = [];

    for (const key in synth.getVoices()) {
      const voice = synth.getVoices()[key];
      voice.lang == "pt-BR" && ptBR.push(voice);
      voice.lang == "en-US" && enUS.push(voice);
    }

    return { ptBR, enUS };
  }
}
