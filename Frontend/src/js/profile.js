BASE_URL = "http://localhost:3000"

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

        let elemId = element._id;
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
      <button onclick="deletePost(${elemId})">delete</button>
    </div>`
    });

}

// some error passing the element : maybe it is becuase of asynchronoues part;
function deletePost(elem){
    
    console.log(elem);

}