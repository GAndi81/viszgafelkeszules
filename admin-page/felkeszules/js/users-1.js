function getData(url, callbackFunc) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callbackFunc(this);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}


var adatRendezes = {
    szerint: 'id',
    irany: true,
    szamSzerint: ['id', 'zipcode', 'phone']
};


function successAjax(xhttp) {
    // itt a json content, benne a data változóban
    var userDatas = JSON.parse(xhttp.responseText);
    console.log(userDatas);
    keszitsTablazatot(userDatas);
    jelenitsdaStatisztikat(userDatas);



    // Itt generáltatom le a th-kat tartalmazó sort
    function fejlecKeszites(userDatas, headerData) {
        var tr = document.createElement('tr');
        var sortTh = ['id', 'username', 'password', 'firstname', 'lastname', 'country', 'state', 'zipcode', 'city', 'address', 'sex', 'birthdate', 'email', 'phone'];
        headerData.forEach(function (element) {
            var th = document.createElement('th');
            th.textContent = element;
            // Ha olyan tulajdonság, ami szerint rendezni kell, akkor adok hozzá egy eseményfigyelőt
            if (sortTh.includes(element)) {
                th.addEventListener('click', function () {
                    setSorting(data, element);
                });
            }
            tr.appendChild(th);
        });
        return tr;
    }

    // Egy td legenerálása a benne lévő adattal formázással együtt
    function createTd(objElement, arrElement) {
        var td = document.createElement('td');
        var element = objElement[arrElement];
        // ezt még érdemes lenne szétbontani
        if (element) {
            if (arrElement == 'id') {
                td.textContent = formatDate(element);
            } else if (arrElement == 'username') {
                td.textContent = formatMass(element);
            } else {
                td.textContent = element;
            }
        } else {
            td.textContent = '';
        }
        return td;
    }

    //ezt nem lehet switch case-el megcsináni? - a fentit, mert minden egyes sort le kell generálni

    // A tbálázat legenerálása
    function createTable(userDatas) {
        document.querySelector('tbody').innerHTML = '';
        // Felvettem a kilistázandó propteriket
        var dataProps = ['id', 'username', 'password', 'firstname', 'lastname', 'country', 'state', 'zipcode', 'city', 'address', 'sex', 'birthdate', 'email', 'phone'];
        var table = document.createElement('table');
        table.appendChild(generateHeaders(userDatas, dataProps));
        userDatas.forEach(function (objElement) {
            var tr = document.createElement('tr');
            dataProps.forEach(function (arrElement) {
                tr.appendChild(createTd(objElement, arrElement));
                table.appendChild(tr);
            });
            document.querySelector('tbody').appendChild(table);
        });
    }

    /*
        o	1990 előttiek
    	Csak az  1990 előtt született felhasználók felhasználónevét írja ki a táblázatba

    o	A 3 legidősebb
    	A 3 legidősebb felhasználó vezeték-, keresztneve és születési dátuma, kor szerint csökkenő sorrendben.

    o	Szűrt nevek
    •	A vezetéknév, keresztnév legyen kiratva az 1900 és 2000 között született Budapesti lakosú férfiaknál, akiknél a megye/állam mező is meg van adva, Az adatok vezetéknév szerint, azonos vezetéknév esetén keresztnév szerint legyen rendezve.

    o	Városok
    	Minden város neve, amelyben legalább ketten laknak, és mellette a lakosok száma

    o	2000 előttiek
    	Minden 2000 előtt született felhasználó, vagy nem Budapesti felhasználó vezeték-, kereszt- és felhasználóneve, email címe, telefonszáma. 

    */

    /*
    o	Statisztika
    o	A táblázatok alá kiírja külön bekezdésekbe a következőket:
    	A legidősebb ember felhasználóneve, mellé a dátum a következő formában: 1990. március 10.*/

    function legidosebbUserneve(userDatas) {
        var min = Number.MIN_VALUE;
        for (var i = 0; i < userDatas.length; i++) {
            if (userDatas[i].birthdate > max) {
                min = userDatas[i].birthdate;
            }
        }
        return min;
    }

    function formatDate(dateValue) {
        dateValue = new Date(dateValue);
        var y = dateValue.getFullYear();
        var m = dateValue.getMonth() + 1;
        var d = dateValue.getDate();
        m = m < 10 ? '0' + m : m;
        d = d < 10 ? '0' + d : d;
        return `${y}.${m}.${d}.`;
    }

    /*
    	A legfiatalabb ember felhasználóneve mellé a dátum a következő formában: 1990. március 10.*/

    function legfiatalabbUserneve(userDatas) {
        var max = Number.MAX_VALUE;
        for (var i = 0; i < userDatas.length; i++) {
            if (userDatas[i].birthdate > min) {
                max = userDatas[i].birthdate;
            }
        }
        return max;
    }

    function formatDate(dateValue) {
        dateValue = new Date(dateValue);
        var y = dateValue.getFullYear();
        var m = dateValue.getMonth() + 1;
        var d = dateValue.getDate();
        m = m < 10 ? '0' + m : m;
        d = d < 10 ? '0' + d : d;
        return `${y}.${m}.${d}.`;
    }
    /*
    	Az átlagéletkort két tizedes jegyre kerekítve.
    */
    function atlagEletkor(userDatas) {
        var db = 0;
        var avg;
        for (var i = 0; i < userDatas.length; i++) {
            if (userDatas[i].birthdate) {
                db++;
            }
        }
        avg = parseFloat(osszEletkor(userDatas) / db);
        return avg.toFixed(2);
    }


    /*
    	Az összegzett életkort.

    */

    function osszEletkor(userDatas) {
        var ossz = 0;
        for (var i = 0; i < userDatas.length; i++) {
            if (userDatas[i].birthdate) {
                ossz += parseFloat(userDatas[i].birthdate);
            }
        }
        return ossz.toFixed(2);
    }


    // Ez a függvény objektumklnt visszaadja a statisztikai adatokat, és a kiírandó szöveget is
    function statistic(userDatas) {
        return {
            'A legidősebb ember felhasználóneve, mellé a dátum a következő formában: 1990. március 10.': legidosebbUserneve(userDatas),
            'A legfiatalabb ember felhasználóneve mellé a dátum a következő formában: 1990. március 10.': legfiatalabbUserneve(userDatas),
            'Az átlagéletkor két tizedes jegyre kerekítve': atlagEletkor(userDatas),
            'Az összegzett életkor': osszEletkor(userDatas),


            'Csak az  1990 előtt született felhasználók felhasználónevét írja ki a táblázatba': elottszuletett(userDatas),
            '3 legidősebb': haromLegidosebb(userDatas),
            'Szűrt nevek': szurtNevek(userDatas),
            'Városok': varosok(userDatas),
            '2000 előttiek': ketezerElottiek(userDatas),
        }
    }

    // A statisztikai adatok kiirását végző fügvény!!!!!!!megnézni!
    function jelenitsdaStatisztikat(userDatas) {
        var stat = statistic(userDatas);
        for (var i in stat) {
            var p = document.createElement('p');
            p.textContent = `${i} : ${stat[i]}`;
            document.body.appendChild(p);
        }
    }

    /*
      Pár sorral lejebb majd ezt olvashatod:
      IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ!

      Na azokat a függvényeket ITT HÍVD MEG! 

      A userDatas NEM GLOBÁLIS változó, ne is tegyétek ki globálisra. Azaz TILOS!
      Ha valemelyik függvényeteknek kell, akkor paraméterként adjátok át.
    */
}

getData('js/users.json', successAjax);

// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */