import NavButton from "./NavButton"
import { Link } from 'react-router-dom'
import '../Styles/NavBar.css'
const NavBar = (props) => {
    return(
        <div className="navBar">

            <Link className="navButton" to="/">Home</Link>
            <Link className="navButton" to="/skills">Skills</Link>
            <Link className="navButton" to="/experience">Experience</Link>
            <Link className="navButton" to="/contact">Contact</Link>
            

        </div>
        
    )
}
export default NavBar