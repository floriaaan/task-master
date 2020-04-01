class Member {

    constructor(name, role) {
        this.id = '';
        this.name = name;
        this.role = role;


    }

    save() {
        localStorage.setItem(this.id, JSON.stringify(this));
    }

    read() {
        $('#memberlist').append(
            `<div class="row justify-content-between task p-2" id="${this.id}">
                            <p class="lead">${this.id}</p>
                            <p class="lead">${this.name}</p>
                            <p class="lead">${this.role}</p>
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
                    "name": this.name,
                    "role": this.role
                }
            }
        ], function (err, record) {
            if (err) {
                console.error(err);
                return;
            }

            console.log('Updated', record.fields.name);
            localStorage.setItem(this.id, JSON.stringify(this));
        });


    }

    delete() {
        base('members').destroy([this.id], function(err, deletedRecords) {
            if (err) {
                console.error(err);
                return;
            }
            console.log('Deleted', deletedRecords.length, 'records');
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

