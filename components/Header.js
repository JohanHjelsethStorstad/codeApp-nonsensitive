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
                <Link href="/code" className={heighlight("/code")}>code</Link>
                <Link href="/account" className={heighlight("/account")}>my account</Link>
                <Link href="/administrator" className={heighlight("/administrator")}>administrator</Link>
            </nav>
        </header>
    )
}

export default Header