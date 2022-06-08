require('./message.service');
const {sendSMS} = require('./message.service');

const createUser = (name, age) => {
    sendSMS(6666666, 'welcome in node)');
    return {
        name, age,
        sayHallo: () => {
            console.log(`Hello! My name is ${name} and I am ${age} year old)))`);
        }
    };
};

module.exports = {
    createUser
};