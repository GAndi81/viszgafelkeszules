var headerNamesArray = ["Azonosító", "Felhasználónév", "Jelszó", "Vezetéknév", "Keresztnév", "Ország", "Állam/Megye", "Irányítószám", "Város", "Cím", "Nem", "Születési dátum", "Email cím", "Telefonszám"];
var userDataKeys = ["id", "username", "password", "firstname", "lastname", "country", "state", "zipcode", "city", "address", "sex", "birthdate", "email", "phone"];


var table = document.createElement('table');
var thead = document.createElement('thead');
var headerTr = document.createElement('tr');
var tbody = document.createElement('tbody');
var tableContainer = document.getElementById('table_container');

thead.appendChild(headerTr);
table.border = 1;
table.appendChild(thead);
table.appendChild(tbody);
tableContainer.appendChild(table);

var appearTableHeader = function () {
    for (var i = 0; i < headerNamesArray.length; i++) {
        var headerName = headerNamesArray[i]
        var th = document.createElement("th");
        th.innerText = headerName;
        headerTr.appendChild(th);
    }
}

var appearTableBody = function (usersArray) {
    for (var i = 0; i < usersArray.length; i++) {
        var userObject = usersArray[i]

        var tr = document.createElement('tr');
        tbody.appendChild(tr);


        for (var j = 0; j < userDataKeys.length; j++) {
            var key = userDataKeys[j]; // pl. "city"
            var attribute = userObject[key];
            var td = document.createElement("td");
            td.innerText = attribute;
            tr.appendChild(td);
        }
    }
}

/*
    o	Statisztika
    o	A táblázatok alá kiírja külön bekezdésekbe a következőket:
    	A legidősebb ember felhasználóneve, mellé a dátum a következő formában: 1990. március 10.*/

var legfiatalabbUserneve = function () {
    var min = Number.MIN_VALUE;
    for (var i = 0; i < userDatas.length; i++) {
        if (userDatas[i].birthdate = min) {
            min = userDatas[i].birthdate;
        }
    }
    return min;
}

var formatDate = function (dateValue) {
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

var legfiatalabbUserneve = function (userDatas) {
    var max = Number.MAX_VALUE;
    for (var i = 0; i < userDatas.length; i++) {
        if (userDatas[i].birthdate = max) {
            max = userDatas[i].birthdate;
        }
    }
    return max;
}

var formatDate = function (dateValue) {
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
var atlagEletkor = function (userDatas) {
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

var osszEletkor = function (userDatas) {
    var ossz = 0;
    for (var i = 0; i < userDatas.length; i++) {
        if (userDatas[i].birthdate) {
            ossz += parseFloat(userDatas[i].birthdate);
        }
    }
    return ossz.toFixed(2);
}


var statistic = function (userDatas) {
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


var appearstatistic = function (userDatas) {
    var stat = statistic(userDatas);
    for (var i in stat) {
        var p = document.createElement('p');
        p.textContent = `${i} : ${stat[i]}`;
        document.body.appendChild(p);
    }
}


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

function successAjax(xhttp) {
    // itt a json content, benne a data változóban
    var userDatas = JSON.parse(xhttp.responseText);
    console.log(userDatas);
    appearTableHeader();
    appearTableBody(userDatas[0].users);
    appearstatistic();


}


/*
      Pár sorral lejebb majd ezt olvashatod:
      IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ!

      Na azokat a függvényeket ITT HÍVD MEG! 

      A userDatas NEM GLOBÁLIS változó, ne is tegyétek ki globálisra. Azaz TILOS!
      Ha valemelyik függvényeteknek kell, akkor paraméterként adjátok át.
    */

getData('js/users.json', successAjax);