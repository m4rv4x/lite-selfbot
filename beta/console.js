const readline = require('readline'); // Added readline module import
const colors = require('colors'); // Added colors module import

module.exports = async (client, prompt) => { // Added prompt parameter
    if (prompt) { // Check if prompt is provided
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        const answer = await new Promise((resolve) => {
            rl.question(prompt, (input) => { // Use prompt as the question
                resolve(input);
            });
        });
        console.log('[>]: ', answer);
        rl.close();
    } else {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Sleep for 1 second
        console.log(colors.cyan('[+] Console Loaded'));
    
        while (true) {
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            const answer = await new Promise((resolve) => {
                rl.question('>', (input) => {
                    resolve(input);
                });
            });
            console.log('[>]: ', answer);
            rl.close();
        }
    }
};
