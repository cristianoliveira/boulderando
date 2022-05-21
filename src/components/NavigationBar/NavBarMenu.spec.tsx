import React from 'react'
// eslint-disable-next-line
import renderer from 'react-test-renderer'

import MoreVertIcon from '@mui/icons-material/MoreVert'
import HistoryIcon from '@mui/icons-material/History'

import NavBarMenu from './NavBarMenu'

describe('Form', () => {
  it('matches the snapshot', async () => {
    expect(
      renderer
        .create(
          <NavBarMenu
            onClick={jest.fn()}
            data-testid="test-menu"
            MenuIcon={MoreVertIcon}
            options={[
              {
                id: 'booking-history',
                Icon: HistoryIcon,
                label: 'History',
                'data-testid': 'test',
                disabled: false,
              },
              {
                id: 'booking-history_disabled',
                Icon: HistoryIcon,
                label: 'History',
                'data-testid': 'test-disabled',
                disabled: true,
              },
            ]}
          />
        )
        .toJSON()
    ).toMatchSnapshot()
  })
})
