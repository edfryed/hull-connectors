module.exports = {
  parser: "babel-eslint",
  env: {
    es6: true,
    node: true
  },
  extends: [
    "airbnb-base",
    "plugin:flowtype/recommended",
    "plugin:prettier/recommended",
    "prettier",
    "prettier/flowtype",
    "prettier/standard"
  ],
  plugins: [
    "flowtype",
    "flowtype-errors",
    "prettier"
  ],
  rules: {
    "import/no-extraneous-dependencies": [0],
    "arrow-body-style" : [0],
    "arrow-parens": [0],
    "camelcase": [0],
    "class-methods-use-this": [0],
    "comma-dangle": [0],
    "eqeqeq": [1],
    "flowtype-errors/show-errors": 2,
    "max-len": [0],
    "new-cap": [0],
    "no-console": [0],
    "no-param-reassign" : [0],
    "no-underscore-dangle": [0],
    "prefer-arrow-callback": [0],
    "prefer-destructuring": [0],
    "quotes": [2, "double", { "avoidEscape": true }],
    "no-use-before-define": ["error", { "classes": false }],
    "spaced-comment": ["error", "always", { "markers": [":", "::"] }],
    "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }]
  }
}
