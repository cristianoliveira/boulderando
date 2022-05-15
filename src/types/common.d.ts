interface Visible {
  isVisible: boolean;
}

interface Clickable {
  onClick: (event: JSX.NativeUIEvent) => void;
}

interface Disableable {
  disabled: boolean;
}
