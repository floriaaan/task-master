$('#body').append('<nav class="navbar navbar-expand-lg navbar-dark bg-dark">\n' +
    '    <a class="navbar-brand d-flex" href="/index.html">\n' +
    '        <img src="assets/img/js.png" width="30" height="30" alt="Hello JS">\n' +
    '        <span class="align-content-center ml-3">Hello JS</span>\n' +
    '\n' +
    '    </a>\n' +
    '    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"\n' +
    '            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">\n' +
    '        <span class="navbar-toggler-icon"></span>\n' +
    '    </button>\n' +
    '\n' +
    '    <div class="collapse navbar-collapse" id="navbarSupportedContent">\n' +
    '        <ul class="navbar-nav mr-auto">\n' +
    '            <li class="nav-item active">\n' +
    '                <a class="nav-link" href="index.html">Accueil</a>\n' +
    '            </li>\n' +
    '            <li class="nav-item">\n' +
    '                <a class="nav-link" href="#">Lien</a>\n' +
    '            </li>\n' +
    '            <li class="nav-item dropdown">\n' +
    '                <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown"\n' +
    '                   aria-haspopup="true" aria-expanded="false">\n' +
    '                    Authentification\n' +
    '                </a>\n' +
    '                <div class="dropdown-menu" style="width: 100vh; margin-right: 0" aria-labelledby="navbarDropdown">\n' +
    '                    <div class="dropdown-item" onclick="$(\'#login\').modal(\'show\')">Se connecter</div>\n' +
    '                    <div class="dropdown-item" onclick="$(\'#register\').modal(\'show\')">Créer un compte</div>\n' +
    '                </div>\n' +
    '            </li>\n' +
    '        </ul>\n' +
    '        <div class="form-inline my-2 my-lg-0">\n' +
    '            <input class="form-control mr-sm-2" id="search" placeholder="Recherche">\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</nav>\n');

$('#search').keyup(function () {
    let query = $('#search').val();
    console.log(query)
    $('#tasklist').empty()
    if (query !== '' && query != null) {
        searchInTasks(query);
    } else {
        putAllTasks()
    }
});

