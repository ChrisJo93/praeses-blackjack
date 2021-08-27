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
  {
    id: 1,
    image: images['2_of_diamonds.png'].default,
  },
];

export default cards;
