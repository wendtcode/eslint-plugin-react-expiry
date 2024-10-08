module.exports = {
  rules: {
    "duplicate-id": require("./lib/rules/duplicate-id"),
    "expires-in-past": require("./lib/rules/expires-in-past"),
  },
};
