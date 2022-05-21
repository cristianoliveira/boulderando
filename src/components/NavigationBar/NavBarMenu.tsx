import { useState } from 'react'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import SvgIcon from '@mui/material/SvgIcon'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'

const ITEM_HEIGHT = 54

type MenuOptionId = string

type MenuOption = {
  id: MenuOptionId
  label: string
  'data-testid': string
  Icon?: OverridableComponent<any>
  Component?: OverridableComponent<any>
} & Partial<Disableable>

type LongMenuProps = {
  MenuIcon: typeof SvgIcon
  options: MenuOption[]
  'data-testid': string
} & Clickable<Partial<MenuOption>>

export default function LongMenu({
  MenuIcon,
  options,
  onClick,
  'data-testid': dataTestId,
}: LongMenuProps) {
  const [selected, setSelected] = useState<MenuOptionId>('')
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.SyntheticEvent<HTMLElement>) => {
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
        data-testid={dataTestId}
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
            maxHeight: ITEM_HEIGHT * 5,
            width: '20ch',
          },
        }}
      >
        {options.map(
          ({
            id,
            Icon,
            label,
            Component,
            'data-testid': optionDataTID,
            disabled,
          }: MenuOption) =>
            Component ? (
              <Component key={id} />
            ) : (
              <MenuItem
                key={id}
                selected={id === selected}
                onClick={() => {
                  setSelected(id)
                  onClick({ id, label })
                  handleClose()
                }}
                data-testid={optionDataTID}
                disabled={disabled}
              >
                {Icon && (
                  <ListItemIcon>
                    <Icon fontSize="small" />
                  </ListItemIcon>
                )}
                <ListItemText>{label}</ListItemText>
              </MenuItem>
            )
        )}
      </Menu>
    </>
  )
}
