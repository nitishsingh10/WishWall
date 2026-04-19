const btn = document.getElementById("post-btn");
const feed = document.getElementById("feed-container");

btn.addEventListener('click',()=>{

    const userName = document.getElementById("name-input")
                    .value
                    .trim();

    const message = document.getElementById("message-input")
                    .value
                    .trim();

    const postObj = {name:`${userName}`, text : `${message}`};
    

    const post = document.createElement("div");

    post.classList.add("post");

    post.innerHTML = `<h4>${postObj.name}</h4>
                    <p>${postObj.text}</p>`;

    feed.prepend(post);

    clear();

})


function clear(){

    document.getElementById("name-input")
    .value = "";
    document.getElementById("message-input")
    .value = "";

}