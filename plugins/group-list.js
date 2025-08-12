const { cmd } = require('../command');
const fs = require('fs');
const path = require('path');
const DATA_PATH = path.resolve(__dirname, '../data/send_data.json');
let store = { groupAliases: {} };
if (fs.existsSync(DATA_PATH)) store = JSON.parse(fs.readFileSync(DATA_PATH));

cmd({
    pattern: "group-list",
    desc: "List or set group aliases",
    category: "owner",
    filename: __filename
}, async (conn, mek, m, { reply, text, isCreator }) => {
    if (!isCreator) return reply('🚫 Owner only.');
    if (!text) {
        let msg = '*Group Aliases:*
';
        Object.entries(store.groupAliases).forEach(([k,v]) => msg += `${k} -> ${v}\n`);
        return reply(msg);
    }
    const [alias, id] = text.split(',').map(s => s.trim());
    store.groupAliases[alias] = id;
    fs.writeFileSync(DATA_PATH, JSON.stringify(store, null, 2));
    reply(`✅ Alias '${alias}' set for group ${id}`);
});
