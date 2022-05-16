import styled from '@emotion/styled'

import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input'

const StyledFormControl = styled(FormControl)`
  & input {
    text-align: right;
  }
`

export default function DateField({
  name,
  label,
  register,
  formControl,
  ...props
}: FieldProps): JSX.Element {
  return (
    <StyledFormControl fullWidth margin="dense" {...formControl}>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Input
        type="date"
        id={name}
        name={name}
        aria-describedby={`Input for ${name}`}
        {...props}
        {...register(name)}
      />
    </StyledFormControl>
  )
}
