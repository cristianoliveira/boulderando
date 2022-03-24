import React from 'react'
import styled from '@emotion/styled'

import { Typography } from '@mui/material'

const StickyBadge = styled.div`
  position: absolute;
  background: green;
  color: white;
  top: 0;
  left: 0;
  width: 100%;
  text-align: center;
  font-size: 12px
`

function DryRunBadge({ isVisible }) {
  if (!isVisible) {
    return null;
  }

  return (
    <StickyBadge>
      <Typography variant="subtitle2">Is Dry Run</Typography>
    </StickyBadge>
  )
}

export default DryRunBadge
