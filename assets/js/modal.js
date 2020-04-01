//pop-up ajouter une tâche
$('#body').append('<div class="modal fade" id="addTaskModal" tabindex="-1" role="dialog" aria-hidden="true">\n' +
    '  <div class="modal-dialog" role="document">\n' +
    '    <div class="modal-content">\n' +
    '      <div class="modal-header">\n' +
    '        <h5 class="modal-title">Ajouter une tâche</h5>\n' +
    '        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
    '          <span aria-hidden="true">&times;</span>\n' +
    '        </button>\n' +
    '      </div>\n' +
    '      <div class="modal-body">\n' +
    '        <div class="form-group">\n' +
    '            <label for="taskName">Nom de la tâche</label>\n' +
    '            <input type="text" class="form-control" id="taskName">\n' +
    '            <label for="taskDate">Doit être fait pour le </label>\n' +
    '            <input type="datetime-local" class="form-control" id="taskDate">\n' +
    '                 <label for="taskDate">Temps de rappel </label>\n' +
    '                 <select class="form-control" name="timeSelect" id="taskRappel"> ' +
    '                 <option value="0">--selectionner le temps avant le rappel--</option>' +
    '                 <option value="5">5 minutes</option>' +
    '                 <option value="10">10 minutes</option>' +
    '                 <option value="15">15 minutes</option>' +
    '            </select>' +
    '         </div>\n' +
    '      </div>\n' +
    '      <div class="modal-footer">\n' +
    '        <button type="button" class="btn btn-secondary" data-dismiss="modal">Annuler</button>\n' +
    '        <button type="button" class="btn btn-primary" onclick="createTask($(\'#taskName\').val(),$(\'#taskDate\').val(),$(\'#taskRappel\').val());">Ajouter une tâche</button>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</div>');

//
$('#body').append('<div class="modal fade" id="editTaskModal" tabindex="-1" role="dialog" aria-hidden="true">\n' +
    '  <div class="modal-dialog" role="document">\n' +
    '    <div class="modal-content">\n' +
    '      <div class="modal-header">\n' +
    '        <h5 class="modal-title" id="editTask-title"></h5>\n' +
    '        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
    '          <span aria-hidden="true">&times;</span>\n' +
    '        </button>\n' +
    '      </div>\n' +
    '      <div class="modal-body">\n' +
    '        <div class="form-group">\n' +
    '            <label for="taskName">Nom de la tâche</label>\n' +
    '            <input type="text" class="form-control" id="editTask-name">\n' +
    '         </div>\n' +
    '      </div>\n' +
    '      <div class="modal-footer">\n' +
    '        <div class="row justify-content-between">' +
    '            <div>\n' +
    '                <a href="" class="btn btn-light" id="socialShare"><i class="fa fa-twitter-square color-twitter"></i>&nbsp;&nbsp;Partager sur Twitter</a>' +
    '                <button type="button" class="btn btn-secondary" data-dismiss="modal">Annuler</button>\n' +
    '                <button type="button" class="btn btn-primary" id="editTask-btn">Editer une tâche</button>\n' +
    '            </div>\n' +
    '       </div>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</div>');


//
$('#body').append('<div class="modal fade" id="deleteTaskModal" tabindex="-1" role="dialog" aria-hidden="true">\n' +
    '  <div class="modal-dialog" role="document">\n' +
    '    <div class="modal-content">\n' +
    '      <div class="modal-header">\n' +
    '        <h5 class="modal-title">Supprimer une tâche</h5>\n' +
    '        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
    '          <span aria-hidden="true">&times;</span>\n' +
    '        </button>\n' +
    '      </div>\n' +
    '      <div class="modal-body">\n' +
    '        <p class="lead">Es-tu sûr de vouloir supprimer cette tâche ?</p>\n' +
    '      </div>\n' +
    '      <div class="modal-footer">\n' +
    '        <button type="button" class="btn btn-secondary" data-dismiss="modal">Annuler</button>\n' +
    '        <button type="button" class="btn btn-primary" id="deleteModal-btn">Supprimer</button>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</div>');

//pop up login
$('#body').append('<div class="modal fade" id="login" tabindex="-1" role="dialog" aria-hidden="true">\n' +
    '  <div class="modal-dialog" role="document">\n' +
    '    <div class="modal-content">\n' +
    '      <div class="modal-header">\n' +
    '        <h5 class="modal-title">Se connecter ou Créer un compte</h5>\n' +
    '        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
    '          <span aria-hidden="true">&times;</span>\n' +
    '        </button>\n' +
    '      </div>\n' +
    '      <div class="modal-body">\n' +
    '           <div id="firebaseui-auth-container"></div>' +
    '      </div>\n' +
    '      <div class="modal-footer">\n' +
    '        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</div>');

//Pop up archivage
$('#body').append('<div class="modal fade" id="archiveTaskModal" tabindex="-1" role="dialog" aria-hidden="true">\n' +
    '  <div class="modal-dialog" role="document">\n' +
    '    <div class="modal-content">\n' +
    '      <div class="modal-header">\n' +
    '        <h5 class="modal-title">Archiver une tâche</h5>\n' +
    '        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
    '          <span aria-hidden="true">&times;</span>\n' +
    '        </button>\n' +
    '      </div>\n' +
    '      <div class="modal-body">\n' +
    '        <p class="lead">Es-tu sûr de vouloir archiver cette tâche ?</p>\n' +
    '      </div>\n' +
    '      <div class="modal-footer">\n' +
    '        <button type="button" class="btn btn-secondary" data-dismiss="modal">Annuler</button>\n' +
    '        <button type="button" class="btn btn-primary" id="archiveModal-btn">Archiver</button>\n' +
    '      </div>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '</div>');