const isValidNumber = (rawNumber) => {
  const regexGroup = /\@g.us\b/gm;
  const exist = rawNumber.match(regexGroup);
  return !exist;
};

module.exports = { isValidNumber };
