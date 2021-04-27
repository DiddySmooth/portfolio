import { Route } from 'react-router-dom'
import NavBar from './Components/NavBar'
import './App.css';
import Header from './Components/Header';

import Home from './Pages/Home'
import Experience from './Pages/Experience';
import Contact from './Pages/Contact';




function App() {
  return (
    <div className="App">
      <Header name="Grayson McClead" title="Full-Stack Software Engineer"/>
      <NavBar />

      <Route exact path="/" component={Home}/>
      <Route exact path="/experience" component={Experience}/>
      <Route exact path="/contact" component={Contact}/>
    </div>
  );
}

export default App;
