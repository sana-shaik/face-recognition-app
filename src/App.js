import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
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
      imageUrl: '',
      box: {},
      route: '',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }


  componentDidMount() {
    fetch('http://localhost:3000/')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
  }

  calculateFaceLocation = (data) => {
    const clarifaiface = data.outputs[0].data.regions[0].region_info.bounding_box ;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    
    return {
      leftCol: clarifaiface.left_col * width,
      topRow: clarifaiface.top_row * height,
      rightCol: width - (clarifaiface.right_col * width),
      bottomRow: height - (clarifaiface.bottom_row * height)     

    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
      this.setState({input: event.target.value});
      }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict( Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => {
        
        if(resposne){
          fetch('http://localhost:3000/image', {
            method:'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
               id: this.state.users.id
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}))
          })
        })
      }
        
        this.displayFaceBox(this.calculateFaceLocation(response))})

      .catch(err => console.log(err));
       /*   function(response) {
            // do something with response
            console.log(response.outpus[0].data.regions[0].region_info.bouding_box);
          },
          function(err) {
            // there was an error
            console.log('error');
          }
  ); */
  }

  onRouteChange = (route) => {
    if(this.state.route === 'SignOut'){
      this.setState({isSignedIn: false})
    } else if(this.state.route === 'home') {
      this.setState({isSignedIn: true})
    } 
    this.setState({route: route});
  }


  render() {
    const {isSignedIn, imageUrl, route, box} = this.state;
    return (
      <div className="App">

        <Particles className='particles'
          params={ParticleObject}
        />

      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />

        {route === 'home' 
            ? <div>
                  <Logo />
                  <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                  <ImageLinkForm onInputChange = {this.onInputChange} onButtonSubmit={this.onButtonSubmit} />     
                  <FaceRecognition box={box} imageUrl={imageUrl}/> 
               </div>
               
            : (route === 'SignIn'?<SignIn loadUser={this.loadUser} onRouteChange = {this.onRouteChange} /> :

              <Register loadUser={this.loadUser} onRouteChange = {this.onRouteChange} />
              )

        }
      </div>
    );
  }
}

export default App;
