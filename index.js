import fs from 'node:fs';
import { convert } from 'html-to-text';

// const https = require('node:https');

// URL of the image
const url =
  'https://api.memegen.link/images/bad/your_meme_is_bad/and_you_should_feel_bad.jpg?width=300';

const file = fs.createWriteStream('memes/01.jpg');
file.write(url);
