const BASE_URL = 'http://localhost:3000'



async function handleLogin(){

    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    const response = await fetch(`${BASE_URL}/api/auth/login`,{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            email,
            password
        })
    });

    const data = await response.json();

    if(data.success){
        localStorage.setItem('token',data.token);
        localStorage.setItem('name',data.userData.name);
        window.location.href = "feed.html";
    }
    else{
        alert(data.message);
    }
}

async function handleSignup(){

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    const response = await fetch(`${BASE_URL}/api/auth/signup`,{
        
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            name,
            email,
            password
        })

    });

    const data = await response.json();
    console.log(data);

    if(data.success){
        localStorage.setItem('token',data.token);
        localStorage.setItem('name',data.user.name);
        window.location.href = "feed.html";
    }
    else{
        console.log(data.message);
    }
}