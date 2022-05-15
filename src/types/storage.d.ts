declare type StorageData<T> =
  | T
  | string
  | number
  | object
  | null
  | StorageData<T>[]

type StorageKey = string

type SaveStorageItem = (item: StorageData) => void
type RemoveStorageItem = () => void
