## useEyeDropper

> 屏幕取色器，可以获取当前屏幕上选中区域的颜色，使用实验中的 Web api
> [`EyeDropper API`](https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper_API)。确定是否可以使用可以通过返回的
> canUse 值，在 [`can i use`](https://caniuse.com/?search=EyeDropper%20API)中查看浏览器的兼容性

```ts
declare function useEyeDropper(init?: string): [
  state: {
    canUse: boolean;
    color: string;
  },
  action: (signal?: AbortSignal | undefined) => Promise<string | undefined>,
];
```

```tsx
const [{ color }, open] = useEyeDropper();

const handleClick = useCallback(() => {
  open();
}, [open]);
```
