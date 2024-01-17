import excelToJson from "convert-excel-to-json"
import fs from 'fs'
 
const {Ark1} = excelToJson({
    source: fs.readFileSync('dataNy.xlsx') //path to ICCS data sheet.
})

const result = Ark1.map((stud, i) => {return {
    studentId: stud.B,
    booklet: parseInt(stud.A[0]),
    team: Math.random() < .5 ? 'A' : 'B',
    reliability: (stud.A[1] === 'R' ? 1 : 0)
}})

fs.writeFile('setUp/data.json', JSON.stringify(result, null, 4), err => {
    if (err) {
        console.log(err)
    } else {
        console.log('done')
    }
})