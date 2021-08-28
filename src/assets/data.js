//turns array items into an objects with keys matching their filename.
function importAll(arr) {
  let image = {};
  arr.keys().forEach((item, index) => {
    image[item.replace('./', '')] = arr(item);
  });
  return image;
}

//require.contexts gives us 3 arguments: a search directory, subdirectory search flag, and regex to match files against.
//Here, it'll return an array of images.
//We then pass that array to importAll.
const images = importAll(
  require.context('../assets/images', false, /\.(png|jpe?g|svg)$/)
);

const cards = [
  { id: 1, value: 2, image: images['2_of_clubs.png'].default },
  { id: 2, value: 2, image: images['2_of_diamonds.png'].default },
  { id: 3, value: 2, image: images['2_of_hearts.png'].default },
  { id: 4, value: 2, image: images['2_of_spades.png'].default },

  { id: 5, value: 3, image: images['3_of_clubs.png'].default },
  { id: 6, value: 3, image: images['3_of_diamonds.png'].default },
  { id: 7, value: 3, image: images['3_of_hearts.png'].default },
  { id: 8, value: 3, image: images['3_of_spades.png'].default },

  { id: 9, value: 4, image: images['4_of_clubs.png'].default },
  { id: 10, value: 4, image: images['4_of_diamonds.png'].default },
  { id: 11, value: 4, image: images['4_of_hearts.png'].default },
  { id: 12, value: 4, image: images['4_of_spades.png'].default },

  { id: 13, value: 5, image: images['5_of_diamonds.png'].default },
  { id: 14, value: 5, image: images['5_of_diamonds.png'].default },
  { id: 15, value: 5, image: images['5_of_diamonds.png'].default },
  { id: 16, value: 5, image: images['5_of_diamonds.png'].default },

  { id: 17, value: 6, image: images['6_of_diamonds.png'].default },
  { id: 18, value: 6, image: images['6_of_diamonds.png'].default },
  { id: 19, value: 6, image: images['6_of_diamonds.png'].default },
  { id: 20, value: 6, image: images['6_of_diamonds.png'].default },

  { id: 21, value: 7, image: images['7_of_diamonds.png'].default },
  { id: 22, value: 7, image: images['7_of_diamonds.png'].default },
  { id: 23, value: 7, image: images['7_of_diamonds.png'].default },
  { id: 24, value: 7, image: images['7_of_diamonds.png'].default },

  { id: 25, value: 8, image: images['8_of_diamonds.png'].default },
  { id: 26, value: 8, image: images['8_of_diamonds.png'].default },
  { id: 27, value: 8, image: images['8_of_diamonds.png'].default },
  { id: 28, value: 8, image: images['8_of_diamonds.png'].default },

  { id: 29, value: 9, image: images['9_of_diamonds.png'].default },
  { id: 30, value: 9, image: images['9_of_diamonds.png'].default },
  { id: 31, value: 9, image: images['9_of_diamonds.png'].default },
  { id: 32, value: 9, image: images['9_of_diamonds.png'].default },

  { id: 33, value: 10, image: images['10_of_diamonds.png'].default },
  { id: 34, value: 10, image: images['10_of_diamonds.png'].default },
  { id: 35, value: 10, image: images['10_of_diamonds.png'].default },
  { id: 36, value: 10, image: images['10_of_diamonds.png'].default },

  { id: 37, value: 10, image: images['jack_of_diamonds2.png'].default },
  { id: 38, value: 10, image: images['jack_of_diamonds2.png'].default },
  { id: 39, value: 10, image: images['jack_of_diamonds2.png'].default },
  { id: 40, value: 10, image: images['jack_of_diamonds2.png'].default },

  { id: 41, value: 10, image: images['queen_of_diamonds2.png'].default },
  { id: 42, value: 10, image: images['queen_of_diamonds2.png'].default },
  { id: 43, value: 10, image: images['queen_of_diamonds2.png'].default },
  { id: 44, value: 10, image: images['queen_of_diamonds2.png'].default },

  { id: 45, value: 10, image: images['king_of_diamonds2.png'].default },
  { id: 46, value: 10, image: images['king_of_diamonds2.png'].default },
  { id: 47, value: 10, image: images['king_of_diamonds2.png'].default },
  { id: 48, value: 10, image: images['king_of_diamonds2.png'].default },

  { id: 49, value: 11, image: images['ace_of_diamonds.png'].default },
  { id: 50, value: 11, image: images['ace_of_diamonds.png'].default },
  { id: 51, value: 11, image: images['ace_of_diamonds.png'].default },
  { id: 52, value: 11, image: images['ace_of_diamonds.png'].default },
];

export default cards;
