const { createUser } = require('./services/user.service');
require('./services/file.service');

const user = createUser('Anna', 25);

console.log(user);
user.sayHallo();
