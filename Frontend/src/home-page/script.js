const btn = document.getElementById("message-btn");
const feed = document.getElementById("message-displaying");
const posts = [];

// User post logic 

btn.addEventListener('click',()=>{

    // Inputs of user 

    const userName = document.getElementById("Username")
                    .value
                    .trim();

    const message = document.getElementById("msg")
                    .value
                    .trim();


    // Storing user data in object array for future use.

    const postObj = {name:`${userName}`, text : `${message}`};
    
    posts.push(postObj);

    const post = document.createElement("div");

    //class list for styling

    post.classList.add("user-post");

    // appending the message

    post.innerHTML = `<h4>${postObj.name}</h4>
                    <p>${postObj.text}</p>`;

    feed.prepend(post);


    // clear exisiting inputs
    clear();

})


function clear(){

    document.getElementById("Username")
    .value = "";
    document.getElementById("msg")
    .value = "";

}