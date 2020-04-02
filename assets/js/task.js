class Task {

    constructor(name) {
        this.id = '';
        this.name = name; // Nom de la tâche
        this.members = []; // Tableau d'objet Membre
        this.status = 0; // Avancement de la tâche
        this.archived = 0;
        this.dateEnd = ""; //Date de fin
        this.timeReminder = ""; //heure du rappel
        this.fid = '';
    }

    addMember(member) {
        member.save();
        this.members.push(member.id);
    }

    addDateEnd(dateEnd) {
        this.dateEnd = (dateEnd);
    }

    addReminder(timeReminder) {
        this.timeReminder = (timeReminder)
    }

    own() {
        if (userLogged != null) {
            this.addMember(new Member(userLogged.displayName, 'owner', userLogged.email));
        }
    }


    save() {
        base('tasks').create([
            {
                "fields": {
                    "name": this.name,
                    "members": this.members,
                    "status": this.status,
                    "archived": this.archived,
                    "dateFin": this.dateEnd,
                    "rappel": this.timeReminder
                }
            }

        ], (err, record) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(record[0].id);
            this.id = record[0].id;
            this.fid = record[0].fields.id;
//            this.id = record[0].id;

        });
    }

    update() {
        return new Promise((resolve, reject) => {
            base('tasks').replace([
                {
                    "id": this.id,
                    "fields": {
                        "name": this.name,
                        "members": this.members,
                        "status": this.status,
                        "archived": this.archived,
                        "dateFin": this.dateEnd,
                        "rappel": this.timeReminder
                    }
                }
            ], function (err, records) {
                if (err) {
                    console.error(err);
                    reject();
                }
                records.forEach(function (record) {
                    console.log('Updated ',record.id);
                });
                resolve();
            });
        })
    }

    read() {
        let memberList = this.getMembers();
        let date = "";
        if (this.dateEnd !== undefined) {
            date = this.dateEnd;
        }

        let names = "";



        if (this.status === 0) {
            $('#tasklist').append(
                `<div class="row justify-content-between task p-2" id="${this.id}-status${this.status}">
                        <div>
                            <p class="lead">${this.name}</p>
                            <div id="CollabNames-${this.id}"></div>
                            <div class="badge badge-secondary mx-2">${date}</div>
                        </div>
                        
                        <div class="m-1">
                            <button class="btn btn-outline-success mx-2 my-1" onclick="assignToTask(\'${this.id}\')"><i class="fa fa-plus"></i></button>
                            <button class="btn btn-outline-primary mx-2 button my-1" onclick="editModal(\'${this.id}\')"><i class="fa fa-pencil-square-o"></i>&nbsp;&nbsp;Editer</button>
                            <button id="commencer" onclick="startTask(\'${this.id}\')" class="btn btn-primary mx-2 button my-1"><i class="fa fa-times"></i>&nbsp;&nbsp;Commencer</button>
                            <button class="btn btn-danger mx-2 button my-1" onclick="deleteModal(\'${this.id}\')"><i class="fa fa-trash"></i>&nbsp;&nbsp;Supprimer</button>
                        </div>
                    </div>
                    <hr class="my-1 mx-4" id="hrfor${this.id}-status${this.status}">`);
        } else if (this.status === 1) {
            $('#tasklist').append(
                `<div class="row justify-content-between task p-2" id="${this.id}-status${this.status}">
                        <div>
                            <p class="lead">${this.name}</p>
                            <div id="CollabNames-${this.id}"></div>
                            <div class="badge badge-secondary mx-2">${date}</div>
                        </div>

                        <div class="m-1">
                            <span id="enCours" class="badge badge-danger mx-2 my-1">En cours</span>
                            <button class="btn btn-outline-success mx-2 my-1" onclick="assignToTask(\'${this.id}\')"><i class="fa fa-plus"></i></button>
                            <button class="btn btn-outline-primary mx-2 button my-1" onclick="editModal(\'${this.id}\')"><i class="fa fa-pencil-square-o"></i>&nbsp;&nbsp;Editer</button>
                            <button class="btn btn-success mx-2 button my-1" onclick="toggleCompleted(\'${this.id}\')"><i class="fa fa-check"></i>&nbsp;&nbsp;Terminer</button>
                            <button class="btn btn-danger mx-2 button my-1" onclick="deleteModal(\'${this.id}\')"><i class="fa fa-trash"></i>&nbsp;&nbsp;Supprimer</button>
                        </div>
                    </div>
                    <hr class="my-1 mx-4" id="hrfor${this.id}-status${this.status}">`);
        } else if (this.status === 2 && !this.archived) {
            $('#tasklist').append(
                `<div class="row justify-content-between task p-2" id="${this.id}-status${this.status}">
                        <div>
                            <p class="lead">${this.name}</p>
                            <div id="CollabNames-${this.id}"></div>
                            <div class="badge badge-secondary mx-2">${date}</div>
                        </div>
                        
                        <div class="m-1">
                            <span id="finie" class="badge badge-success mx-2 my-1">Terminée</span>
                            <button class="btn btn-outline-success mx-2 my-1" onclick="assignToTask(\'${this.id}\')"><i class="fa fa-plus"></i></button>
                            <button class="btn btn-outline-primary mx-2 button my-1" onclick="editModal(\'${this.id}\')"><i class="fa fa-pencil-square-o"></i>&nbsp;&nbsp;Editer</button>
                            <button class="btn btn-warning mx-2 button my-1" onclick="toggleCompleted(\'${this.id}\')"><i class="fa fa-times"></i>&nbsp;&nbsp;Reprendre</button>
                            <button class="btn btn-secondary mx-2 button my-1" onclick="archiveModal(\'${this.id}\')"><i class="fa fa-archive"></i>&nbsp;&nbsp;Archiver</button>
                        </div>
                    </div>
                    <hr class="my-1 mx-4" id="hrfor${this.id}-status${this.status}">`);
        } else if (this.status === 2 && this.archived === 1) {
            $('#tasklist').append(
                `<div class="row justify-content-between task p-2" id="${this.id}">
                        <div>
                            <p class="lead">${this.name}</p>
                            <div id="CollabNames-${this.id}"></div>
                            <div class="badge badge-secondary mx-2">${date}</div>
                        </div>
                        
                        <div class="">
                            <span id="finie" class="badge badge-success mx-2">Finie</span>
                            <button class="btn btn-warning mx-2 button" onclick="recoverTask(\'${this.id}\')"><i class="fa fa-repeat"></i>&nbsp;&nbsp;Récupérer</button>
                            <button class="btn btn-danger mx-2 button" onclick="deleteModal(\'${this.id}\')"><i class="fa fa-trash"></i>&nbsp;&nbsp;Supprimer</button>
                        </div>
                    </div>
                    <hr class="my-1 mx-4" id="hrfor${this.id}-status${this.status}">`);
        }
        if (memberList != null) {
            for (let i = 0; i < memberList.length; i++) {
                $('#CollabNames-'+this.id).append(`<span class="badge badge-primary mx-2">${memberList[i].name}</span>`) ;

            }
        }

        setTimeout(function () {
            $('.task').css('opacity', 1);
        }, 200);
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

    getMembers() {
        let memberList = [];
        for (let json in localStorage) {
            let object = JSON.parse(localStorage.getItem(json));

            if (!this.members) {
                this.members = [];
            }

            if (object != null && object.id != null && this.members.includes(object.id)) {
                let m = convertJsonToMember(object);
                //console.log(record.fields)
                memberList.push(m);
            }

            }

        return memberList;
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
        task.timeReminder = record.fields.rappel;
        return task;
    });
}

function createTask(name, date, reminder) {
    date = moment(date).format('YYYY-MM-DD hh:mm');
    if (name != null) {
        let t = new Task(name);
        //t.addUser();
        t.addDateEnd(date);
        t.addReminder(reminder);
        t.save();
        t.read();
    }
    $('#taskName').val("");
    $('#addTaskModal').modal('hide');
    Swal.fire(
        name + ' a bien été créée',
        '',
        'success'
    )

}


function fTime() {
            if (window.Notification) {
                Notification.requestPermission(function (status) {
                    console.log(status)
                    statutNotif = status;
                    console.log(statutNotif);
                    if (status === 'granted') {
                        o= 'granted';
                        timeNow();
                    }
                })
            } else {
                alert('Votre navigateur est trop ancien pour supporter cette fonctionnalité !');
            }
}

fTime();

function timeNow() {
    var now = moment().format("YYYY-MM-DD hh:mm");
    //console.log(now);
    base('tasks').select({
        view: "Grid view"
    }).eachPage(function page(records) {
        records.forEach(function (record) {
            if (record.fields.dateFin !== undefined) {
                if (((Date.parse(record.fields.dateFin) / 1000) / 60) - ((Date.parse(now) / 1000) / 60) == record.fields.rappel) {
                    Swal.fire(
                        'Votre tâche ' + record.fields.name + ' aura lieu dans ' + record.fields.rappel + 'minutes',
                        '',
                        'info'

                    )
                    clearTimeout(timeOutTen);
                    var timeOutSixty = setTimeout(timeNow, 60000);
                    //console.log(endNotif);
                }
            }
        });
    });
    var timeOutTen = setTimeout(timeNow, 10000); /* rappel après n secondes = endNotif millisecondes */
    timeOutTen;
    console.log('gnee')
}



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
        taskList.sort(function(a, b) {
            return a.fields.status - b.fields.status;
        });
        for (let i = 0; i < taskList.length; i++) {
            let task = new Task(taskList[i].fields.name);
            task.id = taskList[i].id;
            task.members = taskList[i].fields.members;
            task.status = taskList[i].fields.status;
            task.archived = taskList[i].fields.archived;
            task.dateFin = taskList[i].fields.dateFin;
            task.timeReminder = taskList[i].fields.rappel;
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
            task.timeReminder = taskList[i].fields.rappel;


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
    base('tasks').select({
        view: "Grid view"
    }).eachPage(function page(records) {
        records.forEach(function (record) {
            if (record.fields.name !== undefined) {
                if (record.fields.name.toLowerCase().includes(query.toLowerCase())) {
                    // $('#tasklist').empty();
                    let t = new Task(record.fields.name);
                    t.read();
                }
            }
        });
    });
}

function refreshTask() {
    $('#tasklist').empty();
    if (window.location.href.includes('archive')) {
        putArchivedTasks();
    } else {
        putAllTasks();
    }
}

function toggleCompleted(id) {
    getTask(id).then(function (task) {
        (task.status === 2) ? task.status = 1 : task.status = 2;
        task.update();
        refreshTask();
        if (task.status === 2) {
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

function recoverTask(id) {
    getTask(id).then(function (task) {
        task.archived = 0;
        task.status = 0;
        task.update();
        Swal.fire(
            task.name + ' a bien été récupérée',
            '',
            'success'
        );
        refreshTask();
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
        );
        refreshTask();
    });
}

function editModal(id) {
    getTask(id).then(function (task) {
        $('#editTask-name').val(task.name);
        $('#editTask-title').html(task.name);
        $('#editTask-Date').val(moment(task.dateFin).format('YYYY-MM-DD\Thh:mm'));
        $('#editTask-Rappel').val(task.timeReminder);
        $('#socialShare').attr('href', 'https://twitter.com/intent/tweet?text=Ma tâche est de : ' + task.name + ' sur ' + window.location.href)
        $('#editTaskModal').modal('show');

        $('#editTask-btn').click(function () {
            let date = $('#editTask-Date').val();
            let rappel = $('#editTask-Rappel').val();
            date = moment(date).format('YYYY-MM-DD hh:mm');

            $('#editTaskModal').modal('hide');
            task.dateFin = date;
            task.timeReminder = rappel;
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

function assignToTask(id) {
    getTask(id).then(function (task) {
        console.log(authMember);

        if (task.members == null) {
            task.members = [authMember.id];
        } else {
            if (!task.members.includes(authMember.id)) {
                task.members.push(authMember.id);
            } else {
                let indexOfMember = task.members.indexOf(authMember.id);
                if (indexOfMember > -1) {
                    task.members.splice(indexOfMember, 1);
                }
            }
        }


        task.update().then(function () {
            refreshTask();
        });
    });
}

