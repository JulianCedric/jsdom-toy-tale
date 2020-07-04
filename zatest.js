function renderToyForm(){

    const toyForm = querySelector('.add-toy-form')



}

// 

function renderToyForm(){

    const toyForm = document.querySelector('.add-toy-form')

    toyForm.innerHTML = `
                          <h3>Create a toy!</h3>

    <input
      type="text"
      name="name"
      value=""
      placeholder="Enter a toy's name..."
      class="input-text"
    />

    <br />
    
    <input
      type="text"
      name="image"
      value=""
      placeholder="Enter a toy's image URL..."
      class="input-text"
    />
    
    <br />

    <input
      type="submit"
      name="submit"
      value="Create New Toy"
      class="submit"
    />`
 
  }