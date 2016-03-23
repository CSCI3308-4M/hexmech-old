module.exports = {
  customValidators: {
    // username validator
    username: function (value) {
      return !/\s/.test(value)
    }
  }
};
