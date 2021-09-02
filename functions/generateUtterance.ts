export function generateUtterance(speed) {
  if (process.browser) {
    const utterance = new SpeechSynthesisUtterance();
    utterance.lang = "pt-BR";
    utterance.rate = speed;
    utterance.volume = 1;

    return utterance;
  } else {
    return new SpeechSynthesisUtterance();
  }
}
