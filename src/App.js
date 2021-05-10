import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Navbar from "./compoents/Navbar"
import Home from "./compoents/Home"
import Create from "./compoents/Create"
import BlogDetails from "./compoents/BlogDetails"
import NotFound from "./compoents/NotFound"

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
            <Route path="/blogs/:id">
              <BlogDetails />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App
