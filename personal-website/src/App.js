import NavBar from './Components/NavBar'
import './App.css';
import Header from './Components/Header';
import AboutMe from './Components/AboutMe';
import SkillsContainer from './Components/SkillsContainer';

function App() {
  return (
    <div className="App">
      <Header name="Grayson McClead" title="Full-Stack Software Engineer"/>
      <NavBar />
      <AboutMe />
      <SkillsContainer />
    </div>
  );
}

export default App;
