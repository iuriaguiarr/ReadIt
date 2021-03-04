import { Flex as ChakraFlex } from '@chakra-ui/react';

interface Props {
  children: React.ReactNode;
}

export default function GroupButton(props: Props) {
  return (
    <ChakraFlex
      width="50vw"
      justifyContent="space-between"
      alignItems="center"
      gridGap={4}
    >
      {props.children}
    </ChakraFlex>
  );
}
