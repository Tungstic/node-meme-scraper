import fs from 'node:fs';
import axios from 'axios';
import fetch from 'node-fetch';
import { parse } from 'node-html-parser';

// import http from 'node:http';

// Download HTML from meme website as a string (body is a string)
const downloadHTML = await fetch(
  'https://memegen-link-examples-upleveled.netlify.app/',
);
const body = await downloadHTML.text();

// Convert string "body" into an object
const root = parse(body);

// Get only img tags from the whole of html
const onlyImageTags = root.querySelectorAll('img');
// console.log(onlyImageTags);
// console.log(Object.keys(onlyImageTags)); // Gives me numbers of the inner objects??

const img1 = onlyImageTags[0]['rawAttrs']; // This is a string "src="https.."" that needs to be trimmed
const img2 = onlyImageTags[1]['rawAttrs'];
const img3 = onlyImageTags[2]['rawAttrs'];
const img4 = onlyImageTags[3]['rawAttrs'];
const img5 = onlyImageTags[4]['rawAttrs'];
const img6 = onlyImageTags[5]['rawAttrs'];
const img7 = onlyImageTags[6]['rawAttrs'];
const img8 = onlyImageTags[7]['rawAttrs'];
const img9 = onlyImageTags[8]['rawAttrs'];
const img10 = onlyImageTags[9]['rawAttrs'];

const imgArray = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];

// Trim the strings inside the array

function bareUrl(arrOfStrings) {
  return arrOfStrings.map((str) => {
    str = str.trim();
    str = str.slice(5, -1);
    return str;
  });
}

bareUrl(imgArray);

// console.log(Object.values(onlyImageTags));

/* THIS WORKS, DO NOT CHANGE, JUST NEED TO WORK FOR ARRAY FOR IMAGES INSTEAD OF ONLY ONE


// Use Axios to download an image
async function download(url, filepath) {
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream',
  });
  return new Promise((resolve, reject) => {
    response.data
      .pipe(fs.createWriteStream(filepath))
      .on('error', reject)
      .once('close', () => resolve(filepath));
  });
}

const remoteUrl = image1;
const localPath = 'memes/01.jpg';

await download(remoteUrl, localPath);
*/
