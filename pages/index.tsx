import {
  Button,
  Container,
  Flex,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import {
  BotaoStyle,
  ContainerStyle,
  FlexStyle,
  TextareaStyle,
  TextStyle,
} from '../styles/pages/index';
import Head from 'next/head';
import { useState } from 'react';

export default function Index() {
  const [text, setText] = useState('');
  const [speed, setSpeed] = useState(1);

  function sayIt() {
    if (process.browser) {
      const utterance = new SpeechSynthesisUtterance();
      utterance.lang = 'pt-BR';

      console.log(speed);
      utterance.rate = speed;
      utterance.volume = 1;

      return utterance;
    } else {
      return new SpeechSynthesisUtterance();
    }
  }

  function speak() {
    if (process.browser) {
      speechSynthesis.cancel();

      var sentences = text.split('.');
      for (var i = 0; i < sentences.length; i++) {
        var toSay = sayIt();
        toSay.text = sentences[i];
        speechSynthesis.speak(toSay);
      }
    }
  }

  function stop() {
    if (process.browser) {
      speechSynthesis.cancel();
    }
  }

  function handleSpeed(value: number) {
    if (process.browser) {
      setSpeed(value);
    }
  }

  return (
    <Container {...ContainerStyle}>
      <Head>
        <title>ReadIt | Início</title>
      </Head>
      <Text {...TextStyle}>
        Insira o texto desejado abaixo, e logo em seguida pressione falar.
      </Text>

      <Textarea
        {...TextareaStyle((event) => {
          setText(event.target.value);
        })}
      />
      <Flex {...FlexStyle}>
        <Button {...BotaoStyle('green', speak)}>Falar</Button>
        <Button {...BotaoStyle('red', stop)}>Parar</Button>
      </Flex>

      <Flex {...FlexStyle}>
        <Text minWidth="20%">Velocidade de Leitura:</Text>
        <Slider
          marginY={8}
          min={0.1}
          max={2}
          step={0.1}
          onChange={(value: number): void => {
            handleSpeed(value);
          }}
          defaultValue={speed}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Flex>
    </Container>
  );
}
