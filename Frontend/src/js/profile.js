const BASE_URL = "http://localhost:3000";

let token = localStorage.getItem('token');
window.onload = async()=>{

    let response = await fetch(`${BASE_URL}/api/post/myposts`,{

        method : 'POST',
        headers : {
            "Content-Type" : 'application/json',
            "Authorization" : `Bearer ${token}`
        }

    });

    const data = await response.json();

    render(data.posts);

}

function render(posts){

    let root = document.getElementById("userposts");
    root.innerHTML = "";

    posts.forEach((element) => {
        const elemId = element._id;
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
      <button onclick="deletePost('${elemId}')">delete</button>
    </div>`
    });

}

// delete post feature 
async function deletePost(elem){

    if(!confirm(("do you really want to delete this post ?"))){
        return;
    }
    
    try{
        let response = await fetch(`${BASE_URL}/api/post/delete/${elem}`,{
            method : 'DELETE',
            headers : {
                "Content-Type" : 'application/json',
                "Authorization" : `Bearer ${token}`
            }
        });

        const data = await response.json();
        if(data.success){
            window.location.reload();  // page refresh on delete
        } else {
            alert(data.message);
        }
    }
    catch(err){
        console.log(err);
    }
}

function handleLogout(){

    if(!confirm("Do You really want to logout ?")){
        return;
    }
    
    document.querySelector("body").textContent = "Logout Successfull redirecting to login page";

    // clear the local storage so the userdata is cleared and is required to login again
    setTimeout(()=>{
        localStorage.clear();
        window.location.href = "login.html"
    },3000);
}

document.getElementById("greet-msg").innerText = `Hello ! ${localStorage.getItem('name')} your bio : ${localStorage.getItem('bio')}`