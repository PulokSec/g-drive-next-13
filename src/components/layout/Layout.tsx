import styles from '../../styles/Home.module.css';
import Header from "</components/layout/Header>";
export function IndexLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header/>
      <main className={styles.main}>{children}</main>
    </div>
  );
}