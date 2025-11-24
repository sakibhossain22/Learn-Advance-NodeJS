const fs = require('fs');
console.log('Reading Started ......');
try {
    const res = fs.readFileSync('./file.txt', 'utf-8')
    console.log(res);
} catch(err) {
    console.error(err.message);
}
console.log('Reading Ended .......');

