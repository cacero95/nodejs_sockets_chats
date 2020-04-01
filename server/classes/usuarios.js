class Usuarios {
    constructor() {
        this.people = [];
    }
    addPerson(id, name, room) {
            this.people.push({
                id,
                name,
                room
            })
            return this.people;
        }
        // search a person his id
    search_person_ById(id) {
        return this.people.filter((element) => {
            return element.id === id
        })[0];
    }
    search_person_ByName(name) {
        return this.people.filter((element) => {
            return element.name === name
        })[0];
    }
    getPeople() {
        return this.people;
    }
    getPeopleByRoom(room) {
            return this.people.filter((element) => {
                return element.room === room
            })
        }
        // Close the session by the id person and return the delente person 
    close_session_personById(id) {

        let delete_user = this.search_person_ById(id);
        this.people = this.people.filter((element) => {
            return element.id !== id
        });
        return delete_user;
    }
}
module.exports = {
    Usuarios
}