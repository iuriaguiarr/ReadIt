import {
  ContainerProps,
  FlexProps,
  TextProps,
  TextareaProps,
  ButtonProps,
} from '@chakra-ui/react';

export function BotaoStyle(
  background: string,
  onClick: () => void
): ButtonProps {
  return {
    background: `${background}.500`,
    _hover: { background: `${background}.600` },
    color: 'white',
    width: '100%',
    onClick,
  };
}

export const ContainerStyle: ContainerProps = {
  display: 'flex',
  flexDir: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100vw',
  height: '100vh',
};

export const TextStyle: TextProps = {
  textAlign: 'left',
  fontSize: 'xl',
  width: '50vw',
};

export function TextareaStyle(
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
): TextareaProps {
  return {
    width: '50vw',
    margin: 4,
    onChange,
  };
}

export const FlexStyle: FlexProps = {
  width: '50vw',
  justifyContent: 'space-between',
  alignItems: 'center',
  gridGap: 4,
};
