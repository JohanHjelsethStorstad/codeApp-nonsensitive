import Link from "next/link"
import styles from "./Header.module.scss";
import { useRouter } from "next/router"

function Header() {
    const { pathname } = useRouter()
    const heighlight = ref => ref === pathname ? styles.heighlight : null

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link href="/">Code</Link>
            </div>
            <nav>
                <Link href="/code"><a className={heighlight("/code")}>code</a></Link>
                <Link href="/account"><a className={heighlight("/account")}>my account</a></Link>
                <Link href="/administrator"><a className={heighlight("/administrator")}>administrator</a></Link>
            </nav>
        </header>
    )
}

export default Header