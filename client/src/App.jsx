import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [response, setResponse] = useState(null);
  const [url, setUrl] = useState("");
  const [clicked, setClicked] = useState(false);
  const [showLink, setShowLink] = useState(false);

  useEffect(() => {
    if (clicked && response) {
      const timer = setTimeout(() => {
        setShowLink(true);
      }, 40000); // 40 seconds

      // Clean up the timer when the component is unmounted or the dependencies change
      return () => clearTimeout(timer);
    }
  }, [clicked, response]);
  const handleDeploy = () => {
    setClicked(true);
    fetch("http://localhost:9000/project", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: JSON.stringify({
        gitURL: url,
      }),
    })
      .then((response) => response.json())
      .then((data) => setResponse(data))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div>
      <h1>DeployEase</h1>
      <div>
        <label
          style={{
            color: "purple",
            margin: "1em",
            fontWeight: "700",
            fontSize: "1.5em",
          }}
        >
          Github URL :
        </label>
        <input
          style={{ fontWeight: "700", fontSize: "1.3em" }}
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter GitHub URL"
        />
      </div>
      <button style={{ color: "green", margin: "1em" }} onClick={handleDeploy}>
        Deploy
      </button>
      {!clicked && (
        <div style={{ margin: "1em", color: "yellow" }}>
          Note : Enter a Github repository link which is public.
        </div>
      )}

      {clicked && response && !showLink && ( <div style={{color:"Orange", fontSize:"1.5em"}}>Loading ...</div> )}

      { showLink && (
        <div>
          <p>Here is your deployed project:</p>
          <p>
            You can access it by this URL:{" "}
            <a style={{fontSize:"1.3em"}} href={response.data.url}>{response.data.url}</a>
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
