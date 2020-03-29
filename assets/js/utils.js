function convertJsonToTask (json){
    let task = new Task(json.name);
    task.id = json.id;
    task.members = json.members;
    task.status = json.status;

    task.save();
    return task;
}