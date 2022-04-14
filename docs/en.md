<image src="https://raw.githubusercontent.com/xyhxx/program_preview/master/logo/react-use.png">

More usage methods can be <a href="https://github.com/xyhxx/proste-react-use/tree/main/__tests__"> see examples in test
</a>

## Life Cycle

- [`useMounted`](./useMounted/en.md), [`useLayoutMounted`](./useLayoutMounted/en.md)

`triggered only once when loading`

- [`useSuspense`](./useSuspense/en.md)

`Any promise function can be used with the suspend component. The key must be a unique value. If you want to reuse the information of the parent component, you can use the same key as the parent component`

- [`useUpdateEffect`](./useUpdateEffect/en.md), [`useUpdatedLayoutEffect`](./useUpdatedLayoutEffect/en.md)

`Triggered only in dependent updates (except for the first time)`

## Web API

- [`useRequestAnimationFrame`](./useRequestAnimationFrame/en.md)

`requestAnimationFrame hook`

- [`useMemory`](./useMemory/en.md)

`Get current memory information. use-memory uses performance.memory API is a non-standard extension provided by Google browser. Please use it carefully!`

- [`useIntersectionObserver`](./useIntersectionObserver/en.md),
  [`useIntersectionObserverState`](./useIntersectionObserverState/en.md)

`Create an API for IntersectionObserver. The difference between useIntersectionObserver and useIntersectionObserver state is that useIntersectionObserver obtains information through callback, and useIntersectionObserver state will return the callback content as state. Both can interrupt listening and resume listening.`

- [`useClipboard`](./useClipboard/en.md)

`You can bind an input node through ref to copy the corresponding value value, which is very useful for uncontrolled nodes. Or copy to the pasteboard through copytoclipboard`

- [`useEyeDropper`](./useEyeDropper/en.md)

`The screen color finder can obtain the color of the selected area on the current screen and use the Web API.`

- [`useWebSocket`](./useWebSocket/en.md)

`web socket hook`

## Animation

- [`useTransition`](./useTransition/en.md)

`easing function animation`

## State

- [`useContextWithEqual`](./useContextWithEqual/en.md)

`Comparing the same context to judge whether the returned data has changed for rendering depends on use-context-selector. Create context using createcontext of `[`use-context-selector`](https://github.com/dai-shi/use-context-selector)

## Utils

- [`useJWT`](./useJWT/en.md)

`decode jwt hook`

- [`useCountDown`](./useCountDown/en.md)

`Countdown information. If you continue to configure days and other parameters after setting targetdate, they will be accumulated on the basis of targetdate.`

- [`useDelay`](./useDelay/en.md)

`The delay function that can be actively called returns a function, and the function executes the delay call to the incoming function.`

- [`useEventEmitter`](./useEventEmitter/en.md)

`Publish subscribe hook. The Event instance is initialized only once globally`

- [`useAsyncLock`](./useAsyncLock/en.md)

`Asynchronous function lock. When the asynchronous function is executed, it will not be executed again, and an undefind will be returned.`
