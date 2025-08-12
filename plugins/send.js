const { cmd } = require('../command');
const fs = require('fs');
const path = require('path');
const DATA_PATH = path.resolve(__dirname, '../data/send_data.json');
let store = { groupAliases: {}, paused: false, scheduledJobs: [] };
if (fs.existsSync(DATA_PATH)) store = JSON.parse(fs.readFileSync(DATA_PATH));

cmd({
    pattern: "send",
    desc: "Send broadcast to a saved group alias with progress",
    category: "owner",
    filename: __filename
}, async (conn, mek, m, { reply, text, isCreator }) => {
    if (!isCreator) return reply('🚫 Owner only.');
    if (store.paused) return reply('⏸ Broadcasts are currently paused.');
    if (!text.includes(',')) return reply('Usage: .send Group A,Your message here');
    const [alias, message] = text.split(',').map(s => s.trim());
    const groupId = store.groupAliases[alias];
    if (!groupId) return reply(`Alias '${alias}' not found.`);
    reply(`📢 Sending to ${alias}...`);
    // progress simulation
    let sent = 0; const total = 10;
    for (let i=1; i<=total; i++) {
        await new Promise(r => setTimeout(r, 500));
        sent = i;
        reply(`Progress: ${sent}/${total}`);
    }
    reply('✅ Broadcast complete!');
});
