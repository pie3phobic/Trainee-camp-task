// var removeDuplicates = function (nums) {
//   const hashmap = new Map([]);
//   for (let i = 0; i < nums.length; i++) {
//     if (hashmap.get(nums[i]) == undefined) {
//       hashmap.set(nums[i], 1);
//     } else if (hashmap.get(nums[i]) < 2) {
//       hashmap.set(nums[i], hashmap.get(nums[i]) + 1);
//     }
//   }
//   return hashmap.size;
// };
// const nums = [1, 1, 1, 2, 2, 2, 3, 3, 4];
// console.log(removeDuplicates(nums));
// 1. Swap keys and values in object
// const inputObject = { a: 1, b: 2, c: 3 };
// function swapKeysAndValues(inputObject) {
//   return Object.fromEntries(
//     Object.entries(inputObject).map(([key, value]) => [value, key])
//   );
// }
// console.log(swapKeysAndValues(inputObject));
//2. Write a function mergeObjects that merges two objects into one, where the keys in the second object override the keys in the first object if they have the same name. Here are two sample objects and the expected output:
// const object1 = { a: 1, b: 2, c: 3 };
// const object2 = { b: 4, d: 5 };
// const mergedObject = function (object1, object2) {
//   return { ...object1, ...object2 };
// };
// console.log(mergedObject(object1, object2)); // Output: { a: 1, b: 4, c: 3, d: 5 }
// 3.Logging Keys and Values:
// Write a function that takes an object and logs all its keys and values to the console.
// const sampleObject = {
//   name: "John",
//   age: 30,
//   city: "New York",
// };
// const logObject = function (sampleObject) {
//   Object.entries(sampleObject).map(([key, value]) =>
//     console.log(`${key}: ${value}`)
//   );
// };
// logObject(sampleObject);
//4. Calculating Total Sum of Values:
// Create a function that calculates the total sum of values in an object where the values are numbers.
// const numberObject = {
//   a: 10,
//   b: 20,
//   c: 30,
// };
// const calcSum = function (numberObject) {
//   let result = 0;
//   Object.entries(numberObject).forEach(([key, value]) => {
//     result += value;
//   });
//   return result;
// };
// console.log(calcSum(numberObject));
//5.Filtering Objects in an Array. Write a function that takes an array of objects and filters it based on a given property and value. For example, filter all objects where the age property is greater than 30.
// const people = [
//   { name: "Alice", age: 25 },
//   { name: "Bob", age: 35 },
//   { name: "Charlie", age: 40 },
//   { name: "David", age: 28 },
// ];
// const filterPeopleByAge = function (peopleArray, ageThreshold) {
//   return peopleArray.filter((person) => person.age > ageThreshold);
// };
// console.log(filterPeopleByAge(people, 30));
//6.Removing Null or Undefined Properties. Implement a function that removes all properties with a null or undefined value from an object.
// const sampleObject = {
//   name: "John",
//   age: 30,
//   city: null,
//   job: "Developer",
//   hobby: undefined,
// };
// const removeNull = function (object) {
//   for (const key in object) {
//     if (object[key] == null || object[key] == undefined) {
//       delete object[key];
//     }
//   }
//   return object;
// };
// console.log(removeNull(sampleObject));
//7.Build a function that converts an array of objects into an object where the keys are taken from a specific property of the objects, and the values are the objects themselves.
// const peopleArray = [
//   { id: 1, name: "Alice" },
//   { id: 2, name: "Bob" },
//   { id: 3, name: "Charlie" },
// ];
// const convertIntoObject = function (array) {
//   const result = {};
//   array.forEach((item) => {
//     result[item.id] = item;
//   });
//   return result;
// };
// console.log(convertIntoObject(peopleArray));
//8. Create a function that converts a flat object with nested keys into a nested object. For example, convert { 'a.b.c': 42 } into { a: { b: { c: 42 } } }.
// const flatObject = { "a.b.c": 42, "a.x.y": 10, z: "hello" };
// const nestedObject = function (flatObject) {
//   for (const item in flatObject) {
//     let array = item.split(".");
//     let result = {};
//   }
// };
// console.log(nestedObject(flatObject));
//9. Task Goal:The task is to create a function that takes this input text and returns an object where each unique word is a key, and its value is the number of times it appears in the text. For example, the word "Lorem" appears once, "ipsum" appears twice, "quia" appears three times, and so on.
const string =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit. Sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.";
const countWords = function (s) {
  let result = {};
  const regex = /\b\w+\b/g;
  const array = s.toLowerCase().match(regex);
  for (let i = 0; i < array.length; i++) {
    if (result[array[i]] == undefined) {
      result[array[i]] = 1;
    } else {
      result[array[i]] += 1;
    }
  }
  return result;
};
console.log(countWords(string));
