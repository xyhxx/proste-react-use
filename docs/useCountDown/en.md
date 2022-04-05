## useCountDown

> Countdown information. If you continue to configure days and other parameters after setting targetdate, they will be
> accumulated on the basis of targetdate.

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
