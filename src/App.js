import { useState, useEffect } from "react";
import ImageUploader from "./components/imageUploader/ImageUploader";
import DisplayImage from "./components/displayimage/DisplayImage";
import "./App.css";

function App() {
  const [url, setURL] = useState("");
  const [loading, setLoading] = useState(false);

  const [finishedUploading, setFinishedUploading] = useState(false);

  useEffect(() => {
    if (finishedUploading) {
      setLoading(false);
    }
  }, [finishedUploading]);

  return (
    <>
      <div className="App">
        {!finishedUploading && (
          <ImageUploader
            setURL={setURL}
            setLoading={setLoading}
            loading={loading}
            setFinishedUploading={setFinishedUploading}
          />
        )}

        {finishedUploading && <DisplayImage url={url} />}
      </div>
      <footer className="footer">
        <p>&copy; Ikoyo Daniel OMovigho </p>
      </footer>
    </>
  );
}

export default App;
