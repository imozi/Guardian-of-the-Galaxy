export function quickSort<T>(
  arr: T[],
  sort: 'ASC' | 'DESC',
  key: string,
  start = 0,
  end = arr.length - 1
) {
  if (end <= start) {
    return arr
  }

  const pivotIndex = partition<T>(arr, sort, key, start, end)

  quickSort(arr, sort, key, start, pivotIndex - 1)
  quickSort(arr, sort, key, pivotIndex + 1, end)

  return arr
}

function partition<T>(
  arr: T[],
  sort: 'ASC' | 'DESC',
  key: string,
  start = 0,
  end = arr.length - 1
) {
  const pivotValue = arr[end]

  let pivotIndex = start

  for (let i = start; i < end; i++) {
    const a = key ? arr[i][key as keyof unknown] : arr[i]
    const b = key ? pivotValue[key as keyof unknown] : pivotValue
    const howToSort = sort === 'ASC' ? a <= b : a >= b

    if (howToSort) {
      swap<T>(arr, i, pivotIndex)
      pivotIndex++
    }
  }

  swap<T>(arr, pivotIndex, end)

  return pivotIndex
}

function swap<T>(arr: T[], i: number, j: number) {
  const tmp = arr[i]
  arr[i] = arr[j]
  arr[j] = tmp
}
