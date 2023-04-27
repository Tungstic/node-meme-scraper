import fs from 'node:fs';
import fetch from 'node-fetch';
import { parse } from 'node-html-parser';

// import http from 'node:http';

// Download HTML from meme website as a string (body is a string)
const response = await fetch(
  'https://memegen-link-examples-upleveled.netlify.app/',
);
const body = await response.text();

// Convert string "body" into an object
const root = parse(body);

// Get only img tags from the whole of html
const onlyImageTags = root.querySelector('img');
// console.log(onlyImageTags);

// console.log(Object.values(onlyImageTags)); // Gives me numbers of the inner objects??
// console.log(Object.values(onlyImageTags));
const img1 = onlyImageTags.rawAttrs; // This is a string "src="https.."" that needs to be trimmed

// Trim that string

function bareUrl(linkString) {
  linkString = linkString.trim();
  return linkString.slice(5, -1);
}

console.log(bareUrl(img1));
// const file = fs.createWriteStream('memes/01.jpg');
// file.write(url);
