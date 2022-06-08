const {createUser} = require('./services/user.service');
require('./services/file.service');

const user = createUser('Anna', 25);
const user2 = createUser('Olya', 18);

console.log(user);
user.sayHallo();
user2.sayHallo();

