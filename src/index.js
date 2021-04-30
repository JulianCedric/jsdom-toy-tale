document.addEventListener("DOMContentLoaded", () => {

// Next: Conditionally render login form, and add a personalized greeting.

  const loginMenu = document.querySelector('div.menu');
  loginMenu.style.backgroundColor= '#515DA2';
  loginMenu.style.textAlign = 'right';
  const loginButton = document.createElement('button')
  loginButton.innerHTML = "Login"
  loginMenu.appendChild(loginButton);

  // const greetingContainer = document.querySelector('div.greetingContainer')
  // console.log(greetingContainer)
  // greetingContainer.style.backgroundColor= '#515DA2';
  // const greetingP = document.createElement('p')
  // console.log(greetingP)
  // greetingP.innerHTML = `Welcome back!`
  // greetingContainer.appendChild(greetingP)

  loginButton.addEventListener("click", function(e) {
    console.log("'Login' Button Clicked")

    const loginFormContainer = document.getElementById("loginContainer")

    loginFormContainer.innerHTML = `
      <form class="login-form">
      <h1>Login</h1>
      <input
        type="text"
        name="name"
        value=""
        placeholder="Your First Name..."
        class="input-text"
      />
      <br />
      <input
        type="submit"
        name="submit"
        value="Submit"
        class="submit"
      />
    </form>
    `
    const loginDiv = loginFormContainer.innerHTML

    loginFormContainer.appendChild(loginDiv)

  });

  let addToy = false;

  document.addEventListener("DOMContentLoaded", () => {

    const addBtn = document.querySelector("#new-toy-btn");
    
    const toyFormContainer = document.querySelector(".container");
    
    addBtn.addEventListener("click", () => {
      // hide & seek with the form
    
      addToy = !addToy;
    
      if (addToy) {
        toyFormContainer.style.display = "block";
      } 
      else {
        toyFormContainer.style.display = "none";
      }

    }); 

  });
      
// Fetch Andy's Toys & Add Toy Info to the Card:

    //   function renderEachToy(toy) {

    //     const toysCollection = document.getElementById('toy-collection')
      
    //     const toyDiv = document.createElement('div')
    //     console.log("toyDiv: ", toyDiv)
    //     toyDiv.className = "card"
    //     console.log(toy.id)
    //     toyDiv.id = toy.id
    //     toyDiv.innerHTML = `
    //                           <h2>Name: ${toy.name}</h2>
    //                           <img src="${toy.image}" class="toy-avatar" />
    //                           <p><span class="numOfLikes">${toy.likes}</span> Likes</p>
    //                           <button class="like-btn">Like</button>
    //                           <br/>
    //                           <button class="delete-btn">Delete</button>
    //                           <br/>
    //     `
    //     toysCollection.append(toyDiv)
    // };

    renderEachToy = toy => {
      const toysCollection = document.getElementById('toy-collection')
      const toyDiv = document.createElement('div')
      toyDiv.className='card'
      toyDiv.id = toy.id
      toyDiv.innerHTML = `
        <h2>Name: ${toy.name}</h2>
        <img src="${toy.image}" class="toy-avatar" />
        <p><span class="numOfLikes">${toy.likes}</span> Likes</p>
        <button class="like-btn">Like</button>
        <br/>
        <button class="delete-btn">Delete</button>
        <br/> 
      `
      toysCollection.appendChild(toyDiv)
    };

    // function renderAllToys(toys){
    //     toys.forEach(toy => renderEachToy(toy))
    // };

    renderAllToys = toys => {
      toys.forEach(toy => renderEachToy(toy));
    };

    // function fetchAllToysData(url) {
      // fetch(url)
      // .then(resp => resp.json())
      // .then(allToysDataObject => renderAllToys(allToysDataObject))
    // };
    // function fetchAllToysData(url) {
    //   fetch(url)
    //   .then(function(response) {
    //     return response.json();
    //   })
    //   .then(function(allToysDataObject) {
    //     renderAllToys(allToysDataObject);
    //   })
    // };
    // function fetchAllToysData(url) {
    //   fetch(url)
    //   .then(function (response) {
    //     return response.json();
    //   })
    //   .then(function (allToysDataObject) {
    //     renderAllToys(allToysDataObject);
    //   })
    // };
    fetchAllToysData = url => {
      fetch(url)
      .then(r => r.json())
      .then(allToysDataObject => renderAllToys(allToysDataObject))
    };
    fetchAllToysData("http://localhost:3000/toys")

// Add a New Toy 

  // Step 5. Here, we define our new postNewToy function, which 

    function postNewToy(url, newToyObject){
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "name": `${newToyObject.name}`,
          "image": `${newToyObject.image}`, 
          "likes": `${newToyObject.likes}`
        })
      })
      .then(resp => resp.json())
      .then(newToyDataObject => renderEachMonster(newToyDataObjecct))
    }

  // Step 1. In this first step, we identify the node that will be doing the event 'listening', and then we store that node in the toyForm variable / constant.
    
    const toyForm = document.querySelector('.add-toy-form')

  // Step 2. Next, we add an event listener to our new toyForm variable, specifying the name of the event it will be listening for and writing out the work (callback function) that follows immediately after.

    toyForm.addEventListener("submit", function(e){
    
  // Step 3. We add this to ensure the page does not automatically reload when the event is triggered.

      e.preventDefault()

  // Step 4. Here is where we define the key/value pairs of our new newToy object to be added.

      const newToy = {
        name: e.target.name.value,
        image: e.target.image.value,
        likes: 0 
      }

  // Step 6. Finally, we invoke our new postNewToy function from Step 5 (above) and reset the toy form. 

      postNewToy("http://localhost:3000/toys", newToy)
      toyForm.reset()
      
    })

// Increase a Toy's Likes

    function updateToyLikes(url, newNum){
      fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "likes": newNum
        })
      })
    }

    document.addEventListener("click", function(e) {
      
      if (e.target.className === "like-btn")
        
        e.preventDefault()

        toyDiv = e.target.parentNode
        // ^ move up the collection where 'like-btn' is located
        toyId = toyDiv.id 
        likesHtml = toyDiv.querySelector('p')
        // ^ then down that collection

        const currentNumOfLikes = parseInt(likesHtml.innerText.split(" ")[0])
        const newNumOfLikes = currentNumOfLikes + 1
        likesHtml.innerText = `${newNumOfLikes} Likes`
        updateToyLikes(`http://localhost:3000/toys/${toyId}`, `${newNumOfLikes}`)
    });

    // const deleteButton = document.getElementsByClassName("delete-btn")

    // deleteButton.addEventListener("click", function(e) {      
    //   alert("delete button clicked");
    // });

});