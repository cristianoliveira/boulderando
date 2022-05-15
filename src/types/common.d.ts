interface Visible {
  isVisible: boolean
}

interface Clickable<Arg, Return = void> {
  onClick: (event: Arg) => Return
}

interface Disableable {
  disabled: boolean
}
