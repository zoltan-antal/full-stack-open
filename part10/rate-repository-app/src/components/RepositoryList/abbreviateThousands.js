const abbreviateThousands = (value) => {
  if (value < 1000) {
    return value;
  }
  return Math.round(value / 100) / 10 + 'k';
};

export default abbreviateThousands;
