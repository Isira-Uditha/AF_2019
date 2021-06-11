import './App.css';
import NavBar from "./components/navBar/navBar";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Category from "./components/category/category";
import Room from "./components/vehicle/room";

function App() {
  return (
    <div className="App">
        <Router>
            <NavBar/>
            <section>
                <Switch>
                    <Route path="/" component={Category} exact/>
                    {/*<Route path="/vehicle" component={Room} />*/}
                    <Route path="/vehicle/:id?" component={Room} />
                </Switch>
            </section>
        </Router>
    </div>
  );
}

export default App;
