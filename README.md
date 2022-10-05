# Sonnet.ca Performance Remediation 🚀

## About

This project covers five landing pages of the Sonnet.ca website, which are built here as static pages with Next.js to improve overall performance.

### Documentation

https://economical.atlassian.net/wiki/spaces/SKT/pages/43176624226/Sonnet.ca+Performance+Remediation

### Jira epic

https://economical.atlassian.net/browse/SKY-198

### Tech stack

- [Next.js](https://nextjs.org/) for static page generation
- [npm](https://www.npmjs.com/) for package management
- [Eslint](https://eslint.org/) for linting
- [Prettier](https://prettier.io/) for formatting
- [Husky](https://github.com/typicode/husky) for pre-commit hooks
- [dotCMS](https://www.dotcms.com/) for content management
- [Material UI (MUI)](https://mui.com/material-ui) for component scaffolding.
- [next-plugin-preval](https://github.com/ricokahler/next-plugin-preval) for prefetching site-wide data, which cannot get fetched by pages via `getStaticProps`
- [html-react-parser](https://github.com/remarkablemark/html-react-parser) for rendering strings of HTML, returned by dotCMS for any content produced in a WYSIWYG editor

---

## Getting started

You will need:

- An [SSH key in your Github account](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account) that is [set up for SAML/SSO access](https://docs.github.com/en/enterprise-cloud@latest/authentication/authenticating-with-saml-single-sign-on/authorizing-an-ssh-key-for-use-with-saml-single-sign-on) to this repository
- [Node.js](https://nodejs.org/en/) (latest stable version is recommended)
- dotCMS user access (username and password)

1. Clone this repository using SSH
1. Run `npm install` in the project directory
1. Create a `.env.local` file and add the following code (with your own dotCMS access credentials):
   ```
   NODE_ENV=development
   DOTCMS_HOST=https://dev-economical.dotcmscloud.com/api
   NEXT_PUBLIC_DOTCMS_HOST=https://dev-economical.dotcmscloud.com/api
   DOTCMS_USERNAME=
   DOTCMS_PASSWORD=
   ```
1. Run `npm run dev` to start a local development server
1. Open a browser and navigate to `localhost:3000`

## Project structure

- `/components`: React components
- `/hooks`: React hooks
- `/icons`: SVG icons as React components
- `/pages`: static page templates
- `/public`: static asset files to be served as-is
- `/scss`: style files
- `/site-data`: Preval files, for prefetched site-wide data for header, footer, modals, etc.
- `/utils`: utility & helper functions

## Git strategy

This project follows a simple [Gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) workflow.

- **Production branch:** `main`
- **Development branch:** `develop`

Development branches should branch from `develop` and be named according to the corresponding Jira ticket (if any):

```
[TICKET]_[SOME DESCRIPTIVE NAME]

e.g. SKY-230_set-up-readme
```

## Pages

- `_document`: The custom document, which allows us to handle certain scripts and parameters
- `_app`: The custom App, which handles the common layout across pages (header, footer, etc)
- `[slug].jsx`: The template for 4 of the landing pages (see `config.js` for the page slugs). Responsible for fetching data for each landing page and generating the static HTML file
- `index.jsx`: The template for the homepage. Responsible for fetching homepage data and generating the HTML file

## Styling

- All styles are written in [SCSS](https://sass-lang.com/documentation/syntax#scss)
- Common SCSS definitions (variables, mixins, etc.) are located in the `/scss` folder.
- Global styles are found in `/scss/styles.scss`
- Component-specific styles are kept in SCSS files in each component folder.
- Component styles are leveraging [CSS Modules](https://github.com/css-modules/css-modules) and using the `styles.camelCase` format.

### Media queries

Breakpoints are defined in `/scss/global/layout.scss`. Helper mixins for using these breakpoints in media queries are also available in this file, allowing media queries to be written as below:

```scss
@import "../../scss/globals/layout.scss";

@include mq-min-width(sm) {
  // your styles here
}
```

### MUI components

Material UI (MUI) is being selectively used in some of the more complex components to bootstrap certain behaviour/interaction patterns.

To maintain consistent styling patterns within the app (i.e. relying on CSS Modules), any MUI components used are styled using that component's CSS API and providing classes as a prop. See example below.

```jsx
<Modal classes={{ root: styles.root }}>{/* modal content */}</Modal>
```

## Deployment

A build process is run locally on a developer's machine and the output is hosted on dotCMS. For full details, see the [deployment docs](https://economical.atlassian.net/wiki/spaces/SKT/pages/43259985982/DotCMS+deployment)
