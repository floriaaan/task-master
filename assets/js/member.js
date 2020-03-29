class Member {

    constructor(name, role) {
        this.id = localStorage.length;
        this.name = name;
        this.role = role;



    }

    save() {
        localStorage.setItem("member-" + this.id, JSON.stringify(this));
    }

    read() {
        //display a card
    }

    update() {
        //display a modal
        //make modifications
        localStorage.setItem("member-" + this.id, JSON.stringify(this));
    }

    delete() {
        //display a modal
        localStorage.removeItem("member-" + this.id)
    }


}

function deleteAllMembers() {
    console.log(localStorage);
    for (let i in localStorage) {
        if(i.includes('member')) {
            localStorage.removeItem(i);
        }
    }
    console.log(localStorage);

}