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

---

# Getting started

1. Clone this repository
1. Run `npm install`
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
- `/pages`: static page templates
- `/scss`: style files

# Styles

This project leverages [CSS Modules](https://github.com/css-modules/css-modules) and all styles are written in [Sass](https://sass-lang.com) as [SCSS](https://sass-lang.com/documentation/syntax#scss).

Global style definitions (variables, mixins, etc.) are located in the `/scss` folder. Component-specific styles are kept in SCSS files in each component folder.
