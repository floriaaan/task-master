class Member {

    constructor(name, role, email) {
        this.id = '';
        this.task = []; // jsp encore
        this.name = name;
        this.role = role;
        this.email = email;     // Récupérer mail du membre authentifié
        this.fromAirtable = 0;
        this.firebaseuid = '';
        this.fid = '';


    }

    save() {
        let inArray = false;
        for(let json in localStorage) {
            let object = JSON.parse(localStorage.getItem(json));
            if (object != null && object.id != null && object.firebaseuid === this.firebaseuid) {
                inArray = true;
            }
        }
        if (!inArray) {
            localStorage.setItem(this.id, JSON.stringify(this));
        } else {
            //console.log('Already exists in LocalStorage')
        }
    }


    saveAirtable() {

        return new Promise((resolve, reject) => {
            base('members').create([
                {
                    "fields": {
                        "task": this.task,
                        "name": this.name,
                        "role": this.role,
                        "email": this.email,
                        "firebaseuid": this.firebaseuid
                    }
                },

            ], (err, record) => {
                if (err) {
                    console.error(err);
                    reject();
                }

                this.id = record[0].id;
                this.fid = record[0].fields.id;
                //console.log(this);
                resolve();
            });
        });
    }



    read() {
        $('#memberlist').append(
            `<div class="row justify-content-between task p-2" id="${this.id}">
                            <p class="lead">${this.id}</p>
                            <p class="lead">${this.name}</p>
             </div>`);
        setTimeout(function () {
            $('.task').css('opacity', 1);
        }, 200);
    }

    update() {
        base('members').update([
            {
                "id": this.id,
                "fields": {
                    "task": this.task,
                    "name": this.name,
                    "role": this.role,
                    "email": this.email,
                }
            }
        ], function (err, record) {
            if (err) {
                console.error(err);
                return;
            }

            //console.log('Updated', record.fields.name);
            localStorage.setItem(this.id, JSON.stringify(this));
        });


    }

    delete() {
        base('members').destroy([this.id], function(err, deletedRecords) {
            if (err) {
                console.error(err);
                return;
            }
            //console.log('Deleted', deletedRecords.length, 'records');
            localStorage.removeItem(this.id);
        });

    }


}


function getMember(id) {
    return convertJsonToMember(JSON.parse(localStorage.getItem(id)))
}

function putAllMembers() {
    for(let json in localStorage) {
        let object = JSON.parse(localStorage.getItem(json));


        if (object != null && object.id != null) {
            let m = convertJsonToMember(object);

            m.read();
        }

    }
}

