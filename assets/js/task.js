class Task {


    constructor(name) {
        this.id = 'task-' + localStorage.length;
        this.name = name; // Nom de la tâche
        this.members = []; // Tableau d'objet Membre
        this.status = 0; // Avancement de la tâche
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

        for (let m = 0 ; m < this.members.length; m++) {
            console.log(this.members[m]);
            membersName += getMember(this.members[m]).name;
            if(m !== this.members.length - 1) {
                membersName += ', ';
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
                            <button class="btn btn-warning mx-2">Décompléter</button>
                            <button class="btn btn-danger mx-2" onclick="getAndDelete(\'${this.id}\')">Supprimer</button>
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
                            <button class="btn btn-success mx-2">Compléter</button>
                            <button class="btn btn-danger mx-2" onclick="getAndDelete(\'${this.id}\')">Supprimer</button>
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

function getAndDelete(id) {
    let task = getTask(id);
    task.delete()

}

function searchInTasks(query) {
    for (let task in localStorage) {
        let object = JSON.parse(localStorage.getItem(task));
        if (object !== null && (object.name.includes(query) || object.members.includes(query))) {
            let t = convertJsonToTask(object);
            t.read();
        }

    }
}
