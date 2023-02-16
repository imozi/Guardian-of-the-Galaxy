export function getRandomArrayElement<T>(array: T[]): () => T {
  if (array.length === 0) {
    throw new Error('Массив пуст')
  }

  let remainingElements = [...array]
  let randomIndex: number
  let randomElement: T

  return (): T => {
    if (remainingElements.length === 0) {
      remainingElements = [...array]
    }

    randomIndex = Math.floor(Math.random() * remainingElements.length)
    randomElement = remainingElements.splice(randomIndex, 1)[0]

    return randomElement
  }
}
