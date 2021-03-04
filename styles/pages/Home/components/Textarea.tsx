import { Textarea as ChakraTextarea } from '@chakra-ui/react';

interface Props {
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function Textarea(props: Props) {
  return <ChakraTextarea width="100%" margin={4} onChange={props.onChange} />;
}
