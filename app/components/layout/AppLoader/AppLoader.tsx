import type { ReactNode } from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTimeoutFn } from 'react-use';
import styled from 'styled-components';

import Box from '@components/core/Box';

const DOT_SIZE = 24;

type AppLoaderProps = {
  children: ReactNode;
};

const AppLoader = ({ children }: AppLoaderProps) => {
  const [loaded, setLoaded] = useState(false);

  const { ready } = useTranslation(['common'], { useSuspense: false });

  const hideLoader = () => {
    if (!loaded && ready) {
      setLoaded(true);
      cancel();
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isReady, cancel, reset] = useTimeoutFn(hideLoader, 1000);

  useEffect(() => {
    if (ready) {
      reset?.();
    }
  }, [ready, reset]);

  return (
    <>
      <StyledBox loaded={loaded}>
        <Box>
          {[0, 1, 2].map((index) => (
            <StyledDOT
              key={`loader-${index + 1}`}
              transition={{
                y: {
                  duration: 0.4,
                  yoyo: Infinity,
                  ease: 'easeOut',
                  delay: index * 0.2,
                },
                rotate: {
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear',
                },
              }}
              animate={{
                y: [20, -20],
                rotate: 360,
              }}
            />
          ))}
        </Box>
      </StyledBox>
      {children}
    </>
  );
};

const StyledBox = styled(Box)<{ loaded: boolean }>`
  display: ${({ loaded }) => (loaded ? 'none' : 'flex')};
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 8000;
  background-color: #45C945};
`;

const StyledDOT = styled(motion.div)`
  display: block;
  background-color: #fff;
  width: ${DOT_SIZE}px;
  height: ${DOT_SIZE}px;
  border-radius: ${DOT_SIZE / 2}px;
  margin: 0 5px;
`;

export default AppLoader;
