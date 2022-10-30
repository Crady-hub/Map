let map; //variable for google map 
let markers = [] //variable for markers
let newmarker = [] // new data about marker
let usermarker = [] // new user marker
let token = window.location.search.split('=')[1]
let newLatLng = []
let profile = []
let activeMarker = 0
let datenow = new Date()
datenow = datenow.getMonth() + 1



// GET markers from backend
var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};
fetch("http://127.0.0.1:8000/api/v1/marker/", requestOptions)
    .then(response => response.json())
    .then(result => {
        result.forEach(element => {
            addMarker(element);
        });
    })
    .catch(error => console.log('error', error));


// GET Profile info
var myHeaders = new Headers();
myHeaders.append("Authorization", `Token ${token}`);

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

fetch("http://127.0.0.1:8000/api/v1/profile", requestOptions)
    .then(response => response.json())
    .then(result => {
        profile = result
        fio.value = result.fio
        phone.value = result.phone_number
    })
    .catch(error => console.log('error', error));

function calendarSet() {
    if (datenow == 1) {
        january.disabled = true
        januarybtn.disabled = true
        $('#januarybtn').removeClass('btn-secondary')
        $('#januarybtn').addClass('btn-outline-secondary')
    } else if (datenow == 2) {
        february.disabled = true
        februarybtn.disabled = true
        $('#februarybtn').removeClass('btn-secondary')
        $('#februarybtn').addClass('btn-outline-secondary')
    } else if (datenow == 3) {
        march.disabled = true
        marchbtn.disabled = true
        $('#marchbtn').removeClass('btn-secondary')
        $('#marchbtn').addClass('btn-outline-secondary')
    } else if (datenow == 4) {
        april.disabled = true
        aprilbtn.disabled = true
        $('#aprilbtn').removeClass('btn-secondary')
        $('#aprilbtn').addClass('btn-outline-secondary')
    } else if (datenow == 5) {
        may.disabled = true
        maybtn.disabled = true
        $('#maybtn').removeClass('btn-secondary')
        $('#maybtn').addClass('btn-outline-secondary')
    } else if (datenow == 6) {
        june.disabled = true
        junebtn.disabled = true
        $('#junebtn').removeClass('btn-secondary')
        $('#junebtn').addClass('btn-outline-secondary')
    } else if (datenow == 7) {
        july.disabled = true
        julybtn.disabled = true
        $('#julybtn').removeClass('btn-secondary')
        $('#julybtn').addClass('btn-outline-secondary')
    } else if (datenow == 8) {
        august.disabled = true
        augustbtn.disabled = true
        $('#augustbtn').removeClass('btn-secondary')
        $('#augustbtn').addClass('btn-outline-secondary')
    } else if (datenow == 9) {
        september.disabled = true
        septemberbtn.disabled = true
        $('#septemberbtn').removeClass('btn-secondary')
        $('#septemberbtn').addClass('btn-outline-secondary')
    } else if (datenow == 10) {
        october.disabled = true
        octoberbtn.disabled = true
        $('#octoberbtn').removeClass('btn-secondary')
        $('#octoberbtn').addClass('btn-outline-secondary')
    } else if (datenow == 11) {
        november.disabled = true
        novemberbtn.disabled = true
        $('#novemberbtn').removeClass('btn-secondary')
        $('#novemberbtn').addClass('btn-outline-secondary')
    } else if (datenow == 12) {
        december.disabled = true
        decemberbtn.disabled = true
        $('#decemberbtn').removeClass('btn-secondary')
        $('#decemberbtn').addClass('btn-outline-secondary')
    }
    // january.disabled = (datenow == 1) ? true : false
    // januarybtn.disabled = (datenow == 1) ? true : false
    // february.disabled = (datenow == 2) ? true : false
    // februarybtn.disabled = (datenow == 2) ? true : false
    // march.disabled = (datenow == 3) ? true : false
    // marchbtn.disabled = (datenow == 3) ? true : false
    // april.disabled = (datenow == 4) ? true : false
    // aprilbtn.disabled = (datenow == 4) ? true : false
    // may.disabled = (datenow == 5) ? true : false
    // maybtn.disabled = (datenow == 5) ? true : false
    // june.disabled = (datenow == 6) ? true : false
    // junebtn.disabled = (datenow == 6) ? true : false
    // july.disabled = (datenow == 7) ? true : false
    // julybtn.disabled = (datenow == 7) ? true : false
    // august.disabled = (datenow == 8) ? true : false
    // augustbtn.disabled = (datenow == 8) ? true : false
    // september.disabled = (datenow == 9) ? true : false
    // septemberbtn.disabled = (datenow == 9) ? true : false
    // october.disabled = (datenow == 10) ? true : false
    // octoberbtn.disabled = (datenow == 10) ? true : false
    // november.disabled = (datenow == 11) ? true : false
    // novemberbtn.disabled = (datenow == 11) ? true : false
    // december.disabled = (datenow == 12) ? true : false
    // decemberbtn.disabled = (datenow == 12) ? true : false


    januarybtn.title = (datenow > 1) ? '2022' : '2021'
    februarybtn.title = (datenow > 2) ? '2022' : '2021'
    marchbtn.title = (datenow > 3) ? '2022' : '2021'
    aprilbtn.title = (datenow > 4) ? '2022' : '2021'
    maybtn.title = (datenow > 5) ? '2022' : '2021'
    junebtn.title = (datenow > 6) ? '2022' : '2021'
    julybtn.title = (datenow > 7) ? '2022' : '2021'
    augustbtn.title = (datenow > 8) ? '2022' : '2021'
    septemberbtn.title = (datenow > 9) ? '2022' : '2021'
    octoberbtn.title = (datenow > 10) ? '2022' : '2021'
    novemberbtn.title = (datenow > 11) ? '2022' : '2021'
    decemberbtn.title = (datenow > 12) ? '2022' : '2021'
}


function createUpdateProfile() {
    if (profile.fio == fio.value.trim() && profile.phone_number == phone.value.trim()) {
        $('.popup-bg-profile').fadeOut(400);
        $('html').removeClass('no-scroll');
    } else {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Token ${token}`);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "fio": fio.value.trim(),
            "phone_number": phone.value.trim()
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://127.0.0.1:8000/api/v1/profile", requestOptions)
            .then(response => response.json())
            .then(result => {
                profile = result
                fio.value = result.fio
                phone.value = result.phone_number
                $('.popup-bg-profile').fadeOut(400);
                $('html').removeClass('no-scroll');
            })
            .catch(error => console.log('error', error));
    }
}


// Create Map
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10,
        center: { lat: 50.45, lng: 30.52 },
        mapTypeControl: false,
        fullscreenControl: false,
        styles: [{
            featureType: 'poi.business',
            elementType: 'labels',
            stylers: [
                { visibility: 'off' }
            ]
        }],
    });

}

function NewUserMarker(latLng, map) {
    for (let i = 0; i < usermarker.length; i++) {
        usermarker[i].setMap(null);
    }
    newmarker = new google.maps.Marker({
        position: latLng,
        map: map,
    })
    usermarker.push(newmarker)
}

function addMarker(locations) {
    var marker = new google.maps.Marker({
        position: { lat: parseFloat(locations.lat), lng: parseFloat(locations.lng) },
        myid: locations.id,
        map: map,
    })
    marker.addListener('click', function(e) {
        activeMarker = marker.myid
        getMarkerInfo(marker.myid)
    })
    markers.push(marker)
}

function createMarker() {
    map.addListener("click", (e) => {
        newLatLng = JSON.parse(JSON.stringify(e.latLng.toJSON(), null, 2))
        getAddress(JSON.parse(JSON.stringify(e.latLng.toJSON(), null, 2)))
        NewUserMarker(e.latLng, map);
    });
}


function addNewMarker() {
    if (profile.phone_number && profile.fio) {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Token ${token}`);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "lat": newLatLng.lat,
            "lng": newLatLng.lng,
            "price": price.value,
            "type": type.value
        });
        console.log(raw)

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://127.0.0.1:8000/api/v1/marker/", requestOptions)
            .then(response => response.json())
            .then(result => {
                address.value = ''
                price.value = ''
                type.value = 0
                $("#popup-marker").fadeIn(400);
                setTimeout(function() {
                    $("#popup-marker").fadeOut(400);
                }, 2000);
                addMarker(result)
            })
            .catch(error => console.log('error', error));
    } else {
        $("#popup-error").fadeIn(400);
        setTimeout(function() {
            $("#popup-error").fadeOut(400);
        }, 2000);
    }
}


// Get address 
function getAddress(latlng) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng.lat}, ${latlng.lng}&key=AIzaSyAmIBHpjazvTWnEfyZ7NHcB1TC92eBBMnU&language=ru`, requestOptions)
        .then(response => response.json())
        .then(result => address.value = result.results[0].formatted_address)
        .catch(error => console.log('error', error));
}

function cancelMarker() {
    if (document.getElementById('switcher').checked) {
        for (let i = 0; i < usermarker.length; i++) {
            usermarker[i].setMap(null);
        }
    } else {
        google.maps.event.clearListeners(map, 'click')
        for (let i = 0; i < usermarker.length; i++) {
            usermarker[i].setMap(null);
        }
    }

}

function createRent() {
    let dates = []
    if (january.checked) {
        dates.push(`${januarybtn.title}-${january.value}-01`)
    }
    if (february.checked) {
        dates.push(`${februarybtn.title}-${february.value}-01`)
    }
    if (march.checked) {
        dates.push(`${marchbtn.title}-${march.value}-01`)
    }
    if (april.checked) {
        dates.push(`${aprilbtn.title}-${april.value}-01`)
    }
    if (may.checked) {
        dates.push(`${maybtn.title}-${may.value}-01`)
    }
    if (june.checked) {
        dates.push(`${junebtn.title}-${june.value}-01`)
    }
    if (july.checked) {
        dates.push(`${julybtn.title}-${july.value}-01`)
    }
    if (august.checked) {
        dates.push(`${augustbtn.title}-${august.value}-01`)
    }
    if (september.checked) {
        dates.push(`${septemberbtn.title}-${september.value}-01`)
    }
    if (october.checked) {
        dates.push(`${octoberbtn.title}-${october.value}-01`)
    }
    if (november.checked) {
        dates.push(`${novemberbtn.title}-${november.value}-01`)
    }
    if (december.checked) {
        dates.push(`${decemberbtn.title}-${december.value}-01`)
    }

    if (dates.length > 0) {
        if (fio.value.length > 0 && phone.value.length > 0) {
            dates.forEach(elem => {
                var myHeaders = new Headers();
                myHeaders.append("Authorization", `Token ${token}`);
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                    "marker_id": activeMarker,
                    "rent_date": `${elem}`
                });

                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };
                fetch("http://127.0.0.1:8000/api/v1/rent", requestOptions)
                    .then(response => {
                        $("#popup-rent").fadeIn(400);
                        setTimeout(function() { $("#popup-rent").fadeOut(400); }, 2000);
                        getMarkerInfo(activeMarker)
                    })
                    .catch(error => console.log('error', error));
            })
        } else {
            $("#popup-error").fadeIn(400);
            setTimeout(function() {
                $("#popup-error").fadeOut(400);
            }, 2000);
        }
    } else {
        $("#popup-month").fadeIn(400);
        setTimeout(function() {
            $("#popup-month").fadeOut(400);
        }, 2000);
    }
}

function getMarkerInfo(id) {
    let switcher = document.getElementById('switcher')
    if (switcher.checked == false) {
        list.innerHTML = ''
        list.insertAdjacentHTML('afterbegin', createGalleryMarkup())
        calendarSet()

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`http://127.0.0.1:8000/api/v1/marker/${id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                addr.value = result.address
                type.value = result.type
                price.value = result.price

                result.rent.forEach(elem => {
                    rent_date = new Date(elem)
                    if (rent_date.getMonth() + 1 == 1) {
                        january.disabled = true
                        januarybtn.disabled = true
                    } else if (rent_date.getMonth() + 1 == 2) {
                        february.disabled = true
                        februarybtn.disabled = true
                    } else if (rent_date.getMonth() + 1 == 3) {
                        march.disabled = true
                        marchbtn.disabled = true
                    } else if (rent_date.getMonth() + 1 == 4) {
                        april.disabled = true
                        aprilbtn.disabled = true
                    } else if (rent_date.getMonth() + 1 == 5) {
                        may.disabled = true
                        maybtn.disabled = true
                    } else if (rent_date.getMonth() + 1 == 6) {
                        june.disabled = true
                        junebtn.disabled = true
                    } else if (rent_date.getMonth() + 1 == 7) {
                        july.disabled = true
                        julybtn.disabled = true
                    } else if (rent_date.getMonth() + 1 == 8) {
                        august.disabled = true
                        augustbtn.disabled = true
                    } else if (rent_date.getMonth() + 1 == 9) {
                        september.disabled = true
                        septemberbtn.disabled = true
                    } else if (rent_date.getMonth() + 1 == 10) {
                        october.disabled = true
                        octoberbtn.disabled = true
                    } else if (rent_date.getMonth() + 1 == 11) {
                        november.disabled = true
                        novemberbtn.disabled = true
                    } else if (rent_date.getMonth() + 1 == 12) {
                        december.disabled = true
                        decemberbtn.disabled = true
                    }
                })
                createrent.disabled = false
                var myHeaders = new Headers();
                myHeaders.append("Authorization", `Token ${token}`);

                var requestOptions = {
                    method: 'GET',
                    headers: myHeaders,
                    redirect: 'follow'
                };

                fetch(`http://127.0.0.1:8000/api/v1/profile/${result.owner}`, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        owner.value = result.fio
                        phonenum.value = result.phone_number
                    })
                    .catch(error => console.log('error', error));
            })
            .catch(error => console.log('error', error));

    }
}

function createGalleryMarkup() {
    return `<div class="info">
    <fieldset disabled>
        <label for="disabledTextInput" class="form-label">Адрес билборда</label>
        <input type="text" id="addr" class="form-control" value="">
        <label for="disabledTextInput" class="form-label">Владелец</label>
        <input type="text" id="owner" class="form-control" value="">
        <label for="disabledTextInput" class="form-label">Телефон владельца</label>
        <input type="text" id="phonenum" class="form-control" value="">
        <label for="disabledTextInput" class="form-label">Тип билборда</label>
        <input type="text" id="type" class="form-control" value="">
        <label for="disabledTextInput" class="form-label">Цена</label>
        <input type="text" id="price" class="form-control" value="">
    </fieldset>
</div>
<div class="wrapper-calendar">
<div class="calendar">
<button type="button" class="btn btn-secondary calendar-button" id="januarybtn" onclick="januarycheck()" title="">Январь</button>
<input type="checkbox" name="" class="month" id="january" value="01">
<button type="button" class="btn btn-secondary calendar-button" id="februarybtn" onclick="februarycheck()" title="">Февраль</button>
<input type="checkbox" name="" class="month" id="february" value="02">
<button type="button" class="btn btn-secondary calendar-button" id="marchbtn" onclick="marchcheck()" title="">Март</button>
<input type="checkbox" name="" class="month" id="march" value="03">
</div>
<div class="calendar">
<button type="button" class="btn btn-secondary calendar-button" id="aprilbtn" onclick="aprilcheck()" title="">Апрель</button>
<input type="checkbox" name="" class="month" id="april" value="04">
<button type="button" class="btn btn-secondary calendar-button" id="maybtn" onclick="maycheck()" title="">Май</button>
<input type="checkbox" name="" class="month" id="may" value="05">
<button type="button" class="btn btn-secondary calendar-button" id="junebtn" onclick="junecheck()" title="">Июнь</button>
<input type="checkbox" name="" class="month" id="june" value="06">
</div>
<div class="calendar">
<button type="button" class="btn btn-secondary calendar-button" id="julybtn" onclick="julycheck()" title="">Июль</button>
<input type="checkbox" name="" class="month" id="july" value="07">
<button type="button" class="btn btn-secondary calendar-button" id="augustbtn" onclick="augustcheck()" title="">Август</button>
<input type="checkbox" name="" class="month" id="august" value="08">
<button type="button" class="btn btn-secondary calendar-button" id="septemberbtn" onclick="septembercheck()" title="">Сентябрь</button>
<input type="checkbox" name="" class="month" id="september" value="09">
</div>
<div class="calendar">
<button type="button" class="btn btn-secondary calendar-button" id="octoberbtn" onclick="octobercheck()" title="">Октябрь</button>
<input type="checkbox" name="" class="month" id="october" value="10">
<button type="button" class="btn btn-secondary calendar-button" id="novemberbtn" onclick="novembercheck()" title="">Ноябрь</button>
<input type="checkbox" name="" class="month" id="november" value="11">
<button type="button" class="btn btn-secondary calendar-button" id="decemberbtn" onclick="decembercheck()" title="">Декабрь</button>
<input type="checkbox" name="" class="month" id="december" value="12">
</div>
</div>
<div class="form-check">
<button type="button" class="btn btn-success mt-3" onclick="createRent()" id="createrent" disabled>Подтвердить аренду</button>
</div>`
}

function creationMarker() {
    return `<div class="info">
    <form>
            <fieldset>
            <label for="disabled dTextInput" class="form-label">Адрес билборда</label>
            <input type="text" id="address" class="form-control creation" value="" disabled d>
            
            <select name="Тип реклами" id="type" class="form-select creation">
            <option selected value="0">Выберите тип рекламы</option>
            <option value="Билборд">Билборд</option>
            <option value="Ситилайт">Ситилайт</option>
            <option value="Бэклайт">Бэклайт</option>
            <option value="Скролл">Скролл</option>
            </select>
            <label for="price" class="form-label">Цена за месяц</label>
            <input type="text" id="price" class="form-control creation" placeholder="Введите стоимость в грн.">
            </fieldset>
            <div class="creation-btn-wrapper">
                <button type="button" class="btn btn-success mt-3 creation-btn" onclick="addNewMarker()">Подтвердить</button>
                <button type="reset" class="btn btn-secondary mt-3 creation-btn" onclick="cancelMarker()">Отменить</button>
            </div>
            </form>
        </div>`
}

function toSwitch() {
    let switcher = document.getElementById('switcher');
    if (switcher.checked) {
        // alert('Выбран');
        list.innerHTML = '';
        createMarker()
        list.insertAdjacentHTML('afterbegin', creationMarker())
    } else {
        // alert('Не выбран');
        cancelMarker()
        list.innerHTML = '';
        list.insertAdjacentHTML('afterbegin', createGalleryMarkup())
    }
}

// Calendar functions
function januarycheck() {
    if (january.checked) {
        january.checked = false
        $('#januarybtn').removeClass('btn-outline-success')
        $('#januarybtn').addClass('btn-secondary')
    } else {
        january.checked = true
        $('#januarybtn').removeClass('btn-secondary')
        $('#januarybtn').addClass('btn-outline-success')
    }
}

function februarycheck() {
    if (february.checked) {
        february.checked = false
        $('#februarybtn').removeClass('btn-outline-success')
        $('#februarybtn').addClass('btn-secondary')
    } else {
        february.checked = true
        $('#februarybtn').removeClass('btn-secondary')
        $('#februarybtn').addClass('btn-outline-success')
    }
}

function marchcheck() {
    if (march.checked) {
        march.checked = false
        $('#marchbtn').removeClass('btn-outline-success')
        $('#marchbtn').addClass('btn-secondary')
    } else {
        march.checked = true
        $('#marchbtn').removeClass('btn-secondary')
        $('#marchbtn').addClass('btn-outline-success')
    }
}

function aprilcheck() {
    if (april.checked) {
        april.checked = false
        $('#aprilbtn').removeClass('btn-outline-success')
        $('#aprilbtn').addClass('btn-secondary')
    } else {
        april.checked = true
        $('#aprilbtn').removeClass('btn-secondary')
        $('#aprilbtn').addClass('btn-outline-success')
    }
}

function maycheck() {
    if (may.checked) {
        may.checked = false
        $('#maybtn').removeClass('btn-outline-success')
        $('#maybtn').addClass('btn-secondary')
    } else {
        may.checked = true
        $('#maybtn').removeClass('btn-secondary')
        $('#maybtn').addClass('btn-outline-success')
    }
}

function junecheck() {
    if (june.checked) {
        june.checked = false
        $('#junebtn').removeClass('btn-outline-success')
        $('#junebtn').addClass('btn-secondary')
    } else {
        june.checked = true
        $('#junebtn').removeClass('btn-secondary')
        $('#junebtn').addClass('btn-outline-success')
    }
}

function julycheck() {
    if (july.checked) {
        july.checked = false
        $('#julybtn').removeClass('btn-outline-success')
        $('#julybtn').addClass('btn-secondary')
    } else {
        july.checked = true
        $('#julybtn').removeClass('btn-secondary')
        $('#julybtn').addClass('btn-outline-success')
    }
}

function augustcheck() {
    if (august.checked) {
        august.checked = false
        $('#augustbtn').removeClass('btn-outline-success')
        $('#augustbtn').addClass('btn-secondary')
    } else {
        august.checked = true
        $('#augustbtn').removeClass('btn-secondary')
        $('#augustbtn').addClass('btn-outline-success')
    }
}

function septembercheck() {
    if (september.checked) {
        september.checked = false
        $('#septemberbtn').removeClass('btn-outline-success')
        $('#septemberbtn').addClass('btn-secondary')
    } else {
        september.checked = true
        $('#septemberbtn').removeClass('btn-secondary')
        $('#septemberbtn').addClass('btn-outline-success')
    }
}

function octobercheck() {
    if (october.checked) {
        october.checked = false
        $('#octoberbtn').removeClass('btn-outline-success')
        $('#octoberbtn').addClass('btn-secondary')
    } else {
        october.checked = true
        $('#octoberbtn').removeClass('btn-secondary')
        $('#octoberbtn').addClass('btn-outline-success')
    }
}

function novembercheck() {
    if (november.checked) {
        november.checked = false
        $('#novemberbtn').removeClass('btn-outline-success')
        $('#novemberbtn').addClass('btn-secondary')
    } else {
        november.checked = true
        $('#novemberbtn').removeClass('btn-secondary')
        $('#novemberbtn').addClass('btn-outline-success')
    }
}

function decembercheck() {
    if (december.checked) {
        december.checked = false
        $('#decemberbtn').removeClass('btn-outline-success')
        $('#decemberbtn').addClass('btn-secondary')
    } else {
        december.checked = true
        $('#decemberbtn').removeClass('btn-secondary')
        $('#decemberbtn').addClass('btn-outline-success')
    }
}

// End calendar functions

$('.profile').click(function() {
    $('.popup-bg-profile').fadeIn(400);
    $('html').addClass('no-scroll');
});

$('.close-popup-singin').click(function() {
    $('.popup-bg-profile').fadeOut(400);
    $('html').removeClass('no-scroll');
});