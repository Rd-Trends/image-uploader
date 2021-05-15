import { useState, useRef } from "react";
import style from "./Imageuploader.module.css";
import { firebaseStorage } from "../../firebase/firebase";
import uploadImage from "../../images/imageuploader.svg";
import Loader from "../loader/Loader";

const ImageUploader = ({
  setURL,
  setFinishedUploading,
  setLoading,
  loading,
}) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(false);
  // const [loading, setLoading] = useState(false);
  const previewImageRef = useRef();
  const inputRef = useRef();

  const onDragOverEvent = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDragEnterEvent = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDragLeaveEvent = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDropEvent = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let dt = e.dataTransfer;
    setFile(dt.files[0]);
    previewFile(dt.files[0]);
    console.log(e.dataTransfer);
    setPreview(true);
  };

  const previewFile = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      previewImageRef.current.src = reader.result;
    };
  };

  function handleUpload(e) {
    e.preventDefault();
    const uploadTask = firebaseStorage.ref(`/images/${file.name}`).put(file);
    uploadTask.on("state_changed", setLoading(true), console.error, () => {
      firebaseStorage
        .ref("images")
        .child(file.name)
        .getDownloadURL()
        .then((url) => {
          setFile(null);
          setURL(url);
          setFinishedUploading(true);
          console.log(url);
        });
    });
  }

  const handleInputChange = (e) => {
    const inputFile = e.target.files[0];
    setFile(inputFile);
    setPreview(true);
    previewFile(inputFile);
  };

  const deleteFile = () => {
    setFile(null);
    setPreview(false);
  };

  return (
    <>
      {!loading && (
        <div className={style.wrapper}>
          <div className={style.info}>
            <h1>Upload your image</h1>
            <p>file should be Jpeg, Png....</p>
          </div>
          <div className={style.imageform}>
            <form onSubmit={handleUpload}>
              <div
                className={style.draganddrop}
                onDragOver={onDragOverEvent}
                onDragEnter={onDragEnterEvent}
                onDragLeave={onDragLeaveEvent}
                onDrop={onDropEvent}
              >
                {preview ? (
                  <img
                    src=""
                    alt="preview"
                    className={style.imagepreview}
                    ref={previewImageRef}
                  />
                ) : (
                  <>
                    <img src={uploadImage} alt="" />{" "}
                    <p>Drag & Drop your image here</p>
                  </>
                )}
              </div>
              <p>or</p>
              <input
                className={style.input}
                type="file"
                id="fileElem"
                accept="image/*"
                onChange={handleInputChange}
                ref={inputRef}
              />
              {preview ? (
                <button className={style.label}>Upload</button>
              ) : (
                <label className={style.label} htmlFor="fileElem">
                  choose a file
                </label>
              )}
            </form>
            {preview && (
              <button className={style.deletefile} onClick={deleteFile}>
                delete file
              </button>
            )}
          </div>
        </div>
      )}
      {loading && <Loader />}
    </>
  );
};

export default ImageUploader;
