const login = document.getElementById("login-btn");
const API_URL = "http://localhost:3000/api/auth";

login.addEventListener('click',async ()=>{

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if(!email || !password){
        alert("enter the fields");
    }
    try {
        const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
        });
        const data = await response.json();

        console.log(data);

    } catch (err) {
        console.error(err);
    }
})
