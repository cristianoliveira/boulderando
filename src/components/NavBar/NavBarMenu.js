import * as React from 'react'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'

const ITEM_HEIGHT = 48

export default function LongMenu({ MenuIcon, options, onClick, ...props }) {
  const [selected, setSelected] = React.useState("")
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
        data-testid={props['data-testid']}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {options.map(({ id, Icon, label, ...oProps }) => (
          <MenuItem
            key={id}
            selected={id === selected}
            onClick={() => {
              setSelected(id);
              onClick({ id, label });
              handleClose()
            }}
            {...oProps}
          >
          {Icon && (
            <ListItemIcon>
              <Icon fontSize="small" />
            </ListItemIcon>
          )}
            <ListItemText>{label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
