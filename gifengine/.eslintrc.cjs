/* eslint-disable*/

module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        // overrides
        "require-jsdoc": 0,
        "object-curly-spacing": [
            "error",
            "always"
        ],
        "max-len": ["error", { "code": 180 }],
        "semi": 2,
        "no-undef": 2,
        "no-use-before-define": 0,
        "quotes": 2,
        "indent": ["error", 2],
        "arrow-parens": 0,
        "padded-blocks": 0,
        "no-empty": 2,
        "no-irregular-whitespace": 2,
        "valid-jsdoc": 2,
        "valid-typeof": 2,
        ////////// Best Practices //////////
        "prefer-const": 2,
        "consistent-return": 2,
        "eqeqeq": 2,
        "no-redeclare": 2,
        ////////// Variables //////////
        "no-shadow": 2,
        "no-shadow-restricted-names": 2,
        "no-unused-vars": ["error", { "varsIgnorePattern": "_" }]
    }
}
