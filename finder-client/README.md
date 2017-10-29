This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Instalation
- Run `npm install` to install all the dependencies.
- Run `npm start` to start the application.

## Updating styles
- Add or change the desired files/styles to `/html/assets/sass`. If you are adding a new file, use the following convention: `_FILENAME.scss`.
- If a new file was added, add the necessary import to `/html/assets/sass/styles.scss` with the following syntax: `@import 'FILENAME'`.
- Run `gulp sass` on the root of the `finder-client` project to generate the css.

## Changing configuration options.
- Go to `src/constants/configuration.js` to see all the configuration options.

## Original readme
Go [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md) to see the original readme content.