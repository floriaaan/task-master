class Task {


    constructor(name) {
        this.id = localStorage.length;
        this.name = name; // Nom de la tâche
        this.members = []; // Tableau d'objet Membre
        this.status = 0; // Avancement de la tâche
    }

    addMember(member) {
        this.members.push(member.id);
    }

    save() {
        localStorage.setItem("task-" + this.id, JSON.stringify(this));
    }

    read() {
        //display a card
    }

    update() {
        //display a modal
        //make modifications
        localStorage.setItem("task-" + this.id, JSON.stringify(this));
    }

    delete() {
        //display a modal
        localStorage.removeItem("task-" + this.id)
    }
}

function createTask() {
    //display modal

    //new Task()
}

function deleteAllTasks() {
    console.log(localStorage);
    for (let i in localStorage) {
        if(i.includes('task')) {
            localStorage.removeItem(i);
        }
    }
    console.log(localStorage);

}