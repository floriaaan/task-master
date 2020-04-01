class Task {

    constructor(name) {
        this.id = 'task-';
        this.name = name; // Nom de la tâche
        this.members = []; // Tableau d'objet Membre
        this.status = 0; // Avancement de la tâche
        this.archived = 0;
        this.dateFin = ""; //Date de fin
        this.heureRappel = ""; //heure du rappel
        this.fid = '';
    }

    addMember(member) {
        member.save();
        member.id = localStorage.getItem('mem');
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
        base('tasks').create([
            {
                "fields": {
                    "name": this.name,
                    "members": this.members,
                    "status": this.status,
                    "archived": this.archived,
                    "dateFin": this.dateFin,
                    "rappel": this.heureRappel
                }
            },

        ], function (err, record) {
            if (err) {
                console.error(err);
                return;
            }
            console.log(record[0].id);
            this.id = record[0].id;

        });
    }

    update() {
        base('tasks').replace([
            {
                "id": this.id,
                "fields": {
                    "name": this.name,
                    "members": this.members,
                    "status": this.status,
                    "archived": this.archived,
                    "dateFin": this.dateFin,
                    "rappel": this.heureRappel
                }
            }
        ], function (err, records) {
            if (err) {
                console.error(err);
                return;
            }
            records.forEach(function (record) {
                console.log(record.get('status'));
            });
        });
    }

    read() {
        let memberList = "";
        let date = "";
        if (this.dateFin !== undefined) {
            date = this.dateFin;
        }

        if (this.status === 0) {
            $('#tasklist').append(
                `<div class="row justify-content-between task p-2" id="${this.id}">
                        <div>
                            <p class="lead">${this.name}</p>
                            <span>${memberList}</span>
                            <span class="badge badge-secondary mx-2">${date}</span>
                        </div>
                        
                        <div class="">
                            <button class="btn btn-outline-primary mx-2" onclick="editModal(\'${this.id}\')">Editer</button>
                            <button id="commencer" onclick="startTask(\'${this.id}\')" class="btn btn-primary mx-2"><i class="fa fa-times"></i>&nbsp;&nbsp;Commencer</button>
                            <button class="btn btn-danger mx-2" onclick="deleteModal(\'${this.id}\')"><i class="fa fa-trash"></i>&nbsp;&nbsp;Supprimer</button>
                        </div>
                    </div>
                    <hr class="my-1 mx-4">`);
        } else if (this.status === 1) {
            $('#tasklist').append(
                `<div class="row justify-content-between task p-2" id="${this.id}">
                        <div>
                            <p class="lead">${this.name}</p>
                            <span>${memberList}</span>
                            <span class="badge badge-secondary mx-2">${date}</span>
                        </div>

                        <div class="">
                            <span id="enCours" class="badge badge-danger mx-2">En cours</span>
                            <button class="btn btn-outline-primary mx-2" onclick="editModal(\'${this.id}\')">Editer</button>
                            <button class="btn btn-success mx-2" onclick="toggleCompleted(\'${this.id}\')"><i class="fa fa-check"></i>&nbsp;&nbsp;Terminer</button>
                            <button class="btn btn-danger mx-2" onclick="deleteModal(\'${this.id}\')"><i class="fa fa-trash"></i>&nbsp;&nbsp;Supprimer</button>
                        </div>
                    </div>
                    <hr class="my-1 mx-4">`);
        } else if (this.status === 2 && !this.archived) {
            $('#tasklist').append(
                `<div class="row justify-content-between task p-2" id="${this.id}">
                        <div>
                            <p class="lead">${this.name}</p>
                            <span>${memberList}</span>
                            <span class="badge badge-secondary mx-2">${date}</span>
                        </div>
                        
                        <div class="">
                            <span id="finie" class="badge badge-success mx-2">Finie</span>
                            <button class="btn btn-outline-primary mx-2" onclick="editModal(\'${this.id}\')">Editer</button>
                            <button class="btn btn-warning mx-2" onclick="toggleCompleted(\'${this.id}\')"><i class="fa fa-times"></i>&nbsp;&nbsp;Reprendre</button>
                            <button class="btn btn-secondary mx-2" onclick="archiveModal(\'${this.id}\')"><i class="fa fa-archive"></i>&nbsp;&nbsp;Archiver</button>
                        </div>
                    </div>
                    <hr class="my-1 mx-4">`);
        } else if (this.status === 2 && this.archived === 1) {
            $('#tasklist').append(
                `<div class="row justify-content-between task p-2" id="${this.id}">
                        <div>
                            <p class="lead">${this.name}</p>
                            <span class="badge badge-secondary mx-2">${date}</span>
                        </div>
                        <div class="">
                            <span id="finie" class="badge badge-success mx-2">Finie</span>
                            <button class="btn btn-warning mx-2" disabled><i class="fa fa-repeat"></i>&nbsp;&nbsp;Récupérer</button>
                            <button class="btn btn-danger mx-2" onclick="deleteModal(\'${this.id}\')"><i class="fa fa-trash"></i>&nbsp;&nbsp;Supprimer</button>
                        </div>
                    </div>
                    <hr class="my-1 mx-4">`);
        }
    }

    delete() {
        base('tasks').destroy([this.id], function (err, deletedRecords) {
            if (err) {
                console.error(err);
                return;
            }
            console.log('Deleted', deletedRecords.length, 'records');
            refreshTask();
        });
    }
}

async function getTask(id) {
    return base('tasks').find(id).then(function (record) {

        console.log('Retrieved', record.id);
        let task = new Task(record.fields.name);
        task.id = id;
        task.fid = record.fields.id;
        task.members = record.fields.members;
        task.status = record.fields.status;
        task.archived = record.fields.archived;
        task.dateFin = record.fields.dateFin;
        task.heureRappel = record.fields.rappel;
        return task;
    });
}

function createTask(name, date, rappel) {
    var date = moment(date).format('YYYY-MM-DD h:mm');
    if (name != null) {
        let t = new Task(name);
        //t.addUser();
        t.addDateFin(date);
        t.addHrappel(rappel);
        t.save();
        t.read();
    }
    $('#taskName').val("");
    $('#addTaskModal').modal('hide');
    Swal.fire(
        t.name + ' a bien été créée',
        '',
        'success'
    )

}


function fTime() {
    var now = moment().format("YYYY-MM-DD h:mm");
    base('tasks').select({
        view: "Grid view"
    }).eachPage(function page(records) {
        // This function (`page`) will get called for each page of records.
        records.forEach(function (record) {
            if (record.fields.dateFin !== undefined) {
                if (((Date.parse(record.fields.dateFin) / 1000) / 60) - ((Date.parse(now) / 1000) / 60) == record.fields.rappel) {
                    alert('Vous avez une tache à effectuer :' + record.fields.name);
                }
            }
        });
    });
    setTimeout(fTime, 60000); /* rappel après 2 secondes = 2000 millisecondes */

}

fTime();

function putAllTasks() {
    let taskList = [];
    base('tasks').select({
        // Selecting the first 3 records in Grid view:
        view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function (record) {
            if (record.fields.archived !== 1)
                taskList.push(record);
        });
        fetchNextPage();
    }, function done(err) {
        if (err) {
            console.error(err);
            return;
        }
        for (let i = 0; i < taskList.length; i++) {
            let task = new Task(taskList[i].fields.name);
            task.id = taskList[i].id;
            task.members = taskList[i].fields.members;
            task.status = taskList[i].fields.status;
            task.archived = taskList[i].fields.archived;
            task.dateFin = taskList[i].fields.dateFin;
            task.heureRappel = taskList[i].fields.rappel;
            task.read();
        }
    });
}


function putArchivedTasks() {
    let taskList = [];
    base('tasks').select({
        // Selecting the first 3 records in Grid view:
        view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function (record) {
            if (record.fields.archived === 1 && record.fields.archived !== undefined) {
                taskList.push(record);
            }
        });
        fetchNextPage();
    }, function done(err) {
        if (err) {
            console.error(err);
            return;
        }
        for (let i = 0; i < taskList.length; i++) {
            let task = new Task(taskList[i].fields.name);
            task.id = taskList[i].id;
            task.members = taskList[i].fields.members;
            task.status = taskList[i].fields.status;
            task.archived = taskList[i].fields.archived;
            task.dateFin = taskList[i].fields.dateFin;
            task.heureRappel = taskList[i].fields.rappel;
            task.read();
        }
    });
}

async function deleteModal(id) {
    getTask(id).then(function (task) {
        $('#deleteTaskModal').modal('show');


        $('#deleteModal-btn').click(function () {
            task.delete();
            $('#deleteTaskModal').modal('hide');
            Swal.fire(
                task.name + ' a bien été supprimée',
                '',
                'success'
            )
        });
    });

}

async function archiveModal(id) {
    getTask(id).then(function (task) {
        $('#archiveTaskModal').modal('show');

        $('#archiveModal-btn').click(function () {
            $('#archiveTaskModal').modal('hide');
            (task.archived === undefined || task.archived) ? task.archived = 0 : task.archived = 1;
            task.update();
            refreshTask();

            Swal.fire(
                task.name + ' a bien été archivée',
                '',
                'success'
            )
        });
    });
}

function searchInTasks(query) {
    for (let task in localStorage) {
        let object = JSON.parse(localStorage.getItem(task));
        if (object !== null && object.id.includes('task') && (object.name.toLowerCase().includes(query.toLowerCase())) && object.archived !== 1) {
            let t = convertJsonToTask(object);
            // console.log(object);
            t.read();
        }

    }
}

function refreshTask() {
    $('#tasklist').empty();
    putAllTasks();
}

async function toggleCompleted(id) {

    getTask(id).then(function (task) {
        (task.status === 2) ? task.status = 1 : task.status = 2;
        task.update();
        refreshTask();
        if(task.status === 2) {
            Swal.fire(
                task.name + ' a bien été terminée',
                '',
                'success'
            )
        } else {
            Swal.fire(
                task.name + ' a été remise à faire',
                '',
                'success'
            )
        }

    });
}

function startTask(id) {
    getTask(id).then(function (task) {
        task.status = 1;
        task.update();
        Swal.fire(
            task.name + ' est commencée',
            '',
            'success'
        )
        refreshTask();
    });

}

function editModal(id) {
    getTask(id).then(function (task) {
        $('#editTask-name').val(task.name);
        $('#socialShare').attr('href', 'https://twitter.com/intent/tweet?text=Ma tâche est de : '+ task.name + ' sur ' + window.location.href)
        $('#editTaskModal').modal('show');

        $('#editTask-btn').click(function () {
            $('#editTaskModal').modal('hide');
            task.name = $('#editTask-name').val();
            task.update();
            Swal.fire(
                task.name + ' a bien été modifiée',
                '',
                'success'
            )
            refreshTask();
        });
    })
}

async function getMemberfromTask(task) {
    let memberList = [];
    base('members').select({
        // Selecting the first 3 records in Grid view:
        maxRecords: 3,
        view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.

        records.forEach(function (record) {
            if (record.fields.task.includes(task)) {

                memberList.push(record);
            }
        });

        fetchNextPage();

    }, function done(err) {
        if (err) {
            console.error(err);
            return;
        }
        let names = "";
        for (let i = 0; i < memberList.length; i++) {
            names += (memberList[i].fields.name);
            if (i !== memberList.length - 1) {
                names += ', ';
            }
        }

        return names;

    });
}

