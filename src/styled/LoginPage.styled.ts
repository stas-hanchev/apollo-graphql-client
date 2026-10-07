import styled from 'styled-components'
import { Paper } from '@mui/material'

export const Card = styled(Paper)`
  max-width: 400px;
  margin: ${({ theme }) => theme.spacing(4, 'auto', 0)};
  padding: ${({ theme }) => theme.spacing(3)};
  background: ${({ theme }) => theme.palette.background.paper};
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`
