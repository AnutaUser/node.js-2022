const dayjs = require('dayjs');


const oneMonthBeforeNow = dayjs().subtract(1, 'months');
console.log(oneMonthBeforeNow.toString());
console.log('------------Hello---------------');

