var users = [{
        email: 'baratheon@got.com',
        password: 'baratheon'
    },
    {
        email: 'bolton@got.com',
        password: 'bolton'
    },
    {
        email: 'florent@got.com',
        password: 'florent'
    },
    {
        email: 'lennister@got.com',
        password: 'lennister'
    },
    {
        email: 'martell@got.com',
        password: 'martell'
    },
    {
        email: 'redwyne@got.com',
        password: 'redwyne'
    },
    {
        email: 'stark@got.com',
        password: 'stark'
    },
    {
        email: 'umber@got.com',
        password: 'umber'
    },
    {
        email: 'tully@got.com',
        password: 'tully'
    },
    {
        email: 'targaryen@got.com',
        password: 'targaryen'
    }
];



/*Minden alkalommal, amikor a login gombra kattintanak, ellenőrizni kell, 
    hogy a felhasználónév és a jelszó nem üres e. 
    Amennyiben üres, a login gomb fölé egy #error id - jú span elembe írjuk ki, 
    piros betűszínnel, hogy: Meg kell adnod a felhasználóneved és jelszavad.
    
    Ha nem ürresek a mezők, akkor egy függvény leellenőrzi, hogy az adott
                        felhasználónév, jelsz ópáros szerepel e a tömbben.
                        Ha igen, kiírja a LOGIN gomb fölé egy #success id-jú elembe,
                        zölden, hogy Belépve: usename.
                        (A username helyére az adott user emailjét írja ki)*/

var userEmailField = document.getElementById('email');
var passwordField = document.getElementById('password');
var button = document.getElementById('katt');
var forgot = document.getElementById('forgot');
var loginAttempts = 0;

var submitEventHandler = function () {
    var mail = userEmailField.value;
    var pass = passwordField.value;

    loginAttempts++;

    document.getElementById('error').innerHTML = '';

    if (mail.length === 0 || pass.length === 0) {
        document.getElementById('error').innerHTML = 'Meg kell adnod a felhasználóneved és jelszavad.';
    } else {
        var sikeres = false;

        for (var i = 0; i < users.length; i++) {
            sikeres = (mail === users[i].email && pass === users[i].password)
            if (sikeres) {
                break;
            }
        }

        if (sikeres) {
            document.getElementById('success').innerHTML = 'Belépve: ' + mail;
        } else {
            document.getElementById('error').innerHTML = 'Hibás felhasználónév vagy jelszó.';

            if (loginAttempts >= 3) {
                document.getElementById('error').innerHTML += ' Háromszor is elrontottad az adataidat, 24 órára kitiltottunk';
            }
        }
    }

}


/*
Ha a tömbünkben nincs olyan felhasználó akinek ez lenne a felhasználónév jelszó
párosa, a login gomb fölé egy# error id - jú span elembe írjuk ki,
    piros betűszínnel, hogy: Hibás felhasználónév vagy jelszó.*/


/*
Ha legalább háromszor téves felhasználónév jelszó páros lett megadva,
akkor a login gomb fölé egy# error id - jú span elembe írjuk ki,
    piros betűszínnel: HÁromszor is elrontottad az adataidat, 24 órára kitiltottunk.*/

button.onclick = submitEventHandler;

var forgotEventHandler = function () {
    var kellaMailcím = prompt('Add meg az email címed.')
    alert('Az új jelszó el lett küldve a megadott email címre.')
}

forgot.onclick = forgotEventHandler;

/*
Amennyiben a user a forgott password - re kattint, ugorjon fel egy prompt,
    amibe bekérjük a felhasználó email címét.
Miután ezt leokézta, ugorjon fel egy alert azzal a szöveggel, hogy az
új jelszó el lett küldve az email címére.
    (Az emailt persze nem kell elküldeni) */