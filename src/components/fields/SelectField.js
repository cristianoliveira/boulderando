import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

export default function TextField({
  name,
  label: inputLabel,
  description,
  register,
  required,
  formControl,
  selectOptions = [{ label: '', value: '' }],
  ...props
}) {
  return (
    <FormControl fullWidth margin="dense" {...formControl}>
      <InputLabel htmlFor={name}>{inputLabel}</InputLabel>
      <Select
        id={name}
        name={name}
        aria-describedby={`Input for ${name}`}
        {...props}
        {...register(name, { required: true })}
      >
        {selectOptions.map(({ value, label }) => (
          <MenuItem key={value} data-testid={`option--${value}`} value={value}>{label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
