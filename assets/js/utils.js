function convertJsonToTask(json) {
    let task = new Task(json.name);
    task.id = json.id;
    task.members = json.members;
    task.status = json.status;

    return task;
}

function convertJsonToMember(json) {
    let member = new Member(json.name, json.role, json.mail);
    member.id = json.id;

    return member;
}


async function init() {
    let memberList = [];
    return base('members').select({
        // Selecting the first 3 records in Grid view:
        view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {
        records.forEach(function (record) {
            memberList.push(record);
        });
        fetchNextPage();
    }).then(function() {
        // console.log(memberList);
        for (let i = 0; i < memberList.length; i++) {
            let member = new Member(memberList[i].fields.name, memberList[i].fields.role, memberList[i].fields.email);
            // console.log(member);
            member.id = memberList[i].id;
            member.fid = memberList[i].fields.id;
            member.task = memberList[i].fields.task;
            member.firebaseuid = memberList[i].fields.firebaseuid;
            member.fromAirtable = 1;
            member.save();
        }

    });


}

init();