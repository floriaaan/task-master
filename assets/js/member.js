class Member {

    constructor(name, role) {
        this.id = 'member-' + localStorage.length;
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
    }

    update() {
        //display a modal
        //make modifications
        localStorage.setItem(this.id, JSON.stringify(this));
    }

    delete() {
        //display a modal
        localStorage.removeItem(this.id)
    }


}

function deleteAllMembers() {

    for (let i in localStorage) {
        if (i.includes('member')) {
            localStorage.removeItem(i);
        }
    }

}

function getMember(id) {
    $.ajax({
        url: "https://api.airtable.com/v0/appR3t8mx4snnhfd6/members",
        type: "GET",
        headers: {"Authorization": "Bearer keywEghO0vQCyajkK"},
        success: function (data) {

            for (let i = 0; i < data.records.length; i++) {
                if(data.records[i].id === id) {
                    let member = convertAirtableToMember(data.records[i]);
                    console.log(member);
                    return member;
                }

            }
        },
        error: function (data) {
            console.log(data)
        }
    });
}

function putAllMembers() {
    for (let member in localStorage) {
        let object = JSON.parse(localStorage.getItem(member));
        if (object.id != null && object.id.includes('member')) {
            let t = convertJsonToMember(object);
            t.read();
        }

    }
}