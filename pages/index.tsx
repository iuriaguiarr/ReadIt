import { Button, Container, Flex, Text, Textarea } from '@chakra-ui/react';
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

  function sayIt() {
    if (process.browser) {
      const utterance = new SpeechSynthesisUtterance();
      utterance.lang = 'pt-BR';

      utterance.rate = 1.12;
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

  return (
    <Container {...ContainerStyle}>
      <Head>
        <title></title>
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
    </Container>
  );
}
