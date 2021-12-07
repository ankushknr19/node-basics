// constructor class
function Person (name) {
    this.name = name
    this.greeting = function () {
        console.log('My name is '+ this.name + '.')
    }
}

//create new object instances
let person1 = new Person('Ankush')
let person2 = new Person('Ankit')

console.log(person1.name)
console.log(person2.greeting())

// Object() constructor with object literals passed as parameters
let person3 = new Object({
    name: 'Anju'
})
console.log(person3.name);

// create() method, using an existing object as the prototype of the newly created object.
let person4 = Object.create(person2)
console.log(person4.name)



