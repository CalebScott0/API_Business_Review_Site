const { user_array1 } = require("./user_dataset/user_1dataset");
const { user_array2 } = require("./user_dataset/user_2dataset");
const { user_array3 } = require("./user_dataset/user_3dataset");
const { user_array4 } = require("./user_dataset/user_4dataset");
const { user_array5 } = require("./user_dataset/user_5dataset");
const { user_array6 } = require("./user_dataset/user_6dataset");
const { user_array7 } = require("./user_dataset/user_7dataset");
const { user_array8 } = require("./user_dataset/user_8dataset");
const { user_array9 } = require("./user_dataset/user_9dataset");
const { user_array10 } = require("./user_dataset/user_10dataset");
const { user_array11 } = require("./user_dataset/user_11dataset");
const { user_array12 } = require("./user_dataset/user_12dataset");
const { user_array13 } = require("./user_dataset/user_13dataset");
const { user_array14 } = require("./user_dataset/user_14dataset");
const { user_array15 } = require("./user_dataset/user_15dataset");
const { user_array16 } = require("./user_dataset/user_16dataset");
const { user_array17 } = require("./user_dataset/user_17dataset");
const { user_array18 } = require("./user_dataset/user_18dataset");
const { user_array19 } = require("./user_dataset/user_19dataset");
const { user_array20 } = require("./user_dataset/user_20dataset");
const { user_array21 } = require("./user_dataset/user_21dataset");
const { user_array22 } = require("./user_dataset/user_22dataset");
const { user_array23 } = require("./user_dataset/user_23dataset");
const { user_array24 } = require("./user_dataset/user_24dataset");
const { user_array25 } = require("./user_dataset/user_25dataset");
const { user_array26 } = require("./user_dataset/user_26dataset");
const { user_array27 } = require("./user_dataset/user_27dataset");
const { user_array28 } = require("./user_dataset/user_28dataset");
const { user_array29 } = require("./user_dataset/user_29dataset");
const { user_array30 } = require("./user_dataset/user_30dataset");
const { user_array31 } = require("./user_dataset/user_31dataset");
const { user_array32 } = require("./user_dataset/user_32dataset");
const { user_array33 } = require("./user_dataset/user_33dataset");

const userArr = [
    ...user_array1,
    ...user_array2,
    ...user_array3,
    ...user_array4,
    ...user_array5,
    ...user_array6,
    ...user_array7,
    ...user_array8,
    ...user_array9,
    ...user_array10,
    ...user_array11,
    ...user_array12,
    ...user_array13,
    ...user_array14,
    ...user_array15,
    ...user_array16,
    ...user_array17,
    ...user_array18,
    ...user_array19,
    ...user_array20,
    ...user_array21,
    ...user_array22,
    ...user_array23,
    ...user_array24,
    ...user_array25,
    ...user_array26,
    ...user_array27,
    ...user_array28,
    ...user_array29,
    ...user_array30,
    ...user_array31,
    ...user_array32,
    ...user_array33,
]

console.log("First Object index 0: ", userArr[0]);

const randNum = Math.floor(Math.random() * userArr.length);
console.log("index of second object: ", randNum);
console.log(userArr[randNum]);
console.log("Array length: ", userArr.length);