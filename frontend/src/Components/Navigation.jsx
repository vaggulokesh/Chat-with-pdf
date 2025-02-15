import React from "react"
import styles from "./Navigation.module.css"
import { Link } from "react-router-dom"
const Navigation = () => {
    return (
        <> 
            <nav className={styles.nav}>
                <ul>
                    <li>
                        <Link to="/Home">Home</Link>
                    </li>
                </ul>
                <ul>
                    <li>
                        <Link to="/FAQ">FAQ</Link>
                    </li>
                </ul>
                <div className={styles.right}>
                    <ul>
                        <li>
                            <Link to="/Login">Login</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}
export default Navigation