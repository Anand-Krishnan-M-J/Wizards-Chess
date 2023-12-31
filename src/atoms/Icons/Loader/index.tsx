import styles from "./styles.module.scss"
export const Loader = () => {
    return (
        <div className={styles.spinner__container}>
            <svg className={styles.main_wand} id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 103.84 103.6">
                <title>spinner</title>
                <path  className={styles.stars1} d="M57.31,33.38a6.11,6.11,0,0,1-6.1-6.1,1.41,1.41,0,0,0-2.82,0,6.11,6.11,0,0,1-6.1,6.1,1.41,1.41,0,0,0,0,2.82,6.11,6.11,0,0,1,6.1,6.1,1.41,1.41,0,1,0,2.82,0,6.11,6.11,0,0,1,6.1-6.1,1.41,1.41,0,0,0,0-2.82Zm-7.51,4.13a9,9,0,0,0-2.72-2.72,9,9,0,0,0,2.72-2.72,9,9,0,0,0,2.72,2.72A9,9,0,0,0,49.79,37.51Z" transform="translate(-5.74 -5.74)" />
                <path className={styles.stars2} d="M87.82,50.75a2.35,2.35,0,0,1-2.35-2.35,1.41,1.41,0,1,0-2.82,0,2.35,2.35,0,0,1-2.35,2.35,1.41,1.41,0,1,0,0,2.82,2.35,2.35,0,0,1,2.35,2.35,1.41,1.41,0,1,0,2.82,0,2.35,2.35,0,0,1,2.35-2.35,1.41,1.41,0,1,0,0-2.82Zm-3.76,2.44-.92-.92.92-.92.92.92Z" transform="translate(-5.74 -5.74)" />
                <path className={styles.stars3} d="M82.66,69.38a6.11,6.11,0,0,1-6.1-6.1,1.41,1.41,0,0,0-2.82,0,6.11,6.11,0,0,1-6.1,6.1,1.41,1.41,0,1,0,0,2.82,6.11,6.11,0,0,1,6.1,6.1,1.41,1.41,0,1,0,2.82,0,6.11,6.11,0,0,1,6.1-6.1,1.41,1.41,0,0,0,0-2.82Zm-7.51,4.13a9,9,0,0,0-2.72-2.72,9,9,0,0,0,2.72-2.72,9,9,0,0,0,2.72,2.72A9,9,0,0,0,75.15,73.51Z" transform="translate(-5.74 -5.74)" />
                <path className={styles.stars4} d="M79,27.15A2.35,2.35,0,0,1,76.6,24.8a1.41,1.41,0,1,0-2.82,0,2.35,2.35,0,0,1-2.35,2.35,1.41,1.41,0,1,0,0,2.82,2.35,2.35,0,0,1,2.35,2.35,1.41,1.41,0,0,0,2.82,0A2.35,2.35,0,0,1,79,30a1.41,1.41,0,0,0,0-2.82ZM75.2,29.58l-.92-.92.92-.92.92.92Z" transform="translate(-5.74 -5.74)" />
                <path className={styles.wandfill} d="M33,83.24,60.91,55.36,58.25,52.7,30.37,80.59A1.88,1.88,0,1,0,33,83.24Z" transform="translate(-5.74 -5.74)" />
                <path className={styles.wand} d="M72.86,40.74a5.63,5.63,0,0,0-8,0L53.48,52.16,27.72,77.93a5.63,5.63,0,0,0,8,8L64.35,57.23l8.52-8.52A5.63,5.63,0,0,0,72.86,40.74ZM33,83.24a1.88,1.88,0,0,1-2.66-2.66L58.25,52.7l2.66,2.66ZM70.2,46.06,63.56,52.7,60.9,50l6.65-6.63a1.88,1.88,0,0,1,2.65,2.65Z" transform="translate(-5.74 -5.74)" />
            </svg>
            <div className={styles.spinner}></div>
        </div>
    )
}
