import "./stylesheets/homepage.css"
import { Link } from "wouter";

const NavBar = () => {


    return (
        <>
            <div className="navbar">
                <nav>
                    <ul className="nav-links">
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/login">Login</Link></li>
                        <li><Link href="/register">Register</Link></li>
                    </ul>
                </nav>
            </div>
        </>
    );
}

export default NavBar;