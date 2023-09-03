module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "standard-with-typescript",
        "plugin:react/recommended",
        "prettier"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project": "./tsconfig.json"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "@typescript-eslint/explicit-function-return-type": [
            "warn",
            { "allowExpressions": true }
        ],
        "react/no-unknown-property": [
            "error",
            {
              "ignore": ["material", "geometry", "position", "intensity",
               "args", "castShadow", "attach", "transparent", "roughness",
               "metalness", "vertexShader", "fragmentShader", "uniforms"
            ]
            }
          ],
    }
}
