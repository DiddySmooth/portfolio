import NavButton from "./NavButton"
const NavBar = (props) => {
    return(
        <div className="navBar">
            <NavButton buttonText="About"/>
            <NavButton buttonText="Skills"/>
            <NavButton buttonText="Experience"/>
            <NavButton buttonText="Education"/>
            <NavButton buttonText="Contact"/>
        </div>
        
    )
}
export default NavBar