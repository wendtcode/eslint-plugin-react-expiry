# eslint-plugin-react-expiry

Custom ESLint rules for react-expiry

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Then install this plugin:

```sh
npm i eslint-plugin-react-expiry --save-dev
```

## Usage

Add the following to your `.eslintrc` file:

```json
{
  "plugins": ["react-expiry"],
  "rules": {
    "react-expiry/duplicate-id": "error",
    "react-expiry/expires-in-past": "error"
  }
}
```

## Rules

### `duplicate-id`

Checks for duplicate `id` properties in `expiry` options.

### `expires-in-past`

Checks if the `expires` property is in the past.

## License

MIT
