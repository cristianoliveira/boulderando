import { useState } from 'react'
import * as storage from '../storage/local'

export default (key, initData = []) => {
	const [data, setData] = useState(storage.get(key) || initData)

	const save = (item) => {
		if (item instanceof Array) {
			setData(storage.save(key, item))
		} else {
			setData(storage.save(key, [...data, item]))
		}
	}

	const remove = () => {
		storage.remove(key)
		setData(initData)
	}

	return [data, save, remove]
}
