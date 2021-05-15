import style from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={style.wrapper}>
        <h1>Uploading...</h1>
      <div className={style.loadingcontainer}>
          <div className={style.loader}></div>
      </div>
    </div>
  );
};

export default Loader;
