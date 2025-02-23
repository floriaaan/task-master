$('#body').append('<nav class="navbar navbar-expand-lg navbar-dark bg-dark">\n' +
    '    <a class="navbar-brand d-flex" href="index.html">\n' +
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
    '                <a class="nav-link" href="membre.html">Membres</a>\n' +
    '            </li>\n' +
    '            <li class="nav-item">\n' +
    '                <a class="nav-link" href="archive.html">Tâches archivées</a>\n' +
    '            </li>\n' +
    '            <li class="nav-item dropdown cur-pointer">\n' +
    '                <a class="nav-link dropdown-toggle" id="auth" role="button" data-toggle="dropdown"\n' +
    '                   aria-haspopup="true" aria-expanded="false">\n' +
    '                    Authentification\n' +
    '                </a>\n' +
    '                <div class="dropdown-menu" aria-labelledby="auth">\n' +
    '                    <div class="dropdown-item" id="sign-in" onclick="$(\'#login\').modal(\'show\')">Se connecter</div>\n' +
    '                    <div class="dropdown-item" id="account" ><a href="user.html">Mon profil</a></div>\n' +
    '                    <div class="dropdown-item d-none" id="sign-out">Déconnexion</pre></div>' +
    '                </div>\n' +
    '            </li>\n' +
    '        </ul>\n' +
    '        <div class="form-inline has-search my-2 my-lg-0">\n' +
    '            <span class="fa fa-search form-control-feedback"></span>\n' +
    '            <input type="search" class="form-control mr-sm-2" id="search" placeholder="Recherche">\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</nav>' +
    '<input type="hidden" id="userEmail" value="">\n');

$('#search').keyup(function () {
    let query = $('#search').val();
    //console.log(query)
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
var authMember = null;
let userLogged = null;
var ui = new firebaseui.auth.AuthUI(firebase.auth());
ui.start('#firebaseui-auth-container', {
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks : {
        signInSuccessWithAuthResult : function (authResult) {

            if(authResult.additionalUserInfo.isNewUser){
                authMember = new Member(authResult.user.displayName, 'user', authResult.user.email);
                authMember.firebaseuid = authResult.user.uid;
                authMember.saveAirtable();
                init().then(function () {
                    for (let json in localStorage) {
                        let object = JSON.parse(localStorage.getItem(json));
                        if(object != null && object.id != null && object.firebaseuid === authResult.user.uid) {
                            authMember.id = object.id;
                        }
                    }
                });
            }
        }
    },
    'credentialHelper': firebaseui.auth.CredentialHelper.NONE
});



window.addEventListener('load', function () {
    initAuth();
});

initAuth = function () {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            //console.log(user);
            user.getIdToken().then(function (accessToken) {
                $('#auth').html(user.displayName);
                $('#sign-out').removeClass('d-none');
                $('#account').removeClass('d-none');
                $('#sign-in').addClass('d-none');
                userLogged = user;
                $('#login').modal('hide');
                $('#addtask-btn').removeClass('disabled');
                $('#deleteAllLocalStorage-btn').removeClass('disabled');
                $('#userEmail').val(user.email);
                authMember = new Member(userLogged.displayName, 'user', userLogged.email);
                authMember.firebaseuid = user.uid;
                for (let json in localStorage) {
                    let object = JSON.parse(localStorage.getItem(json));
                    if(object != null && object.id != null && object.firebaseuid === user.uid) {
                        //console.log(object)
                        authMember.id = object.id;
                    }
                }
                //localStorage.setItem('authMember', JSON.stringify(authMember));
            });

        } else {
            // User is signed out.
            $('#sign-out').addClass('d-none');
            $('#account').addClass('d-none');
            $('#addtask-btn').addClass('disabled');
            $('#deleteAllLocalStorage-btn').addClass('disabled');

            $('#sign-in').removeClass('d-none');
            $('#auth').html('Mon compte');
            $('#userEmail').val('');
            userLogged = null;
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