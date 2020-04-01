class Member {

    constructor(name, role) {
        this.id = '';
        this.name = name;
        this.role = role;


    }

    save() {
        base('members').create([
            {
                "fields": {
                    "task": [],
                    "name": this.name,
                    "role": this.role
                }
            }
        ]).then(function (record) {
            localStorage.setItem('mem', record[0].id)
        });


    }

    read() {
        $('#memberlist').append(
            `<div class="row justify-content-between task p-2" id="${this.id}">
                            <p class="lead">${this.id}</p>
                            <p class="lead">${this.name}</p>
                            <p class="lead">${this.role}</p>

             </div>`);
    }

    update() {
        base('members').replace([
            {
                "id": this.id,
                "fields": {
                    "name": this.name,
                    "role": this.role
                }
            }
        ], function (err, records) {
            if (err) {
                console.error(err);
                return;
            }
            records.forEach(function (record) {
                console.log(record.get('role'));
            });
        });
    }

    delete() {
        base('members').destroy([this.id], function (err, deletedRecords) {
            if (err) {
                console.error(err);
                return;
            }
            console.log('Deleted', deletedRecords.length, 'records');
        });
    }


}


function getMember(id) {
    console.log(id)
    return base('members').find(id).then(function (record) {

        console.log('Retrieved', record.id);
        let member = new Member(record.fields.name, record.fields.role);
        member.id = id;
        return member;
    });


}

function putAllMembers() {
    let memberList = [];
    base('members').select({
        // Selecting the first 3 records in Grid view:
        maxRecords: 3,
        view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.

        records.forEach(function (record) {
            memberList.push(record);
        });

        fetchNextPage();

    }, function done(err) {
        if (err) {
            console.error(err);
            return;
        }
        for (let i = 0; i < memberList.length; i++) {
            let member = new Member(memberList[i].fields.name, memberList[i].fields.role);
            member.id = memberList[i].id;
            member.read()
        }

    });


}

