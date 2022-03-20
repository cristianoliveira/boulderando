/**
 * @jest-environment jsdom
 */
import { render, act } from '@testing-library/react'
import * as React from 'react'
import * as storage from '../storage/local'

import useStorage from './useStorage'

const TestComponent = ({
  dataKey,
  initialData,
  onDataChange,
  onInit,
}) => {
  const [testData, setTestData, removeTestData] = useStorage(dataKey, initialData)

  React.useEffect(() => {
    onInit({ setTestData, removeTestData })
  })

  React.useEffect(() => {
    onDataChange(testData)
  }, [testData, testData?.length])

  return null
}

describe('useStorage', () => {
  afterEach(() => {
    storage.remove('user')
    storage.remove('list')
  })

  it('initialize with data from localStorage', () => {
    const initialData = { name: 'User Init' }
    const onChangeSpy = jest.fn()
    storage.save('user', initialData)

    render(
      <TestComponent
        dataKey="user"
        onDataChange={onChangeSpy}
        onInit={() => {}}
      />
    )

    expect(onChangeSpy).toHaveBeenCalledWith(initialData)
  })

  it('stores items into storage', () => {
    const onChangeSpy = jest.fn()
    let stateManager

    render(
      <TestComponent
        dataKey="user"
        onDataChange={onChangeSpy}
        onInit={(manager) => {
          stateManager = manager
        }}
      />
    )

    act(() => {
      stateManager.setTestData('foo')
    })
    expect(onChangeSpy).toHaveBeenCalledWith('foo')

    act(() => {
      stateManager.setTestData('bar')
    })

    expect(onChangeSpy).toHaveBeenCalledWith('bar')
  })
})
