import Image from 'next/image';
import styles from './style.css';

export default function FlagDisplay({ flagUrl, countryName }) {
  return (
    <div className={styles.flagContainer}>
      <Image
        src={flagUrl}
        alt={`Bandera de ${countryName}`}
        width={200}
        height={100}
        className={styles.flag}
      />
    </div>
  );
}