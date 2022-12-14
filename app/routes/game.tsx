import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import type { LoaderFunction } from '@remix-run/node';


import Box from '@components/core/Box';
import Footer from '@components/layout/Footer';
import { NAVBAR_HEIGHT } from '@components/layout/Header';
import Button from '@components/core/Button';
import routes from '@nav/routes';
import { library, shuffleCards } from '@utils/data';
import Typo from '@components/core/Typo';
import MemoCard from '@components/MemoCard';

const SinglePlayer = () => {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [clearedCards, setClearedCards] = useState([]);
  const [cardsDisabled, setCardsDisabled] = useState(false);
  const [count, setCount] = useState(0);
  const [highscore, setHighscore] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);

  const numberOfCards = 6;
  const timeout = useRef(null);
  
  useEffect(() => {
    initGame();
    setHighscore(localStorage.getItem('singleplayer-highscore') || Number.POSITIVE_INFINITY);
  }, []);

  useEffect(() => {
    let to = null;

    if (selectedCards.length === 2) {
      to = setTimeout(evaluate, 500);
    }

    return () => {
      clearTimeout(to);
    };
  }, [selectedCards]);

  useEffect(() => {
    checkCompletion();
  }, [clearedCards]);

  const initGame = () => {
    const shuffledCards = shuffleCards(library);
    const selectedCards = shuffledCards.slice(0, numberOfCards);
    setCards(shuffleCards(selectedCards.concat(selectedCards)));
  }

  const evaluate = () => {
    const [first, second] = selectedCards;
    setCardsDisabled(false);

    if (cards[first].type === cards[second].type) {
      setClearedCards((prev) => ({ ...prev, [cards[first].type]: true }));
      setSelectedCards([]);
      return;
    }

    timeout.current = setTimeout(() => {
      setSelectedCards([]);
    }, 500);
  };

  const checkCompletion = () => {
    if (Object.keys(clearedCards).length === numberOfCards) {
      const score = Math.min(count, highscore);
      localStorage.setItem("singleplayer-highscore", score);
      setHighscore(score);
      setGameFinished(true);
    }
  };

  const isFlipped = (index) => {
    return selectedCards.includes(index);
  };

  const isHidden = (card) => {
    return Boolean(clearedCards[card.type]);
  };

  const handleCardClick = (index) => {
    if (selectedCards.length === 1) {
      setSelectedCards((prev) => [...prev, index]);
      setCount((count) => count + 1);
      setCardsDisabled(true);
    } else {
      clearTimeout(timeout.current);
      setSelectedCards([index]);
    }
  };

  const handleRestart = () => {
    setSelectedCards([]);
    setClearedCards([]);
    setCardsDisabled(false);
    setCount(0);
    setGameFinished(false);
    initGame();
  };

  return (
      <Box
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        marginLeft={{ _: 0, lg: '20%' }}
        width={{ _: '100%', lg: '60%' }}
        minHeight="100%"
        bg="white"
      >
        {gameFinished ? (
          <Box flexDirection="column" alignItems="center" justifyContent="center" mt="20%">
            <Typo variant="header1">Bravo !</Typo>
            <Typo variant="header3">Tu as termin?? en {count} coups.</Typo>
            <Button width={250} variant="primary" mt={10} onClick={handleRestart}>Nouvelle partie</Button>
          </Box>
        ): (
          <>
            
            
            <Box flexDirection="column" flexWrap="wrap" justifyContent="center">
              <Box display="flex" alignItems="center" justifyContent="space-between" my={5}>
                <Typo variant={{ _: "bodyStrong", lg: "header3" }}>Nombre de coup: {count}</Typo>
                <Typo variant={{ _: "bodyStrong", lg: "header3" }}>Meilleur score: {highscore === Number.POSITIVE_INFINITY ? 0 : highscore}</Typo>
              </Box>
              <Box display="grid" gridTemplateColumns={{ _: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" }}>
                {cards.map((card, index) => (
                    <MemoCard
                      key={`${index}`}
                      card={card}
                      back="/images/card.png"
                      index={index}
                      isDisabled={cardsDisabled}
                      isHidden={isHidden(card)}
                      isFlipped={isFlipped(index)}
                      onClick={handleCardClick}
                      width={{ _: 90, lg: 160 }} 
                      height={{ _: 125, lg: 220 }} 
                      margin={{ _: 1, lg: 4 }}
                    />
                ))}
              </Box>
            </Box>
          </>
        )}
        
      </Box>
  );
};

export default SinglePlayer;
