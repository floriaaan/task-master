function convertJsonToTask(json) {
    let task = new Task(json.name);
    task.id = json.id;
    task.members = json.members;
    task.status = json.status;

    return task;
}

function convertAirtableToTask(json) {
    let task = new Task(json.fields.name);
    task.id = json.id;
    task.members = json.fields.members;
    task.status = json.fields.status;

    return task;
}

function convertJsonToMember(json) {
    let member = new Member(json.name, json.role);
    member.id = json.id;

    return member;
}

function convertAirtableToMember(json) {
    let member = new Member(json.fields.name, json.fields.role);
    member.id = json.id;

    return member;
}

function deleteAllAndClear() {
    deleteAllMembers();
    deleteAllTasks();
    $('#tasklist').html("");
}