import { useState } from 'react'
import * as storage from '../storage/local'

export default (
  key: StorageKey,
  initData: StorageData = null
): [StorageData, SaveStorageItem, RemoveStorageItem] => {
  const initState = initData ? storage.save(key, initData) : null
  const [data, setData] = useState(storage.get(key) || initState)

  const save = (item: StorageData) => {
    setData(storage.save(key, item))
  }

  const remove = () => {
    storage.remove(key)
    setData(initData)
  }

  return [data, save, remove]
}
