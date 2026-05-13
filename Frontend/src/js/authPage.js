const BASE_URL = 'wishwall-production.up.railway.app' // base url, PORT should come from .env but abi test ke liye thik hai

// login feature
async function handleLogin(){

    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    const response = await fetch(`${BASE_URL}/api/auth/login`,{
        method : 'POST',  // to specify the method of how data has to handled 
        headers : {
            'Content-Type' : 'application/json' // to specify that data will be in json format
        },
        body : JSON.stringify({
            email,
            password
        })
    });

    // after login user data ko collect krna hai
    const data = await response.json();

    // data se jo token araha hai use apan localStorage yani browser memory me save karle rahe hai taki badme directly verify karske
    if(data.success){
        localStorage.setItem('token',data.token);
        localStorage.setItem('name',data.user.name);
        localStorage.setItem('bio',data.user.bio);
        window.location.href = "feed.html";
    }
    else{
        document.getElementById("pass-msg").textContent = data.message;
    }
}

// signup feature
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

    // signup hote hi feed page pe bhejna hai

    const data = await response.json();

    // user create hote hi uska data aur token lena hai and local storage me save krdena hai.. taki badme direct verify hojaye

    if(data.success){
        localStorage.setItem('token',data.token);
        localStorage.setItem('name',data.user.name);
        localStorage.setItem('bio',data.user.bio);
        window.location.href = "feed.html";
    }
    else{
        console.log(data.message);
    }
}