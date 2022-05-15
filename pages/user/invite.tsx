import { Container, Grid, Typography, Link } from '@mui/material'
import useEnvironment from '../../src/context/Environment'

import { USER_TELEGRAM_GROUP_LINK } from '../../src/constants/data-testid'

export default function UserInvite({
  setPageTitle,
}: PageWithTitle): JSX.Element {
  setPageTitle('Invite user')

  const { configs } = useEnvironment()

  return (
    <Container>
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '90vh' }}
      >
        <Typography variant="h4">{"Let's boulder!"}</Typography>
        <Typography>
          First, you are not an user of our group. Please join using the link
          below
        </Typography>
        <Link
          data-testid={USER_TELEGRAM_GROUP_LINK}
          href={configs.telegramInviteLink}
        >
          Invite to Boulderando.
        </Link>
      </Grid>
    </Container>
  )
}
