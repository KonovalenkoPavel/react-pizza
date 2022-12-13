import React from "react";
import { Route, Switch } from "react-router-dom";

import Header from "./components/PizzaBlock/Header";
import Cart from "./Pages/Cart";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";

export const SearchContaxt = React.createContext();

function App() {
  const [searchValue, setSearchValue] = React.useState("");

  return (
    <>
      <div className="wrapper">
        <SearchContaxt.Provider value={{ searchValue, setSearchValue }}>
          <Header />
          <div className="content">
            <Switch>
              <Route path="/cart" exact component={Cart} />
              <Route
                path="/"
                exact
                render={() => <Home searchValue={searchValue} />}
              />
              <Route path="*" component={NotFound} />
            </Switch>
          </div>
        </SearchContaxt.Provider>
      </div>
    </>
  );
}

export default App;
