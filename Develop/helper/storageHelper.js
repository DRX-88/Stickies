const util = require('util');
const fs = require('fs');

const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);

class StorageHelper {
    async readFromFile() {
        try {
            const data = await readFileAsync('Develop/db/db.json', 'utf8');
            return data;
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
        try {
            const data = await this.readFromFile();
            let parsedNotes = [];
            try {
                parsedNotes = [].concat(JSON.parse(data));
            } catch (err) {
                console.log(err);
            }
            return parsedNotes;
        }
        catch (err) {
            console.log(err);
            return [];
        }
    }

    async addNotes(note) {
        try {
            const data = await this.readFromFile();
            const parsedNotes = [].concat(JSON.parse(data));
            parsedNotes.push(note);
            await this.writeToFile(parsedNotes);
            return note;
        } catch (err) {
            console.log(err);
            return [];
        }
    }

    async deleteNotes(id) {
        try {
            const data = await this.readFromFile();
            const parsedNotes = [].concat(JSON.parse(data));
            const newNotes = parsedNotes.filter((note) => note.id !== id);
            await this.writeToFile(newNotes);
        } catch (err) {
            console.log(err);
        }
    }

}

module.exports = new StorageHelper();