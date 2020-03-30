class Task {


    constructor(name) {
        this.id = 'task-' + localStorage.length;
        this.name = name; // Nom de la tâche
        this.members = []; // Tableau d'objet Membre
        this.status = 0; // Avancement de la tâche
        this.archived = 0;
    }

    addMember(member) {
        member.save()
        this.members.push(member.id);
        console.log('addM', this.members)
    }

    save() {
        localStorage.setItem(this.id, JSON.stringify(this));
    }

    read() {
        let membersName = "";

        if (this.members != null) {
            for (let m = 0 ; m < this.members.length; m++) {
                membersName += getMember(this.members[m]).name;
                if(m !== this.members.length - 1) {
                    membersName += ', ';
                }
            }
        }

        //console.log(membersName)
        if (this.status) {
            $('#tasklist').append(
                `<div class="row justify-content-between task p-2" id="${this.id}">
                        <div>
                            <p class="lead">${this.name}</p>
                            <span>${membersName}</span>
                        </div>
                        
                        <div class="">
                            <span class="badge badge-success mx-2">Finie</span>
                            <button class="btn btn-warning mx-2" onclick="toggleCompleted(\'${this.id}\')">Décompléter</button>
                            <button class="btn btn-danger mx-2" onclick="deleteModal(\'${this.id}\')">Supprimer</button>
                        </div>
                    </div>`);
        } else {
            $('#tasklist').append(
                `<div class="row justify-content-between task p-2" id="${this.id}">
                        <div>
                            <p class="lead">${this.name}</p>
                            <span>${this.members}</span>
                        </div>
                        
                        <div class="">
                            <span class="badge badge-danger mx-2">En cours</span>
                            <button class="btn btn-success mx-2" onclick="toggleCompleted(\'${this.id}\')">Compléter</button>
                            <button class="btn btn-danger mx-2" onclick="deleteModal(\'${this.id}\')">Supprimer</button>
                        </div>
                    </div>`);
        }

    }

    update() {
        //display a modal
        //make modifications
        this.save()
    }

    delete() {
        localStorage.removeItem(this.id);
        $('#' + this.id).remove();
    }
}

function getTask(id) {
    for (let task in localStorage) {
        let object = JSON.parse(localStorage.getItem(task));
        if (object !== null && object.id === id) {
            return convertJsonToTask(object);
        }
    }
}

function createTask(name) {
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
        if (object !== null && object.id.includes('task')) {
            let t = convertJsonToTask(object);
            t.read();
        }

    }
}

function deleteModal(id) {
    let task = getTask(id);
    //$('#deleteInput').val(this.id);
    $('#deleteTaskModal').modal('show');


    $('#deleteModal-btn').click(function () {
        task.delete();
        $('#deleteTaskModal').modal('hide');
    });
}

function searchInTasks(query) {
    for (let task in localStorage) {
        let object = JSON.parse(localStorage.getItem(task));
        if (object !== null && object.id.includes('task') && (object.name.toLowerCase().includes(query.toLowerCase()))) {
            let t = convertJsonToTask(object);
            t.read();
        }

    }
}

function refreshTask() {
    $('#tasklist').empty();
    putAllTasks();
}

function toggleCompleted(id) {
    let task = getTask(id);
    (task.status) ? task.status = 0 : task.status = 1;
    task.save();
    refreshTask();
}
