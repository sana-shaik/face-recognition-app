import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import './App.css';
import 'tachyons';
import Particles from 'react-particles-js';

const ParticleObject = {
  particles: {
    line_linked: {
      shadow: {
        enable: true,
        color: "#3CA9D1",
        blur: 5
      }
    } 
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">

        <Particles className='particles'
          params={ParticleObject}
        />

        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm /> 
     
       {/*           
        <FaceRecognition /> */}
      </div>
    );
  }
}

export default App;
