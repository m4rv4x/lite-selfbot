module.exports = {
    name: "ping",
    aliases: ['ping'],
    description: "Shows the current latency.",
    run: async (message) => {

      ///////// Function to delete message async
      async function deleteMessage(me){
          setTimeout(() => {
              me.delete();
          }, 10000)
      }

      ///////// Catch Ping
          await message.reply("💻 **Ping...**").then(async m => {

            // Edit prompt: **ping 5 times consecutives**
            for (let i = 0; i < 5; i++) {
                
                await m.edit(`💾 **Pong ${i + 1}...**`);

                ///////// Pong, then delete message
                }
            await m.edit(`💾 **Final Pong! Average latency is \`${m.createdTimestamp - message.createdTimestamp}ms\`**`).then(me => deleteMessage(me));
          });

    }
}