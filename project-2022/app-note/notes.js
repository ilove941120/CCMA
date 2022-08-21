const fs = require('fs')
const addNote = function (title, body) {
    const notes = loadNotes()

    // const duplicateNote = notes.filter(function (note) {
    //     return note.title === title
    // })

    const duplicateNote = notes.find((note)=> note.title === title)
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log('新筆記添加成功')
    }
    else {
        console.log('重複囉!')
    }
}

const removeNote = function (title) {
    const notes = loadNotes()
    const notesToKeep = notes.filter(function (note) {
        return note.title != title
    })
    if (notes.length > notesToKeep.length) {
        console.log('刪除成功')
        saveNotes(notesToKeep)
    }
    else {
        console.log('沒有東西被刪除!')
    }

}

const listNotes = () =>{
    const notes = loadNotes()
    console.log("這是你的筆記")
    notes.forEach((note) =>{
        console.log(note.title)
        console.log(note.body)
    })
}

const readNotes =(title) =>{
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)
    if(note){
        console.log(note.title)
        console.log(note.body)
    }
    else{
        console.log('筆記找不到')
    }
}

const saveNotes = function (note) {
    const dataJSON = JSON.stringify(note)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = function () {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }
    catch (e) {
        return []
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes:listNotes,
    readNotes:readNotes
}