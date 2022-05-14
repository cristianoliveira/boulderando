declare type StorageData = string | number | object | null | StorageData[];

type StorageKey = string;

type SaveStorageItem = (item: StorageData) => void
type RemoveStorageItem = () => void

