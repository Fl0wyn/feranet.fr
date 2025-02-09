# TypeScript - Config

## Date and Time

### Long Format Date

```typescript
/**
 * Display the date in long format
 */
function dateNumeric(): string {
  const today = new Date();
  return today.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
} // output: dimanche 8 janvier 2023
```

### Short Format Date

```typescript
/**
 * Display the date in short format
 */
function dateLong(): string {
  const today = new Date();
  return today.toLocaleDateString("fr-FR");
} // output: 08/01/2023
```

## Size Converter

```typescript
function convertSize(size: number, fixed: number): string {
  const units = ["Ko", "Mo", "Go", "To", "Po"];
  const unitIndex = Math.floor(Math.log(size) / Math.log(1024));
  return `${(size / Math.pow(1024, unitIndex)).toFixed(fixed)} ${
    units[unitIndex]
  }`;
}
```

## Bandwidth Converter

### Convert to Mbps

```typescript
function convertBandwidth(bandwidth: number, fixed: number): string {
  return `${parseFloat((bandwidth / 125000).toFixed(fixed))} Mbps`;
}
```

### Convert with Units

```typescript
function convertBandwidthWithUnits(bandwidth: number, fixed: number): string {
  const units = ["bps", "Kbps", "Mbps", "Gbps", "Tbps"];
  const unitIndex = Math.floor(Math.log(bandwidth) / Math.log(1000));
  return `${(bandwidth / Math.pow(1000, unitIndex)).toFixed(fixed)} ${
    units[unitIndex]
  }`;
}
```

## Capitalize the First Letter

```typescript
function capitalise(str: string): string {
  return str[0].toUpperCase() + str.slice(1);
}
```

## Generate UUID

```typescript
const uuid = (number: number = 32): string => {
  const gen = (x: string, number: number): string =>
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

## Generate a Random Number or String

```typescript
const randomGen = {
  NC: "0123456789",
  LC: "abcdefghijklmnopqrstuvwxyz",
  UC: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",

  _generate(c: string, n: number): string {
    return Array.from(
      { length: n ? n : 1 },
      () => c[Math.floor(Math.random() * c.length)]
    ).join("");
  },

  number(n: number): string {
    return this._generate(this.NC, n);
  },
  lowercase(n: number): string {
    return this._generate(this.LC, n);
  },
  uppercase(n: number): string {
    return this._generate(this.UC, n);
  },
  all(n: number): string {
    return this._generate(this.NC + this.UC + this.LC, n);
  },
};

console.log(randomGen.number(10)); // 9836102222
```
