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
    '        <p class="lead">Es-tu sûr de vouloir supprimer cette tâche ?</p>\n' +
    '        <input type="hidden" id="deleteInput" value="">' +
    '      </div>\n' +
    '      <div class="modal-footer">\n' +
    '        <button type="button" class="btn btn-secondary" data-dismiss="modal">Annuler</button>\n' +
    '        <button type="button" class="btn btn-primary" id="deleteModal-btn">Supprimer</button>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</div>');
