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
    '                <a class="nav-link dropdown-toggle" id="auth" role="button" data-toggle="dropdown"\n' +
    '                   aria-haspopup="true" aria-expanded="false">\n' +
    '                    Authentification\n' +
    '                </a>\n' +
    '                <div class="dropdown-menu" style="width: 100vh; margin-right: 0" aria-labelledby="auth">\n' +
    '                    <div class="dropdown-item" id="sign-in" onclick="$(\'#login\').modal(\'show\')">Se connecter</div>\n' +
    '                    <div class="dropdown-item d-none" id="sign-out">Déconnexion</pre></div>' +
    '                </div>\n' +
    '            </li>\n' +
    '            <li class="nav-item">\n' +
    '                <a class="nav-link" href="membre.html">Liste des membres</a>\n' +
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

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBeRRFvk1YjGEaKpKAAdlDuwS-d4rFV4Hg",
    authDomain: "jsproject-15258.firebaseapp.com",
    databaseURL: "https://jsproject-15258.firebaseio.com",
    projectId: "jsproject-15258",
    storageBucket: "jsproject-15258.appspot.com",
    messagingSenderId: "655168015986",
    appId: "1:655168015986:web:4ebe3414b21e2b6e10bceb"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var ui = new firebaseui.auth.AuthUI(firebase.auth());
ui.start('#firebaseui-auth-container', {
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
    ]
});

var userLoggged = null;

window.addEventListener('load', function () {
    initApp();
});

initApp = function () {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            user.getIdToken().then(function (accessToken) {
                $('#auth').html(user.displayName);
                $('#sign-out').removeClass('d-none');
                $('#sign-in').addClass('d-none');
                userLoggged = user;
                $('#login').modal('hide');
            });

        } else {
            // User is signed out.
            $('#sign-out').addClass('d-none');
            $('#sign-in').removeClass('d-none');
            $('#auth').html('Mon compte');
            userLoggged = null;
            ui.start('#firebaseui-auth-container', {
                signInOptions: [
                    firebase.auth.EmailAuthProvider.PROVIDER_ID
                ]
            });

        }
    }, function (error) {
        console.log(error);
    });

    document.getElementById('sign-out').addEventListener('click', function () {
        firebase.auth().signOut();
    });
};

