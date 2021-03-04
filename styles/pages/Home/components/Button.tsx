import { Button as ChakraButton } from '@chakra-ui/react';

interface Props {
  background: string;
  onClick: () => void;
  children: string;
  disabled?: boolean;
}

export default function Button(props: Props) {
  return (
    <ChakraButton
      disabled={props.disabled}
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
