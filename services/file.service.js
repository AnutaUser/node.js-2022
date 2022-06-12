const fs = require('fs/promises');
const path = require('path');

const dataPath = path.join(process.cwd(), 'dataBase', 'users.json');

module.exports = {

    reader: async () => {
        try {
            const data = await fs.readFile(dataPath);
            return data.toString()
                ? JSON.parse(data.toString()).sort((a, b) => a.id - b.id)
                : [];
        } catch (e) {
            console.error(e);
        }
    },

    writer: async (users) => {
        try {
            await fs.writeFile(dataPath, JSON.stringify(users));
        } catch (e) {
            console.error(e);
        }
    }
};

