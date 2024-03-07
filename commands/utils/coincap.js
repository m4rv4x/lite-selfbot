
module.exports = {
  name: "coincap",
  aliases: ['cc'],
  description: "Fetches data from coincap api and posts it in the channel.",
  run: async (message, args, command, client) => {
    if (args >= 1 && args <= 100) {
      const https = require('https');
      var requestOptions = {
        method: 'GET',
        hostname: 'api.coincap.io',
        path: `/v2/assets?limit=${args}`
      };
      https.get(requestOptions, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          try {
            const assets = JSON.parse(data).data;
            let messageToSend = "";
            assets.forEach(asset => {
              messageToSend += `**${asset.rank}** | **${asset.name}** (${asset.symbol}) = **$${parseFloat(asset.priceUsd).toFixed(2)}**\n\n`;
            });
            // Split message into chunks of 4000 characters max
            const chunks = messageToSend.match(/.{1,2000}/g);
            chunks.forEach(chunk => {
              console.log(chunk);
              message.channel.send(chunk);
            });
          } catch (err) {
            console.error(err);
            message.channel.send('There was an error processing the data from the API.');
          }
        });
      }).on('error', (err) => {
        console.error(err);
        message.channel.send('There was an error fetching data from the API.');
      });
      return;
    }
    message.channel.send(`https://cataas.com/cat/cute/says/${args.join("%20")}`);
  }
}
