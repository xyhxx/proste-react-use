## useJWT

> jwt 解码 hook

```typescript
function useJWT<T = unknown>(source: string, header?: boolean): T;
```

```tsx
const result = useJWT('xxxx', false);
```
