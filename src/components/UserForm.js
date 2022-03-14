import { useState } from 'react'
import styled from '@emotion/styled'

import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import { useForm } from 'react-hook-form'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

import PhoneField from './fields/PhoneField'
import TextField from './fields/TextField'
import DateField from './fields/DateField'

const StyledForm = styled.form`
  padding: 20px;
`

const FULL_GRID = 12

const showErrorFields = (errors) =>
  Object.keys(errors)
    .map((e) => e)
    .join(', ')

function Form({ user = {}, onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
  } = useForm({
    defaultValues: { type: 'Urban Sports Club', ...user },
  })

  const errorsList = showErrorFields(errors)
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
          <TextField name="name" label="First Name" register={register} />
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
          <TextField name="city" label="City" register={register} />
        </Grid>
        <Grid item xs={FULL_GRID}>
          <TextField name="email" label="Email" register={register} />
        </Grid>
        <Grid item xs={FULL_GRID}>
          <PhoneField
            name="phone_number"
            label="Phone Number"
            register={register}
          />
        </Grid>
        <Grid item xs={FULL_GRID}>
          <div style={{ visibility: 'hidden', height: 0 }}>
            <TextField name="type" register={register} />
          </div>
          <TextField
            name="usc_number"
            label="Urban Sports Club No."
            register={register}
          />
          <FormHelperText>Your USB member number.</FormHelperText>
        </Grid>
        <Grid item xs={FULL_GRID}>
          {isSubmitted && !isValid && errorsList && (
            <Alert severity="error">
              All fields are required. Missing fields: {errorsList}
            </Alert>
          )}
        </Grid>
      </Grid>
      <FormControl fullWidth>
        <Button variant="contained" type="submit">
          Save data
        </Button>
      </FormControl>
      <FormHelperText variant="outlined">
        ** This data is stored in your browser and can be deleted at any time
      </FormHelperText>
    </StyledForm>
  )
}

export default Form
