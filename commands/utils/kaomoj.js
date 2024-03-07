module.exports = {
  name: "kaomoj",
  aliases: ['k'],
  description: "Random Kaomoj !!",
  run: async (message) => {

    ///////// Function to delete message async
    async function deleteMessage(me){
            me.delete();
    }

    const kaomojiList = require('../../data/kaomoji.json');

    ///////// Catch Ping
        ///////// Pong, then delete message
      const kaomojiIndex = Math.floor(Math.random() * Object.keys(kaomojiList).length);
      const randomKaomoji = kaomojiList[Object.keys(kaomojiList)[kaomojiIndex]];
      console.log(randomKaomoji)
      message.channel.send("`" + randomKaomoji + "`");

  }
}
