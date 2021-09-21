import { BookOpen, Moon, Sun } from "react-feather";
import {
  Button,
  Center,
  Flex,
  Heading,
  Spacer,
  Text,
  Textarea,
  useToast,
  useColorMode,
  ColorMode,
  ButtonGroup,
  Grid,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  // useBreakpointValue,
} from "@chakra-ui/react";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import * as gtag from "@lib/gtag";
import { getVoices } from "@functions/getVoices";
import { IVoices } from "@interfaces/IVoices";
import { ILanguage } from "@interfaces/ILanguages";
import { generateUtterance } from "@functions/generateUtterance";

export default function Index() {
  const [speed, setSpeed] = useState(1);
  const [text, setText] = useState("");
  const [voices, setVoices] = useState<IVoices>({ enUS: [], ptBR: [] });
  const [reloadGetVoices, setReloadGetVoices] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState(0);
  const { colorMode, toggleColorMode } = useColorMode();
  const [language, setLanguage] = useState<ILanguage>("ptBR");
  const [isButtonStopDisabled, setIsButtonStopDisabled] = useState(true);

  const toast = useToast();

  function handleSpeak() {
    if (process.browser) {
      if (text) {
        if (language) {
          if (voices[language][selectedVoice]) {
            if (speed) {
              gtag.event({
                action: "Clique",
                category: language,
                label: voices[language][selectedVoice],
                value: `${speed}`,
              });
              speechSynthesis.cancel();
              text.split(".").forEach((sentence) => {
                const readIt = generateUtterance(speed);
                readIt.voice = voices[language][selectedVoice];
                readIt.onstart = () => {
                  setIsButtonStopDisabled(false);
                };
                readIt.onend = () => {
                  setIsButtonStopDisabled(true);
                };
                readIt.text = sentence;
                speechSynthesis.speak(readIt);
              });
            } else {
              toast({
                title: "Velocidade vazia.",
                description:
                  "Por gentileza, informe a velocidade que deseja ouvir.",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top-right",
              });
            }
          } else {
            toast({
              title: "Voz desejada vazia.",
              description: "Por gentileza, informe a voz que deseja ouvir.",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "top-right",
            });
          }
        } else {
          toast({
            title: "Idioma vazio.",
            description:
              "Por gentileza, informe o idioma do texto que deseja ouvir.",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top-right",
          });
        }
      } else {
        toast({
          title: "Texto vazio.",
          description:
            "Por gentileza, digite ou cole o texto que deseja ouvir.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      }
    }
  }

  function handleStop() {
    if (process.browser) {
      speechSynthesis.cancel();
    }
  }

  useEffect(() => {
    async function loadVoices() {
      const result = await getVoices();
      setVoices(result);
      setReloadGetVoices(!reloadGetVoices);
    }
    if (!voices.enUS.length && !voices.ptBR.length) {
      loadVoices();
    }
  }, [reloadGetVoices]);

  return (
    <Flex width="full" minH="100vh" padding="16" flexDir="column">
      {/* Meta Tags */}
      <Head>
        <title>Readit - Transforme textos em vibrações!</title>
        <meta
          name="description"
          content="Ouça os seus textos, transforme-os em vibrações!"
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
      </Head>
      {/* Meta Tags */}
      {/* Header */}
      <Flex width="full" justify="space-between" align="start" flexDir="row">
        {/* Logo */}
        <Flex
          justify="center"
          align="center"
          gridGap="0.5rem"
          marginBottom="2rem"
        >
          <BookOpen />
          <Flex align="center" justify="center" gridGap="0.3rem">
            <Heading size="md">Readit -</Heading>

            <Text fontWeight="semibold">Transforme textos em vibrações!</Text>
          </Flex>
        </Flex>
        {/* Logo */}
        {/* Color mode */}
        <Button onClick={toggleColorMode}>
          {colorMode == "light" && <Moon />}
          {colorMode == "dark" && <Sun />}
        </Button>
        {/* Color mode */}
      </Flex>
      {/* Header */}
      {/* Body */}

      <Flex
        flexDir={{
          base: "column",
          sm: "column",
          md: "row",
          lg: "row",
          xl: "row",
        }}
        flex={1}
        gridGap="2rem"
      >
        {/* Área de texto */}
        <Flex flexDir="column" flex={1}>
          <Text
            marginBottom="4"
            marginTop={{ base: "4", sm: "4", md: "10", lg: "10", xl: "10" }}
          >
            Digite ou cole o texto que deseja ouvir:
          </Text>
          <Textarea
            minHeight={{
              base: "40vh",
              sm: "40vh",
              md: "auto",
              lg: "auto",
              xl: "auto",
            }}
            value={text}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setText(e.target.value)
            }
            autoFocus={true}
            resize="none"
            flex={1}
            placeholder="Digite ou cole aqui..."
          />
        </Flex>
        {/* Área de texto */}

        {/* Configurações */}
        <Flex flexDir="column" width="full" flex={1}>
          {/* Idioma */}
          <Flex justifyContent="space-between" marginBottom="4" marginTop="10">
            <Text>Selecione o idioma desejado</Text>
            <Text fontSize="sm">
              Atual:{" "}
              {language == "ptBR" ? "Português do Brasil" : "Inglês dos EUA"}
            </Text>
          </Flex>
          <Flex
            width="full"
            flexDir={{
              base: "column",
              sm: "column",
              md: "column",
              lg: "row",
              xl: "row",
            }}
            gridGap={2}
          >
            <Button
              size="sm"
              colorScheme="blue"
              onClick={() => setLanguage("ptBR")}
              disabled={language == "ptBR"}
              width="full"
            >
              Português do Brasil
            </Button>
            <Button
              size="sm"
              colorScheme="blue"
              onClick={() => setLanguage("enUS")}
              disabled={language == "enUS"}
              width="full"
            >
              Inglês dos EUA
            </Button>
          </Flex>
          {/* Idioma */}

          {/* Voz */}
          <Flex justifyContent="space-between" marginBottom="4" marginTop="10">
            <Text>Selecione a voz desejada</Text>
            <Text fontSize="sm">
              Atual:{" "}
              {voices[language][selectedVoice]
                ? voices[language][selectedVoice].name
                : "Nenhuma"}
            </Text>
          </Flex>

          <Flex
            width="full"
            display={{
              base: "flex",
              sm: "flex",
              md: "flex",
              lg: "grid",
              xl: "grid",
            }}
            flexDir="column"
            gridTemplateColumns="1fr 1fr"
            gridGap="2"
          >
            {voices[language].map((voice, index) => (
              <Button
                key={index}
                size="sm"
                colorScheme="blue"
                onClick={() => setSelectedVoice(index)}
                disabled={index == selectedVoice}
                width="full"
              >
                {voice.name}
              </Button>
            ))}
          </Flex>
          {/* Voz */}

          {/* Velocidade */}
          <Flex justifyContent="space-between" marginBottom="4" marginTop="10">
            <Text>Selecione a velocidade de leitura desejada</Text>
            <Text fontSize="sm">Atual: {speed}</Text>
          </Flex>
          <Slider
            min={0.1}
            max={2}
            step={0.1}
            onChange={(value: number): void => {
              setSpeed(value);
            }}
            defaultValue={speed}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          {/* Velocidade */}

          {/* Falar/Parar */}
          <ButtonGroup width="full" marginTop="auto">
            <Button
              disabled={isButtonStopDisabled}
              width="full"
              colorScheme="red"
              onClick={() => {
                handleStop();
                gtag.event({
                  action: "Clique",
                  category: "Parar",
                  label: "Clicou para parar",
                  value: "Parar",
                });
              }}
            >
              Parar
            </Button>
            <Button
              disabled={!isButtonStopDisabled}
              width="full"
              colorScheme="green"
              onClick={handleSpeak}
            >
              Falar
            </Button>
          </ButtonGroup>
          {/* Falar/Parar */}
        </Flex>
        {/* Configurações */}
      </Flex>
      {/* Body */}
    </Flex>
  );
}
