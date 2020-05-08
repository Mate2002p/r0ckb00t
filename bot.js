//Imports and necessary variables

const Discord = require("discord.js");
const { Client, Util } = require("discord.js");
const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");
const dotenv = require("dotenv").config();


const TOKEN = process.env.BOT_TOKEN;
const PREFIX = process.env.PREFIX;

var isReady = true;

const bot = new Discord.Client();

//Connection checker
function catchErr(err, message){
    bot.channels.get('706119006939250718').send("There was an error in the code while trying to run command \`" + message + "\` in channel " + message.channel);
    bot.channels.get('706119006939250718').send("ERROR: ```" + err + "```");
    console.error(err);
}
function catchErrVoice(err, newMember, newChannel){
    if(newChannel === bot.channels.get("668510838004514836")){
        bot.channels.get('706119006939250718').send("There was a problem trying to play a sound in voicechannel: " + newChannel + " for member: " + newMember.user.username + "\nERROR: ```" + err + "```")
    }
}
function catchErrRole(err, member){
    bot.channels.get('706119006939250718').send("There was an error trying to assign the role to " + member.user.username + "\nERROR: ```" + err + "```")
}

bot.on("warn", console.warn);
bot.on("ready", () =>{
    let guild = bot.guilds.get('668502527523815424');
    let b0t = guild.member('706112333465780266');
    console.log(`${b0t.user.username} is up and running boiz!`)
});
bot.on("disconnect", () => console.log("An error occurred, trying to reconnect!"));
bot.on("reconnecting", () => console.log("I am reconnecting now..."));




//Gives roles upon joining the server and sends a welcome message

bot.on('guildMemberAdd', member => {
    try{
    console.log(member.user.tag + ' has just joined the server! Welcome to the Bi-Weave Kingdom!');
    var role1 = member.guild.roles.find(role => role.name === "PvP Club");
    var role2 = member.guild.roles.find(role => role.name === "Guest");
    member.guild.channels.get('668505201916772354').send("Welcome to the R0CK server " + member.user + "!"); 
    member.addRole(role1);
    member.addRole(role2);
    }catch(err){
        catchErrRole(err, member);
    }
  });

//Bot Status

  bot.on('ready', () => {
    bot.user.setStatus('available')
    bot.user.setPresence({
        game: {
            name: 'A Dead Game',
            type: "PLAYING",
            url: "https://www.youtube.com/user/FrontierDevelopments"
        }
    });
});

//R0CK Voice Join

bot.on('voiceStateUpdate', (oldMember, newMember) => {
    let oldUserChannel = oldMember.voiceChannel
    newChannel = newMember.voiceChannel;
    const rockvoice = bot.channels.get('668510838004514836');
    
    try{
    if(newMember.id === "409024340642889728"){
        if (newChannel === rockvoice && oldUserChannel != newChannel) {
            rockvoice.join().then(connection =>
                {
                const dispatcher = connection.playFile('./soundboard/mate.mp3');
                dispatcher.on("end", end => {
                    });
                }).catch(err => console.log(err));
        }
    }else{
        if (newChannel === rockvoice && oldUserChannel != newChannel) {
            rockvoice.join().then(connection =>
                {
                const dispatcher = connection.playFile('./soundboard/fuego.mp3');
                dispatcher.on("end", end => {
                    });
                }).catch(err => console.log(err));
        }
    }
}catch(err){
    catchErrVoice(err, newMember, newChannel);
}
  });

//Leave Voice Channel when its empty

bot.on('voiceStateUpdate', () => {
    try{
        var voiceChannel1Members = [];
        var voiceChannel2Members = [];
        var voiceChannel3Members = [];
        var voiceChannel4Members = [];
        var voiceChannel5Members = [];
        var voiceChannel6Members = [];
        var voiceChannel1 = bot.channels.get('668510838004514836');
        var voiceChannel2 = bot.channels.get('668515487549751327');
        var voiceChannel3 = bot.channels.get('668506316297469973');
        var voiceChannel4 = bot.channels.get('668506231689838602');
        var voiceChannel5 = bot.channels.get('675080678584483853');
        var voiceChannel6 = bot.channels.get('675080723551617032');
        voiceChannel1.members.forEach(function(guildMember) {
            voiceChannel1Members.push(guildMember);
        })
        voiceChannel2.members.forEach(function(guildMember) {
            voiceChannel2Members.push(guildMember);
        })
        voiceChannel3.members.forEach(function(guildMember) {
            voiceChannel3Members.push(guildMember);
        })
        voiceChannel4.members.forEach(function(guildMember) {
            voiceChannel4Members.push(guildMember);
        })
        voiceChannel5.members.forEach(function(guildMember) {
            voiceChannel5Members.push(guildMember);
        })
        voiceChannel6.members.forEach(function(guildMember) {
            voiceChannel6Members.push(guildMember);
        })
        if(voiceChannel1Members.length === 1 && voiceChannel1Members[0].id === "706112333465780266"){
            voiceChannel1.leave();
        }
        if(voiceChannel2Members.length === 1 && voiceChannel2Members[0].id === "706112333465780266"){
            voiceChannel2.leave();
        }
        if(voiceChannel3Members.length === 1 && voiceChannel3Members[0].id === "706112333465780266"){
            voiceChannel3.leave();
        }
        if(voiceChannel4Members.length === 1 && voiceChannel4Members[0].id === "706112333465780266"){
            voiceChannel4.leave();
        }
        if(voiceChannel5Members.length === 1 && voiceChannel5Members[0].id === "706112333465780266"){
            voiceChannel5.leave();
        }
        if(voiceChannel6Members.length === 1 && voiceChannel6Members[0].id === "706112333465780266"){
            voiceChannel6.leave();
        }
    }catch(err){
        bot.channels.get('706119006939250718').send("There was an error:```" + err + "```")
    }
})


//R0CK soundboard

bot.on('message', message => {
    try{
    if(message.channel.id === "707942845285138432"){

    }else{
    var voiceChannel = message.member.voiceChannel;

    if(message.content === PREFIX +  "galahad" || message.content === PREFIX +  "gal"){
        if(message.member.voiceChannel){
            if(message.member.roles.get('706120235882643546')){
            isReady = false;
            voiceChannel.join().then(connection =>
            {
            const dispatcher = connection.playFile('./soundboard/GalahadLaugh.mp3');
            dispatcher.on("end", end => {
                });
            }).catch(err => console.log(err));
            message.channel.send('<:hahaha:693189110042591377>')
            isReady = true;
            }else{
                message.reply('you do not have the required permissions to use this command!')
            }
        }else{
            message.reply("You are not in a voice channel!")
        }
    };
    if(message.content === PREFIX + "pingu"){
        if(message.member.voiceChannel){
            if(message.member.roles.get('706120235882643546')){
            isReady = false;
            voiceChannel.join().then(connection =>
            {
            const dispatcher = connection.playFile('./soundboard/pingu.mp3');
            dispatcher.on("end", end => {
                });
            }).catch(err => console.log(err));
            message.channel.send('<:pingu:692699369568206879>')
            isReady = true;
            }else{
                message.channel.send('<:pingu:692699369568206879>');
                //message.delete();
            }
        }else{
            message.channel.send('<:pingu:692699369568206879>');
            //message.delete();
        }
    };
    if(message.content === PREFIX + "running"){
        if(message.member.voiceChannel){
            if(message.member.roles.get('706120235882643546')){
            isReady = false;
            voiceChannel.join().then(connection =>
            {
            const dispatcher = connection.playFile('./soundboard/y_r_u_running.mp3');
            dispatcher.on("end", end => {
                });
            }).catch(err => console.log(err));
            isReady = true;
            }else{
                message.reply('you do not have the required permissions to use this command!')
            }
        }else{
            message.reply("You are not in a voice channel!")
        }
    }
    if(message.content === PREFIX + "gank"){
        if(message.member.voiceChannel){
            if(message.member.roles.get('706120235882643546')){
            isReady = false;
            voiceChannel.join().then(connection =>
            {
            const dispatcher = connection.playFile('./soundboard/gank.mp3');
            dispatcher.on("end", end => {
                });
            }).catch(err => console.log(err));
            isReady = true;
            }else{
                message.reply('you do not have the required permissions to use this command!')
            }
        }else{
            message.reply("You are not in a voice channel!")
        }
    }
    if(message.content === PREFIX + "kill"){
        if(message.member.voiceChannel){
            if(message.member.roles.get('706120235882643546')){
            isReady = false;
            voiceChannel.join().then(connection =>
            {
            const dispatcher = connection.playFile('./soundboard/hvb.mp3');
            dispatcher.on("end", end => {
                });
            }).catch(err => console.log(err));
            isReady = true;
            }else{
                message.reply('you do not have the required permissions to use this command!')
            }
        }else{
            message.reply("You are not in a voice channel!")
        }
    }
    if(message.content === PREFIX + "nuts"){
        if(message.member.voiceChannel){
            if(message.member.roles.get('706120235882643546')){
            isReady = false;
            voiceChannel.join().then(connection =>
            {
            const dispatcher = connection.playFile('./soundboard/nuts.mp3');
            dispatcher.on("end", end => {
                });
            }).catch(err => console.log(err));
            isReady = true;
            }else{
                message.reply('you do not have the required permissions to use this command!')
            }
        }else{
            message.reply("You are not in a voice channel!")
        }
    }
    if(message.content === PREFIX + "cuppy"){
        if(message.author.id === "409024340642889728"){
            if(message.member.voiceChannel){
            isReady = false;
            voiceChannel.join().then(connection =>
            {
            const dispatcher = connection.playFile('./soundboard/cuppy.mp3');
            dispatcher.on("end", end => {
                });
            }).catch(err => console.log(err));
            message.channel.send('<:cuppy:706212856336482384>❤️');
            isReady = true;
                if(message.author.id === '409024340642889728'){
                    message.channel.send('I love you Mate!')
                }
            }else{
                message.channel.send('<:cuppy:706212856336482384>❤️');
                if(message.author.id === '409024340642889728'){
                    message.channel.send('I love you Mate!')
                }
            }
        }
        else if(message.author.id === "405899499668635650"){
            message.channel.send("<:cuppy:706212856336482384>: Score gay")
        }
        else if(message.author.id === "311567273942974474"){
            message.channel.send('<:cuppy:706212856336482384>: No u')
        }
        else if(message.author.id === "415183264538558485"){
            message.channel.send('<:cuppy:706212856336482384>: genZ boi Xplo')
        }
        else if(message.author.id === "307145886021058560"){
            message.channel.send('<:cuppy:706212856336482384>: OK Boomer')
        }
    }
    if(message.content === PREFIX + "spear"){
        if(message.member.roles.get('668507736023105565')){
            if(message.member.voiceChannel){
            isReady = false;
            voiceChannel.join().then(connection =>
            {
            const dispatcher = connection.playFile('./soundboard/spear.mp3');
            dispatcher.on("end", end => {
                });
            }).catch(err => console.log(err));
            message.channel.send('♿');
            isReady = true;
            }else{
                message.channel.send('♿');
            }
        }
    }
    if(message.content === PREFIX + "fdl" || message.content === PREFIX + "FDL"){
        if(message.member.voiceChannel){ 
        if(message.member.roles.get('706120235882643546')){ 
        message.channel.send('<:fdl:706125567233228810>');
        message.react('🙏');
        isReady = false;
            voiceChannel.join().then(connection =>
            {
            const dispatcher = connection.playFile('./soundboard/prayfdl.mp3');
            dispatcher.on("end", end => {
                });
            }).catch(err => console.log(err));
            isReady = true;
        }else{
            message.channel.send('<:fdl:706125567233228810>');
            message.react('🙏');
        }
    }else{
        message.channel.send('<:fdl:706125567233228810>');
        message.react('🙏');
    }
}
    if(message.content === PREFIX + "fas" || message.content === PREFIX + "FAS"){
        if(message.member.voiceChannel){
            if(message.member.roles.get('706120235882643546')){ 
                message.channel.send('<:fas:706206736033382400>');
                message.channel.send('<:moto:706527698100420718>');
                message.react('🙏');
                message.react('🦛');
                isReady = false;
                voiceChannel.join().then(connection =>
                {
                const dispatcher = connection.playFile('./soundboard/moto.mp3');
                dispatcher.on("end", end => {
                    });
                }).catch(err => console.log(err));
                isReady = true;
            }else{
                message.channel.send('<:fas:706206736033382400>');
                message.react('🙏');
                }
        }else{
            message.channel.send('<:fas:706206736033382400>');
            message.react('🙏');
            }
    }
    if(message.content === PREFIX + "orca" || message.content === PREFIX + "ORCA"){
        if(message.member.voiceChannel){
            if(message.member.roles.get('706120235882643546')){ 
            message.channel.send('orca <a:gay:706212201819668561>');
            isReady = false;
            voiceChannel.join().then(connection =>
            {
            const dispatcher = connection.playFile('./soundboard/ymca.mp3');
            dispatcher.on("end", end => {
                });
            }).catch(err => console.log(err));
            isReady = true;
        }else{
            message.channel.send('orca <a:gay:706212201819668561>');
            }
    }else{
        message.channel.send('orca <a:gay:706212201819668561>');
        }
}
if(message.content === PREFIX + "prismo" || message.content === PREFIX + "PRISMO"){
    if(message.member.voiceChannel){
        if(message.member.roles.get('706120235882643546')){ 
        message.channel.send('prismo <a:gay:706212201819668561>');
        isReady = false;
        voiceChannel.join().then(connection =>
        {
        const dispatcher = connection.playFile('./soundboard/ymca.mp3');
        dispatcher.on("end", end => {
            });
        }).catch(err => console.log(err));
        isReady = true;
    }else{
        message.channel.send('prismo <a:gay:706212201819668561>');
        }
}else{
    message.channel.send('prismo <a:gay:706212201819668561>');
    }
}
if(message.content === PREFIX + "mamba" || message.content === PREFIX + "MAMBA"){
    if(message.member.voiceChannel){
        if(message.member.roles.get('706120235882643546')){ 
            message.react('🙏');
            message.channel.send('<:mamba:706808303140732950>');
            message.channel.send('Straight lining is gay.')
        isReady = false;
        voiceChannel.join().then(connection =>
        {
        const dispatcher = connection.playFile('./soundboard/ymca.mp3');
        dispatcher.on("end", end => {
            });
        }).catch(err => console.log(err));
        isReady = true;
    }else{
        message.react('🙏');
            message.channel.send('<:mamba:706808303140732950>');
            message.channel.send('Straight lining is gay.')
        }
}else{
    message.react('🙏');
            message.channel.send('<:mamba:706808303140732950>');
            message.channel.send('Straight lining is gay.')
    }
}
    if(message.content === PREFIX + "rock" || message.content === PREFIX + "r0ck" || message.content === PREFIX + "R0CK" || message.content === PREFIX + "ROCK"){
        if(message.member.roles.get('668507736023105565')){
        if(message.member.voiceChannel){
            message.channel.send({
                files: [
                  "./pictures/r0ck.png"
                ]
              });
            isReady = false;
            voiceChannel.join().then(connection =>
            {
            const dispatcher = connection.playFile('./soundboard/firstclass.mp3');
            dispatcher.on("end", end => {
                });
            }).catch(err => console.log(err));
            isReady = true;
        }else{
            message.channel.send({
                files: [
                  "./pictures/r0ck.png"
                ]
              });
            }
        
    }else{
        message.channel.send("You are not a R0CK member!")
    }
}
if(message.content === PREFIX + "crash"){
    if(message.member.voiceChannel){
        if(message.member.roles.get('706120235882643546')){
        isReady = false;
        voiceChannel.join().then(connection =>
        {
        const dispatcher = connection.playFile('./soundboard/crash.mp3');
        dispatcher.on("end", end => {
            });
        }).catch(err => console.log(err));
        isReady = true;
        }else{
            message.reply('you do not have the required permissions to use this command!')
        }
    }else{
        message.reply("You are not in a voice channel!")
    }
}
if(message.content === PREFIX + "nato" || message.content === PREFIX + "NATO"){
    if(message.member.roles.get('668507736023105565')){
        if(message.member.voiceChannel){
        isReady = false;
        voiceChannel.join().then(connection =>
        {
        const dispatcher = connection.playFile('./soundboard/barnard.mp3');
        dispatcher.on("end", end => {
            });
        }).catch(err => console.log(err));
        isReady = true;
        }else{
            message.channel.send("You are not in a voice channel!")
        }
    }
}
if(message.content === PREFIX + "sorry1"){
    if(message.member.voiceChannel){
        if(message.member.roles.get('706120235882643546')){
        isReady = false;
        voiceChannel.join().then(connection =>
        {
        const dispatcher = connection.playFile('./soundboard/sorry.mp3');
        dispatcher.on("end", end => {
            });
        }).catch(err => console.log(err));
        isReady = true;
        }else{
            message.reply('you do not have the required permissions to use this command!')
        }
    }else{
        message.reply("You are not in a voice channel!")
    }
}
if(message.content === PREFIX + "sorry2"){
    if(message.member.voiceChannel){
        if(message.member.roles.get('706120235882643546')){
        isReady = false;
        voiceChannel.join().then(connection =>
        {
        const dispatcher = connection.playFile('./soundboard/sorry2.mp3');
        dispatcher.on("end", end => {
            });
        }).catch(err => console.log(err));
        isReady = true;
        }else{
            message.reply('you do not have the required permissions to use this command!')
        }
    }else{
        message.reply("You are not in a voice channel!")
    }
}
}
    }
catch(err){
    catchErr(err, message);
}
});

//Join and Leave commands

bot.on('message', message =>{
    try{
        if(message.channel.id === "707942845285138432"){

        }else{
    if(message.content === PREFIX + "join"){
        var voiceChannel = message.member.voiceChannel;
        if(voiceChannel){
        voiceChannel.join();
        }else{
            message.channel.send("You are not in a voice channel!")
        }
    }
}
}catch(err){
    catchErr(err, message);
}
});

bot.on('message', message =>{
    try{
        if(message.channel.id === "707942845285138432"){

        }else{
    if(message.content === PREFIX + "leave"){
        var voiceChannel = message.member.voiceChannel;
        if(voiceChannel){
        voiceChannel.leave();
        }else{
            message.channel.send("You are not in a voice channel")
        }
    }
}
}catch(err){
    catchErr(err, message);
}
});

//Help / random message replies

bot.on('message', message=>{
    try{
        if(message.channel.id === "707942845285138432"){

        }else{
    if (message.content === PREFIX + "help" || message.content === PREFIX + "HELP") {
        const helpembed = new Discord.RichEmbed()
            .setColor("#58C4EF")
            .setAuthor(name, bot.user.displayAvatarURL)
            .setDescription(`
__**Commands:**__
> **Bot Controls:** \`!join\`, \`!leave\`
> **Soundboard:** \`!galahad/!gal\`, \`!pingu\`,
> \`!running\`, \`!kill\`, \`!gank\`, \`!nuts\`, \`!crash\`,
> \`!sorry1\`, \`!sorry2\`
> **Emojis:** \`!blob\`, \`!beerblob\`, \`!fdl\`,
> \`!no_u\`, \`!fas\`, \`!orca\`, \`!moto\`, \`!mamba\`,
> \`!prismo\`
> **Random Stuff:** \`!r0ckb0tisthebest\`,
> \`!quarantine_fuckhead\`
> **Fights: **\`!fhelp\` - for fight registration`)
            .setFooter('Serves the All-Mighty Bi-Weave community! \nby Mate2002p');
        message.channel.send(helpembed);
    }
    if(message.content === PREFIX + "blob" || message.content === PREFIX + "BLOB"){
      message.channel.send('<a:trashblob:706120662196027463>');
      //message.delete();
    }  
    if(message.content === PREFIX + "no_u" || message.content === PREFIX + "NO_U"){
        message.channel.send('<:no_u:692701168748593192>');
        //message.delete();
      } 
    if(message.content === PREFIX + "beerblob" || message.content === PREFIX + "BEERBLOB"){
        message.channel.send('<a:beerblob:704462060066701462>');
        //message.delete();
    } 
    if(message.content === PREFIX + "r0ckb0tisthebest" || message.content === PREFIX + "r0ckbotisthebest"){
        message.channel.send('Yeeey!');
        message.react('❤️');
    }
    if(message.content === PREFIX + "quarantine_fuckhead"){
        message.channel.send('<:bachplo:702994265353093191>');
        message.channel.send('<@415183264538558485>');
    }
    if(message.content === PREFIX + "shadowram"){
        if(message.member.roles.get('668507736023105565')){
            message.channel.send('<@307145886021058560>')
        }
    }
    if(message.content === PREFIX + "moto"){
        message.channel.send('<:moto:706527698100420718>')
    }
    if(message.content === PREFIX + "match" || message.content === PREFIX + "league" || message.content === PREFIX + "m" || message.content === PREFIX + "l"){
        if(message.member.roles.get('668507736023105565')){
            message.channel.send('**__R0CK Matches:__**\n\n**R0CK vs GPL-1** - *05.11 19:00 NPT*')
        }
    }
        }
}catch(err){
    catchErr(err, message);
}
});

//PvP-BOT

var queue = [];
var balance = 0;

bot.on('message', (message) => {
    try{
    let guild = bot.guilds.get('668502527523815424');
    var servermembers = [];
    guild.members.forEach(member => {
        if(member.id === "706112333465780266"){
        }else{
            servermembers.push(guild.member(member));
        }
    }); 
    if(message.channel.id === '706679615795757147' || message.channel.id === '707942845285138432'){
        if(message.content === PREFIX + "reg" || message.content === PREFIX + "Reg" || message.content === PREFIX + "REG" || message.content === PREFIX + "r"){
            if(!message.member === queue.includes(message.member)){
                queue.push(message.member);
                message.channel.send(`You have been added to the queue \`(${queue.length})\``)
            }
            else{
                message.channel.send(`You are already in the queue!`)
            }
        }
        if(message.content === PREFIX + "serverreg"){
            if(message.member.id === "307145886021058560" || message.member.id === "409024340642889728"){
                for(var w = 0; w < servermembers.length; w++){
                    if(!servermembers[w] === queue.includes(servermembers[w])){
                        queue.push(servermembers[w]);
                    }else{
                        message.channel.send(`${servermembers[w].user.username} is already in the queue!`)
                    }
                }
                message.channel.send(`ALL users from the server have been added to the queue: \`(${queue.length})\``)
            }else{
                message.channel.send("You have no permission to use this command!")
            }
        }
        if(message.content === PREFIX + "rockreg" || message.content === PREFIX + "r0ckreg"){
            if(message.member.roles.get('706130282738090006')){
                for(var w = 0; w < servermembers.length; w++){
                    if(servermembers[w].roles.get('668507736023105565')){
                        if(!servermembers[w] === queue.includes(servermembers[w])){
                            queue.push(servermembers[w]);
                        }else{
                            message.channel.send(`${servermembers[w].user.username} is already in the queue!`)
                        }
                    }
                }
                message.channel.send(`All R0CK Members have been added to the queue: \`(${queue.length})\``)
            }else{
                message.channel.send("You have no permission to use this command!")
            }
        }
        if(message.content === PREFIX + "unreg" || message.content === PREFIX + "Unreg" || message.content === PREFIX + "UNREG"){
            if(queue.includes(message.member)){
            }else{
                message.channel.send("You are not in the queue!")
            }
            for(var i = 0; i <= queue.length; i++){
                if(queue[i] === message.member){
                    queue.splice(i, 1);
                    message.channel.send("You have been removed from the queue!")
                }
            }
        }
        if(message.content === PREFIX + "freg" || message.content === PREFIX + "Freg" || message.content === PREFIX + "FREG"){
            if(!queue.includes(guild.member('706112333465780266'))){
            queue.push(guild.member('706112333465780266'));
            message.channel.send(`Bot added to queue \`(${queue.length})\``);
            }else{
                message.channel.send("Bot is already in the queue!")
            }
        }
        if(message.content === PREFIX + "unfreg" || message.content === PREFIX + "Unfreg" || message.content === PREFIX + "UNFREG"){
            if(queue.includes(guild.member('706112333465780266'))){
            }else{
                message.channel.send("The Bot is not in the queue!")
            }
            for(var i = 0; i <= queue.length; i++){
                if(queue[i] === guild.member('706112333465780266')){
                    queue.splice(i, 1);
                    message.channel.send("The bot has been removed from the queue!")
                }
            }
        }
        if(message.content === PREFIX + "regall" || message.content === PREFIX + "Regall" || message.content === PREFIX + "REGALL"){
            var voiceChannel = message.member.voiceChannel;
            if(message.member.voiceChannel){
                voiceChannel.members.forEach(function(guildMember, guildMemberId) {
                    if(guildMemberId != "706112333465780266"){
                        if(!guildMember === queue.includes(guildMember)){
                            queue.push(guildMember);
                            message.channel.send(`${guildMember.user.username} added to the queue \`(${queue.length})\``)
                        }else{
                            message.channel.send(`${guildMember.user.username} is already in the queue!`)
                        }
                    }
                })
            }else{
                message.reply("you need to be in a voice channel to use this command!")
            }
        }
        if(message.content === PREFIX + "queue" || message.content === PREFIX + "Queue" || message.content === PREFIX + "QUEUE"){
            if(queue.length < 1){
                message.channel.send("The queue is empty!")
            }else{
                var queuePrint = [];
                for(var w = 0; w < queue.length; w++){
                queuePrint.push(queue[w].user.username);
                }
                var queueout = queuePrint.join(', ')
                message.channel.send(`Queue \`(${queue.length})\`: ${queueout}`)
            }
        }
        if(message.content === PREFIX + "clear" || message.content === PREFIX + "Clear" || message.content === PREFIX + "CLEAR" || message.content === PREFIX + "clr" || message.content === PREFIX + "Clr" || message.content === PREFIX + "CLR"){
            queue = [];
            message.channel.send(`Queue cleared!`)
        }
        if(message.content === PREFIX + "balanace1" || message.content === PREFIX + "b1"){
            balance = 1;
            message.channel.send("Maximum team difference has been set to the strength of the weakest player in the queue!");
        }
        if(message.content === PREFIX + "balanace2" || message.content === PREFIX + "b2"){
            balance = 2;
            message.channel.send("Maximum team difference has been set to the average strengths of the players in the queue!");
        }
        if(message.content === PREFIX + "balanace0" || message.content === PREFIX + "b0"){
            balance = 0;
            message.channel.send("Maximum team difference has been set to 0!");
        }
        if(message.content === PREFIX + "strength1" || message.content === PREFIX + "s1"){
            if(message.member.roles.get('706887451586854964')){
                message.channel.send("You already have this role!")
            }else{
                if(message.member.roles.get('706937611310334012') || message.member.roles.get('707196209617436695')){
                    message.member.removeRole('706937611310334012');
                    message.member.removeRole('707196209617436695');
                    message.channel.send("Role assigned!");
                }else{
                    message.channel.send("Role assigned!");
                }
            }
        }
        if(message.content === PREFIX + "strength2" || message.content === PREFIX + "s2"){
            if(message.member.roles.get('706937611310334012')){
                message.channel.send("You already have this role!")
            }else{
                if(message.member.roles.get('707196209617436695')){
                    message.member.removeRole('707196209617436695');
                    message.member.addRole('706937611310334012');
                    message.channel.send("Role assigned!");
                }else{
                    message.member.addRole('706937611310334012');
                    message.channel.send("Role assigned!");
                }
            }
        }
        if(message.content === PREFIX + "strength3" || message.content === PREFIX + "s3"){
            if(message.member.roles.get('707196209617436695')){
                message.channel.send("You already have this role!")
            }else{
                if(message.member.roles.get('706937611310334012')){
                    message.member.removeRole('706937611310334012');
                    message.member.addRole('707196209617436695');
                    message.channel.send("Role assigned!");
                }else{
                    message.member.addRole('707196209617436695');
                    message.channel.send("Role assigned!");
                }
            }
        }
        if(message.content === PREFIX + "roll")
		{
            if(queue.length < 2)
			{
                message.channel.send("Not enough players in queue for a balanced roll.");
			}
			else
			{
// DEFINE LOCAL VARIABLES
                var i = 0;
				var j = 0;
				var k = 0;
				var x = "";
                var players = [];
				
				for(i = 0; i<queue.length; i++)
				{
					if(queue[i].roles.find(role => role.name === "Strength 3"))
					{
						players.push(`3${i.toString()}`);
					}
					else if(queue[i].roles.find(role => role.name === "Strength 2"))
					{
						players.push(`2${i.toString()}`);
					}
					else
					{
						players.push(`1${i.toString()}`);
					}
                }
				var totalstrength = 0;
                var avgstrength = 0;
				var minstrength = 10;
				var team1size = 0;
				var team2size = 0;
				var team1strength = 0;
				var delta = 0;
				var diff = 0;
                var maxdiff = 0;

// COMPUTING TOTAL, AVERAGE AND MINIMAL STRENGTH
                for(i = 0; i < players.length; i++)
				{
					j = parseInt(players[i].charAt(0));
					totalstrength += j;
					if(j < minstrength)
					{
						minstrength = j;
					}
                }
                avgstrength = totalstrength / players.length;

// SET BALANCE FACTOR
                if(balance === 2)
				{
                    maxdiff = avgstrength;
                }
				else if(balance === 1)
				{
                    maxdiff = minstrength;
                }
				
// SHUFFLE PLAYERS
                for(k = 0; k < 100; k++)
				{
                    i = Math.floor(Math.random()*players.length);
                    j = Math.floor(Math.random()*players.length);
					if(i != j)
					{
						x = players[i];
						players[i] = players[j];
						players[j] = x;
					}
				}	

// COMPUTE TEAM SIZES, STRENGTHS AND DIFFERENCE

				team1size = -1;
				delta = 0;
				k = 0;
				diff = -totalstrength;
				do
				{
					team1size += 1;
					team1strength += delta;
					diff += k;
					delta = parseInt(players[team1size].charAt(0));
					k = 2*delta;
				}
				while(Math.abs(diff+k) <= Math.abs(diff)); 
				team2size = players.length - team1size;
			

// DO RANDOM SWAPS BETWEEN TEAMS UNTIL THE CONDITIONS ARE MET
				for(k = 0; (k <= 100) && (Math.abs(diff) > maxdiff); k++)
				{
                    i = Math.floor(Math.random()*team1size);  
                    j = Math.floor(Math.random()*team2size + team1size);  
					if(i != j)
					{
						var delta = parseInt(players[j].charAt(0)) - parseInt(players[i].charAt(0));
						if (Math.abs(diff + 2*delta) < Math.abs(diff))
						{
							x = players[i];
							players[i] = players[j];
							players[j] = x;
							diff += 2*delta;
							team1strength += delta;
						}	
					}
				}
                
// ROLL FINISHED, READY TO DISPLAY RESULTS
				var playernames1 = [];
                var playernames2 = [];
                /*if(servermembers.length === queue.length || servermembers.length + 1 === queue.length){
                    for(i = 0; i < team1size; i++)
                    {
                        playernames1.push(queue[parseInt(players[i].substr(1))].user.username);
                    }
                    for(i = team1size; i < players.length; i++)
                    {
                        playernames2.push(queue[parseInt(players[i].substr(1))].user.username);
                    }
                }else{*/
                    for(i = 0; i < team1size; i++)
                    {
                        playernames1.push(queue[parseInt(players[i].substr(1))]);
                    }
                    for(i = team1size; i < players.length; i++)
                    {
                        playernames2.push(queue[parseInt(players[i].substr(1))]);
                    }
                //}
                var team1display = playernames1.join(', ');
                var team2display = playernames2.join(', ');
			
                message.channel.send(`**Match is ${playernames1.length}v${playernames2.length}**\n**Team 1:** ${team1display}\n**Team 2:** ${team2display}\n**Balance: ${team1strength}:${team1strength-diff}**`).then(msg => {
                    msg.react('706802878332928112');
                });
            }
        }   
        if(message.content === PREFIX + "fhelp" || message.content === PREFIX + "Fhelp" || message.content === PREFIX + "FHELP"){
            var name = "R0CK B0T"
            const helpembed = new Discord.RichEmbed()
            .setColor("#58C4EF")
            .setAuthor(name, bot.user.displayAvatarURL)
            .setDescription(`
    __**Fight Registration Commands:**__\n
    > \`!reg\`, \`!unreg\`, \`!freg\`, \`!unfreg\`,
    > \`!regall\`, \`!queue\`, \`!clear/!clr\`,
    >  \`!roll\`, \`!fhelp\``)
        message.channel.send(helpembed);
        }
    }
    }catch(err){
        catchErr(err, message);
    }
})

bot.login(TOKEN);



