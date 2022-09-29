
const loginForm = document.getElementById('loginform')
const movieForm = document.getElementById('getmovies')
const logoutForm = document.getElementById('logout')
loginForm.addEventListener('submit', login);
movieForm.addEventListener('submit', getMovies);
logoutForm.addEventListener('submit', logout);


function getMovies(event) {       
    result = getData('http://127.0.0.1:8000/api/movies-with-ratings')
    .then((data) => {
        console.log(data)
    })
    .catch(function(error) {
        console.log('Request failed', error)
    });
    event.preventDefault();
}

function logout(event) {
    console.log("in logout")
    result = postData('http://127.0.0.1:8000/api/logout', {})
    .then((data) => {
        console.log(data)
        sessionStorage.setItem("token", "no-token")
        console.log(sessionStorage.getItem("token"))
        console.log(data)
    })
    .catch(function(error) {
        console.log('Request failed', error)
        console.log(sessionStorage.getItem("token"))
    });
    event.preventDefault();
}

function login(event) {
    form = document.getElementById('loginform')
    console.log(form.email.value)
    console.log(form.password.value)
    postData('http://localhost:8000/api/login', 
    {
        'email': form.email.value,
        'password': form.password.value
    })
    .then((data) => {
        console.log('Token from server: ' + data.token)
        sessionStorage.setItem("token", data.token)
        console.log('token from storage: ' + sessionStorage.getItem("token"))
        result = getData('http://127.0.0.1:8000/api/movies-with-ratings', data.token)
        .then((data) => {
            console.log(data)
        })
        .catch(function(error) {
            console.log('Request failed', error)
        });
    })
    .catch(function(error) {
        sessionStorage.setItem("token", "no-token")
        console.log('Request failed', error)
    });
    event.preventDefault();
}

async function getData(url='') {
    const response = await fetch(url,{
        method: 'GET',
        mode: 'cors',
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            //'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
        },
    })
    return response.json();
}

async function postData(url = '', data = {}, method) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
        'Content-Type': 'application/json',
        //'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header       
    });
    return response.json(); // parses JSON response into native JavaScript objects
}