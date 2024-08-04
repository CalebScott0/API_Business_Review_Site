const { businesses_array } = require("./dataset_business");

console.log(businesses_array[0].name, businesses_array[0]);

const randNum = Math.floor(Math.random() * businesses_array.length);
console.log(businesses_array[randNum].name, businesses_array[randNum]);
console.log("index of second business: ", randNum);
