function importAll(r) {
  let images = {};
  r.keys().forEach((item, index) => {
    images[item.replace('./', '')] = r(item);
  });
  return images;
}

const images = importAll(
  require.context('../assets', false, /\.(png|jpe?g|svg)$/)
);

const cards = [
  {
    id: 1,
    image: images['2_of_diamonds.png'].default,
  },
];

export default cards;
