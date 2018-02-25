var userMail = [{
        email: 'baratheon@got.com',
    },
    {
        email: 'bolton@got.com',
    },
    {
        email: 'florent@got.com',
    },
    {
        email: 'lennister@got.com',
    },
    {
        email: 'martell@got.com',
    },
    {
        email: 'redwyne@got.com',
    },
    {
        email: 'stark@got.com',
    },
    {
        email: 'umber@got.com',
    },
    {
        email: 'tully@got.com',
    },
    {
        email: 'targaryen@got.com',
    }
];

var userPassword = [{
        password: 'baratheon'
    },
    {
        password: 'bolton'
    },
    {
        password: 'florent'
    },
    {
        password: 'lennister'
    },
    {
        password: 'martell'
    },
    {
        password: 'redwyne'
    },
    {
        password: 'stark'
    },
    {
        password: 'umber'
    },
    {

        password: 'tully'
    },
    {
        password: 'targaryen'
    }
];

var user = 0;
var password = 0;
var valid = false;
var loginAttempts = 3;

// Majdnem jó is :) Egy sima függvénnyel egyszerűbb lett volna.
document.getElementById('login').onclick; {
    document.getElementById('username').value = user;
    document.getElementById('password').value = password;
	// Az és helyett vagy feltétel kell, ha ez vagy az üres	
	if (user === "" && password === "")
        document.getElementById('error').innerHTML = 'Meg kell adnod a felhasználóneved és a jelszavad.';
}

for (var i = 0; i < users.length; i++) {
    if ((user = userMail[i]) && (password = userPassword[i])); {
        valid = true;
        document.getElementById('success').innerHTML = 'Belépve: usename';

    } else(valid = false) {
        document.getElementById('error').innerHTML = 'Hibás felhasználónév vagy jelszó.';
    }

}

if (loginAttempts > 3) {
    document.getElementById('error').innerHTML = 'HÁromszor is elrontottad az adataidat, 24 órára kitiltottunk';
}

// Logikailag rendben van. Gyakorolni kell csak.

document.getElementById('forgot').onclick; {
    alert('Adj meg e-mail címet!')
    alert('AZ új jeslzó elküldésre került.')
}


/*  Minden alkalommal, amikor a login gombra kattintanak, ellenőrizni kell, 
    hogy a felhasználónév és a jelszó nem üres e. 
    Amennyiben üres, a login gomb fölé egy #error id - jú span elembe írjuk ki, 
    piros betűszínnel, hogy: Meg kell adnod a felhasználóneved és jelszavad. 


    Ha nem ürresek a mezők, akkor egy függvény leellenőrzi, hogy az adott
    felhasználónév, jelsz ópáros szerepel e a tömbben.
    Ha igen, kiírja a LOGIN gomb fölé egy #success id-jú elembe,
    zölden, hogy Belépve: usename.
    (A username helyére az adott user emailjét írja ki)

    Ha a tömbünkben nincs olyan felhasználó akinek ez lenne a felhasználónév jelszó
    párosa, a login gomb fölé egy #error id - jú span elembe írjuk ki, 
    piros betűszínnel, hogy: Hibás felhasználónév vagy jelszó.

    Ha legalább háromszor téves felhasználónév jelszó páros lett megadva,
    akkor a login gomb fölé egy #error id - jú span elembe írjuk ki, 
    piros betűszínnel : HÁromszor is elrontottad az adataidat, 24 órára kitiltottunk.

    Amennyiben a user a forgott password-re kattint, ugorjon fel egy prompt,
    amibe bekérjük a felhasználó email címét.
    Miután ezt leokézta, ugorjon fel egy alert azzal a szöveggel, hogy az 
    új jelszó el lett küldve az email címére.
    (Az emailt persze nem kell elküldeni)
*/