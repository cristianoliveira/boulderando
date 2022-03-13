import styled from '@emotion/styled'

import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input'

const StyledFormControl = styled(FormControl)`
  & input {
    text-align: right;
  }
`

export default function DateField({ name, label, description, register, options = {} }) {
  const { formControl, input } = options
  return (
    <StyledFormControl fullWidth margin="dense" {...formControl}>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Input
        type="date"
        id={name}
        name={name}
        aria-describedby={`Input for ${name}`}
        {...input}
        {...register(name)}
      />
    </StyledFormControl>
  )
}
