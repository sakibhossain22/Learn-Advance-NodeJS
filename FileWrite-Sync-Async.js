const { error } = require('console');
const fs = require('fs');

// File Write Sync
const content1 = `Hello Write /n nodeJS is Awesome`
try {
    const write = fs.writeFileSync('./output/content1.txt', content1)
    console.log('File Writted Successfully');
} catch (error) {
    console.error(error.message);
}
// file read Async
const content2 = 'File contnet 2'
const data2 = fs.writeFile('./output/content2.txt', content2, (error) => {
    if(error) {
        console.error(error.message);
    }
    console.log('File Created Successfully');
} )