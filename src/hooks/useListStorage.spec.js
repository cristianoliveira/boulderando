/**
 * @jest-environment jsdom
 */
import { render, act } from '@testing-library/react'
import * as React from 'react'
import * as storage from '../storage/local'

import useListStorage from './useListStorage'

const TestComponent = ({
  dataKey,
  initialData,
  onDataChange,
  onInit,
}) => {
  const [testData, setTestData, removeTestData] = useListStorage(dataKey, initialData)

  React.useEffect(() => {
    onInit({ setTestData, removeTestData })
  })

  React.useEffect(() => {
    onDataChange(testData)
  }, [testData, testData?.length])

  return null
}

describe('useListStorage', () => {
  afterEach(() => {
    storage.remove('list')
  })

  it('stores list of items into storage', () => {
    const onChangeSpy = jest.fn()
    let stateManager

    render(
      <TestComponent
        dataKey="list"
        initialData={[0]}
        onDataChange={onChangeSpy}
        onInit={(manager) => {
          stateManager = manager
        }}
      />
    )

    expect(onChangeSpy).toHaveBeenCalledWith([0])

    act(() => {
      stateManager.setTestData(2)
    })
    expect(onChangeSpy).toHaveBeenCalledWith([0, 2])

    act(() => {
      stateManager.setTestData(5)
    })
    expect(onChangeSpy).toHaveBeenCalledWith([0, 2, 5])

    act(() => {
      stateManager.setTestData([3,2])
    })
    expect(onChangeSpy).toHaveBeenCalledWith([3, 2])
  })
})
