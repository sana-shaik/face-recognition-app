import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition'
import './App.css';
import 'tachyons';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: '8fa96841bcd344f3b705e5d205c1b295'
 });

const ParticleObject = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
    }
  }

  onInputChange = (event) => {
    console.log(event.target.value);
  }

  onButtonSubmit = () => {
    console.log('click');
    app.models.predict(
      
      Clarifai.COLOR_MODEL, 
      "https://samples.clarifai.com/face-det.jpg")

      .then(
          function(response) {
            // do something with response
            console.log(response);
          },
          function(err) {
            // there was an error
          }
  );
  }

  render() {
    return (
      <div className="App">

        <Particles className='particles'
          params={ParticleObject}
        />

        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange = {this.onInputChange} onButtonSubmit={this.onButtonSubmit} />     
        <FaceRecognition /> 
      </div>
    );
  }
}

export default App;
