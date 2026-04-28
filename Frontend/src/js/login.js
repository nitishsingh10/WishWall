
function signupPage(){
    let page = document.getElementById("credentials");

    page.innerHTML=`<div class="card login-card">
                <h2>Create Your Account</h2>
                <p style="color: var(--text-light); font-size: 1.1rem;">Enter your credentials to create your account</p>

                <div class="inputs">
                    <label for="name">Enter your full Name</label><br>
                    <input type="name" id="name" placeholder="Your Full Name">
                </div>

                <div class="inputs">
                    <label for="email">Enter your email Address</label><br>
                    <input type="email" id="email" placeholder="Your email">
                </div>

                <div class="inputs">
                    <label for="password">Enter your password</label><br>
                    <input type="password" id="password" placeholder="Your Password">
                    <input type="password" id="cnfpassword" placeholder="confirm Password">
                </div>

                <p>Already have an account ? <a onclick="loginPage()" class="create">Login now</a></p>

                <button id="login-btn"><i class="bi bi-check"></i>Sign up</button>
            </div>`;
}

function loginPage() {
    
    let page = document.getElementById("credentials");
    
    page.innerHTML = `<div class="card login-card">
                <h2>Login to Your Account</h2>
                <p style="color: var(--text-light); font-size: 1.1rem;">Enter your credentials to access your account</p>

                <div class="inputs">
                    <label for="email">Enter your email Address</label><br>
                    <input type="email" id="email" placeholder="Your email">
                </div>

                <div class="inputs">
                    <label for="password">Enter your password</label><br>
                    <input type="password" id="password" placeholder="Your Password">
                </div>

                <p>Dont have an account ? <a onclick="signupPage()" class="create">Create now</a></p>

                <button id="login-btn"><i class="bi bi-check"></i>Login</button>
            </div>`

}