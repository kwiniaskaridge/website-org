import config from './.vuepress/config.js';
import { Octokit } from '@octokit/core';
import fs from 'fs';
import path from 'path';

const PAT = process.env.GITHUB_TOKEN
const ORGANIZATION = process.env.ORGANIZATION
const REPOSITORY = process.env.REPOSITORY

// Get file names from configuration
const documents = config.themeConfig.nav
    .map(document => document.link.replace(/\//g, ''));

const octokit = new Octokit({ auth: PAT });

documents.forEach(async file => {
  // Fetch data from Github
  try {
    const { repository } = await octokit.graphql(
      `query {
        repository(name: "${REPOSITORY}", owner: "${ORGANIZATION}") {
          object(expression: "main:${file}.md") {
            id
            ... on Blob {
              id
              text
            }
          }
        }
      }`,
      { login: "octokit" }
      );
      // Get indices of start and end of TOC
      const document = repository.object;
      const documentArray = document.text.split('\n');
  
      let tocIndices = {};
      documentArray.forEach(d => {
          if (d.includes('<!-- START doctoc')) {
              tocIndices.start = documentArray.indexOf(d)
          }
          if (d.includes('<!-- END doctoc')) {
              tocIndices.end = documentArray.indexOf(d)
          }
      });
      // Remove TOC
      documentArray.splice(tocIndices.start, tocIndices.end);
      document.text = documentArray.filter(element => element != '').join('\n');
  
      // Save files
      const dir = path.join('src', file);
      const docPath = path.join(dir, 'README.md')
  
      if (!fs.existsSync(dir)){
          fs.mkdirSync(dir);
      }
  
      fs.writeFile(`${docPath}`, document.text , (error) => { 
          if (error) throw err; 
      }) 
    }
    catch(err) {
      console.log(`Failed to fetch ${file}. Make sure the themeConfig.nav[].link you\'re trying to get exists in the kwiniaskaridge/constitution repository.`)
    }
  }
);