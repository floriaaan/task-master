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
        //display a card
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
    return convertJsonToMember(JSON.parse(localStorage.getItem(id)))
}