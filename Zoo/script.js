import { Animal } from './Classes/Animal.js'
import { AnimalList } from '/Types/AnimalList.js'

// Create a single page aplication to handle the lack of state in pure html while having a more friendly UX
const pages = {
  home: `
    <h1>Virtual Zoo</h1>
    <p id="subheader">Choose an animal and start your zoo!</p>
    <div id="buttonContainer"></div>
    <div id="hintContainer">
      <small id="hint">Click on an animal to see them speak</small>
    </div>
    <div id="animalsContainer"></div>`,
  animal: `
    <h1 id="imageHeader"></h1>
    <h1 id="header">What will your animal say</h1>
    <input id="input"></input>
    <button id="submit">Create Animal</button
    `,
};

// Global variables
let selectedAnimal
let zoo = []

function loadContent(hash) {
  const contentDiv = document.getElementById('content');
  
  // Updates the page based on the hash, or to home by default
  const page = pages[hash] || pages['home'];
  contentDiv.innerHTML = page;

  if (hash === 'home' || !hash) {
      loadHome()
  }
  if (hash === 'animal') {
    loadAnimalPage()
  }

}

// Calls the load funcion when the page is loaded
window.addEventListener('load', () => {
  const hash = window.location.hash.substring(1) || 'home';
  loadContent(hash);
});

// Reloads the page when the hash is changed
window.addEventListener('hashchange', () => {
  const hash = window.location.hash.substring(1);
  loadContent(hash);
});


function loadHome() {
  // Get DOM elements
  const subheader = document.getElementById('subheader')
  const buttonContainer = document.getElementById('buttonContainer')
  const animalsContainer = document.getElementById('animalsContainer')
  const hint = document.getElementById('hint')


  const altSubheader = 'Add another animal to your zoo!'

  // Animal buttons are created based on the animal list property, this way only the animalList object has to be changed if the animal list wants to be updates
  // this makes the app modular and it works agnostic of the contents of animalList
  Object.keys(AnimalList).forEach(species => {
    const button = document.createElement('button');
    button.id = "animalButton"

    button.textContent = AnimalList[species].image

    button.addEventListener('click', () => {
      selectedAnimal = species
      window.location.hash = 'animal'; 
    })

    buttonContainer.appendChild(button)
  })

  if (zoo.length > 0) {
    subheader.textContent = altSubheader
    hint.classList.add('show')
  }

  // Zoo container construction
  for (let i = 0; i < zoo.length; i++) {
    const buttonContainer = document.createElement('div')
    const zooMember = document.createElement('button');
    const animalMessage = document.createElement('div')

    buttonContainer.id = 'zooMember'

    zooMember.id = "animalButton"
    zooMember.textContent = AnimalList[zoo[i].species].image

    animalMessage.id = "textBox"
    animalMessage.setAttribute('class', 'text-box');
    animalMessage.textContent = zoo[i].speak()

    zooMember.addEventListener('click', () => {
      animalMessage.classList.add('show');

      // Hides textbox after 1.5 seconds
      setTimeout(() => {
        animalMessage.classList.remove('show');
      }, 1500);
    })

    buttonContainer.appendChild(zooMember)
    buttonContainer.appendChild(animalMessage)
    animalsContainer.appendChild(buttonContainer)

  }
}

function loadAnimalPage() {
  const header = document.getElementById('header')
  const image = document.getElementById('imageHeader')
  const animalInput = document.getElementById('input')
  const submitButton = document.getElementById('submit')

  image.textContent = AnimalList[selectedAnimal].image
  header.textContent = `What will your ${selectedAnimal.toLowerCase()} say`

  // Creates an instance of the animal class and adds it to the zoo list
  submitButton.addEventListener('click', () => {
    const phrase = animalInput.value
    const animal = new Animal(selectedAnimal, phrase)
    zoo.push(animal)
    window.location.hash = 'home'
  })
}
