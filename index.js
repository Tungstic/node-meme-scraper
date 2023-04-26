import fs from 'node:fs';
import http from 'node:http';
/*

const url =
  'https://api.memegen.link/images/bad/your_meme_is_bad/and_you_should_feel_bad.jpg?width=300';

const file = fs.createWriteStream('memes/01.jpg');
file.write(url);
*/
import fetch from 'node-fetch';

const response = await fetch(
  'https://memegen-link-examples-upleveled.netlify.app/',
);
const body = await response.text();

console.log(typeof body);
