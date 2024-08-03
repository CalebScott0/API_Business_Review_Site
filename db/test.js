const businesses = require("../yelp_dataset/dataset_business");
const str = businesses;
const lines = str.split(/\n/);
const wrapped = "[" + lines.join(",") + "]";
const obj = JSON.parse(wrapped);
for (let i = 0; i <= 1; i++) {
  console.log(obj[i]);
}
