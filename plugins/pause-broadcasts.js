const { cmd } = require('../command');
const fs = require('fs');
const path = require('path');
const DATA_PATH = path.resolve(__dirname, '../data/send_data.json');
let store = { paused: false };
if (fs.existsSync(DATA_PATH)) store = JSON.parse(fs.readFileSync(DATA_PATH));

cmd({
    pattern: "pause-broadcasts",
    desc: "Pause all broadcasts",
    category: "owner",
    filename: __filename
}, async (conn, mek, m, { reply, isCreator }) => {
    if (!isCreator) return reply('🚫 Owner only.');
    store.paused = true;
    fs.writeFileSync(DATA_PATH, JSON.stringify(store, null, 2));
    reply('⏸ All broadcasts paused.');
});
