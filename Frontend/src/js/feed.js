const BASE_URL = 'http://localhost:3000'
let posts =[];

// onload token verify krna hai.. if token exists allow karo to stay otherwise login pe bhaga do
window.onload = async()=>{

    try{
        // jo local storage me token save tha use check kro 
        let verifiedUser = localStorage.getItem("token");

        if(!verifiedUser){ // check for the token

            // token agar nhi milta to user ko login page pe bhejne ke liye
            document.querySelector("body").textContent = "NO USER FOUND REDIRECTING TO LOGIN PAGE"

            // delay taki user ko problem dikhe
            setTimeout(()=>{
                window.location.href = "login.html"
            },5000);
        }
        else{
            // aur agar token miljata hai to greeting message and feed ko load krdo
            document.getElementById("main-container").textContent = `Hello ${localStorage.getItem('name')}`;
            loadFeed(verifiedUser); // collect the feed datat and token bhi pass karo so that data backend se aye
        }

    }
    catch(err){
        console.log(err);
    }

}

// feed data ko collect krna
async function loadFeed(token){

    const response = await fetch(`${BASE_URL}/api/post/feed`,{
        method : 'GET',
        headers : {
            "Content-type" : 'application/json', 
            "Authorization": `Bearer ${token}` // token pass taki verify kr paye if the request is good
        }
    });

    const data = await response.json(); 

    if(data.success) {
        // latest post must come first..
        posts = [...data.posts.reverse(), ...posts]; // collect the data
        displayFeed(); // pass the data to render the feed
    }
    
}

function displayFeed(){
    let root = document.getElementById("main-container");
    root.innerHTML = "";

    posts.forEach(element => {
        // sample card for temporary presentation
        root.innerHTML+=` <div class="card">
      <p class="card-title">${element.author}</p> 
      <p class="small-desc">
        ${element.message}
      </p>
      <p class="time-desc">${new Date(element.time)}</p>
      <div class="go-corner">
        <button class="go-arrow arrow-btn">→</button>
      </div>
    </div>`
    });

}

// Creation of new post directly from feed

async function createPost(){
    
    let token = localStorage.getItem('token');
    let postInput = document.getElementById('post-input').value; // message taken from the user
    console.log(postInput);
    
    const response = await fetch(`${BASE_URL}/api/post/newpost`,{
        
        method : 'POST',
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${token}`,
        },
        body : JSON.stringify({ // JSON.stringify : convert to json object
            message : postInput
        })

    }) ;

    const data = await response.json();

    // push the data to main array to print the data
    if(data.success){
        document.getElementById('post-input').value = "";
        posts = [data.post, ...posts];
        displayFeed();
    }
    else{
        alert(data.message);
    }

}

// logout feature
function handleLogout(){

    if(!confirm("Do You really want to logout ?")){ // This shall be replaced with a toast message or in-page popup
        return;
    }
    
    document.querySelector("body").textContent = "Logout Successfull redirecting to login page";

    // clear the local storage so the userdata is cleared and is required to login again
    setTimeout(()=>{
        localStorage.clear();
        window.location.href = "login.html"
    },3000);
}