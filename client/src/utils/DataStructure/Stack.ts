class Stack<T> {
  private items: T[] = []
  private index = 0

  constructor(items: T[] = [], index: number = 0) {
    this.items = items
    this.index = index
  }

  push(item: T): Stack<T> {
    const newItems = [...this.items.slice(0, this.index), item]
    return new Stack(newItems, this.index + 1)
  }

  pop(): { value: T | undefined; stack: Stack<T> } {
    if (this.index === 0) {
      return { value: undefined, stack: this }
    }
    const value = this.items[this.index - 1]
    return {
      value,
      stack: new Stack(this.items, this.index - 1)
    }
  }

  peek(): T | undefined {
    return this.items[this.index - 1]
  }

  isEmpty(): boolean {
    return this.index === 0
  }

  size(): number {
    return this.index
  }

  clear(): Stack<T> {
    return new Stack([], 0)
  }
}

export default Stack