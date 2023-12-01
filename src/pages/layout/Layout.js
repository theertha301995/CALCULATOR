import { Outlet, Link } from "react-router-dom";
import styles from './layout.module.css';
import { NavLink } from "react-router-dom";
const Layout = () => {

    return (
        <div className={styles.divStyling}>
            <nav className={styles.navStyling}>
                <ul className={styles.ul}>
                    <li className={styles.li}>
                        {/* <Link to="/" className={styles.a} >Home</Link> */}
                        <NavLink
                            to="/"
                            className={({ isActive, isPending }) =>
                                isPending ? `${styles.a} pending` : isActive ? `${styles.a} ${styles.active}` : `${styles.a}`
                            }
                        >
                            Home
                        </NavLink>
                    </li>
                    <li className={styles.li}>
                        {/* <Link to="/calculator" className={styles.a} activeClassName={styles.active}>Calculator</Link> */}
                        <NavLink
                            to="/calculator"
                            className={({ isActive, isPending }) =>
                                isPending ? `${styles.a}` : isActive ? `${styles.a} ${styles.active}` : `${styles.a}`
                            }
                        >
                            Calculator
                        </NavLink>
                    </li>
                </ul>
            </nav>

            <Outlet />
        </div>
    )
};

export default Layout;