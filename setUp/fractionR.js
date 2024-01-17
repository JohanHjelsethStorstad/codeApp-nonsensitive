const fs = require('fs')

fs.readFile('data.json', 'utf-8', (err, data) => {
    data = JSON.parse(data)
    let r = 0
    for (let x of data) {
        if (x.reliability) r++
    }
    console.log(r/data.length)
})