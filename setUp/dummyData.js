import fs from 'fs'

console.log("writing dummy data")

const data = []
for (let i=11111111; i < 11111188; i++) {
    data.push({
        studentId: i,
        booklet: Math.floor(Math.random()*8 + 1),
        team: Math.random() < .5 ? 'A' : 'B',
        reliability: Math.random() < .2 ? true : false
    })
}

fs.writeFile('setUp/data.json', JSON.stringify(data, null, 4), err => {
    if (err) {
        console.log(err)
    } else {
        console.log('done')
    }
})

