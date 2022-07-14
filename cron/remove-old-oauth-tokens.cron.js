const dayjs = require('dayjs');

const {OAuth} = require('../dataBase');

module.exports = async () => {

    const oneMonthBeforeNow = dayjs().subtract(1, 'months');

    const  query = await OAuth.deleteMany({
        createdAt: {$lte: oneMonthBeforeNow}
    });

};
