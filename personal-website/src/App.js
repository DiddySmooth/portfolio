import NavBar from './Components/NavBar'
import './App.css';
import Header from './Components/Header';
import AboutMe from './Components/AboutMe';

function App() {
  return (
    <div className="App">
      <Header name="Grayson McClead" title="Full-Stack Software Engineer"/>
      <NavBar />
      <AboutMe />
    </div>
  );
}

export default App;
