const { Client, Collection } = require('discord.js-selfbot-v13');
const { readdirSync, readFileSync } = require('fs');
const yaml = require('js-yaml');
const path = require('path');
const colors = require('colors/safe'); // Corrected import statement for CommonJS
const configFile = readFileSync('./config.yaml', 'utf8');
const config = yaml.load(configFile);
const client = new Client();

client.commands = new Collection();
client.aliases = new Collection();
client.categories = readdirSync("./commands/utils"); // Corrected readdirSync usage

const handlerDirectories = readdirSync(path.join(__dirname, './handlers'));
handlerDirectories.forEach(handler => {
    require(path.join(__dirname, './handlers', handler))(client);
});
client.on('ready', async () => {
    console.log(colors.green(`${client.user.username}`), colors.white("connected as SelfBot"));
    client.user.setStatus(config.play_status);
    switch (config.activity_type) {
        case "PLAYING":
            client.user.setActivity(config.activity_name, { type: "PLAYING" });
            break;
        case "STREAMING":
            client.user.setActivity(config.activity_name, { type: "STREAMING", url: config.streaming_url });
            break;
        case "LISTENING":
            client.user.setActivity(config.listen_activity, { type: "LISTENING" });
            break;
        case "WATCHING":
            client.user.setActivity(config.watching_activity, { type: "WATCHING" });
            break;
        case "CUSTOM_STATUS":
            client.user.setActivity(config.custom_status);
            break;
        default:
            console.log(colors.red("Invalid activity type."));
    }
})

const commandCooldowns = new Collection();
client.on('messageCreate', async (message) => {
    console.log(message.content); // Log everything before filtering
    if (message.author.id !== client.user.id) return; // Ignore other users than myself
    if (!message.content.startsWith('>')) return; // Handle every message starting with ">"
    console.log("Received command >");

    const args = message.content.split(' ');
    const commandName = args.shift().slice(config.prefix.length);

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return;

    const now = Date.now();
    if (commandCooldowns.has(command.name)) {
        const cooldown = commandCooldowns.get(command.name);
        const remainingTime = cooldown - now;
        if (remainingTime > 0) {
            console.log(colors.yellow(`Command on cooldown for ${remainingTime}ms`));
            return;
        }
    }
    commandCooldowns.set(command.name, now + 1000); // 1 second cooldown

    try {
        command.run(message, args, command, client);
    } catch (error) {
        console.error(error);
        message.channel.send('There was an error while executing the command.');
    }
    message.delete(); // Delete the message after executing the command
});


client.login(config.token);
process.on('uncaughtException', (err) => {
    console.error(colors.red('An uncaught exception occurred:'), err);
    client.destroy();
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error(colors.red('Unhandled Rejection at:'), promise, colors.red('reason:'), reason);
    client.destroy();
    process.exit(1);
});

process.on('SIGINT', () => {
    console.log(colors.green('Received SIGINT. Closing gracefully. Goodbye'));
    client.destroy();
    process.exit(0);
});