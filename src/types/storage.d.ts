declare type StorageData<T> =
  | T
  | any
  | null

type StorageKey = string

type SaveStorageItem<T> = (item: StorageData<T>) => void
type RemoveStorageItem = () => void
