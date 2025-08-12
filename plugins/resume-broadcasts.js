const { cmd } = require('../command');
const fs = require('fs');
const path = require('path');
const DATA_PATH = path.resolve(__dirname, '../data/send_data.json');
let store = { paused: false };
if (fs.existsSync(DATA_PATH)) store = JSON.parse(fs.readFileSync(DATA_PATH));

cmd({
    pattern: "resume-broadcasts",
    desc: "Resume all broadcasts",
    category: "owner",
    filename: __filename
}, async (conn, mek, m, { reply, isCreator }) => {
    if (!isCreator) return reply('🚫 Owner only.');
    store.paused = false;
    fs.writeFileSync(DATA_PATH, JSON.stringify(store, null, 2));
    reply('▶ All broadcasts resumed.');
});
