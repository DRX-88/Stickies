const util = require('util');
const fs = require('fs');

const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);

class StorageHelper {
    async writeDataToFile(data, filePath) {
        try {
            await writeFileAsync(filePath, JSON.stringify(data));
        } catch (error) {
            console.error(error);
        }
    }

    async readDataFromFile(filePath) {
        try {
            const data = await readFileAsync(filePath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error(error);
        }
    }

    async getNotes() {
        return this.readDataFromFile('Develop/db/db.json');
    }

    async addNotes(note) {
        const notes = await this.getNotes();
        notes.push(note);
        await this.writeDataToFile(notes, 'Develop/db/db.json');
    }

    async deleteNotes(id) {
        const notes = await this.getNotes();
        const updatedNotes = notes.filter((note) => note.id !== id);
        await this.writeDataToFile(updatedNotes, 'Develop/db/db.json');
    }
    
}

module.exports = StorageHelper;