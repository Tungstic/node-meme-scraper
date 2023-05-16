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

// Get only img tags from the whole of html
const onlyImageTags = root.querySelectorAll('img');

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

let imgArray = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];

// Trim the strings inside the array

function bareUrl(arrOfStrings) {
  return arrOfStrings.map((str) => {
    str = str.trim();
    str = str.slice(5, -1);
    return str;
  });
}

imgArray = bareUrl(imgArray);
const [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
] = imgArray;

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
      .once('close', () => resolve(filepath));
  });
}

const path1 = './memes/01.jpg';
const path2 = './memes/02.jpg';
const path3 = './memes/03.jpg';
const path4 = './memes/04.jpg';
const path5 = './memes/05.jpg';
const path6 = './memes/06.jpg';
const path7 = './memes/07.jpg';
const path8 = './memes/08.jpg';
const path9 = './memes/09.jpg';
const path10 = './memes/10.jpg';

await download(image1, path1);
await download(image2, path2);
await download(image3, path3);
await download(image4, path4);
await download(image5, path5);
await download(image6, path6);
await download(image7, path7);
await download(image8, path8);
await download(image9, path9);
await download(image10, path10);

// Stretch goal to download the Gandalf meme per request

let memeRequest = process.argv[3]; // string "gandalf"
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
