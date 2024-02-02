import styles from './Shortening.module.css'
import { useState } from 'react';


const Shortening = () => {
  // * API Key para la API de TinyURL
  const API_KEY = "MSrganNsFvoTFs4DTdYxDzWc4yOXNiVoGIQeYbd8Ho8uQWbg7LKWTmyFSu0J"

  // ! Se definen los estados locales del componente.
  // * Estado para almacenar la URL introducida por el usuario.
  const [inputValue, setInputValue] = useState('');

  // * Estado para almacenar la URL acortada.
  const [tinyUrl, setTinyUrl] = useState('');

  // * Estado para almacenar una lista de todos los enlaces acortados.
  const [links, setLinks] = useState([]);

  // * Estado para mostrar mensajes de error al usuario.
  const [error, setError] = useState(null);

  // * Estado para almacenar el texto de los botones de copia.
  const [buttonTexts, setButtonTexts] = useState([]);

  // * Estado para indicar el índice del enlace copiado.
  const [copiedIndex, setCopiedIndex] = useState(null);


    // * Función para actualizar el estado `inputValue` con la URL introducida por el usuario.
    const handleInputChange  = (e) => {
      setInputValue(e.target.value)
      setError(null);
    }


    // * Función para validar la URL y enviar una solicitud a la API de TinyURL.
    const handleSubmit = async (e) => {
      e.preventDefault();

      // * Valida si se ha introducido una URL.
      if (inputValue) {
        try {
          // * Envía una solicitud a la API de TinyURL.
          const response = await fetch(
            `https://tinyurl.com/api-create.php?url=${inputValue}&api_key=${API_KEY}`
          );
          
          // * Si la solicitud es correcta, se procesa la respuesta.
          if (response.ok) {
            const data = await response.text();
            const newLink = {
              originalUrl: inputValue,
              tinyUrl: data,
            };

            // * Se actualiza el estado con la nueva URL acortada y se añade a la lista de enlaces.
            setLinks([...links, newLink]); // * Añade el nuevo enlace a la lista
            setTinyUrl(data);
            setButtonTexts((prevButtonTexts) => [...prevButtonTexts, "Copy"]);
          } 
    
        } catch (error) {
          console.error(error);
        }
      } else {
        // * Se muestra un mensaje de error si no se ha introducido una URL.
        setError("Please add a link");
      }
    };


    // * Función para copiar la URL acortada al portapapeles y actualizar el texto del botón de copia.
    const handleCopy = (url, index) => {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          const newButtonTexts = [...buttonTexts];
          newButtonTexts[index] = "Copied!";
          setButtonTexts(newButtonTexts);

          // * Si hay un índice de botón copiado anterior, se restaura su estado.
          if (copiedIndex !== null && copiedIndex !== index) {
            newButtonTexts[copiedIndex] = "Copy";
            setButtonTexts(newButtonTexts);
          }

          // * Se actualiza el estado del índice del enlace copiado.
          setCopiedIndex(index);
        })
        .catch((error) => {
          console.error("Error al copiar el link:", error);
        });
    };

    

    return (
      <div className={styles.ShorteningMainContainer}>

        {/* // * Formulario de entrada */}
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


        {/* // * Contenedor para todos los enlaces */}
        <div className={styles.AllLinksContainer}>
          {/* // * Mapear la lista de enlaces y mostrar cada enlace en un contenedor */}
          {links.map((link, index) => (
            <div className={styles.LinkMainContainer}>
              {/* // * Contenedor para el enlace original */}
              <div className={styles.OriginalLinkContainer}>
                <p>{link.originalUrl}</p>
              </div>


              {/* // * Contenedor para el enlace acortado y el botón de copia */}
              <div className={styles.LinkShortenAndButtonContainer}>
                {/* // * Contenedor para el enlace acortado */}
                <div className={styles.LinkShortedContainer}>
                  <a href={link.originalUrl} target="_blank">
                    {link.tinyUrl}
                  </a>
                </div>

                {/* // *Contenedor para el botón de copia */}
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