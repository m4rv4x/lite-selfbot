module.exports = {
  name: "cat",
  aliases: ['cat'],
  description: "Cat can talk !!",
  run: async (message, args, command, client) => {
    if (!args.length) {
      message.channel.send(`https://cataas.com/cat/cute`);
      return;
    }

    let text = args.join(" ");
    let encodedText = "";
    for (let i = 0; i < text.length; i++) {
      let charCode = text.charCodeAt(i);
      let hexValue = charCode.toString(16).toUpperCase();
      encodedText += "%" + hexValue;
    }

    console.log(text.length);
    const fontSize = 50;


    console.log(fontSize);
    
    setTimeout(() => {
      console.log(`https://cataas.com/cat/gif/says/${encodedText}?filter=mono&fontColor=lightgreen&fontSize=${fontSize}&type=square`);
      message.channel.send(`https://cataas.com/cat/gif/says/${encodedText}?filter=mono&fontColor=lightgreen&fontSize=${fontSize}&type=square`);
    }, 100);
  }
}
