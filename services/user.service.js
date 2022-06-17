const fs = require('fs/promises');
const path = require('path');

const dataBasePath = path.join(process.cwd(), 'dataBase', 'User.js');

module.exports = {
    reader: async () => {
        try {
            const data = await fs.readFile(dataBasePath);
            return data.toString()
                ? JSON.parse(data.toString()).sort((a, b) => a.id - b.id)
                : [];
        } catch (e) {
            console.error(e);
        }

    },

    writer: async (users) => {
        try {
            await fs.writeFile(dataBasePath, JSON.stringify(users));
        } catch (e) {
            console.error(e);
        }

    }
};
