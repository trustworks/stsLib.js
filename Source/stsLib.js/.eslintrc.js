module.exports = {
    "env": {
        "browser": true,
        "node": true,
    },
    "extends": "eslint:recommended",
    "rules": {
        "indent": [
            "warn",
            2
        ],
        "linebreak-style": [
            "warn",
            "windows"
        ],
        "quotes": [
            "warn",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        // "strict": [
        //    "error",
        //    "function"
        // ],
        "no-constant-condition": [
            "warn",
            {
                "checkLoops": false
            }
        ],
        "no-unused-vars": [
            "warn",
            {
              "vars": "all", "args": "after-used", 
              "ignoreRestSiblings": false ,
              "argsIgnorePattern": "global|compares",
              "varsIgnorePattern": "varend|require",
            },
        ],
        "no-console": [
            "off",
        ],
        "no-undef": [
            "error",
        ]
    }
};