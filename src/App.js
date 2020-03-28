import React from "react";
import { Route, BrowserRouter, Redirect } from "react-router-dom";
import "./App.sass";
import SignIn from "./components/Home";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="App">
      <main>
        <BrowserRouter>
          <div>
            <Route exact path="/login" component={SignIn} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
          </div>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;
