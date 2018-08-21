module.exports = {
    "testEnvironment": "node",
    "roots": [
        "./test"
    ],
    "transform": {
        "^.+\\.tsx?$": "ts-jest"
    },
    "testRegex": "(\\.|/)(test|spec)\\.(ts|js)x?$",
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ],
}