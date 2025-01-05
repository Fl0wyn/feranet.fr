# JavaScript - Method

## Array method

```js
const arr = [1, 2, 3, 4];
arr.at(1); // 2
arr.push(5); // [1, 2, 3, 4, 5]
arr.pop(); // 4
arr.fill(1); // [1, 1, 1, 1]
arr.join("-"); // 1-2-3-4
arr.shift(); // 1
arr.reverse(); // [4, 3, 2, 1]
arr.unshift(0); // 5
arr.includes(2); // true
arr.map((a) => a * 2); // [2, 4, 6, 8]
arr.filter((a) => a > 2); // [3, 4]
arr.find((a) => a > 2); // 3
arr.every((a) => a > 0); // true
arr.findIndex((a) => a > 2); // 2
arr.reduce((a, b) => a + b); // 10
arr.concat([5, 6, 7]); // [1, 2, 3, 4, 5, 6, 7]
arr.forEach((a) => console.log(a)); // 1 2 3 4
arr.indexOf(2); // 1
arr.lastIndexOf(2); // 1
arr.slice(1, 3); // [2, 3]
arr.some((a) => a > 2); // true
arr.sort((a, b) => b - a); // [4, 3, 2, 1]
arr.splice(1, 2); // [2, 3]
arr.toString(); // 1,2,3,4
```

## String method

```js
const str = "Hello world";
str.charAt(0); // H
str.charCodeAt(0); // 72
str.concat("!"); // Hello world !
str.endsWith("world"); // true
str.includes("world"); // true
str.indexOf("world"); // 6
str.lastIndexOf("world"); // 6
str.match(/world/g); // ["world"]
str.padEnd(15, "!"); // Hello world!!!!
str.padStart(15, "!"); // !!!!Hello world
str.repeat(2); // Hello worldHello world
str.replace("world", "everyone"); // Hello everyone
str.search("world"); // 6
str.slice(0, 5); // Hello
str.split(" "); // ["Hello", "world"]
str.startsWith("Hello"); // true
str.substr(0, 5); // Hello
str.substring(0, 5); // Hello
str.toLocaleLowerCase(); // hello world
str.toLocaleUpperCase(); // HELLO WORLD
str.toLowerCase(); // hello world
str.toUpperCase(); // HELLO WORLD
str.trim(); // Hello world
```

## Object method

```js
const obj = { a: 1, b: 2, c: 3 };
Object.assign(obj, { d: 4 }); // { a: 1, b: 2, c: 3, d: 4 }
Object.entries(obj); // [ ["a", 1], ["b", 2], ["c", 3] ]
Object.keys(obj); // [ "a", "b", "c" ]
Object.values(obj); // [ 1, 2, 3 ]
```
