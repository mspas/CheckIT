import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import "./App.sass";
import SignIn from "./components/Home";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="App">
      <main>
        <BrowserRouter>
          <div>
            <Route path="/login" component={SignIn} exact />
            <Route path="/" component={Dashboard} />
          </div>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;
