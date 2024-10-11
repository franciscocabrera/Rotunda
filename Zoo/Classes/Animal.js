import { AnimalList } from '/Types/AnimalList.js'

// Generic animal class, it recieves the species and the phrase it will say as construction properties
export class Animal {
  constructor(species, phrase) {
    this.species = species
    this.phrase = phrase
  }

  speak() {
    return this.phrase.replace(/\s+/g, ' ' + AnimalList[this.species].sound + ' ') + ' ' + AnimalList[this.species].sound
  }
}