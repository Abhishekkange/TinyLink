// This function will generate an unique CODE / Identfier
const { customAlphabet } = require('nanoid');

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';



const generateId = () => {

    const nanoid = customAlphabet(alphabet, 5);
    return nanoid;
    
}

const suggestIds = () => {
    

}


module.exports = { generateId,suggestIds }

