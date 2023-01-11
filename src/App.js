import React from "react";
import { Route, Switch } from "react-router-dom";

import Header from "./components/PizzaBlock/Header";
import Cart from "./Pages/Cart";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";

function App() {
  return (
    <>
      <div className="wrapper">
        <Header />
        <div className="content">
          <Switch>
            <Route path="/cart" exact component={Cart} />
            <Route path="/" exact render={() => <Home />} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </div>
    </>
  );
}

export default App;
