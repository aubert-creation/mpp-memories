export const shuffleCards = (array) => {
  const { length } = array;
  for (let i = length; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    const currentIndex = i - 1;
    const temp = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temp;
  }
  return array;
};

export const library = [
  {
    type: 'adrien',
    image: '/images/adrien.png',
  },
  {
    type: 'alain',
    image: '/images/alain.png',
  },
  {
    type: 'annick',
    image: '/images/annick.png',
  },
  {
    type: 'armand',
    image: '/images/armand.png',
  },
  {
    type: 'bernard',
    image: '/images/bernard.png',
  },
  {
    type: 'cesar',
    image: '/images/cesar.png',
  },
  {
    type: 'chichi',
    image: '/images/chichi.png',
  },
  {
    type: 'djoule',
    image: '/images/djoule.png',
  },
  {
    type: 'francoeur',
    image: '/images/francoeur.png',
  },
  {
    type: 'gabin',
    image: '/images/gabin.png',
  },
  {
    type: 'jaer',
    image: '/images/jaer.png',
  },
  {
    type: 'jimmy',
    image: '/images/jimmy.png',
  },
  {
    type: 'jospeh',
    image: '/images/jospeh.png',
  },
  {
    type: 'kader',
    image: '/images/kader.png',
  },
  {
    type: 'karim',
    image: '/images/karim.png',
  },
  {
    type: 'kendrick',
    image: '/images/kendrick.png',
  },
  {
    type: 'lulu',
    image: '/images/lulu.png',
  },
  {
    type: 'lylou',
    image: '/images/lylou.png',
  },
  {
    type: 'madame',
    image: '/images/madame.png',
  },
  {
    type: 'mamie',
    image: '/images/mamie.png',
  },
  {
    type: 'mathieu',
    image: '/images/mathieu.png',
  },
  {
    type: 'nicolas',
    image: '/images/nicolas.png',
  },
  {
    type: 'odillon',
    image: '/images/odillon.png',
  },
  {
    type: 'oliver',
    image: '/images/oliver.png',
  },
  {
    type: 'roger',
    image: '/images/roger.png',
  },
  {
    type: 'samy',
    image: '/images/samy.png',
  },
  {
    type: 'tata',
    image: '/images/tata.png',
  },
  {
    type: 'titou',
    image: '/images/titou.png',
  },
  {
    type: 'yass',
    image: '/images/yass.png',
  },
  {
    type: 'zante',
    image: '/images/zante.png',
  },
];

export const MPGLibrary = [
  {
    type: 'avatar',
    image: '/images/mpg/avatar.png',
  },
  {
    type: 'ballon',
    image: '/images/mpg/ballon.png',
  },
  {
    type: 'beer',
    image: '/images/mpg/beer.png',
  },
  {
    type: 'brasil',
    image: '/images/mpg/brasil.png',
  },
  {
    type: 'crampon',
    image: '/images/mpg/crampon.png',
  },
  {
    type: 'fuck',
    image: '/images/mpg/fuck.png',
  },
  {
    type: 'goat',
    image: '/images/mpg/goat.png',
  },
  {
    type: 'nomatch',
    image: '/images/mpg/nomatch.png',
  },
  {
    type: 'sleep',
    image: '/images/mpg/sleep.png',
  },
  {
    type: 'trophy',
    image: '/images/mpg/trophy.png',
  },
];
