# weboodi-chart

Prefer functional programming style, avoid mutation.

Avoid `let`, prefer `const`. Try to avoid variables completely but it's impossible.

Avoid `return` when possible.

Have fun. Be goofy. If the feature you're building is not fun to build, don't build it.

## How to develop

1. Clone the repo
2. Run `npm i` to install development dependencies
3. Run `npm test` to run tests
4. Run `npm run build-watch` to build the extension
5. Open `chrome://extensions` and click "Load unpacked" to install the dev extension

## How to build

1. Clone the repo
2. Run `npm i` to install development dependencies
3. Bump version in `package.json` and `manifest.json`. Make sure these match
4. Run `npm run release`

## Visual Studio code stuff

```json
  "prettier.tslintIntegration": true,
  "editor.formatOnSave": false,
  "[typescript]": {
    "editor.formatOnSave": true
  },
  "[json]": {
    "editor.formatOnSave": true
  },
```

## Author

- JuhQ <<https://github.com/JuhQ>>

## Contributors

(Add yourself if you prefer so)

- alehuo <<https://github.com/alehuo>>

## License

/* TODO */
