// Some updates - I needed to change display: none to display: flex in index.css file

document.addEventListener("DOMContentLoaded", () => {

// Code provided: 

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

//
      
// Fetch Andy's Toys & Add Toy Info to the Card

      function renderEachToy(toy){
        console.log()

        const toysCollection = document.getElementById('toy-collection')
      
        const toyDiv = document.createElement('div')
        toyDiv.className = "card"
        toyDiv.id = toy.id
        toyDiv.innerHTML = `
                              <h2>Name: ${toy.name}</h2>
                              <img src="${toy.image}" class="toy-avatar" />
                              <p><span class="numOfLikes">${toy.likes}</span> Likes</p>
                              <button class="like-btn">Like <3</button>
        `
        toysCollection.append(toyDiv)
    }

    function renderAllToys(toys){
        toys.forEach(toy => renderEachToy(toy))
    }

    function fetchAllToysData(url){
        fetch(url)
        .then(resp => resp.json())
        .then(allToysDataObject => renderAllToys(allToysDataObject))
        // .then(x => renderAllToys(x))
    }
    fetchAllToysData("http://localhost:3000/toys")

// Add a New Toy 

  // Step 6. 

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

  // Step 2. 

    toyForm.addEventListener("submit", function(e){
    
  // Step 3. 
      e.preventDefault()

  // Step 4. 

      const newToy = {
        name: e.target.name.value,
        image: e.target.image.value,
        likes: 0 
      }

  // Step 6. 

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

    document.addEventListener("click", function(e){
      
      if (e.target.className === "like-btn")
        
        e.preventDefault()

        // how to target parentNode of 'like-btn' ?? 

        toyDiv = e.target.parentNode
        // ^ move up the collection where 'like-btn' is located
        toyId = toyDiv.id 
        likesHtml = toyDiv.querySelector('p')
        // ^ then down that collection

        const currentNumOfLikes = parseInt(likesHtml.innerText.split(" ")[0])
        const newNumOfLikes = currentNumOfLikes + 1
        likesHtml.innerText = `${newNumOfLikes} Likes`
        updateToyLikes(`http://localhost:3000/toys/${toyId}`, `${newNumOfLikes}`)
    })

}) 

///