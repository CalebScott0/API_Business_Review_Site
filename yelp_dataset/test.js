const { review_array1 } = require("./review_dataset/review_1dataset");
const { review_array2 } = require("./review_dataset/review_2dataset");
const { review_array3 } = require("./review_dataset/review_3dataset");
const { review_array4 } = require("./review_dataset/review_4dataset");
const { review_array5 } = require("./review_dataset/review_5dataset");
const { review_array6 } = require("./review_dataset/review_6dataset");
const { review_array7 } = require("./review_dataset/review_7dataset");
const { review_array8 } = require("./review_dataset/review_8dataset");
const { review_array9 } = require("./review_dataset/review_9dataset");
const { review_array10 } = require("./review_dataset/review_10dataset");
const { review_array11 } = require("./review_dataset/review_11dataset");
const { review_array12 } = require("./review_dataset/review_12dataset");
const { review_array13 } = require("./review_dataset/review_13dataset");
const { review_array14 } = require("./review_dataset/review_14dataset");
const { review_array15 } = require("./review_dataset/review_15dataset");

const reviewArr = [
  ...review_array1,
  ...review_array2,
  ...review_array3,
  ...review_array4,
  ...review_array5,
  ...review_array6,
  ...review_array7,
  ...review_array8,
  ...review_array9,
  ...review_array10,
  ...review_array11,
  ...review_array12,
  ...review_array13,
  ...review_array14,
  ...review_array15,
];
console.log("First Object index 0: ", reviewArr[0]);

const randNum = Math.floor(Math.random() * reviewArr.length);
console.log(reviewArr[randNum]);
console.log("index of second object: ", randNum);
console.log("Array length: ", reviewArr.length);
