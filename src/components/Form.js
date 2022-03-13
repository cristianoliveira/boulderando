import { useState } from 'react'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputLabel from '@mui/material/InputLabel'
import Input from '@mui/material/Input'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import styled from '@emotion/styled'

const StyledFormControl = styled(FormControl)`
  & input {
    text-align: right;
  }
`
function FormDateInput({ name, label, description, options = {} }) {
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
      />
    </StyledFormControl>
  )
}
function FormInput({
  name,
  label,
  description,
  value,
  disclaimer,
  options = {},
}) {
  const { formControl, input } = options
  return (
    <FormControl fullWidth margin="dense" {...formControl}>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Input
        type={input?.type || 'text'}
        id={name}
        name={name}
        aria-describedby={`Input for ${name}`}
        value={value}
        {...input}
      />
    </FormControl>
  )
}

const StyledForm = styled.form`
  padding: 20px;
`

const FULL_GRID = 12

function Form({ onSubmit }) {
  return (
    <StyledForm onSubmit={onSubmit}>
      <Grid
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        spacing={2}
        container
      >
        <Grid item xs={FULL_GRID / 2}>
          <FormInput name="name" label="First Name" />
        </Grid>
        <Grid item xs={FULL_GRID / 2}>
          <FormInput name="last_name" label="Last Name" />
        </Grid>
        <Grid item xs={FULL_GRID}>
          <FormDateInput name="birthday" label="Birthday" />
        </Grid>
        <Grid item xs={FULL_GRID}>
          <FormInput name="address" label="Street address" />
        </Grid>
        <Grid item xs={FULL_GRID / 2}>
          <FormInput name="postal_code" label="Postal Code" />
        </Grid>
        <Grid item xs={FULL_GRID / 2}>
          <FormInput name="city" label="City" value="Berlin" />
        </Grid>
        <Grid item xs={FULL_GRID}>
          <FormInput name="email" label="Email" />
        </Grid>
        <Grid item xs={FULL_GRID}>
          <FormInput name="usc_number" label="Urban Sports Club No." />
          <FormHelperText>Your USB member number.</FormHelperText>
        </Grid>
      </Grid>
      <FormControl fullWidth>
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </FormControl>
      <FormHelperText variant="outlined">
        ** This data is stored in your browser and can be deleted at any time
      </FormHelperText>
    </StyledForm>
  )
}

export default Form
