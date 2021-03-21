import config from './.vuepress/config.js';
import { Octokit } from '@octokit/core';
import fs from 'fs';
import path from 'path';

const PAT = process.env.GITHUB_TOKEN
const ORGANIZATION = process.env.ORGANIZATION
const REPOSITORY = process.env.REPOSITORY

const documents = config.themeConfig.nav
    .map(document => document.link.replace(/\//g, ''));

const octokit = new Octokit({ auth: PAT });

// Fetch documents from kwiniaskaridge/constitution
const { repository } = await octokit.graphql(
    `query {
        repository(name: "${REPOSITORY}", owner: "${ORGANIZATION}") {
          object(expression: "main:") {
            id
            ... on Tree {
              entries {
                path
                object {
                ... on Blob {
                    id
                    text
                  }
                }
              }
            }
          }
        }
      }
      `,
    { login: "octokit" }
  );

// Filter constitution documents
const constititionDocuments = repository.object.entries
    .filter(document => 
        document.path.includes('.md') &&
        !document.path.includes('README')
    );

constititionDocuments.forEach(document => {
    // Determine where TOC is

    const documentArray = document.object.text.split('\n');
    let tocIndices = {};
    documentArray.forEach(d => {
        if (d.includes('<!-- START doctoc')) {
            tocIndices.start = documentArray.indexOf(d)
        }
        if (d.includes('<!-- END doctoc')) {
            tocIndices.end = documentArray.indexOf(d)
        }
    });
    documentArray.splice(tocIndices.start, tocIndices.end);
    document.text = documentArray.filter(element => element != '').join('\n');

    const dir = path.join('src', document.path.replace('.md',''));
    const docPath = path.join(dir, 'README.md')

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }

    fs.writeFile(`${docPath}`, document.text , (error) => { 
        if (error) throw err; 
    }) 
})
