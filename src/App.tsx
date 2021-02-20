import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { AutoScroll } from "./main";

function App() {
  return (
    <div className="App">
      <AutoScroll
        component={
          <div>
            <div>
              <img src={logo} alt="logo" />
            </div>
          </div>
        }
        height={400}
      />
    </div>
  );
}

export default App;
