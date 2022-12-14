import { useEffect, useRef, useState } from 'react';

import Box from '@components/core/Box';
import Image from '@components/core/Image';
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';
import styled, { css } from 'styled-components';

type MemoCardProps = {
  index?: string;
};

const MemoCard = ({
  onClick,
  card,
  index,
  back,
  isHidden,
  isFlipped,
  isDisabled,
  isOpponentPlaying,
  isOpponentFlipped,
  width,
  height,
  margin,
}: MemoCardProps) => {
  const animRef = useRef(0);
  const animationFront = useAnimationControls();
  const animationBack = useAnimationControls();

  const [isFront, setIsFront] = useState(false);

  const transitionFront = { type: 'linear', duration: 0.14, delay: 0.12 };
  const transitionBack = { type: 'linear', duration: 0.14 };

  useEffect(() => {
    if (isOpponentFlipped && !isFlipped) {
      setIsFront(true);
      animRef.current++;
      onClick(index);
    }
  }, [isOpponentFlipped]);

  useEffect(() => {
    if (animRef.current > 0) {
      if (isFlipped) {
        animationFront.start({ rotateY: [-90, 0], transition: transitionFront });
        animationBack.start({ rotateY: 90, transition: transitionBack });
      } else {
        animationFront.start({ rotateY: 90, transition: transitionBack });
        animationBack.start({ rotateY: [-90, 0], transition: transitionFront });

        setTimeout(() => {
          setIsFront(false);
        }, 500);
      }
    }
  }, [isFlipped, animRef]);

  const handleClick = () => {
    if (!isFlipped && !isDisabled && !isHidden) {
      setIsFront(true);
      animRef.current++;
      onClick(index);
    }
  };

  return (
    <Box
      key={`${index}`}
      onClick={handleClick}
      width={width}
      height={height}
      m={margin}
      style={{ perspective: 350 }}
      borderRadius={10}
    >
      <Card isHidden={isHidden}>
        <BackCard key={`${index}-back`} animate={animationBack} src={back} alt={card.type} draggable={false} />
        {isFront && (
          <FrontCard key={`${index}-front`} animate={animationFront} src={card.image} alt={card.type} draggable={false} />
        )}
      </Card>
    </Box>
  );
};

const baseCard = css`
  position: absolute;
  height: inherit;
  width: inherit;
  transform-style: preserve-3d;
  backface-visibility: visible;
  border-radius: 6px;
`;

const Card = styled(Box)<{ isHidden: boolean }>`
  ${baseCard}
  display: grid;
  grid-area: 1/1;
  visibility: ${({ isHidden }) => (isHidden ? 'hidden' : 'visible')};
`;

const FrontCard = styled(motion.img)`
  ${baseCard}
  backface-visibility: hidden;
  transform: rotateY(90deg);
  box-shadow: 0px 3px 10px 0px #6e6e6e;
  outline: none;
`;

const BackCard = styled(motion.img)`
  ${baseCard}
  backface-visibility: visible;
  transform: rotateY(0deg);
  box-shadow: 0px 3px 10px 0px #6e6e6e;
  outline: none;
`;

export default MemoCard;
