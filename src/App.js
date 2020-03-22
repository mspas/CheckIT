import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.sass";
import SignIn from "./components/Home";

function App() {
  return (
    <div className="App">
      <main>
        <Switch>
          <Route path="/" component={SignIn} exact />
          <Route path="/about" component={SignIn} />
          <Route path="/shop" component={SignIn} />
          <Route component={SignIn} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
