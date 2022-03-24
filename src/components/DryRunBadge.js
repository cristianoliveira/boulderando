import styled from '@emotion/styled'

import { Typography } from '@mui/material'

const StickyBadge = styled(Typography)`
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
      <StickyBadge variant="subtitle2" color="green">Is Dry Run</StickyBadge>
  )
}

export default DryRunBadge
