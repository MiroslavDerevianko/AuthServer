let curruser = null;

const apiurl = 'http://localhost:3000';

const renderProfile = (data) => {
    console.log(data);
    const profile = document.getElementById('profile');
    if (data.user) {
        profile.innerHTML = `Welcome ${data.user.Email}`;
    } else if (data.message) {
        profile.innerHTML = `Warn ${data.message}`;
    }
}

const login = (em, pass) => {
    const email = (em) ? em : document.getElementById('login_email').value;
    const password = (pass) ? pass : document.getElementById('login_password').value;
    fetch(`${apiurl}/api/v1/auth/login`, {
        method: 'POST',
        credentials: 'same-origin',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            email,
            password,
        })
    })
        .then(res => {
            console.log(res.headers);
            return res.json();
        })
        .then(data => {
            renderProfile(data);
        })
        .catch(console.log);
}

const logout = () => {
    fetch(`${apiurl}/api/v1/auth/logout`, {
        method: 'GET',
        credentials: 'same-origin',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
    })
        .then(res => res.json())
        .then(data => {
            renderProfile(data);
        })
        .catch(console.log);
}

const register = () => {
    const name = document.getElementById('register_name').value;
    const email = document.getElementById('register_email').value;
    const password = document.getElementById('register_password').value;
    const passconf = document.getElementById('register_passconf').value;

    fetch(`${apiurl}/api/v1/auth/register`, {
        method: 'POST',
        credentials: 'same-origin',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            name,
            email,
            password,
            passconf,
        })
    })
        .then(res => res.json())
        .then(data => {
            return login(email, password);
        })
        .catch(console.log);
}

const getuser = () => {
    fetch(`${apiurl}/api/v1/auth/getuser`, {
        method: 'GET',
        credentials: 'same-origin',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
    })
        .then(res => res.json())
        .then(data => {
            renderProfile(data);
        })
        .catch(console.log);
}

const changeAside = () => {
    const aside = document.getElementById('aside');
    if (!aside.classList.contains('aside-close')) {
        aside.classList.add('aside-close');
    } else {
        aside.classList.remove('aside-close');
    }
}

getuser();

console.log("Ok");