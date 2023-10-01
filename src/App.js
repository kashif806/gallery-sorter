import React, { useState } from "react";
import Main from "./components/Main/Main";
import CheckSource from "./components/CheckSource/CheckSource";
import Welcome from "./components/Welcome/Welcome";
import { getOS } from "./helpers/helpers.js";
import MacNMobileAndroid from "./components/MacNMobileAndroid/MacNMobileAndroid.js";
import MacNComputer from "./components/MacNComputer/MacNComputer.js";

function App() {
  const [ready, setReady] = useState(false);
  const [source, setSource] = useState(null);
  const OS = getOS();
  return (
    <>
      <Welcome ready={ready} setReady={setReady} />
      {ready &&
        (source ? (
          source == "mobileAndroid" && OS == "Mac" ? (
            <MacNMobileAndroid setSource={setSource} />
          ) : source == "computer" && OS == "Mac" ? (
            <MacNComputer />
          ) : (
            "invalid source or OS"
          )
        ) : (
          <CheckSource source={source} setSource={setSource} />
        ))}
    </>
  );
}

export default App;
