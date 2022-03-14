import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Input from '@mui/material/Input'

export default function TextField({ name, label, description, register, required, options = {} }) {
  const { formControl, input } = options
  return (
    <FormControl fullWidth margin="dense" {...formControl}>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Input
        type="tel"
        placeholder="0000 00000000"
        id={name}
        name={name}
        aria-describedby={`Input for ${name}`}
        {...input}
        {...register(name, { required: true })}
      />
    </FormControl>
  )
}
