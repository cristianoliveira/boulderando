type FieldProps = {
  name: string
  label: string
  description: string
  register(name: string, opts?: object): object
  formControl: object
  placeholder?: string
}

type SelectProps = {
  selectOptions: Array<{ label: string; value: string }>
}
