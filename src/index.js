// 7/4 - Revisit this.. looks like the root of the error is in catching all toys data object.

document.addEventListener("DOMContentLoaded", () => {
      
// Fetch Andy's Toys

      function renderEachToy(toy){
        console.log()

        const toysCollection = document.getElementById('toys-collection')
      
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

  }) 

    // 

    // let addToy = false;

    // document.addEventListener("DOMContentLoaded", () => {
    //   const addBtn = document.querySelector("#new-toy-btn");
    //   const toyFormContainer = document.querySelector(".container");
    //   addBtn.addEventListener("click", () => {
    //     // hide & seek with the form
    //     addToy = !addToy;
    //     if (addToy) {
    //       toyFormContainer.style.display = "block";
    //     } else {
    //       toyFormContainer.style.display = "none";
    //     }
    //   });
    // });