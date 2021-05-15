import { useRef } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import style from "./DisplayImage.module.css";

const DisplayImage = ({ url }) => {
  const inputRef = useRef();
  const alertBoxRef = useRef();

  const copyURL = () => {
    inputRef.current.select();
    inputRef.current.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    document.execCommand("copy");

    alertBoxRef.current.style.opacity = 1;
  };

  const hideAlertBox = () => {
    alertBoxRef.current.style.opacity = 0;
  };
  return (
    <>
      <div className={style.container}>
        <span>{<AiFillCheckCircle />}</span>
        <h1>Uploaded Successfully!</h1>
        <img src={url} alt="uploaded" />
        <div className={style.form}>
          <input ref={inputRef} defaultValue={url} type="text" />
          <button onClick={copyURL}>copy</button>
        </div>
      </div>
      <div ref={alertBoxRef} className={style.alertbox}>
        <p>URL copied to clipboard</p>
        <button onClick={hideAlertBox}>ok</button>
      </div>
    </>
  );
};

export default DisplayImage;
