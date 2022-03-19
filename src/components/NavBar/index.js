import * as React from 'react'
import { useRouter } from 'next/router'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import AccountCircle from '@mui/icons-material/AccountCircle'
import HistoryIcon from '@mui/icons-material/History'
import ListAltIcon from '@mui/icons-material/ListAlt'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditIcon from '@mui/icons-material/Edit'

import MoreVertIcon from '@mui/icons-material/MoreVert'
import NavBarMenu from './NavBarMenu'

import useUserContext from '../../context/User'

const PAGE_TITLES = {
  '/': 'Book Session',
  '/sessions': 'Book Session',
  '/user/new': 'New user',
  '/user/edit': 'Editing user',
}

export const NAVBAR_CONTAINER = 'navbar_container'

export const NAVBAR_USER_MENU_BUTTON = 'navbar_user_menu_button'
export const NAVBAR_USER_MENU_CONTAINER = 'navbar_user_menu_button--container'
export const NAVBAR_USER_MENU_ITEM_DELETE = 'navbar_user_menu_button--delete'
export const NAVBAR_USER_MENU_ITEM_EDIT = 'navbar_user_menu_button--edit'

export const NAVBAR_NAVIGATION_MENU_BUTTON = 'navbar_navigation_menu_button'
export const NAVBAR_NAVIGATION_MENU_ITEM_SESSION = 'navbar_navigation_menu_item_session'
export const NAVBAR_NAVIGATION_MENU_ITEM_HISTORY = 'navbar_navigation_menu_item_history'

export const NAVBAR_BOOKING_HISTORY_MENU = 'navbar_booking_history_button'

export default function NavBar() {
  const { user, deleteUser, editUser } = useUserContext()
  const router = useRouter()

  return (
    <AppBar position="static" data-testid={NAVBAR_CONTAINER}>
      <Toolbar>
        <NavBarMenu
          data-testid={NAVBAR_NAVIGATION_MENU_BUTTON}
          MenuIcon={MoreVertIcon}
          options={[
            {
              id: 'session',
              Icon: ListAltIcon,
              label: 'Sessions',
              'data-testid': NAVBAR_NAVIGATION_MENU_ITEM_SESSION,
              disabled: !user,
            },
            {
              id: 'booking-history',
              Icon: HistoryIcon,
              label: 'History',
              'data-testid': NAVBAR_NAVIGATION_MENU_ITEM_HISTORY,
              disabled: !user,
            },
          ]}
          onClick={({ id }) => {
            switch (id) {
              case 'session':
                router.push('/sessions')
                break

              case 'booking-history':
                router.push('/booking-history')
                break

              default:
            }
          }}
        />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {PAGE_TITLES[router.asPath]}
        </Typography>
        {user && (
          <div>
            <NavBarMenu
              data-testid={NAVBAR_USER_MENU_BUTTON}
              MenuIcon={AccountCircle}
              options={[
                {
                  id: 'name',
                  label: user.name,
                  disabled: true,
                  'data-testid': NAVBAR_USER_MENU_CONTAINER,
                },
                {
                  id: 'delete',
                  Icon: DeleteOutlineIcon,
                  label: 'Delete',
                  'data-testid': NAVBAR_USER_MENU_ITEM_DELETE,
                },
                {
                  id: 'edit',
                  Icon: EditIcon,
                  label: 'Edit',
                  'data-testid': NAVBAR_USER_MENU_ITEM_EDIT,
                },
              ]}
              onClick={({ id }) => {
                switch (id) {
                  case 'delete':
                    deleteUser()
                    break

                  case 'edit':
                    editUser()
                    break

                  default:
                }
              }}
            />
          </div>
        )}
      </Toolbar>
    </AppBar>
  )
}
