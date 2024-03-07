
module.exports = {
    name: "kill",
    aliases: ['kill'],
    description: "Kills the javascript node.",
    run: async (message, args, command, client) => {


      async function deleteMessage(me){
          setTimeout(() => {
              me.delete();
          }, 1000)
      }

      setTimeout(() => {
          message.reply("[!] Self-Killing . . .").then(async m => {
              const pid = process.pid;
              await m.edit(
              `**[*]** State: **Inactive**, 
**[?]** Reason : **Terminated by user**,
:skull:||(PID = **${pid}**)|| :headstone: **R.I.P**`
);
              client.user.setActivity("Terminated.")
              console.log("⚠️ TERMINATED ⚠️");
              await deleteMessage(m);
              setTimeout(() => {
                process.exit(1);
              }, 3000);
            });

      }, 2000);

    }

}

