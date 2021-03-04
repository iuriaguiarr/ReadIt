import {
  Button,
  Container,
  GroupButton,
  Instruction,
  Settings,
  Slider,
  Textarea,
} from '../styles/pages/Home';
import Head from 'next/head';
import { useState } from 'react';

export default function Index() {
  const [text, setText] = useState('');
  const [speed, setSpeed] = useState(1);

  function utteranceGenerator() {
    if (process.browser) {
      const utterance = new SpeechSynthesisUtterance();
      utterance.lang = 'pt-BR';
      utterance.rate = speed;
      utterance.volume = 1;
      return utterance;
    } else {
      return new SpeechSynthesisUtterance();
    }
  }

  function handleSpeak() {
    if (process.browser) {
      speechSynthesis.cancel();

      text.split('.').forEach((sentence) => {
        const readIt = utteranceGenerator();
        readIt.text = sentence;
        speechSynthesis.speak(readIt);
      });
    }
  }

  function handleStop() {
    if (process.browser) {
      speechSynthesis.cancel();
    }
  }

  function handleSpeed(value: number) {
    setSpeed(value);
  }

  return (
    <Container>
      <Head>
        <title>ReadIt | Início</title>
      </Head>
      <Instruction>
        Insira o texto desejado abaixo, e logo em seguida pressione falar.
      </Instruction>

      <Textarea
        onChange={(event) => {
          setText(event.target.value);
        }}
      />
      <GroupButton>
        <Button background="green" onClick={handleSpeak}>
          Falar
        </Button>
        <Button background="red" onClick={handleStop}>
          Parar
        </Button>
      </GroupButton>

      <Settings name="Velocidade de Leitura">
        <Slider
          defaultValue={speed}
          onChange={(value: number): void => {
            handleSpeed(value);
          }}
        />
      </Settings>
    </Container>
  );
}
