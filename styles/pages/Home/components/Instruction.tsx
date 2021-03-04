import { Text as ChakraText } from '@chakra-ui/react';

interface Props {
  children: string;
}

export default function Text(props: Props) {
  return (
    <ChakraText textAlign="left" fontSize="2xl" width="50vw">
      {props.children}
    </ChakraText>
  );
}
