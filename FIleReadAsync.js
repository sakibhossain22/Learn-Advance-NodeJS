const fs = require('fs');

console.log('Reading Started .................');

const data = fs.readFile('./file.txt','utf-8',(error, data) => {
    if(error){
        console.error(error.message);
    }
    console.log(data);
})

console.log('Reading Ended .................');