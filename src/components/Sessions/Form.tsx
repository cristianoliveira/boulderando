import styled from '@emotion/styled'

import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import { useForm } from 'react-hook-form'
import Alert from '@mui/material/Alert'

import SelectField from '../fields/SelectField'

import * as TID from '../../constants/data-testid'

const StyledForm = styled.form`
  padding: 20px;
`

const FULL_GRID = 12

const showErrorFields = (errors: object): string =>
  Object.keys(errors)
    .map((e) => e)
    .join(', ')

// Sometime in life you have to just have faith
// range from 8:00 to 21:30
const timesSelection: Array<string> = [...Array(20).keys()]
  .filter((i) => i >= 8 && i <= 20)
  .map((i) => [`${i}:00 - ${i + 2}:00`, `${i}:30 - ${i + 2}:30`])
  .flat()

function Form({ onSubmit }: Submitable): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
  } = useForm({})

  const errorsList = showErrorFields(errors)
  return (
    <StyledForm
      onSubmit={handleSubmit((data) =>
        onSubmit({ ...data, day_of_week: data.human_date.replace(/this /, '') })
      )}
    >
      <Grid
        direction="row"
        alignItems="flex-start"
        spacing={2}
        container
      >
        <Grid item xs={FULL_GRID}>
          <SelectField
            data-testid={TID.CUSTOM_SESSION_FORM_GYM}
            name="gym_name"
            label="Gym"
            register={register}
            selectOptions={[
              { label: 'Boulderklub', value: 'boulderklub' },
              { label: 'Basement', value: 'basement' },
            ]}
          />
        </Grid>
        <Grid item xs={FULL_GRID}>
          <SelectField
            data-testid={TID.CUSTOM_SESSION_FORM_DAY}
            name="human_date"
            label="Day of the week"
            register={register}
            selectOptions={[
              { label: 'Monday', value: 'this monday' },
              { label: 'Tuesday', value: 'this tuesday' },
              { label: 'Wednesday', value: 'this wednesday' },
              { label: 'Thursday', value: 'this thursday' },
              { label: 'Friday', value: 'this friday' },
              { label: 'Saturday', value: 'this saturday' },
            ]}
          />
        </Grid>
        <Grid item xs={FULL_GRID}>
          <SelectField
            data-testid={TID.CUSTOM_SESSION_FORM_TIME}
            name="time"
            label="Time"
            register={register}
            selectOptions={timesSelection.map((time) => ({
              label: time,
              value: time,
            }))}
          />
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
          data-testid={TID.CUSTOM_SESSION_FORM_SUBMIT_BUTTON}
          variant="contained"
          type="submit"
        >
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
