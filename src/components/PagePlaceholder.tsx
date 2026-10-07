import type { ReactNode } from 'react'
import { Typography } from '@mui/material'
import { Status } from '../styled/LinkList.styled'

interface Props {
  title: string
  children?: ReactNode
}

function PagePlaceholder({ title, children }: Props) {
  return (
    <section>
      <Typography variant="h6" component="h1" gutterBottom>
        {title}
      </Typography>
      <Status>{children ?? 'Coming soon.'}</Status>
    </section>
  )
}

export default PagePlaceholder
