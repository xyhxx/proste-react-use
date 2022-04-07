## useMemory

> Get the memory information of the current page

```typescript
type MemoryInfo = {
  jsHeapSizeLimit: number;
  totalJSHeapSize: number;
  usedJSHeapSize: number;
};

function useMemory(interval?: number): MemoryInfo;
```

```tsx
const { jsHeapSizeLimit, totalJSHeapSize, usedJSHeapSize } = useMemory();
```
