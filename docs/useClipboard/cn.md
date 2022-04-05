## useClipboard

> 可以通过 ref 绑定某个 input 节点复制对应的 value 值， 这个在非受控节点上会非常有用 data-copy。 或者通过
> copyToClipboard 复制到粘贴板

```typescript
function useClipboard(): readonly [
  React.MutableRefObject<null>,
  {
    readonly copyToClipboard: (text?: string | number | null | undefined) => Promise<string | number>;
    readonly getClipboard: () => Promise<string>;
  },
];
```

`example`

```jsx
const Home = function () {
  const [, { copyToClipboard }] = useClipboard();

  async function copy() {
    await copyToClipboard('copy msg');
    toast('copy success');
  }

  return <button onClick={copy}>copy</button>;
};
```

```jsx
const Home = function () {
  const [ref, { copyToClipboard }] = useClipboard();

  return (
    <>
      <input ref={ref} />
      <button onClick={() => copyToClipboard()}>copy</button>
    </>
  );
};
```
