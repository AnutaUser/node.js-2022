const fs = require('fs');
const path = require('path');

// fs.appendFile('./data.txt', 'Welcome node! ', (err) => {
//     if (err) {
//         console.log(err);
//     }
// });
//
// fs.appendFile('./services/data.txt', 'Welcome node in services! ', (err) =>{
//     if (err) {
//         console.log(err);
//     }
// });
//


// fs.writeFile('./data.txt', 'newData ', (err) => {
//     if (err) {
//         console.log(err);
//     }
// });

// fs.readFile('./data.txt', (err, data) => {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     console.log(typeof data);
//     console.log(data.toString());
// });

// fs.readdir('./', (err, files) => {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     console.log(files);
// });

// fs.readdir('./services', (err, files) =>{
//     if (err) {
//         console.log(err);
//         return;
//     }
//     for (const file of files) {
//
//         console.log(file);
//
//         fs.readFile(`./services/${file}`, (err1, data)=>{
//             console.log('==================================================');
//             console.log(`${file}`);
//             console.log('==================================================');
//             if (err1) {
//                 console.log(err1);
//                 return;
//             }
//             console.log('------------------------------------------------');
//             console.log(data.toString());
//             console.log('------------------------------------------------');
//         })
//     }
// })

// fs.stat('./services', (err, stats) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(stats.isFile());
//     console.log(stats.isDirectory());
// });

//
// fs.readdir('./services', (err, files) => {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     for (const file of files) {
//
//         fs.stat(`./services/${file}`, (err1, stats) => {
//             if (err1) {
//                 console.log(err1);
//                 return;
//             }
//             console.log(stats.isFile(), 'stats.isFile()');
//             console.log(stats.isDirectory(), 'stats.isDirectory()');
//             console.log('*******************************');
//         });
//     }
// });


fs.readdir('./', (err, files) => {
    if (err) {
        console.log(err);
        return;
    }
    for (const file of files) {

        fs.stat(`./${file}`, (err1, stats) => {
            if (err1) {
                console.log(err1);
                return;
            }
            console.log(`${file}`);
            console.log('++++++++++++++++++++++++++++++++');
            console.log(stats.isFile(), 'stats.isFile()');
            console.log(stats.isDirectory(), 'stats.isDirectory()');
            console.log('-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/');
        });
    }
});