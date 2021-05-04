import Link from 'next/link'
import styles from '@/styles/Footer.module.css'


export default function Footer() {
    return (
        <footer className={styles.footer}>
            <p>Copyright &copy; Bill J. Cotter 2021</p>
            <Link href='/about'>About</Link>
        </footer>
    )
}
