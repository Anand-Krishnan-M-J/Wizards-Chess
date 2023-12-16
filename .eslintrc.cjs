module.exports = {
    "settings": {
        "react": {
            "version": "detect"
        }
    },
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": "next/core-web-vitals",
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
        "@typescript-eslint/explicit-function-return-type": "off",
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
