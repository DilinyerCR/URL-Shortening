import styles from './Shortening.module.css'
import { useState, useEffect } from 'react';


const Shortening = () => {
  const API_KEY = "MSrganNsFvoTFs4DTdYxDzWc4yOXNiVoGIQeYbd8Ho8uQWbg7LKWTmyFSu0J"

    // * Se crea un estado local para guardar el valor del input
    const [ inputValue, setInputValue ] = useState('')

    // * Se crea un estado local para guardar el valor que proviene de la API, es decir la URL cortada
    const [tinyUrl, setTinyUrl] = useState("");

    
    const [links, setLinks] = useState([]);

    // * Esta funcion captura lo que se escriba en el input y guarda ese valor en el estado local "inputValue"
    const handleInputChange  = (e) => {
      setInputValue(e.target.value)
      setError(null);
    }


    const [error, setError] = useState(null);

    const [buttonTexts, setButtonTexts] = useState([]); 
    const [copiedIndex, setCopiedIndex] = useState(null); 

    // * Esta funcion se ejecuta cuando se haga submit, y a la vez ejecuta "fetchApi", es decir realiza la peticion a la API
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (inputValue) {
        // ! API Request
        try {
          const response = await fetch(
            `https://tinyurl.com/api-create.php?url=${inputValue}&api_key=${API_KEY}`
          );
    
          if (response.ok) {
            const data = await response.text();
            const newLink = {
              originalUrl: inputValue,
              tinyUrl: data,
            };
            setLinks([...links, newLink]); // Añade el nuevo enlace a la lista
            setTinyUrl(data);
            setButtonTexts((prevButtonTexts) => [...prevButtonTexts, "Copy"]);
          } 
    
        } catch (error) {
          console.error(error);
        }
      } else {
        setError("Please add a link");
      }
    };

    const handleCopy = (url, index) => {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          const newButtonTexts = [...buttonTexts];
          newButtonTexts[index] = "Copied!";
          setButtonTexts(newButtonTexts);

          // Si hay un índice de botón copiado anterior, restaurar su estado
          if (copiedIndex !== null && copiedIndex !== index) {
            newButtonTexts[copiedIndex] = "Copy";
            setButtonTexts(newButtonTexts);
          }

          setCopiedIndex(index);
        })
        .catch((error) => {
          console.error("Error al copiar el link:", error);
        });
    };

    

    return (
      <div className={styles.ShorteningMainContainer}>
        {/* imput */}
        <form className={styles.InputAndButtonContainer}>
          <div className={styles.InputContainer}>
            <input
              onChange={handleInputChange}
              type="text"
              placeholder="Shorten a link here..."
              style={{
                border: error ? "3px solid hsl(0, 87%, 67%)" : "none",
                color: error ? "hsl(0, 87%, 67%)" : "hsl(255, 11%, 22%)",
              }}
            />

            <p
              className={styles.InputError}
              style={{ display: error ? "block" : "none" }}
            >
              {error}
            </p>
          </div>

          <div className={styles.ButtonContainer}>
            <button onClick={handleSubmit}>Shorten It!</button>
          </div>
        </form>

        <div className={styles.AllLinksContainer}>
          {links.map((link, index) => (
            <div className={styles.LinkMainContainer}>
              <div className={styles.OriginalLinkContainer}>
                <p>{link.originalUrl}</p>
              </div>

              <div className={styles.LinkShortenAndButtonContainer}>
                <div className={styles.LinkShortedContainer}>
                  <a href={link.originalUrl} target="_blank">
                    {link.tinyUrl}
                  </a>
                </div>

                <div className={styles.LinksCopyButtonContainer}>
                  <button
                    onClick={() => handleCopy(link.tinyUrl, index)}
                    style={{
                      backgroundColor:
                        buttonTexts[index] === "Copied!"
                          ? "hsl(257, 27%, 26%)"
                          : "hsl(180, 66%, 49%)",
                    }}
                  >
                    {buttonTexts[index]}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}

export default Shortening