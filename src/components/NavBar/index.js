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
import AddBoxIcon from '@mui/icons-material/AddBox'
import SyncIcon from '@mui/icons-material/Sync'
import Divider from '@mui/material/Divider'

import MoreVertIcon from '@mui/icons-material/MoreVert'
import NavBarMenu from './NavBarMenu'

import useUserContext from '../../context/User'
import useSessionContext from '../../context/Sessions'

import {
  NAVBAR_CONTAINER,
  NAVBAR_USER_MENU_BUTTON,
  NAVBAR_USER_MENU_CONTAINER,
  NAVBAR_USER_MENU_ITEM_DELETE,
  NAVBAR_USER_MENU_ITEM_EDIT,
  NAVBAR_USER_MENU_ITEM_SYNC_DEVICE,
  NAVBAR_NAVIGATION_MENU_BUTTON,
  NAVBAR_NAVIGATION_MENU_ITEM_HISTORY,
  NAVBAR_NAVIGATION_MENU_ITEM_CUSTOM_ADD,
  NAVBAR_NAVIGATION_MENU_ITEM_CUSTOM_DELETE,
  NAVBAR_NAVIGATION_MENU_ITEM_SESSION,
} from './data-testid'

export default function NavBar({ pageTitle }) {
  const { user, deleteUser, editUser } = useUserContext()
  const { deleteCustomSessions } = useSessionContext()
  const router = useRouter()

  return (
    <AppBar position="static" data-testid={NAVBAR_CONTAINER}>
      <Toolbar>
        <NavBarMenu
          data-testid={NAVBAR_NAVIGATION_MENU_BUTTON}
          MenuIcon={MoreVertIcon}
          options={[
            {
              id: 'booking-history',
              Icon: HistoryIcon,
              label: 'History',
              'data-testid': NAVBAR_NAVIGATION_MENU_ITEM_HISTORY,
              disabled: !user,
            },
            {
              id: 'session',
              Icon: ListAltIcon,
              label: 'Sessions',
              'data-testid': NAVBAR_NAVIGATION_MENU_ITEM_SESSION,
              disabled: !user,
            },
            {
              id: 'add-custom-session',
              Icon: AddBoxIcon,
              label: 'Add Custom',
              'data-testid': NAVBAR_NAVIGATION_MENU_ITEM_CUSTOM_ADD,
              disabled: !user,
            },
            {
              id: 'delete-custom-session',
              Icon: DeleteOutlineIcon,
              label: 'Delete All',
              'data-testid': NAVBAR_NAVIGATION_MENU_ITEM_CUSTOM_DELETE,
              disabled: !user,
            },
            {
              id: 'sync-devices-divider',
              Component: Divider,
            },
            {
              id: 'sync-devices',
              Icon: SyncIcon,
              label: 'Sync Devices',
              'data-testid': NAVBAR_USER_MENU_ITEM_SYNC_DEVICE,
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

              case 'add-custom-session':
                router.push('/sessions/new')
                break

              case 'delete-custom-session':
                deleteCustomSessions()
                break

              case 'sync-devices':
                router.push('/sync/devices')
                break

              default:
            }
          }}
        />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {pageTitle}
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
