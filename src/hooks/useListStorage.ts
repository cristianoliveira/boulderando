import { useState } from 'react'
import * as storage from '../storage/local'

export default (
  key: StorageKey,
  initData: StorageData = []
): [StorageData, SaveStorageItem, RemoveStorageItem] => {
  const [data, setData] = useState(storage.get(key) || initData)

  const save = (item: StorageData): void => {
    if (item instanceof Array) {
      setData(storage.save(key, item))
    } else {
      setData(storage.save(key, [...(data as StorageData[]), item]))
    }
  }

  const remove = (): void => {
    storage.remove(key)
    setData(initData)
  }

  return [data, save, remove]
}
