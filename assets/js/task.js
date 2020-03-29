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
        console.log(JSON.stringify(this));
        if (this.status) {
            $('#tasklist').append(
                `<li class="list-group-item" id="task-${this.id}">
                ${this.name}
                <span>${this.members}</span>
                <span class="badge badge-success">Finie</span>
                <button class="btn btn-warning">Décompléter</button>
                <button class="btn btn-danger" onclick="getAndDelete(${this.id})">Supprimer</button>
            </li>`
            );
        } else {
            $('#tasklist').append(
                `<li class="list-group-item" id="task-${this.id}">
                ${this.name}
                <span>${this.members}</span>
                <span class="badge badge-danger">En cours</span>
                <button class="btn btn-success">Compléter</button>
                <button class="btn btn-danger" onclick="getAndDelete(${this.id})">Supprimer</button>
            </li>`
            );
        }

    }

    update() {
        //display a modal
        //make modifications
        this.save()
    }

    delete() {
        localStorage.removeItem("task-" + this.id);
        $('#task-' + this.id).remove();
    }
}

function get(id) {
    for (let task in localStorage) {
        let object = JSON.parse(localStorage.getItem(task));
        if (object !== null && object.id === id) {
            return convertJsonToTask(object);
        }
    }
}

function createTask(name) {
    console.log(name);
    if (name != null) {
        let t = new Task(name);
        t.save();
        t.read();
    }
    $('#taskName').val("");
    $('#addTaskModal').modal('hide');

}

function deleteAllTasks() {
    for (let i in localStorage) {
        if (i.includes('task')) {
            localStorage.removeItem(i);
        }
    }

    console.log(localStorage);

}

function putAllTasks() {
    for (let task in localStorage) {
        let object = JSON.parse(localStorage.getItem(task));
        if (object !== null) {
            let t = convertJsonToTask(object);
            t.read();
        }

    }
}

function getAndDelete(id) {
    let task = get(id);
    task.delete()

}
