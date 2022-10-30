let map; //variable for google map 
let markers = [] //variable for markers
let newmarker = [] // new data about marker
let usermarker = [] // new user marker

// GET markers from back 
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

function addMarker(locations) {
    const marker = new google.maps.Marker({
        position: { lat: parseFloat(locations.lat), lng: parseFloat(locations.lng) },
        map: map,
    })
    markers.push(marker)
}

// Sing in request 
document.forms['form-login'].elements['singin'].addEventListener('click', function() {

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "password": document.forms['form-login'].elements['login'].value,
        "username": document.forms['form-login'].elements['password'].value
    });

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://127.0.0.1:8000/auth/token/login", requestOptions)
        .then((response) => {
            if (response.status == 200) {
                return response.json()
            } else {
                throw new Error(response.status)
            }
        })
        .then(result => {
            window.location.href = `http://127.0.0.1:8000/main/?token=${result.auth_token}`
        })
        .catch((error) => {
            console.log('error', error)
        });
})

document.forms['form-singup'].elements['singup'].addEventListener('click', function() {
    if (document.forms['form-singup'].elements['password'].value == document.forms['form-singup'].elements['confirm'].value) {

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
            "username": document.forms['form-singup'].elements['login'].value,
            "password": document.forms['form-singup'].elements['password'].value
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        createdsuccess('result.username')
        fetch("http://127.0.0.1:8000/auth/users/", requestOptions)
            .then((response) => {
                if (response.status == 201) {
                    return response.json()
                } else {
                    throw new Error(response.status)
                }
            })
            .then(result => createdsuccess(result.username))
            .catch(error => console.log('error', error));
    } else {
        console.log('passwords are not the same')
    }
});


function createdsuccess() {
    $('.popup-bg-success').fadeIn(400);
    $('html').addClass('no-scroll');
}

$('.success-button').click(function() {
    $('.popup-bg-success').fadeOut(400);
    $('.popup-bg-singup').fadeOut(400);
    $('html').removeClass('no-scroll');
});



// Popup for sing in
$('.open-popup-singin').click(function() {
    $('.popup-bg-singin').fadeIn(400);
    $('html').addClass('no-scroll');
});

$('.close-popup-singin').click(function() {
    $('.popup-bg-singin').fadeOut(400);
    $('html').removeClass('no-scroll');
});



// Popup for sing up
$('.open-popup-singup').click(function() {
    $('.popup-bg-singup').fadeIn(400);
    $('html').addClass('no-scroll');
});

$('.close-popup-singup').click(function() {
    $('.popup-bg-singup').fadeOut(400);
    $('html').removeClass('no-scroll');
});