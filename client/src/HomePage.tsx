import "./stylesheets/homepage.css"
import {Link} from "wouter";

const HomePage = () => {


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
            <div className="home-page">
                <h1>Welcome to the Home Page</h1>
                <p>This is the home page of your application.</p>
            </div>
        </>
    );
}

export default HomePage;