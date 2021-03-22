# Kwiniaska Ridge Website
> kwiniaskaridge.org

### Development

#### Fetching Documents
Documents are fetched from [`kwiniaskaridge/constitution`](https://github.com/kwiniaskaridge/constitution).
To fetch the documents locally:

- create a `.env` file:

```shell
cp .env-template .env
```

- create a Github Personal Access Token, and add to your `.env` file.
- run the fetching script:

```
yarn fetch
```
This script will get the name of the files from `config.js:themeConfig.nav[].link`. This will generate one directory for each document containing a README.md file with the content: `src/document-name/README.md`.

> Note: `yarn fetch` always runs before `yarn dev` and `yarn build`.