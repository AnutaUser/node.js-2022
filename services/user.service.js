const fs = require('fs/promises');
const path = require('path');

const dataBaseUsersPath = path.join(process.cwd(), 'dataBase', 'users.json');

const reader = async () => {
    try {
        const data = await fs.readFile(dataBaseUsersPath);
        return data.toString()
            ? JSON.parse(data.toString()).sort((a, b) => a.id - b.id)
            : [];
    } catch (e) {
        console.error(e);
    }
};

const writer = async (users) => {
    try {
        await fs.writeFile(dataBaseUsersPath, JSON.stringify(users));
    } catch (e) {
        console.error(e);
    }
};

module.exports = {
    reader,
    writer
};