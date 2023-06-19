export default function Sleep(duration: number = 100): Promise<number> {
  return new Promise((res) => {
    setTimeout(() => {
      res(duration);
    }, duration);
  });
}
