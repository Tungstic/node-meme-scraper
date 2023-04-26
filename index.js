import fs from 'node:fs';
import fetch from 'node-fetch';
import { parse } from 'node-html-parser';

// import http from 'node:http';
/*


const url =
  'https://api.memegen.link/images/bad/your_meme_is_bad/and_you_should_feel_bad.jpg?width=300';

const file = fs.createWriteStream('memes/01.jpg');
file.write(url);
*/

const response = await fetch(
  'https://memegen-link-examples-upleveled.netlify.app/',
);
const body = await response.text();

console.log(typeof body);

console.log(body.indexOf('images'));
// const withoutHead = body.slice(172);

// const parsedBody = withoutHead.split(`<img>`); This gives an object of the whole html string
/* this gives me every character in html string separately regardless of word formations
for (const tag of withoutHead) {
  console.log(tag);
}
*/

const root = parse(body);
const onlyImageTags = root.querySelector('img');
// console.log(onlyImageTags);

// console.log(Object.values(onlyImageTags)); // Gives me numbers of the inner objects??
// console.log(Object.values(onlyImageTags));
console.log(onlyImageTags.rawAttrs);
