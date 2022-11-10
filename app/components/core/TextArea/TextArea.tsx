import type { FC } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import type { SpaceProps } from 'styled-system';
import { space } from 'styled-system';
import Box from '@components/core/Box';
import Typo from '@components/core/Typo';

const AREA_WIDTH = 640;
const AREA_HEIGHT = 278;

type TextAreaProps = SpaceProps & {
  placeholder?: string;
  value?: string;
  onChange?: (message: string) => void;
  maxLength?: number;
  id: string;
  height?: number;
  width?: number;
  name: string;
};

const TextArea: FC<TextAreaProps> = ({
  placeholder,
  value,
  onChange,
  maxLength = 300,
  height = AREA_HEIGHT,
  width,
  id,
  name,
  ...rest
}) => {
  const [count, setCount] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e.target.value);
    } else {
      setCount(e.target.value.length);
    }
  };

  return (
    <Box {...rest} position="relative" maxWidth={AREA_WIDTH}>
      <CustomArea
        height={height}
        width={width}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        maxLength={maxLength}
      />
      <Box position="absolute" bottom={4} right={4}>
        <Typo variant="body" color="font.light">
          {value ? value.length : count} /{maxLength}
        </Typo>
      </Box>
    </Box>
  );
};

const CustomArea = styled.textarea<{ width?: number; height: number }>`
  border: 1px solid ${({ theme }) => theme.colors.bg.dark};
  border-radius: ${({ theme }) => theme.radii[1]}px;
  background-color: white;
  width: 100%;
  width: ${({ width }) => `${width}px` ?? undefined};
  max-width: ${AREA_WIDTH}px;
  height: ${({ height }) => height}px;
  padding: ${({ theme }) => theme.space[4]}px;
  box-sizing: border-box;
  font-family: ${({ theme }) => theme.fonts.medium};
  outline: none;
  resize: none;
  :focus {
    border-color: ${({ theme }) => theme.colors.secondary};
    box-shadow: ${({ theme }) => theme.shadows.secondary};
  }
  ${space}
`;

export default TextArea;
