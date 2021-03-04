import { Container as ChakraContainer } from '@chakra-ui/react';

interface Props {
  children: React.ReactNode;
}

export default function Container(props: Props) {
  return (
    <ChakraContainer
      display="flex"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      width="100vw"
      height="100vh"
    >
      {props.children}
    </ChakraContainer>
  );
}
