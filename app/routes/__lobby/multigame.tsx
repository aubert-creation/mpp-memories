import { useEffect, useRef, useState } from 'react';

import Box from '@components/core/Box';
import Button from '@components/core/Button';
import TextInput from '@components/core/TextInput';
import Typo from '@components/core/Typo';
import MemoCard from '@components/MemoCard';
import { useChannel, useEvent, useClientTrigger } from '@harelpls/use-pusher';
import { MPGLibrary, shuffleCards } from '@utils/data';
import { customAlphabet, nanoid } from 'nanoid';
import { useTranslation } from 'react-i18next';

const user_id = nanoid();

const Lobby = () => {
  const { t } = useTranslation();

  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [selectedOpponentCards, setSelectedOpponentCards] = useState([]);

  const [clearedCards, setClearedCards] = useState([]);
  const [cardsDisabled, setCardsDisabled] = useState(true);
  const [gameFinished, setGameFinished] = useState(false);

  const [username, setUsername] = useState(null);
  const [isHost, setIsHost] = useState(false);
  const [lobbyId, setLobbyId] = useState(null);
  const [code, setCode] = useState(null);

  const [oponent, setOponent] = useState(null);
  const [score, setScore] = useState({ [user_id]: 0 });

  const [state, setState] = useState('idle');
  const [currentPlayer, setCurrentPlayer] = useState();
  const [pendingRestart, setPendingRestart] = useState(false);

  const channel = useChannel(lobbyId ? `private-${lobbyId}` : undefined);
  const trigger = useClientTrigger(channel || undefined);

  const numberOfCards = 10;
  const timeout = useRef(null);

  const isCurrentPlayer = currentPlayer === user_id;

  const isWinner = score[user_id] > score[oponent?.user_id];
  const isDraw = score[user_id] === score[oponent?.user_id];

  useEvent(channel, 'pusher:subscription_error', ({ data }) => console.log('subscription_error', data));
  useEvent(channel, 'pusher:subscription_succeeded', () => {
    if (isHost) {
      setState('waiting_guest');
    } else {
      setState('waiting_host');
      trigger('client-join_lobby', { username, user_id });
    }
  });

  useEvent(channel, 'client-join_lobby', (data) => {
    setOponent(data);
    setScore({ ...score, [data.user_id]: 0 });
    if (isHost) {
      trigger('client-update_host', { username, user_id });
    }
  });

  useEvent(channel, 'client-update_host', (data) => {
    if (!isHost) {
      setOponent(data);
      setScore({ ...score, [data.user_id]: 0 });
      setState('starting_game');
      trigger('client-ready', {});
    }
  });

  useEvent(channel, 'client-ready', () => {
    if (isHost) {
      const players = [user_id, oponent.user_id];
      const index = Math.floor(Math.random() * 2);

      const shuffledCards = shuffleCards(MPGLibrary);
      const selectCards = shuffledCards.slice(0, numberOfCards);
      const deck = selectCards.concat(selectCards);
      const data = {
        current_player: players[index],
        deck,
      };
      trigger('client-init_game', data);
      startGame(data);
    }
  });

  useEvent(channel, 'client-init_game', (data) => {
    startGame(data);
  });

  useEvent(channel, 'client-next_turn', (data) => {
    setSelectedCards([]);

    if (data.cleared_cards) {
      setClearedCards(data.cleared_cards);
    }

    if (data.score) {
      setScore(data.score);
    }

    setCurrentPlayer(data.current_player);
  });

  useEvent(channel, 'client-selected_card', (data) => {
    if (!isCurrentPlayer) {
      setSelectedOpponentCards(data.cards);
    }
  });

  useEvent(channel, 'client-request_restart', () => {
    setPendingRestart(true);
    setSelectedCards([]);
    setSelectedOpponentCards([]);
    setClearedCards([]);
    if (isHost) {
      setState('waiting_guest');
    }
  });

  useEvent(channel, 'client-accept_restart', () => {
    setSelectedCards([]);
    setSelectedOpponentCards([]);
    setClearedCards([]);
    trigger('client-ready', {});
  });

  useEffect(() => {
    if (currentPlayer === user_id) {
      setCardsDisabled(false);
    } else {
      setCardsDisabled(true);
    }
  }, [currentPlayer]);

  useEffect(() => {
    if (lobbyId) {
      initGame();
    }
  }, [lobbyId]);

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

  const startGame = (data) => {
    setSelectedCards([]);
    setSelectedOpponentCards([]);
    setClearedCards([]);
    setCurrentPlayer(data.current_player);
    setCards(data.deck);
    setState('playing');
  };
  /* const trigger = async (type, data) => {
    const event = {
      channel: lobbyId,
      type,
      data,
    };

    const res = await fetch('https://mpp-memories-api.vercel.app/api/channels-event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });
    if (!res.ok) {
      console.error('failed to push data');
    }
  }; */

  const createLobby = () => {
    setIsHost(true);
    const nano = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 10);
    setLobbyId(nano());
  };

  const joinLobby = () => {
    setIsHost(false);
    setLobbyId(code);
  };

  const initGame = () => {
    const shuffledCards = shuffleCards(MPGLibrary);
    const selectCards = shuffledCards.slice(0, numberOfCards);
    setCards(shuffleCards(selectCards.concat(selectCards)));
  };

  const evaluate = () => {
    const [first, second] = selectedCards;

    if (cards[first].type === cards[second].type) {
      if (isCurrentPlayer) {
        trigger('client-next_turn', {
          current_player: oponent?.user_id,
          cleared_cards: { ...clearedCards, [cards[first].type]: true },
          score: {
            [user_id]: score[user_id] + 1,
            [oponent?.user_id]: score[oponent?.user_id],
          },
        });
      }
      return;
    }

    timeout.current = setTimeout(() => {
      if (isCurrentPlayer) {
        trigger('client-next_turn', { current_player: oponent?.user_id });
      }
    }, 500);
  };

  const checkCompletion = () => {
    if (Object.keys(clearedCards).length === numberOfCards) {
      setGameFinished(true);
    }
  };

  const isFlipped = (index) => {
    return selectedCards.includes(index);
  };

  const isOpponentFlipped = (index) => {
    return selectedOpponentCards.includes(index);
  };

  const isHidden = (card) => {
    return Boolean(clearedCards[card.type]);
  };

  const handleCardClick = (index) => {
    if (selectedCards.length === 1) {
      setSelectedCards((prev) => {
        const newCards = [...prev, index];
        trigger('client-selected_card', { cards: newCards });
        return newCards;
      });
      setCardsDisabled(true);
    } else {
      clearTimeout(timeout.current);
      setSelectedCards([index]);
      trigger('client-selected_card', { cards: [index] });
    }
  };

  const handleRestart = () => {
    setSelectedCards([]);
    setSelectedOpponentCards([]);
    setClearedCards([]);
    setCardsDisabled(true);
    setGameFinished(false);
    setScore({ [user_id]: 0, [oponent?.user_id]: 0 });

    if (isHost) {
      trigger('client-request_restart', {});
    } else {
      trigger('client-accept_restart', {});
    }
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
      {!lobbyId ? (
        <Box flexDirection="column" justifyContent="center" alignItems="center">
          <Typo variant="header3" color="black" textAlign="center" mb={4} mt={8}>
            Choisir un nom
          </Typo>
          <TextInput
            variant="default"
            width={250}
            id="username"
            placeholder="Ton prénom"
            name="Username"
            onChange={(e) => setUsername(e.target.value)}
          />

          <Typo variant="header3" color="black" textAlign="center" mb={4} mt={14}>
            Créer une partie
          </Typo>

          <Button variant="secondary" disabled={!username || username.length < 3} onClick={createLobby}>
            nouvelle partie
          </Button>
          <Typo variant="header3" color="black" textAlign="center" mt={8}>
            ou
          </Typo>
          <Box justifyContent="center" alignItems="center" mt={20}>
            <TextInput
              variant="default"
              width={250}
              id="lobby"
              placeholder="code"
              name="lobby"
              onChange={(e) => setCode(e.target.value)}
              mr={4}
            />
            <Button
              variant="secondary"
              disabled={!username || username.length < 3 || !code || code.length !== 10}
              onClick={joinLobby}
            >
              rejoindre
            </Button>
          </Box>
        </Box>
      ) : gameFinished ? (
        <Box flexDirection="column" alignItems="center" justifyContent="center" mt="20%">
          <Typo variant="header1">{isDraw ? 'OH égalité !' : isWinner ? 'Bravo !' : 'Oh non !!!'}</Typo>
          <Typo variant="header3">
            {isDraw
              ? `Vous avez terminé à égalité (${score[user_id]}:${score[oponent?.user_id]})`
              : isWinner
              ? `Tu as gagné ${score[user_id]}:${score[oponent?.user_id]} contre ${oponent?.username}`
              : `Tu as perdu ${score[oponent?.user_id]}:${score[user_id]} contre ${oponent?.username}`}
          </Typo>
          <Button width={250} disabled={!isHost && !pendingRestart} variant="primary" mt={10} onClick={handleRestart}>
            rejouer
          </Button>
        </Box>
      ) : (
        <Box flexDirection="column" flexWrap="wrap" justifyContent="center">
          {oponent && (
            <Box display="flex" alignItems="center" justifyContent="center" mt={5}>
              <Box alignItems="center">
                <Typo variant="bodyStrong">{username}</Typo>
                <Typo variant="header2" ml={2}>
                  {score[user_id]}
                </Typo>
              </Box>

              <Typo variant="header3" mx={0.5}>
                :
              </Typo>

              <Box alignItems="center">
                <Typo variant="header2" mr={2}>
                  {score[oponent?.user_id]}
                </Typo>
                <Typo variant="bodyStrong">{oponent.username}</Typo>
              </Box>
            </Box>
          )}

          <Box display="flex" alignItems="center" justifyContent={state === 'waiting_guest' ? 'space-between' : 'center'} my={5}>
            <Typo variant="bodyStrong">{t(state, { player: isCurrentPlayer ? username : oponent?.username })}</Typo>
            {state === 'waiting_guest' && <Typo variant="bodyStrong">Code de partage : {lobbyId}</Typo>}
          </Box>
          <Box display="grid" gridTemplateColumns={{ _: 'repeat(4, 1fr)', lg: 'repeat(4, 1fr)' }}>
            {cards.map((card, index) => (
              <MemoCard
                key={`${index}`}
                card={card}
                back="/images/mpg/card.png"
                index={index}
                isDisabled={cardsDisabled}
                isOpponentPlaying={!isCurrentPlayer}
                isOpponentFlipped={isOpponentFlipped(index)}
                isHidden={isHidden(card)}
                isFlipped={isFlipped(index)}
                onClick={handleCardClick}
                width={{ _: 64, lg: 128 }}
                height={{ _: 64, lg: 128 }}
                margin={{ _: 1, lg: 2 }}
              />
            ))}
          </Box>
        </Box>
      )}
      <Box style={{ visibility: 'hidden', opacity: 0 }}>
        {MPGLibrary.map((img) => (
          <img key={img.type} src={img.image} alt={img.type} />
        ))}
      </Box>
    </Box>
  );
};

export default Lobby;
