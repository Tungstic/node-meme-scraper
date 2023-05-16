import fs from 'node:fs';
import axios from 'axios';
import fetch from 'node-fetch';
import { parse } from 'node-html-parser';

const dir = './memes'; // name of the directory/folder

if (!fs.existsSync(dir)) {
  // check if folder already exists
  fs.mkdirSync(dir); // creating folder
}

// Download HTML from meme website as a string (body is a string)
const downloadHTML = await fetch(
  'https://memegen-link-examples-upleveled.netlify.app/',
);
const body = await downloadHTML.text();

// Convert string "body" into an object
const root = parse(body);

// Get only <img /> elements from the whole of html
const onlyImageTags = root.querySelectorAll('img');

// Get the first 10 image urls from all <img /> elements
const tenImages = [];
for (let i = 0; i < 11; i++) {
  tenImages.push(onlyImageTags[i]['rawAttrs']);
}
// Trim the strings inside the array

function trimUrl(arrOfStrings) {
  return arrOfStrings.map((str) => {
    str = str.trim();
    str = str.slice(5, -1);
    return str;
  });
}

const bareUrl = trimUrl(tenImages);

// Use Axios to download images
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
      .once('close', () => {
        resolve(filepath);
        console.log(filepath);
      });
  });
}

// Create local paths for 10 images in memes folder
const paths = [];
function createPathForImage() {
  for (let i = 0; i < 9; i++) {
    paths.push(`./memes/0${i + 1}.jpg`);
  }
  paths.push('./memes/10.jpg');
  return paths;
}
createPathForImage();
console.log(paths);

for (let i = 0; i < 11; i++) {
  await download(bareUrl[i], paths[i]);
}

/*
await download(image1, path1);
await download(image2, path2);
await download(image3, path3);
await download(image4, path4);
await download(image5, path5);
await download(image6, path6);
await download(image7, path7);
await download(image8, path8);
await download(image9, path9);
await download(image10, path10); */

// Stretch goal to download the Gandalf meme per request

/* let memeRequest = process.argv[3]; // string "gandalf"
if (memeRequest) {
  memeRequest = memeRequest.toLowerCase();
}

let gandalfLink;

for (let i = 0; i < 143; i++) {
  // console.log(onlyImageTags[i]['rawAttrs']); all image URLs as strings
  if (onlyImageTags[i]['rawAttrs'].includes('gandalf')) {
    gandalfLink = onlyImageTags[i]['rawAttrs'];
  }
}

gandalfLink = gandalfLink.trim();
gandalfLink = gandalfLink.slice(5, -1);

const pathToGandalf = './memes/gandalf.jpg';

if (memeRequest === 'gandalf') {
  await download(gandalfLink, pathToGandalf);
} else if (!memeRequest) {
  console.log('Please type <hello gandalf> to download an extra meme');
}
 */
