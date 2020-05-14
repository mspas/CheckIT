import React from "react";
import { HashRouter, Route, BrowserRouter, Redirect } from "react-router-dom";
import "./App.sass";
import Home from "./components/Home/Home";
import Dashboard from "./components/Dashboard/Dashboard.container";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <main>
          <HashRouter basename="/">
            <div>
              <Route path="/login" component={Home} />
              <Route path="/dashboard" component={Dashboard} />
              <Route
                exact
                path="/"
                render={() => <Redirect to="/dashboard" />}
              />
            </div>
          </HashRouter>
        </main>
      </div>
    );
  }
}

export default App;
