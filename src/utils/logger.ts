export const logger = {
  log: (...messages: any[]) => {
    if (process.env.NODE_ENV !== 'test' || process.env.DEBUG) {
      console.log(...messages)
    }
  },
}
