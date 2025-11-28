const getImage = (thumbnail) => {
  return `${thumbnail.path}.${thumbnail.extension}`;
};

export default getImage;
