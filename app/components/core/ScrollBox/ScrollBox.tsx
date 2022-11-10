import styled from 'styled-components';

import Box from '@components/core/Box';

const ScrollBox = styled(Box)`
  &::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: #f2f2f2;
  }

  &::-webkit-scrollbar {
    width: 8px;
    background-color: #f2f2f2;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #d6d6d6;
  }
`;

export default ScrollBox;
