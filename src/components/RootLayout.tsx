import { Outlet } from 'react-router'
import Header from './Header'
import { Layout, Main } from '../styled/App.styled'

function RootLayout() {
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
