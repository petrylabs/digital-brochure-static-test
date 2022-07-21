# Sonnet.ca Performance Remediation 🚀

## About

This project covers five landing pages of the Sonnet.ca website, which are built here as static pages with Next.js to improve overall performance.

### Documentation

https://economical.atlassian.net/wiki/spaces/SKT/pages/43176624226/Sonnet.ca+Performance+Remediation

### Jira epic

https://economical.atlassian.net/browse/SKY-198

### Tech stack

- [Next.js](https://nextjs.org/) for static page generation
- [Eslint](https://eslint.org/) for linting
- [Prettier](https://prettier.io/) for formatting
- [Husky](https://github.com/typicode/husky) for pre-commit hooks
- [dotCMS](https://www.dotcms.com/) for content management
- [Material UI (MUI)](https://mui.com/material-ui) for component scaffolding

---

# Getting started

1. Clone this repository
1. Run `npm install`
1. Add dotCMS creds to the `.env` file
1. Run `npm run dev` to start a local development server
1. Open a browser and navigate to `localhost:3000`

# Git

This project follows a simple [Gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) workflow.

- **Production branch:** `trunk`
- **Development branch:** `develop`

Feature branches should branch from `develop` and be named according to the corresponding Jira ticket (if any):

```
[TICKET]_[SOME DESCRIPTIVE NAME]

e.g. SKY-230_set-up-readme
```

# Deployment

## Build

1. Run `npm start`
1. Next.js will build and export your pages into the `out` folder and serve them on `localhost:5000`.

## Host

Built files will be hosted in dotCMS. Details TBC.

# Project structure

- `/components`: React components
- `/hooks`: React hooks
- `/icons`: SVG icons as React components
- `/pages`: static page templates
- `/scss`: style files
- `/utils`: utility functions

# Styling

- Global styles are imported from `https://www.sonnet.ca/asset/css/sonnet.css` in the custom `_document` file.
- All styles are written in [Sass](https://sass-lang.com) as [SCSS](https://sass-lang.com/documentation/syntax#scss)
- Common SCSS definitions (variables, mixins, etc.) are located in the `/scss` folder.
- Component-specific styles are kept in SCSS files in each component folder.
- Component styles are leveraging [CSS Modules](https://github.com/css-modules/css-modules).

## Media queries

Breakpoints are defined in `/scss/global/layout.scss`. Helper mixins for using these breakpoints in media queries are also available in this file, allowing media queries to be written as below:

```scss
@import "../../scss/globals/layout.scss";

@include mq-min-width(sm) {
  // your styles here
}
```

## MUI components

To maintain consistent styling patterns within the app (i.e. relying on CSS Modules), any MUI components used are styled using that component's CSS API and providing classes as a prop. See example below.

```jsx
<Modal classes={{ root: styles.root }}>{/* modal content */}</Modal>
```
