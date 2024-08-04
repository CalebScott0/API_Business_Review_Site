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
const { review_array16 } = require("./review_dataset/review_16dataset");
const { review_array17 } = require("./review_dataset/review_17dataset");
const { review_array18 } = require("./review_dataset/review_18dataset");
const { review_array19 } = require("./review_dataset/review_19dataset");
const { review_array20 } = require("./review_dataset/review_20dataset");
const { review_array21 } = require("./review_dataset/review_21dataset");
const { review_array22 } = require("./review_dataset/review_22dataset");
const { review_array23 } = require("./review_dataset/review_23dataset");
const { review_array24 } = require("./review_dataset/review_24dataset");
const { review_array25 } = require("./review_dataset/review_25dataset");
const { review_array26 } = require("./review_dataset/review_26dataset");
const { review_array27 } = require("./review_dataset/review_27dataset");
const { review_array28 } = require("./review_dataset/review_28dataset");
const { review_array29 } = require("./review_dataset/review_29dataset");
const { review_array30 } = require("./review_dataset/review_30dataset");
const { review_array31 } = require("./review_dataset/review_31dataset");
const { review_array32 } = require("./review_dataset/review_32dataset");
const { review_array33 } = require("./review_dataset/review_33dataset");
const { review_array34 } = require("./review_dataset/review_34dataset");
const { review_array35 } = require("./review_dataset/review_35dataset");
const { review_array36 } = require("./review_dataset/review_36dataset");
const { review_array37 } = require("./review_dataset/review_37dataset");
const { review_array38 } = require("./review_dataset/review_38dataset");
const { review_array39 } = require("./review_dataset/review_39dataset");
const { review_array40 } = require("./review_dataset/review_40dataset");
const { review_array41 } = require("./review_dataset/review_41dataset");
const { review_array42 } = require("./review_dataset/review_42dataset");
const { review_array43 } = require("./review_dataset/review_43dataset");
const { review_array44 } = require("./review_dataset/review_44dataset");
const { review_array45 } = require("./review_dataset/review_45dataset");
const { review_array46 } = require("./review_dataset/review_46dataset");
const { review_array47 } = require("./review_dataset/review_47dataset");
const { review_array48 } = require("./review_dataset/review_48dataset");
const { review_array49 } = require("./review_dataset/review_49dataset");
const { review_array50 } = require("./review_dataset/review_50dataset");
const { review_array51 } = require("./review_dataset/review_51dataset");

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
  ...review_array16,
  ...review_array17,
  ...review_array18,
  ...review_array19,
  ...review_array20,
  ...review_array21,
  ...review_array22,
  ...review_array23,
  ...review_array24,
  ...review_array25,
  ...review_array26,
  ...review_array27,
  ...review_array28,
  ...review_array29,
  ...review_array30,
  ...review_array31,
  ...review_array32,
  ...review_array33,
  ...review_array34,
  ...review_array35,
  ...review_array36,
  ...review_array37,
  ...review_array38,
  ...review_array39,
  ...review_array40,
  ...review_array41,
  ...review_array42,
  ...review_array43,
  ...review_array44,
  ...review_array45,
  ...review_array46,
  ...review_array47,
  ...review_array48,
  ...review_array49,
  ...review_array50,
  ...review_array51,
];
console.log("First Object index 0: ", reviewArr[0]);

const randNum = Math.floor(Math.random() * reviewArr.length);
console.log(reviewArr[randNum]);
console.log("index of second object: ", randNum);
console.log("Array length: ", reviewArr.length);
