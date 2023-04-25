module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
    jest: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "no-var": "error",
    "no-multiple-empty-lines": "error",
    "no-console": ["warn", { allow: ["warn", "error", "info"] }],
    eqeqeq: "error",
    "no-unused-vars": "warn",
  },
};
