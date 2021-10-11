import Header from './Header'
import SideBar from './SideBar'
import Footer from "./Footer"
import {ThemeProvider} from "@material-ui/core"

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