const { Client } = require('discord.js-selfbot-v13');
const fs = require('fs');
const yaml = require('js-yaml');
const client = new Client();

let fileContents = fs.readFileSync('./config.yaml', 'utf8');
let data = yaml.load(fileContents);

client.on('ready', async () => {
  console.log(`${client.user.username} is ready!`);
})

client.login(data.token);
