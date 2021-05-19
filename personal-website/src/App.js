import { Route } from 'react-router-dom'
import NavBar from './Components/NavBar'
import './App.css';
import Header from './Components/Header';

import Home from './Pages/Home'
import Experience from './Pages/Experience';
import Contact from './Pages/Contact';
import Skills from './Pages/Skills';




function App() {
  return (
    <div className="App">
      <div className="topPage">
        <div>
          <Header name="Grayson McClead" title="Full-Stack Software Engineer"/>
        </div>
        <div className="navBarDiv">
          <NavBar />
        </div>
      </div>
      

      <Route exact path="/" component={Home}/>
      <Route exact path="/experience" component={Experience}/>
      <Route exact path="/contact" component={Contact}/>
      <Route exact path="/skills" component={Skills}/>
    </div>
  );
}

export default App;
