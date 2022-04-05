## useCountDown

> 倒计时信息。如果设置了 targetDate 后继续配置 days 等参数 会在 targetDate 的基础上累加。

```typescript
function useCountDown(options?: {
  targetDate?: DateType;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  interval?: number;
  onChange?: (
    time: number,
    parseTime: {
      days: number;
      hours: number;
      minutes: number;
      seconds: number;
      milliseconds: number;
    },
  ) => void;
  onComplete?: () => void;
}): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
};
```

`example`

```jsx
  const Home = function(){
    const {days, hours, minutes, seconds} = useCountDown({targetDate: new Date(2022 4 3)});

    return <p>{days}d{hours}h{minutes}m{seconds}s</p>
  }
```
