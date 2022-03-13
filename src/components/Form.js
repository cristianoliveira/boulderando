import { useState } from 'react'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputLabel from '@mui/material/InputLabel'
import Input from '@mui/material/Input'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import styled from '@emotion/styled'
import { useForm } from 'react-hook-form'
import TextField from './TextField'
import DateField from './DateField'

const StyledForm = styled.form`
  padding: 20px;
`

const FULL_GRID = 12

function Form({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <Grid
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        spacing={2}
        container
      >
        <Grid item xs={FULL_GRID / 2}>
          <TextField name="name" label="First Name" register={register} required />
        </Grid>
        <Grid item xs={FULL_GRID / 2}>
          <TextField name="last_name" label="Last Name" register={register} />
        </Grid>
        <Grid item xs={FULL_GRID}>
          <DateField name="birthday" label="Birthday" register={register} />
        </Grid>
        <Grid item xs={FULL_GRID}>
          <TextField
            name="address"
            label="Street address"
            register={register}
          />
        </Grid>
        <Grid item xs={FULL_GRID / 2}>
          <TextField
            name="postal_code"
            label="Postal Code"
            register={register}
          />
        </Grid>
        <Grid item xs={FULL_GRID / 2}>
          <TextField
            name="city"
            label="City"
            value="Berlin"
            register={register}
          />
        </Grid>
        <Grid item xs={FULL_GRID}>
          <TextField name="email" label="Email" register={register} />
        </Grid>
        <Grid item xs={FULL_GRID}>
          <TextField
            name="usc_number"
            label="Urban Sports Club No."
            register={register}
          />
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
