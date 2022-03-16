import React from 'react';
import styled from '@emotion/styled'
import { useRouter } from 'next/router'

import { Typography, Grid, Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import UserIcon from '@mui/icons-material/Person'
import EditIcon from '@mui/icons-material/Edit'

import SessionsSelector from '../src/components/Sessions'

const UserProfile = styled.span`
  vertical-align: super;
`

export default function SessionSelectPage() {
  return (
    <>
      <SessionsSelector />
    </>
  )
}
