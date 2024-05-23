const util = require('util');
const fs = require('fs');

const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);

class StorageHelper {
    async readFromFile() {
        try {
            const data = await readFileAsync('db/db.json', 'utf8');
            return data;
        } catch (err) {
            console.log(err);
            return [];
        }
    }

    async writeToFile(data) {
        try {
            await writeFileAsync('db/db.json', JSON.stringify(data));
        } catch (err) {
            console.log(err);
        }
    }

    async getNotes() {
        const data = await this.readFromFile();
        let notes;
        try {
            notes = [].concat(JSON.parse(data));
        } catch (err) {
            notes = [];
        }
        return notes;
    }

    async addNotes(note) {
        const { title, text } = note;
        if (!title || !text) {
            throw new Error('Note title and text cannot be blank');
        }
        const newNote = { title, text, id: Date.now() };
        const notes = await this.getNotes();
        const newNotes = [...notes, newNote];
        await this.writeToFile(newNotes);
        return newNote;
    }

    async deleteNotes(id) {
        const notes = await this.getNotes();
        const newNotes = notes.filter((note) => note.id !== parseInt(id));
        await this.writeToFile(newNotes);
    }
}

module.exports = new StorageHelper();