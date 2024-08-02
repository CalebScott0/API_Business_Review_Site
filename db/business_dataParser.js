const businesses = require("../yelp_dataset/dataset_business");
const str = businesses;
const lines = str.split(/\n/);
const wrapped = "[" + lines.join(",") + "]";
const obj = JSON.parse(wrapped);
console.log(obj);
