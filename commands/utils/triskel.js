const axios = require('axios');
const cheerio = require('cheerio');

module.exports = {
    name: "triskel",
    aliases: ['triskel'],
    description: "Fetch all information from https://kick.com/triskel",
    run: async (message) => {

      ///////// Function to delete message async
      async function deleteMessage(me){
          setTimeout(() => {
              me.delete();
          }, 5000)
      }

      ///////// Check Triskel
      await message.reply("...").then(async m => {
        
          ///////// Check if streaming and then delete message
          await m.edit(`Checking Triskel...`).then(me => deleteMessage(me));
          
          // Fetch information from https://kick.com/triskel using axios
          const response = await axios.get('https://kick.com/triskel');
          const html = response.data;
          const $ = cheerio.load(html);
          const fetchedData = $('html > body > div > div:nth-child(2) > div > div > div > div:nth-child(2) > div:nth-child(2) > div > div > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > p').text();
          console.log(fetchedData); // Handle the fetched data as needed
        });

    }
}