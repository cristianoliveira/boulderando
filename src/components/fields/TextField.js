import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Input from '@mui/material/Input'

export default function TextField({
  name,
  label,
  description,
  placeholder,
  value,
  register,
  required,
  formControl,
  ...props
}) {
  return (
    <FormControl fullWidth margin="dense" {...formControl}>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Input
        type="text"
        id={name}
        name={name}
        placeholder={placeholder}
        aria-describedby={`Input for ${name}`}
        {...props}
        {...register(name, { required: true })}
      />
    </FormControl>
  )
}
