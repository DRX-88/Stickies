const util = require('util');
const fs = require('fs');

const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);

class StorageHelper {
    async readFromFile() {
        try {
            const data = await readFileAsync('Develop/db/db.json', 'utf8');
            return JSON.parse(data);
        } catch (err) {
            console.log(err);
            return [];
        }
    }

    async writeToFile(data) {
        try {
            await writeFileAsync('Develop/db/db.json', JSON.stringify(data));
        } catch (err) {
            console.log(err);
        }
    }

    async getNotes() {
        const notes = await this.readFromFile();
        return notes;
    }

    async addNotes(note) {
        const notes = await this.readFromFile();
        notes.push(note);
        await this.writeToFile(notes);
        return note;
    }

    async deleteNotes(id) {
        const notes = await this.readFromFile();
        const newNotes = notes.filter((note) => note.id !== id);
        await this.writeToFile(newNotes);
    }
}

module.exports = new StorageHelper();