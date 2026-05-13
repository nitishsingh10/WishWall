const BASE_URL = 'https://wishwall-production.up.railway.app';

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

    let posts = data.posts;

    posts = [...posts];

    render(posts);
    document.getElementById("greet-msg").innerText = `Hello ! ${localStorage.getItem('name')} your bio : ${localStorage.getItem('bio')}`;
}

function render(posts){

    let root = document.getElementById("userposts");
    root.innerHTML = "";

    posts.forEach((element) => {
        const elemId = element._id;
        if(element.image){ // if image is found display that else, normal message

            let content = `<img src="${element.image}" alt="post image" style="width:50%; border-radius:8px;">
               <p class="small-desc">${element.caption}</p>`;
        }
        else{
            let content = `<p class="small-desc">${element.message}</p>`;

        }
        root.innerHTML+=` <div class="card">
      <p class="card-title">${element.author}</p> 
      ${content}
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

// posting images feature 

async function uploadImage() {
    const file = document.getElementById('image-input').files[0];
    const caption = document.getElementById('caption-input').value;

 // if no file is selected it should return :::: Alert should be replaced with suitable toast messages
    if (!file) return alert("Please select an image");

    const formData = new FormData();  // formData bundles everything 
    formData.append('image', file);
    formData.append('caption', caption);

    const response = await fetch(`${BASE_URL}/api/post/upload`, {
        method : 'POST',
        headers : {
            "Authorization" : `Bearer ${token}`
        },
        body : formData
    });

    const data = await response.json();
    if (data.success) {
        document.getElementById('image-input').value = "";
        document.getElementById('caption-input').value = "";
        window.location.reload();
    } else {
        alert(data.message);
    }
}

function handleLogout(){

    if(!confirm("Do You really want to logout ?")){ // This too shall be replaced with popup messages
        return;
    }
    
    document.querySelector("body").textContent = "Logout Successfull redirecting to login page";

    // clear the local storage so the userdata is cleared and is required to login again
    setTimeout(()=>{
        localStorage.clear();
        window.location.href = "/login"
    },3000);
}
