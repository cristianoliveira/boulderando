type FieldProps = {
  'data-testid': string
  name: string
  label: string
  register(name: string, opts?: object): object
  formControl?: object
  placeholder?: string
}

type SelectProps = {
  selectOptions: Array<{ label: string; value: string }>
}
