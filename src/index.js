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
                              <p>${toy.likes} Likes</p>
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
      fetch(url), {
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
      }
      .then(resp => resp.json())
      .then(newToyDataObject => renderEachMonster(newToyDataObjecct))
    }

  // Step 1. 
    
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

})