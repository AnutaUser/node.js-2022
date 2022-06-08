// const fs = require('fs');
// const {users} = require('./users/users');
// require('./tasks/task1');


// fs.mkdir('./boys', (err, data) => {
//     if (err) {
//         console.log(err);
//     }
// });

// fs.mkdir('./girls', (err, data) => {
//     if (err) {
//         console.log(err);
//     }
// });

// fs.writeFile('./boys/oleg.json', 'Oleg', (err) => {
//     console.log(err);
// });

// fs.readdir('./boys', (err, files) => {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     console.log(files);
//     for (const file of files) {
//         fs.readFile(`./boys/${file}`, (err, data) => {
//             if (err) {
//                 console.log(err);
//                 return;
//             }
//             console.log(data.toString());
//
//         });
//     }
// });

// fs.rename('./boys/anna.json', './girls/anna.json', (err) => {
//     console.log(err);
// });
//
// fs.rename('./boys/yeva.json', './girls/yeva.json', (err) =>{
//     console.log(err);
// });
//
// fs.rename('./girls/kokos.json', './boys/kokos.json', (err) => {
//     console.log(err);
// });
//
// fs.rename('./girls/petro.json', './boys/petro.json', (err) => {
//     console.log(err);
// });
//
// fs.rename('./girls/vasyl.json', './boys/vasyl.json', (err) => {
//     console.log(err);
// });

// console.log(users);