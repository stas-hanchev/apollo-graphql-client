import { Outlet } from 'react-router'
import Header from './Header'
import { useLinkSubscriptions } from '../hooks/useLinkSubscriptions'
import { useSessionCheck } from '../hooks/useSessionCheck'
import { Layout, Main } from '../styled/App.styled'

function RootLayout() {
  useSessionCheck()
  useLinkSubscriptions()

  return (
    <Layout maxWidth="md" disableGutters>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </Layout>
  )
}

export default RootLayout
