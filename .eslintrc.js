module.exports = {
  "env": {
    "es6": true,
    "node": true,
    "browser": true
  },
  "extends": [
    "eslint:recommended",
    "prettier"
  ],
  "parserOptions": {
    "ecmaVersion": 2018
  },
  "globals": {
    "describe": true,
    "it": true
  },
  "rules": {
    "indent": [
      "error",
      2
    ],
    "mocha/no-exclusive-tests": "error",
    "mocha/no-identical-title": "error",
    "prefer-arrow-callback": "error",
    "no-unused-vars": [
      1,
      {
        "argsIgnorePattern": "res|next|^err"
      }
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      0,
      "never"
    ]
  },
  "plugins": [
    "prettier",
    "mocha"
  ]
}
