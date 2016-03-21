module.exports = {
  customValidators: {
    // username validator
    username(value) {
      return !/\s/.test(value);
    },
  },
};
