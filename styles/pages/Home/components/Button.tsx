import { Button as ChakraButton } from '@chakra-ui/react';

interface Props {
  background: string;
  onClick: () => void;
  children: string;
}

export default function Button(props: Props) {
  return (
    <ChakraButton
      color="white"
      background={`${props.background}.500`}
      width="100%"
      onClick={props.onClick}
      _hover={{ background: `${props.background}.600` }}
    >
      {props.children}
    </ChakraButton>
  );
}
