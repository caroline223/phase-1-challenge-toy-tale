let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form

    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

document.body.addEventListener('DOMContentLoaded', fetchToys());

//gather all of the toys
function fetchToys(){
  fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(json => makeCard(json))
}

//PART ONE

function makeCard(json){
  const collection = document.querySelector('#toy-collection')

  for(const toy of json) {
    let newDiv = document.createElement('div')
    newDiv.className = 'card' //the "class card was created within the toy-collection div"
    newName(toy, newDiv)
    newPhoto(toy, newDiv)
    totalLikes(toy, newDiv)
    addButton(toy, newDiv)
    collection.appendChild(newDiv)
  }
}

function newName(toy, card){
  //creating h2 tag with the toy's name
  let name = document.createElement('h2')
  name.innerText = toy.name
  card.appendChild(name)
}

//PART TWO

function newPhoto(toy,card) {
  //creating image tag with the src of the image
  let image = document.createElement('img')
  image.src = toy.image
  image.className = 'toy-avatar'
  card.appendChild(image)
}

function totalLikes(toy,card){
  let likes = document.createElement('p')
  likes.innerText = `${toy.likes} likes`
  card.appendChild(likes)

}

function addButton(toy,card) {
  //creating a like button for each toy
  let button = document.createElement('button')
  button.addEventListener('click', function(){
    increaseLikes(toy);
  })
  button.innerText = '♥'
  button.className = 'like-btn'
  card.appendChild(button)
}

//PART THREE

form = document.querySelector('.add-toy-form')

form.addEventListener('submit', dataForm());

function dataForm(){
  fetch('http://localhost:3000/toys', configObject)
  .then(response => response.json())
  .then(json => console.log(json))

  let configObject = {
    method: "POST",
    headers: {
      "Content-Type" : "application/json",
      "Accept" : "application/json"
    },
    body: JSON.stringify({
      "name" : document.querySelectorAll('.input-text')[0].value,
      "image" : document.querySelectorAll('.input-text')[1].value,
      "likes" : '0'
    })
  }
}

//PART FOUR 

function increaseLikes(toy){
  fetch(`http://localhost:3000/toys/${toy.id}`, configObject)
  
  let configObject = {
    method: "PATCH",
    headers: {
      "Content-Type" : "application/json",
      "Accept" : "application/json"
    },
    body: JSON.stringify({
      "likes" : parseInt(toy.likes) + 1
    })
  }
}






















