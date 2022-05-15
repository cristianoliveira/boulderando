interface Visible {
  isVisible: boolean
}

interface Clickable {
  onClick: (event: React.SyntheticEvent<any, any | undefined>) => void
}

interface Disableable {
  disabled: boolean
}
