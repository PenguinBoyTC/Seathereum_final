// returns a promise so you'll have to await this to retrieve image

// const image = await loadImage('path_to_image');

const loadImage = (path) => {
  return new Promise((resolve) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.src = path;
  });
};

export {loadImage};
