# WYA

A static site template with Bootstrap 4 and Twig.

Ideal for landing pages, one page websites or small websites 1-5 pages.

Support for multiple languages coming soon.

## Quick start

```
npm install
gulp build
```

## Content

Content is stored in json files in the `src/languages/en` directory.

## Templates

We use Twig as a templating language.

### Why not use Swig?

Being comfortable with the Twig syntax and we use it on other projects, Swig brings no real benefits.

## Output

Run `gulp twig` to generate flat HTML files which are output to the root directory.

## Full build

Run `gulp build` to run all required gulp tasks, including compile sass, js (ES6), svgs, copy fonts, minify images etc.

Assets are output to `dist` directory.

## Deployment

We use [Deploybot](https://deploybot.com). The deployment VM is issued the following commands:

```
npm install npm -g
npm install --loglevel error
gulp --production
```

The following files / directories are ignored and not uploaded.

``
src
gulp
node_modules
.eslintrc
.sass-lint.yml
gulpfile.js
package.json
LICENSE
**/*.md
```
