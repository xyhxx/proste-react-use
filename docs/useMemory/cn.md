## useMemory

> 获取当前页面的内存信息

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
