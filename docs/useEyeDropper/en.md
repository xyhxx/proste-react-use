## useEyeDropper

> The screen color finder can obtain the color of the selected area on the current screen and use the Web API
> [`EyeDropper API`](https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper_API) in the experiment.Determines
> whether the canuse value returned by can be used,View browser compatibility in
> [`can i use`](https://caniuse.com/?search=EyeDropper%20API)

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
