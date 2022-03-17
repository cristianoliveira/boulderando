import { useRouter } from 'next/router'

import Head from 'next/head'
import Image from 'next/image'
import { Paper, Typography, Link, Container } from '@mui/material'
import UserForm from '../../src/components/User/Form'
import useUserContext from '../../src/context/User'

export default function UserEdit() {
  const { user, saveUser } = useUserContext()
  if (!user) {
    debugger
  }
  return (
    <Paper>
      <UserForm
        user={user}
        onSubmit={(data) => {
          saveUser(data)
        }}
      ></UserForm>
    </Paper>
  )
}
