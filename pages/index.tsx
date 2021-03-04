import {
  Button,
  Container,
  Content,
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
  const [isButtonStopDisabled, setIsButtonStopDisabled] = useState(true);

  function utteranceGenerator() {
    if (process.browser) {
      const utterance = new SpeechSynthesisUtterance();
      utterance.lang = 'pt-BR';
      utterance.rate = speed;
      utterance.volume = 1;
      utterance.onstart = () => {
        setIsButtonStopDisabled(false);
      };
      utterance.onend = () => {
        setIsButtonStopDisabled(true);
      };
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
      <Content>
        <Instruction>
          Insira o texto desejado abaixo, e logo em seguida pressione falar.
        </Instruction>

        <Textarea
          onChange={(event) => {
            setText(event.target.value);
          }}
        />
        <GroupButton>
          <Button
            disabled={text ? false : true}
            background="green"
            onClick={handleSpeak}
          >
            Falar
          </Button>
          <Button
            disabled={isButtonStopDisabled}
            background="red"
            onClick={handleStop}
          >
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
      </Content>
    </Container>
  );
}
