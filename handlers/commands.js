// Dynamically loading command modules
const { readdirSync } = require('fs');
const path = require('path'); // Added path module import
const colors = require('colors'); // Added colors module import

module.exports = (client) => {
    const commandDirectories = ['utils']; // Added other directories
    commandDirectories.forEach(directory => {
        readdirSync(path.join(__dirname, `../commands/${directory}`)).forEach(file => {
            const commandPath = path.join(__dirname, `../commands/${directory}/${file}`);
            const command = require(commandPath); // Used path.join for file path
            if (command.name && typeof command.name === 'string') {
                client.commands.set(command.name, command);
                console.log(colors.green(`[+] Module loaded : ${file}`));
                if (command.aliases && Array.isArray(command.aliases)) {
                    command.aliases.forEach(alias => {
                        if (typeof alias === 'string') {
                            client.aliases.set(alias, command.name);
                        } else {
                            console.log(colors.red(`[-] Invalid alias type for command : ${command.name}`));
                        }
                    });
                } else {
                    console.log(colors.red(`[-] Invalid aliases array for command : ${command.name}`));
                }
            } else {
                console.log(colors.red(`[-] Error Loading module : ${file}`));
            }
        });
    });
};
