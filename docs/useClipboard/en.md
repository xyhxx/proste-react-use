## useClipboard

> You can bind an input node through ref to copy the corresponding value value, which is very useful for uncontrolled
> nodes. Or copy to the pasteboard through copytoclipboard

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
