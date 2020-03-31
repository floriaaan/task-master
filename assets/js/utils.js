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

function retrieveAllfromAirtable(callableFunction) {
    let tasks = [];
    base('tasks').select({
        // Selecting the first 3 records in Grid view:
        view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.

        records.forEach(function (record) {
            tasks.push(record);
        });


        fetchNextPage();

    }, function done() {

        for (let k = 0; k<tasks.length; k++) {

            let task = new Task(tasks[k].fields.name);
            task.archived = tasks[k].fields.archived;
            task.status = tasks[k].fields.status;
            task.members = tasks[k].fields.members;
            task.fromAirtable = 1;
            task.id = 'task-' + tasks[k].id;

            task.save();
        }
    });

    let members = [];
    base('members').select({
        // Selecting the first 3 records in Grid view:
        view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.

        records.forEach(function (record) {
            members.push(record);
        });


        fetchNextPage();

    }, function done() {

        for (let k = 0; k<members.length; k++) {

            let member = new Member(members[k].fields.name, members[k].fields.role);
            member.id = 'member-' + members[k].id;

            member.save();

        }
    });
    callableFunction()
}