import Header from './Header'
import SideBar from './SideBar'
import Footer from "./Footer"
import {ThemeProvider} from "@material-ui/core"
import {theme} from "../theme"

export default function Layout({children}) {
  return (
    <ThemeProvider theme={theme}>
      <Header>
        <SideBar>
          {children}
        </SideBar>
        <Footer/>
      </Header>
    </ThemeProvider>
  )
}