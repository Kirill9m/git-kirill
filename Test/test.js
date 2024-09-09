const cars = ["Saab", "Volvo", "BMW"];
cars.push("Audi");
console.log(cars);

const car = {type:"Fiat", model:"500", color:"white"};
car.color = "red";
car.owner = "Johnson"; 
console.log(car);

function changeCar(obj){
obj.type = "BMW";
obj.model = "X5";
}

changeCar(car);

console.log(car);

const person2 = new Object();

person2.name = "Kirill";

const person = {
    firstName: "John",
    lastName : "Doe",
    id       : 5566,
    fullName : function() {
      return this.firstName + " " + this.lastName;
    }
  };

  console.log(person.fullName());
  console.log(person2);