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


}

/*
      Pár sorral lejebb majd ezt olvashatod:
      IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ!

      Na azokat a függvényeket ITT HÍVD MEG! 

      A userDatas NEM GLOBÁLIS változó, ne is tegyétek ki globálisra. Azaz TILOS!
      Ha valemelyik függvényeteknek kell, akkor paraméterként adjátok át.
    */

getData('js/users.json', successAjax);