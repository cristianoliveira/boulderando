import * as React from 'react'
import { useRouter } from 'next/router'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import AccountCircle from '@mui/icons-material/AccountCircle'

import { UserContext } from '../context/User'

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

export default function NavBar() {
  const [auth, setAuth] = React.useState(true)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const userContext = React.useContext(UserContext)
  const { user, deleteUser, editUser } = userContext
  const router = useRouter()

  const handleChange = (event) => {
    setAuth(event.target.checked)
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" data-testid={NAVBAR_CONTAINER}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {PAGE_TITLES[router.asPath]}
          </Typography>
          {user && (
            <div>
              <IconButton
                data-testid={NAVBAR_USER_MENU_BUTTON}
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Box sx={{ m: 1 }}>
                  <AccountCircle />
                </Box>
                <Typography variant="h6" component="small" sx={{ flexGrow: 1 }}>
                  {user.name}
                </Typography>
              </IconButton>
              <Menu
                data-tesid={NAVBAR_USER_MENU_CONTAINER}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                keepMounted
                autoFocus
              >
                <MenuItem
                  data-testid={NAVBAR_USER_MENU_ITEM_DELETE}
                  onClick={deleteUser}
                >
                  Delete
                </MenuItem>
                <MenuItem
                  data-testid={NAVBAR_USER_MENU_ITEM_EDIT}
                  onClick={editUser}
                >
                  Edit
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
