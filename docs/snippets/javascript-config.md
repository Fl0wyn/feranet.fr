# JavaScript - Config

## Date and time

```js
/**
 *  Display the date in long format
 */
function dateNumeric() {
  const today = new Date();
  return today.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
} // output: dimanche 8 janvier 2023

/**
 *  Display the date in short format
 */
function dateLong() {
  const today = new Date();
  return today.toLocaleDateString("fr-FR");
} // output: 08/01/2023
```

## Size converter

```js
function convertSize(size, fixed) {
  const units = ["Ko", "Mo", "Go", "To", "Po"];
  const unitIndex = Math.floor(Math.log(size) / Math.log(1024));
  return `${(size / Math.pow(1024, unitIndex)).toFixed(fixed)} ${
    units[unitIndex]
  }`;
}
```

## Bandwidth converter

```js
function convertBandwidth(bandwidth, fixed) {
  return `${parseFloat((bandwidth / 125000).toFixed(fixed))} Mbps`;
}

function convertBandwidth(bandwidth, fixed) {
  const units = ["bps", "Kbps", "Mbps", "Gbps", "Tbps"];
  const unitIndex = Math.floor(Math.log(bandwidth) / Math.log(1000));
  return `${(bandwidth / Math.pow(1000, unitIndex)).toFixed(fixed)} ${
    units[unitIndex]
  }`;
}
```

## Capitalize on the first letter

```js
function capitalise(str) {
  return str[0].toUpperCase() + str.slice(1);
}
```

## Generate uuid

```js
const uuid = (number = 32) => {
  const gen = (x, number) =>
    Array.from(
      { length: number ? number : 1 },
      () => x[Math.floor(Math.random() * x.length)]
    ).join("");
  return gen(
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
    number
  );
};
```

## Generate a random number or string

```js
const randomGen = {
  NC: "0123456789",
  LC: "abcdefghijklmnopqrstuvwxyz",
  UC: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",

  _generate: (c, n) =>
    Array.from(
      { length: n ? n : 1 },
      () => c[Math.floor(Math.random() * c.length)]
    ).join(""),

  number(n) {
    return this._generate(this.NC, n);
  },
  lowercase(n) {
    return this._generate(this.LC, n);
  },
  uppercase(n) {
    return this._generate(this.UC, n);
  },
  all(n) {
    return this._generate(this.NC + this.UC + this.LC, n);
  },
};

console.log(randomGen.number(10)); // 9836102222
```
