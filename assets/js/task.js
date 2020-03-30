class Task {


    constructor(name) {
        this.id = 'task-' + localStorage.length;
        this.name = name; // Nom de la tâche
        this.members = []; // Tableau d'objet Membre
        this.status = 0; // Avancement de la tâche
        this.archived = 0;
    }

    addMember(member) {
        member.save();
        this.members.push(member.id);
    }

    addUser() {
        if (userLoggged != null) {
            this.addMember(new Member(userLoggged.displayName, 'owner'));
        }
    }

    update() {
        //localStorage.setItem(this.id, JSON.stringify(this));

        $.ajax({
            url: "https://api.airtable.com/v0/appR3t8mx4snnhfd6/tasks/" + this.id,
            type: "PUT",
            headers : {
                "Authorization": "Bearer keywEghO0vQCyajkK",
                "Content-Type": "application/json"
            },
            data: {
                "fields": {
                    "id": this.id,
                    "name": this.name,
                    "members": this.members,
                    "status": this.status,
                    "archived": this.archived
                }
            },
            success: function () {
                console.log('success')
            },
            error: function () {
                console.log('error')
            }


        })
    }

    save() {
        $.ajax({
            url: "https://api.airtable.com/v0/appR3t8mx4snnhfd6/tasks/",
            type: "POST",
            headers : {
                "Authorization": "Bearer keywEghO0vQCyajkK",
                "Content-Type": "application/json"
            },
            data: {
                "fields": {
                    "id": this.id,
                    "name": this.name,
                    "members": this.members,
                    "status": this.status,
                    "archived": this.archived
                }
            },
            success: function () {
                console.log('success')
            },
            error: function () {
                console.log('error')
            }


        })
    }

    read() {
        let membersName = "";

        /*if (this.members != null) {
            for (let m = 0; m < this.members.length; m++) {
                let member = getMember(this.members[m]);
                console.log(member);
                membersName += member.name;
                if (m !== this.members.length - 1) {
                    membersName += ', ';
                }
            }
        }*/

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
                            <span>${membersName}</span>
                        </div>
                        
                        <div class="">
                            <span class="badge badge-danger mx-2">En cours</span>
                            <button class="btn btn-success mx-2" onclick="toggleCompleted(\'${this.id}\')">Compléter</button>
                            <button class="btn btn-danger mx-2" onclick="deleteModal(\'${this.id}\')">Supprimer</button>
                        </div>
                    </div>`);
        }

    }

    delete() {
        localStorage.removeItem(this.id);
        $('#' + this.id).remove();
    }
}

function getTask(id) {
    /*for (let task in localStorage) {
        let object = JSON.parse(localStorage.getItem(task));
        if (object !== null && object.id === id) {
            return convertJsonToTask(object);
        }
    }*/
    $.ajax({
        url: "https://api.airtable.com/v0/appR3t8mx4snnhfd6/tasks",
        type: "GET",
        headers: {"Authorization": "Bearer keywEghO0vQCyajkK"},
        done: function (data) {

            console.log(data);
            for (let i = 0; i < data.records.length; i++) {
                if(data.records[i].id === id) {
                    let task = convertAirtableToTask(data.records[i]);
                    console.log(task);
                    return task;
                }
            }
        },
        error: function (data) {
            console.log(data)
        }
    });
}

function createTask(name) {
    if (name != null) {
        let t = new Task(name);
        t.addUser();
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
    /*for (let task in localStorage) {
        let object = JSON.parse(localStorage.getItem(task));
        if (object.id != null && object.id.includes('task')) {
            let t = convertJsonToTask(object);
            t.read();
        }

    }*/
    $.ajax({
        url: "https://api.airtable.com/v0/appR3t8mx4snnhfd6/tasks",
        type: "GET",
        headers: {"Authorization": "Bearer keywEghO0vQCyajkK"},
        success: function (data) {

            for (let i = 0; i < data.records.length; i++) {
                let task = convertAirtableToTask(data.records[i]);
                task.read();
            }
        },
        error: function (data) {
            console.log(data)
        }
    });

}

function deleteModal(id) {
    let task = getTask(id);
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

function toggleArchived(id) {
    let task = getTask(id);
    (task.archived) ? task.archived = 0 : task.archived = 1;
    task.save();
    refreshTask();
}

//api key:keywEghO0vQCyajkK

