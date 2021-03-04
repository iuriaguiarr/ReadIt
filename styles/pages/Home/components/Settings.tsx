import { Flex, Text } from '@chakra-ui/react';

interface Props {
  children: React.ReactNode;
  name: string;
}

export default function Settings(props: Props) {
  return (
    <Flex flexDir="column" width="50vw" marginY={8}>
      <Text margin={2}>{props.name}:</Text>
      {props.children}
    </Flex>
  );
}
