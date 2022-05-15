import { useState } from 'react'
import * as storage from '../storage/local'

export default <T>(
  key: StorageKey,
  initData?: StorageData<T>[]
): [StorageData<T>[], SaveStorageItem<T>, RemoveStorageItem] => {
  const [data, setData] = useState<T[]>(storage.get(key) || initData)

  const save = (item: StorageData<T> | StorageData<T>[]): void => {
    if (item instanceof Array) {
      setData(storage.save(key, item))
    } else {
      setData(storage.save(key, [...data, item]))
    }
  }

  const remove = (): void => {
    storage.remove(key)
    setData(initData as any)
  }

  return [data, save, remove]
}
