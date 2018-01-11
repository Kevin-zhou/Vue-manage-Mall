
const fs = require('fs');

const ip = require('../config/ip.json').ip;

const prodBaseUrl = 'const baseUrl= "/mapi/cvsm";';

const devBaseUrl = `const baseUrl= "${ip}/mapi/cvsm";`;


const destPath = './src/api/api.js';

function replaceIpByEnv(){
    if (process.env.NODE_ENV == "production") {
    replaceProdContent();
    } else {
        replaceDevContent();
    }
}

async function replaceProdContent(){
    let content = await fs.readFileSync(destPath, "UTF-8");
    content = content.replace(/const.*baseUrl.*\;/g, prodBaseUrl);
    fs.writeFileSync(destPath, content)
}

async function replaceDevContent(){
     let content = await fs.readFileSync(destPath, "UTF-8");
    content = content.replace(/const.*baseUrl.*\;/g, devBaseUrl);
    fs.writeFileSync(destPath, content)
}

module.exports = replaceIpByEnv;
