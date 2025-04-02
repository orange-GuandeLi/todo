export const channelClosed = Symbol("channel-closed");

type NextType<T> = { value: T; done: false } | {
  value: typeof channelClosed;
  done: true;
};

export class Channel<T> {
  private pushBuffer: {
    resolve: () => void;
    value: T;
  }[] = [];
  private popBuffer: (({ value, done }: NextType<T>) => void)[] = [];
  private closed = false;

  isClosed() {
    return this.closed;
  }

  push(value: T) {
    if (this.closed) {
      throw new Error("This channel has been closed!");
    }

    if (this.popBuffer.length > 0) {
      return new Promise<void>((resolve) => {
        const resolvePop = this.popBuffer.shift();

        resolvePop!({ value, done: false });
        resolve();
      });
    } else {
      return new Promise<void>((resolve) => {
        this.pushBuffer.push({ resolve, value });
      });
    }
  }

  async pop() {
    return (await this.next()).value;
  }

  close() {
    return new Promise<void>((resolve) => {
      for (const buff of this.pushBuffer) {
        const { resolve: resolvePush, value: _ } = buff;
        resolvePush();
      }
      this.pushBuffer = [];

      for (const resolvePop of this.popBuffer) {
        resolvePop({ value: channelClosed, done: true });
      }
      this.popBuffer = [];
      this.closed = true;

      resolve();
    });
  }

  [Symbol.asyncIterator]() {
    return this;
  }

  next(): Promise<
    NextType<T>
  > {
    if (this.closed) {
      return Promise.resolve({ value: channelClosed, done: true });
    }

    if (this.pushBuffer.length > 0) {
      return new Promise((resolve) => {
        const buff = this.pushBuffer.shift();
        const { resolve: resolvePush, value } = buff!;
        resolvePush();
        resolve({ value: value, done: false });
      });
    }

    return new Promise<NextType<T>>((resolve) => {
      this.popBuffer.push(resolve);
    });
  }
}

export class MultiChan<T> {
  private children: Channel<T>[] = [];
  private mainChan: Channel<T>;

  constructor(mainChan: Channel<T>) {
    this.mainChan = mainChan;
    (async () => {
      while (true) {
        if (mainChan.isClosed()) {
          for (const child of this.children) {
            await child.close();
          }
          return;
        }

        const value = await mainChan.pop();
        if (value == channelClosed) {
          for (const child of this.children) {
            await child.close();
          }
          return;
        }

        for (const child of this.children) {
          await child.push(value);
        }
      }
    })();
  }

  copy() {
    const c = new Channel<T>();
    this.children.push(c);
    return c;
  }

  async push(value: T) {
    this.mainChan.push(value);
  }
}
