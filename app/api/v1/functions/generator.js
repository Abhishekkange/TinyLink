// This function will generate an unique CODE / Identfier
const { customAlphabet } = require('nanoid');
const Link = require('../models/linkModel')


const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

const generateId = () => {

    const nanoid = customAlphabet(alphabet, 5);
    return nanoid;
    
}

const randomChar = () => {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  return chars[Math.floor(Math.random() * chars.length)];
};
const randomNum = () => Math.floor(Math.random() * 10);



async function generateSuggestions(base, count = 5) {
  let suggestions = [];

  while (suggestions.length < count) {
    const patterns = [
      base + randomNum(),
      base + randomNum() + randomNum(),
      base.slice(0, -1) + randomChar(),
      randomChar() + base,
      base + randomChar(),
      base + "-" + randomNum()
    ];

    const suggestion = patterns[Math.floor(Math.random() * patterns.length)];

    const exists = await Link.findOne({ shortName: suggestion });
    if (!exists && !suggestions.includes(suggestion)) {
      suggestions.push(suggestion);
    }
  }

  return suggestions;
}


module.exports = { generateId,generateSuggestions }

