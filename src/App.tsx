import { useState } from "react";
import { styled } from "@linaria/react";

import { globalStyles } from "./global-styles.ts";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

const Logo = styled.img`
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
`;

const Card = styled.div`
  padding: 2em;
`;

const Docks = styled.p`
  color: #888;
`;

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className={globalStyles}>
      <div>
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <Logo src={viteLogo} alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <Logo src={reactLogo} alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <Card>
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </Card>
        <Docks>Click on the Vite and React logos to learn more</Docks>
      </div>
    </div>
  );
}

export default App;
