let curruser = null;

const apiurl = 'http://localhost:3000';

let file = null;
let file_url = null;

let user_photo = null;
let user_photo_url = null;

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

const chooseUserPhoto = () => {
    file = document.getElementById('upload_user_photo').files.item(0);
    console.log(document.getElementById('upload_user_photo').files);
    console.log(file);
    if (file) {
        document.getElementById('upload_user_photo_name').value = file.name;
        const reader = new FileReader();
        reader.onloadend = () => {
            user_photo_url = reader.result;
            document.getElementById('upload_user_photo_img').src = user_photo_url;
        };
        reader.readAsDataURL(file);
    }
}

const uploadUserPhoto = () => {
    if (user_photo) {
        console.log("Upload");
        const form = new FormData();
        form.append("photo", file, file.name);
        fetch(`${apiurl}/api/v1/files/upload/userphoto`, {
            method: 'POST',
            credentials: 'same-origin',
            body: form
        })
        .then(res => res.json())
        .then(console.log)
        .catch(console.log)
    }
}


const chooseUpdateUserPhoto = () => {
    file = document.getElementById('update_user_photo').files.item(0);
    console.log(document.getElementById('update_user_photo').files);
    console.log(file);
    if (file) {
        document.getElementById('update_user_photo_name').value = file.name;
        const reader = new FileReader();
        reader.onloadend = () => {
            user_photo_url = reader.result;
            document.getElementById('update_user_photo_img').src = user_photo_url;
        };
        reader.readAsDataURL(file);
    }
}

const updateUserPhoto = () => {
    if (user_photo) {
        console.log("Update");
        const form = new FormData();
        form.append("photo", file, file.name);
        fetch(`${apiurl}/api/v1/files/upload/userphoto`, {
            method: 'POST',
            credentials: 'same-origin',
            body: form
        })
        .then(res => res.json())
        .then(console.log)
        .catch(console.log)
    }
}


const chooseFile = () => {
    file = document.getElementById('upload_file').files.item(0);
    if (file) {
        document.getElementById('upload_name').value = file.name;
        console.log(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            file_url = reader.result;
            document.getElementById('upload_photo').src = file_url;
        };
        reader.readAsDataURL(file);
    }
}

const uploadFile = () => {
    if (file) {
        console.log("Upload");
        const form = new FormData();
        form.append("photo", file, file.name);
        console.log(form);
        fetch(`${apiurl}/api/v1/files/upload`, {
            method: 'POST',
            credentials: 'same-origin',
            body: form
        })
        .then(res => res.json())
        .then(console.log)
        .catch(console.log)
    } else {
        console.log("No file choose");
    }
}

getuser();

console.log("Ok");