import Header from './Header'
import SideBar from './SideBar'

export default function Layout({children}) {
  return (
    <Header>
      <SideBar>
        {children}
      </SideBar>
    </Header>
  )
}