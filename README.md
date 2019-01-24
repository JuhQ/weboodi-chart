# weboodi-chart

Prefer functional programming style

Avoid `let`, prefer `const`. Try to avoid variables completely but it's impossible.
Avoid return when possible.
Have fun. Be goofy. If the feature you're building is not fun to build, don't build it.

## How to develop

1. Clone the repo
2. Run `yarn install` or `npm i` to install development dependencies
3. Run `yarn test` or `npm test` to run tests
4. Run `yarn build` or `npm run build` to build the extension
5. Open `chrome://extensions` and click "Load unpacked" to install the dev extension

## How to build

1. Clone the repo
2. Run `yarn install` or `npm i` to install development dependencies
3. Run `yarn test` or `npm test` to run tests
4. Run `yarn build` or `npm run build` to build the extension
5. Run `zip -r weboodi-chart.zip manifest.json dist/weboodi.js chart.js icon16.png icon48.png icon128.png`

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
