import { useState } from 'react';

import { Button, Container, Flex, Text, Textarea } from '@chakra-ui/react';

export default function Index() {
  const [text, setText] = useState('');

  function speak() {
    if (process.browser) {
      const utterance = new SpeechSynthesisUtterance();
      utterance.lang = 'pt-BR';

      utterance.rate = 1.2;
      utterance.volume = 100;
      utterance.text = text;

      speechSynthesis.speak(utterance);
    }
  }

  function stop() {
    if (process.browser) {
      speechSynthesis.cancel();
    }
  }

  return (
    <Container
      display="flex"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      width="100vw"
      height="100vh"
    >
      <Text textAlign="left" fontSize="xl" width="50vw">
        Insira o texto desejado abaixo, e logo em seguida aperte em falar.
      </Text>

      <Textarea
        width="50vw"
        margin={4}
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
          setText(event.target.value);
        }}
      />
      <Flex
        width="50vw"
        justifyContent="space-between"
        alignItems="center"
        gridGap={4}
      >
        <Button
          background="green.500"
          _hover={{ background: 'green.600' }}
          color="white"
          width="100%"
          onClick={speak}
        >
          Falar
        </Button>
        <Button
          background="red.500"
          _hover={{ background: 'red.600' }}
          color="white"
          width="100%"
          onClick={stop}
        >
          Parar
        </Button>
      </Flex>
    </Container>
  );
}
