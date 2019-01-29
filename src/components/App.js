import React, { Component } from 'react';
import L from 'leaflet';
import Joi from 'joi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import {
  Card,
  Button,
  CardTitle,
  CardText,
  Form,
  FormGroup,
  Label,
  Input,
  Spinner,
  FormText
} from 'reactstrap';
import iconUrl from './myLocationIcon.svg';
import othersIcon from './otherUsers.svg';

import './App.css';

const schema = Joi.object().keys({
  name: Joi.string()
    .min(1)
    .max(100)
    .required(),
  message: Joi.string()
    .min(2)
    .max(500)
    .required()
});

const API_URL = '/api/v1/messages';
// window.location.hostname === 'localhost'
//   ? 'localhost:5000/api/v1/messages'
//   : 'produciton-url';

const myIcon = L.icon({
  iconUrl,
  iconSize: [50, 82],
  iconAnchor: [25, 82],
  popupAnchor: [0, -82]
});
const messageIcon = L.icon({
  othersIcon,
  iconSize: [50, 82],
  iconAnchor: [25, 82],
  popupAnchor: [0, -82]
});

export default class Dashboard extends Component {
  state = {
    location: {
      lat: 42.358555,
      lng: -71.093966
    },
    haveUserLocation: false,
    zoom: 2,
    userMessage: {
      name: '',
      message: ''
    },
    sendingMessage: false,
    sentMessage: false,
    spinner: false,
    messages: []
  };

  componentDidMount() {
    fetch(API_URL)
      .then(res => res.json())
      .then(messages => {
        this.setState({ messages });
      });
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position);
        this.setState({
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          haveUserLocation: true,
          zoom: 16
        });
      },
      () => {
        console.log('Uh oh... They declined our location request');
        fetch('https://ipapi.co/json')
          .then(res => res.json())
          .then(location => {
            console.log(location);
            this.setState({
              location: {
                lat: location.latitude,
                lng: location.longitude
              },
              haveUserLocation: true,
              zoom: 13
            });
          });
      }
    );
  }
  formIsValid = () => {
    const userMessage = {
      name: this.state.userMessage.name,
      message: this.state.userMessage.message
    };
    const result = Joi.validate(userMessage, schema);
    return !result.error && this.state.haveUserLocation;
  };
  formSubmitted = event => {
    event.preventDefault();
    console.log(this.state.userMessage);

    if (this.formIsValid()) {
      //before we start to submit
      this.setState({
        sendingMessage: true
      });
      fetch(API_URL, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          name: this.state.userMessage.name,
          message: this.state.userMessage.message,
          latitude: this.state.location.lat,
          longitude: this.state.location.lng
        })
      })
        .then(res => res.json())
        .then(message => {
          console.log(message);
          setTimeout(() => {
            this.setState({ sendingMessage: false, sentMessage: true });
          }, 4000);
        });
    }
  };
  valueChanged = event => {
    const { name, value } = event.target;
    this.setState(prevState => ({
      userMessage: {
        ...prevState.userMessage,
        [name]: value
      }
    }));
  };
  render() {
    const position = [this.state.location.lat, this.state.location.lng];
    return (
      <div className="map">
        <Map className="map" center={position} zoom={this.state.zoom}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {this.state.haveUserLocation ? (
            <Marker position={position} icon={myIcon} />
          ) : (
            ''
          )}
          {this.state.messages.map(message => {
            return (
              <Marker
                position={[message.latitude, message.longitude]}
                icon={myIcon}
              >
                <Popup>
                  <em>
                    {message.name}: <br />
                  </em>{' '}
                  {message.message}
                </Popup>
              </Marker>
            );
          })}
          <Card body className="message-form">
            <CardTitle className="tellr">Tellr</CardTitle>
            <CardText>Leave a comment with your location</CardText>

            {!this.state.sendingMessage &&
            !this.state.sentMessage &&
            this.state.haveUserLocation ? (
              <Form onSubmit={this.formSubmitted}>
                <FormGroup>
                  <Label for="name">Name</Label>
                  <Input
                    disabled={!this.state.haveUserLocation}
                    onChange={this.valueChanged}
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter your name "
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="message">Message</Label>
                  <Input
                    disabled={!this.state.haveUserLocation}
                    onChange={this.valueChanged}
                    type="textarea"
                    name="message"
                    id="message"
                    placeholder="Enter a message "
                  />
                </FormGroup>
                <Button
                  type="submit"
                  color="info"
                  disabled={!this.formIsValid()}
                >
                  Send
                </Button>{' '}
              </Form>
            ) : this.state.sendingMessage || !this.state.haveUserLocation ? (
              <span>
                <Spinner type="grow" color="primary" />
                <Spinner type="grow" color="secondary" />
                <Spinner type="grow" color="success" />
                <Spinner type="grow" color="info" />
                <Spinner type="grow" color="primary" />
                <Spinner type="grow" color="dark" />
              </span>
            ) : (
              <CardText>
                <Spinner type="grow" color="success" />
                Thanks for submitting a message!
                <Spinner type="grow" color="success" />
              </CardText>
            )}
          </Card>
        </Map>
      </div>
    );
  }
}

// import React, { Component } from 'react';

// // import '../css/app.css';
// import { BrowserRouter, Route } from 'react-router-dom';
// // import Route from 'react-router-dom/es/Route';
// // import Switch from 'react-router-dom/es/Switch';
// // import Root from './Root';
// import { connect } from 'react-redux';
// import * as actions from '../actions';

// import Header from './Header';
// // import Dashboard from './Dashboard';
// // import Landing from './Landing';
// // import MenuAppBar from './MenuAppBar';

// class App extends Component {
//   componentDidMount() {
//     this.props.fetchUser();
//   } //action creator that will attempt to fetch the current user the instant the app starts to load
//   render() {
//     return (
//       <div className="container">
//         <BrowserRouter>
//           <div>
//             {/* <Route
//               path="/"
//               component={MenuAppBar}
//               position="static"
//             />
//             <Route exact path="/" component={Landing} />
//               style={{ background: 'transparent', boxShadow: 'none' }} */}
//             <Route path="/" component={Header} />
//           </div>
//         </BrowserRouter>
//       </div>
//     );
//   }
// }

// export default connect(
//   null,
//   actions
// )(App);
