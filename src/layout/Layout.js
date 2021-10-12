import Header from './Header'
import SideBar from './SideBar'
import Footer from "./Footer"

export default function Layout({children}) {
  return (
    <Header>
      <SideBar>
        {children}
      </SideBar>
      <Footer/>
    </Header>
  )
}