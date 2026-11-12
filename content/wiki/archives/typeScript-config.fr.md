# TypeScript - Configuration

## Date et heure

### Date au format long

```typescript
/**
 * Afficher la date au format long
 */
function dateNumeric(): string {
  const today = new Date();
  return today.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
} // résultat : dimanche 8 janvier 2023
```

### Date au format court

```typescript
/**
 * Afficher la date au format court
 */
function dateLong(): string {
  const today = new Date();
  return today.toLocaleDateString("fr-FR");
} // résultat : 08/01/2023
```

## Convertisseur de taille

```typescript
function convertSize(size: number, fixed: number): string {
  const units = ["Ko", "Mo", "Go", "To", "Po"];
  const unitIndex = Math.floor(Math.log(size) / Math.log(1024));
  return `${(size / Math.pow(1024, unitIndex)).toFixed(fixed)} ${
    units[unitIndex]
  }`;
}
```

## Convertisseur de débit

### Convertir en Mbps

```typescript
function convertBandwidth(bandwidth: number, fixed: number): string {
  return `${parseFloat((bandwidth / 125000).toFixed(fixed))} Mbps`;
}
```

### Convertir avec les unités

```typescript
function convertBandwidthWithUnits(bandwidth: number, fixed: number): string {
  const units = ["bps", "Kbps", "Mbps", "Gbps", "Tbps"];
  const unitIndex = Math.floor(Math.log(bandwidth) / Math.log(1000));
  return `${(bandwidth / Math.pow(1000, unitIndex)).toFixed(fixed)} ${
    units[unitIndex]
  }`;
}
```

## Mettre la première lettre en majuscule

```typescript
function capitalise(str: string): string {
  return str[0].toUpperCase() + str.slice(1);
}
```

## Générer un UUID

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

## Générer un nombre ou une chaîne aléatoire

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
