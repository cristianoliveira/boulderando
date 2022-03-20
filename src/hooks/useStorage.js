import { useState } from 'react'
import * as storage from '../storage/local'

export default (key, initData = null) => {
  const [data, setData] = useState(storage.get(key) || initData)

  const isArray = initData instanceof Array;

  const save = (item) => {
    if (isArray) {
      setData(storage.push(key, item))
    } else {
      setData(storage.save(key, item))
    }
  }

  const remove = () => {
    storage.remove(key)
  }

  return [data, save, remove]
}
