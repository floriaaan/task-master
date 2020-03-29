$('#body').append('<div class="modal fade" id="addTaskModal" tabindex="-1" role="dialog" aria-hidden="true">\n' +
    '  <div class="modal-dialog" role="document">\n' +
    '    <div class="modal-content">\n' +
    '      <div class="modal-header">\n' +
    '        <h5 class="modal-title" id="exampleModalLabel">Ajouter une tâche</h5>\n' +
    '        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
    '          <span aria-hidden="true">&times;</span>\n' +
    '        </button>\n' +
    '      </div>\n' +
    '      <div class="modal-body">\n' +
    '        <div class="form-group">\n' +
    '            <label for="taskName">Nom de la tâche</label>\n' +
    '            <input type="text" class="form-control" id="taskName">\n' +
    '         </div>\n' +
    '      </div>\n' +
    '      <div class="modal-footer">\n' +
    '        <button type="button" class="btn btn-secondary" data-dismiss="modal">Annuler</button>\n' +
    '        <button type="button" class="btn btn-primary" onclick="createTask($(\'#taskName\').val());">Ajouter une tâche</button>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</div>');

$('#body').append('<div class="modal fade" id="deleteTaskModal" tabindex="-1" role="dialog" aria-hidden="true">\n' +
    '  <div class="modal-dialog" role="document">\n' +
    '    <div class="modal-content">\n' +
    '      <div class="modal-header">\n' +
    '        <h5 class="modal-title" id="exampleModalLabel">Supprimer une tâche</h5>\n' +
    '        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
    '          <span aria-hidden="true">&times;</span>\n' +
    '        </button>\n' +
    '      </div>\n' +
    '      <div class="modal-body">\n' +
    '        ...\n' +
    '        <input type="hidden" id="delete" value="">' +
    '      </div>\n' +
    '      <div class="modal-footer">\n' +
    '        <button type="button" class="btn btn-secondary" data-dismiss="modal">Annuler</button>\n' +
    '        <button type="button" class="btn btn-primary" onclick="deleteTask($(\'#delete\').value());">Ajouter une tâche</button>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</div>');


function convertJsonToTask(json) {
    let task = new Task(json.name);
    task.id = json.id;
    task.members = json.members;
    task.status = json.status;

    task.save();
    return task;
}

function deleteAllAndClear() {
    deleteAllMembers();
    deleteAllTasks();
    $('#tasklist').html("");
}