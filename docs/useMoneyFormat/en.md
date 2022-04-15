## useMoneyFormat

> Format currency amount

```ts
declare function useMoneyFormat(target: string, fractionDigits?: number): string;
declare function useMoneyFormat(target: number, fractionDigits?: number): string;
declare function useMoneyFormat(target: number | string, fractionDigits?: number): string;
```

```tsx
const money = useMoneyFormat(12345.6789, 2);

console.log(money); // 12.345.68
```
