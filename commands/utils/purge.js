module.exports = {
  name: "purge",
  aliases: ['p'],
  description: "Deletes self messages .",
  run: async (message, args, command, client) => {
    try {
      const messages = await message.channel.messages.fetch({ limit: 100 }); //Changed limit to 100
      const botMessages = messages.filter(m => m.author.id === client.user.id);

      botMessages.each(async m => {
        try {
          await m.delete();
        } catch (error) {
          console.error(`Error deleting message: ${error.message}`);
        }
      });

      const lastMessage = await message.reply({
        files: ['https://i.gifer.com/bfR.gif'],
        content: "**[+] Who's bad ?**"
      });
      setTimeout(() => {
        try {
          lastMessage.delete();
        } catch (error) {
          console.error(`Error deleting last message: ${error.message}`);
        }
      }, 4000);
    } catch (error) {
      console.error(error);
    }
  }
};
