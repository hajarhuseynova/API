const fs=require("fs")
const path=require("path")
const util=require("util")
const generateUniqueId=require("../helpers/generateUniqueId")

const readFileAsync=util.promisify(fs.readFile)
const writeFileAsync=util.promisify(fs.writeFile)

const parentFolder=path.join(__dirname,"..")
const databasePath=path.join(parentFolder,"database/db.json")
//GetAll
async function getAbout(){
const result=await readFileAsync(databasePath)
const myAllData= JSON.parse(result)
return myAllData.abouts
}
//Create
async function createAbout(about){
const result=await readFileAsync(databasePath)
const myAllData= JSON.parse(result)
const newAbout={
    "id":generateUniqueId(myAllData.abouts), 
    ...about
}
myAllData.abouts.push(newAbout)
await writeFileAsync(databasePath,JSON.stringify(myAllData,null,2))

return newAbout
}


module.exports={ getAbout,createAbout}
