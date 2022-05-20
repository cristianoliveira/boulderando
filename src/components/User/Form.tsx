import styled from '@emotion/styled'

import { useForm, FieldError } from 'react-hook-form'

import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'

import PhoneField from '../fields/PhoneField'
import TextField from '../fields/TextField'
import DateField from '../fields/DateField'

import * as TID from '../../constants/data-testid'

const StyledForm = styled.form`
  padding: 20px;
`

const FULL_GRID = 12

type UserFormProps = {
  user?: User
  telegramIdParam: string
} & Submitable

const showErrorFields = (errors: Partial<FieldError>) =>
  Object.keys(errors)
    .map((e) => e)
    .join(', ')

function Form({ user, telegramIdParam, onSubmit }: UserFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isSubmitted },
  } = useForm({
    defaultValues: {
      ...user,
      type: 'Urban Sports Club',
    },
  })

  setValue('telegram_id', telegramIdParam || user?.telegram_id)

  const errorsList = showErrorFields(errors as Partial<FieldError>)
  return (
    <StyledForm
      onSubmit={handleSubmit((data) => {
        onSubmit(data)
      })}
    >
      <Grid
        direction="row"
        alignItems="flex-start"
        spacing={2}
        container
      >
        <Grid item xs={FULL_GRID / 2}>
          <TextField
            data-testid={TID.USER_INPUT_FIRST_NAME}
            name="name"
            label="First Name"
            register={register}
          />
        </Grid>
        <Grid item xs={FULL_GRID / 2}>
          <TextField
            data-testid={TID.USER_INPUT_LAST_NAME}
            name="last_name"
            label="Last Name"
            register={register}
          />
        </Grid>
        <Grid item xs={FULL_GRID}>
          <DateField
            data-testid={TID.USER_INPUT_BIRTHDAY}
            name="birthday"
            label="Birthday"
            register={register}
          />
        </Grid>
        <Grid item xs={FULL_GRID}>
          <TextField
            data-testid={TID.USER_INPUT_STREET_ADDRESS}
            name="address"
            label="Street address"
            register={register}
          />
        </Grid>
        <Grid item xs={FULL_GRID / 2}>
          <TextField
            data-testid={TID.USER_INPUT_POSTALCODE}
            name="postal_code"
            label="Postal Code"
            register={register}
          />
        </Grid>
        <Grid item xs={FULL_GRID / 2}>
          <TextField
            data-testid={TID.USER_INPUT_CITY}
            name="city"
            label="City"
            register={register}
          />
        </Grid>
        <Grid item xs={FULL_GRID}>
          <TextField
            data-testid={TID.USER_INPUT_EMAIL}
            name="email"
            label="Email"
            register={register}
          />
        </Grid>
        <Grid item xs={FULL_GRID}>
          <PhoneField
            data-testid={TID.USER_INPUT_PHONE_NUMBER}
            name="phone_number"
            label="Phone Number"
            register={register}
          />
        </Grid>
        <Grid item xs={FULL_GRID}>
          <div style={{ visibility: 'hidden', height: 0 }}>
            <TextField data-testid="type" name="type" register={register} />
          </div>
          <TextField
            data-testid={TID.USER_INPUT_URBAN_SPORT_NUMBER}
            name="usc_number"
            label="Urban Sports Club No."
            register={register}
          />
          <FormHelperText>Your USB member number.</FormHelperText>
        </Grid>
        <Grid item xs={FULL_GRID}>
          {isSubmitted && !isValid && errorsList && (
            <Alert
              data-testid={TID.USER_FORM_ERROR_MESSAGE_CONTAINER}
              severity="error"
            >
              All fields are required. Missing fields: {errorsList}
            </Alert>
          )}
        </Grid>
      </Grid>
      <FormControl fullWidth>
        <Button
          data-testid={TID.USER_FORM_SUBMIT_BUTTON}
          variant="contained"
          type="submit"
        >
          Save data
        </Button>
      </FormControl>
      <FormHelperText variant="outlined">
        Your personal data is stored only in your browser and can be deleted at
        any time. When scheduling specific sessions, your data is transmitted to
        the corresponding Gym using the Dr. Plano booking system. By scheduling
        sessions you&apos;re automatically agreeing to the Terms and Conditions
        and Privacy Policy of that Gym.
      </FormHelperText>
    </StyledForm>
  )
}

export default Form
