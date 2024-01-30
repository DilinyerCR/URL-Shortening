import styles from './Shortening.module.css'


const Shortening = () => {
    return (
      <div className={styles.ShorteningMainContainer}>

        {/* imput */}
        <div className={styles.InputAndButtonContainer}>
          <div className={styles.InputContainer}>
            <input type="text" placeholder="Shorten a link here..." />
            <p className={styles.InputError}>Please add a link</p>
          </div>

          <div className={styles.ButtonContainer}>
            <button>Shorten It!</button>
          </div>
        </div>



        {/* Links */}
        <div className={styles.AllLinksContainer}>

          <div className={styles.LinkMainContainer}>
            <div className={styles.OriginalLinkContainer}>
              <p>https://www.frontendmentor.io/home</p>
            </div>

            <div className={styles.LinkShortenAndButtonContainer}>
              <div className={styles.LinkShortedContainer}>
                <a>https://rel.ink/gxOXp9</a>
              </div>

              <div className={styles.LinksCopyButtonContainer}>
                <button>Copy</button>
              </div>
            </div>
          </div>

          <div className={styles.LinkMainContainer}>
            <div className={styles.OriginalLinkContainer}>
              <p>https://www.frontendmentor.io/home</p>
            </div>

            <div className={styles.LinkShortenAndButtonContainer}>
              <div className={styles.LinkShortedContainer}>
                <a>https://rel.ink/gxOXp9</a>
              </div>

              <div className={styles.LinksCopyButtonContainer}>
                <button>Copy</button>
              </div>
            </div>
          </div>

          <div className={styles.LinkMainContainer}>
            <div className={styles.OriginalLinkContainer}>
              <p>https://www.frontendmentor.io/home</p>
            </div>

            <div className={styles.LinkShortenAndButtonContainer}>
              <div className={styles.LinkShortedContainer}>
                <a>https://rel.ink/gxOXp9</a>
              </div>

              <div className={styles.LinksCopyButtonContainer}>
                <button>Copy</button>
              </div>
            </div>
          </div>







        </div>

      </div>
    );
}

export default Shortening