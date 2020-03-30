function convertJsonToTask(json) {
    let task = new Task(json.name);
    task.id = json.id;
    task.members = json.members;
    task.status = json.status;

    return task;
}

function convertJsonToMember(json) {
    let member = new Member(json.name, json.role);
    member.id = json.id;

    member.save();
    return member;
}

function deleteAllAndClear() {
    deleteAllMembers();
    deleteAllTasks();
    $('#tasklist').html("");
}