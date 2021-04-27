import NavButton from "./NavButton"
import { Link } from 'react-router-dom'
const NavBar = (props) => {
    return(
        <div className="navBar">

            <Link className="navButton" to="/">Home</Link>
            <Link className="navButton" to="/">Skills</Link>
            <Link className="navButton" to="/experience">Experience</Link>
            <Link className="navButton" to="/contact">Contact</Link>
            

        </div>
        
    )
}
export default NavBar