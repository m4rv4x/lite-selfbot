module.exports = {
    name: "btc-price",
    aliases: ['btc'],
    description: "Shows the current BTC price.",
    run: async (message, args, command, client) => {

      async function deleteMessage(me){
          setTimeout(() => {
              me.delete();
          }, 60000)
      }
      const fetch = require('node-fetch');
      const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
      const data = await response.json();
      const btcPrice = data.bpi.USD.rate;

      const eurPrice = data.bpi.EUR.rate; // get the BTC price in EUR
      const gbpPrice = data.bpi.GBP.rate; // get the BTC price in GBP
      const currentDate = new Date().toLocaleString();
      const twentyFourHourTrend = await checkTrendForLast24Hours(); // Check trend for last 24 hours
      const twentyFourHourTrendEmoji = twentyFourHourTrend === 'upward' ? '📈' : '📉'; // Set trend emoji based on trend

      await message.channel.send("Fetching BTC price . . .").then(async m => {
          await m.edit(`## 1 BTC = (24h: ${twentyFourHourTrendEmoji}) \n# $ ${btcPrice} \n# € ${eurPrice}\n# £ ${gbpPrice}`).then(me => deleteMessage(me));
      });
    }
}

async function checkTrendForLast24Hours() {
    // Logic to check the trend for the last 24 hours
    // Implement your own logic here
    return 'upward'; // Placeholder, replace with actual logic
}

