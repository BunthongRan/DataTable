const { default: Footer } = require("./footer")
const { default: NavBar } = require("./navbar")

const Layout = ({children}) => {
    return(
        <>
        <NavBar/>
        <main>{children}</main>
        <Footer/>
        </>
    )
}
export default Layout