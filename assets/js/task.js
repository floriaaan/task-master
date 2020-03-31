class Task {

    constructor(name) {
        this.id = 'task-' + localStorage.length;
        this.name = name; // Nom de la tâche
        this.members = []; // Tableau d'objet Membre
        this.status = 0; // Avancement de la tâche
        this.archived = 0;
        this.dateFin = ""; //Date de fin
        this.heureRappel = ""; //heure du rappel
        this.fromAirtable = 0;
    }

    addMember(member) {
        member.save();
        this.members.push(member.id);
    }

    addDateFin(dateFin) {
        this.dateFin = (dateFin);
    }

    addHrappel(heureRappel) {
        this.heureRappel = (heureRappel)
    }

    addUser() {
        if (userLoggged != null)
            this.addMember(new Member(userLoggged.displayName, 'owner'));
    }


    save() {
        localStorage.setItem(this.id, JSON.stringify(this));
    }

    read() {
        let membersName = "";

        if (this.members != null) {
            for (let m = 0; m < this.members.length; m++) {
                membersName += getMember(this.members[m]).name;
                if (m !== this.members.length - 1) {
                    membersName += ', ';
                }
            }
        }
        //console.log(this);
        if (this.status === 0) {
            $('#tasklist').append(
                `<div class="row justify-content-between task p-2" id="${this.id}">
                        <div>
                            <p class="lead">${this.name}</p>
                            <span>${membersName}</span>
                            <p class="lead">${this.dateFin}</p>
                        </div>
                        
                        <div class="">
                            <button id="commencer" onclick="startTask(\'${this.id}\')" class="btn btn-primary mx-2"><i class="fa fa-times"></i>&nbsp;&nbsp;Commencer</button>
                            <button class="btn btn-danger mx-2" onclick="deleteModal(\'${this.id}\')"><i class="fa fa-trash"></i>&nbsp;&nbsp;Supprimer</button>
                        </div>
                    </div>`);
        } else if (this.status === 1) {
            $('#tasklist').append(
                `<div class="row justify-content-between task p-2" id="${this.id}">
                        <div>
                            <p class="lead">${this.name}</p>
                            <span>${membersName}</span>
                            <p class="lead">${this.dateFin}</p>
                        </div>

                        <div class="">
                            <span id="enCours" class="badge badge-danger mx-2">En cours</span>
                            <button class="btn btn-success mx-2" onclick="toggleCompleted(\'${this.id}\')"><i class="fa fa-check"></i>&nbsp;&nbsp;Terminer</button>
                            <button class="btn btn-danger mx-2" onclick="deleteModal(\'${this.id}\')"><i class="fa fa-trash"></i>&nbsp;&nbsp;Supprimer</button>
                        </div>
                    </div>
                    <hr class="my-1 mx-4">`);
        } else {
            $('#tasklist').append(
                `<div class="row justify-content-between task p-2" id="${this.id}">
                        <div>
                            <p class="lead">${this.name}</p>
                            <span>${membersName}</span>
                            <p class="lead">${this.dateFin}</p>
                        </div>
                        
                        <div class="">
                            <span id="finie" class="badge badge-success mx-2">Finie</span>
                            <button class="btn btn-warning mx-2" onclick="toggleCompleted(\'${this.id}\')"><i class="fa fa-times"></i>&nbsp;&nbsp;Reprendre</button>
                            <button class="btn btn-secondary mx-2" onclick="archiveModal(\'${this.id}\')"><i class="fa fa-archive"></i>&nbsp;&nbsp;Archiver</button>
                        </div>
                    </div>
                    <hr class="my-1 mx-4">`);
        }

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

function createTask(name,dateFin,heureRappel) {
    console.log(name);
    console.log(dateFin);
    //console.log(heureRappel);
    if (name != null) {
        let t = new Task(name,dateFin,heureRappel);
        t.addUser();
        t.addDateFin(dateFin.toString());
        t.addHrappel(heureRappel);
        t.save();
        t.read();
        //console.log(this.dateFin)
    }
    $('#taskName').val("");
    // console.log($('#taskName').val(""))
    $('#addTaskModal').modal('hide');

}

//console.log(localStorage);

function deleteAllTasks() {
    for (let i in localStorage) {
        if (i.includes('task')) {
            localStorage.removeItem(i);
        }
    }

}

function fTime() {
    var d = new Date();
    /*for (let i in localStorage) {
        if (i.includes('task')) {
            let task = JSON.parse(i)
            console.log(task);
            if(i.dateFin != null) {
                if(d >= i.dateFindateFin  ){
                    alert("blablabla");
                    console.log(d);
                }
            }
        }*/

        setTimeout(fTime, 1000); /* rappel après 2 secondes = 2000 millisecondes */
    }


fTime();

function putAllTasks() {
    for (let task in localStorage) {
        let object = JSON.parse(localStorage.getItem(task));
        if (object.id != null && object.id.includes('task')) {
            if (object.archived !== 1) {
                let t = convertJsonToTask(object);
                t.read();
            }
        }
    }
}

function putArchivedTasks() {
    for (let task in localStorage) {
        let object = JSON.parse(localStorage.getItem(task));
        if (object.id != null && object.id.includes('task')) {
            if (object.archived === 1) {
                let t = convertJsonToTask(object);
                t.read();
            }
        }
    }
}

function deleteModal(id) {
    let task = getTask(id);
    $('#deleteTaskModal').modal('show');


    $('#deleteModal-btn').click(function () {
        task.delete();
        $('#deleteTaskModal').modal('hide');
    });
}

function archiveModal(id) {
    let task = getTask(id);
    $('#archiveTaskModal').modal('show');

    $('#archiveModal-btn').click(function () {
        $('#archiveTaskModal').modal('hide');
        (task.archived === undefined || task.archived) ? task.archived = 0 : task.archived = 1;
        task.save();
        refreshTask();
    });
}

function searchInTasks(query) {
    for (let task in localStorage) {
        let object = JSON.parse(localStorage.getItem(task));
        if (object !== null && object.id.includes('task') && (object.name.toLowerCase().includes(query.toLowerCase())) && object.archived !== 1) {
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
    (task.status === 2) ? task.status = 1 : task.status = 2;
    task.save();
    refreshTask();
}

function startTask(id) {
    let task = getTask(id);
    task.status = 1;
    task.save();
    refreshTask();
}



