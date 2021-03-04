import {
  Slider as ChakraSlider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from '@chakra-ui/react';

interface Props {
  defaultValue: number;
  onChange: (value: number) => void;
}

export default function Slider(props: Props) {
  return (
    <ChakraSlider
      min={0.1}
      max={2}
      step={0.1}
      onChange={props.onChange}
      defaultValue={props.defaultValue}
    >
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb />
    </ChakraSlider>
  );
}
