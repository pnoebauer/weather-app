import React from 'react';
import {
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  View,
  ActivityIndicator,
  StatusBar
} from 'react-native';

import getImageForWeather from './utils/getImageForWeather';
import { fetchLocationId, fetchWeather } from './utils/api';
import SearchInput from './components/SearchInput';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: false,
      weather: '',
      temperature: 0,
      location: '',
    }
  }

  componentDidMount() {
    const defaultCity = 'Sydney';
    // this.setState({location: 'Sydney'}, 
      // () => console.log(this.state) //shows state it will update to
    // ); 
    // console.log('component mounted',this.state.location); //shows prior state

    this.handleUpdateLocation(defaultCity);
  }
  
  handleUpdateLocation = (city) => {
    // this.setState({ location: city })
    if(!city) return;
    this.setState({ loading: true }, async() => {
      // console.log('updating location, loading:',this.state.loading);
      try {
        const locationId = await fetchLocationId(city);
        const { location, weather, temperature } = await fetchWeather(locationId);

        this.setState({
          loading: false,
          error: false,
          location,
          weather,
          temperature
        }, 
          // () => console.log(this.state)
        );
      }
      catch (e) {
        // console.log(e);
        this.setState({ loading: false, 
          error: true,
        });
      }
    })
  }

  render() {
    // console.log('render',this.state);
    const { location, loading, error, weather, temperature } = this.state;
    
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <StatusBar barStyle="light-content" />
        <ImageBackground 
          source={getImageForWeather(weather)} 
          style={styles.imageContainer} 
          imageStyle={styles.image}
        >
          <View style={styles.detailsContainer}>
            <ActivityIndicator animating={loading} color="white" size="large" />

            {!loading && 
              <View>
                {error && (
                  <Text style={[styles.smallText, styles.textStyle]}>
                    Could not load weather, please try a different city.
                  </Text>
                )}
                {!error && (
                  <View>
                    <Text style={[styles.largeText, styles.textStyle]}>
                      {location}
                    </Text>
                    <Text style={[styles.smallText, styles.textStyle]}>
                      {weather}
                    </Text>
                    <Text style={[styles.largeText, styles.textStyle]}>
                      {weather && `${Math.round(temperature)}°`}
                    </Text>
                  </View>
                )}
                <SearchInput
                  placeholder={'Search any city'}
                  onSubmit={this.handleUpdateLocation}
                />
              </View>
            }
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495E',
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    //flex 1 means that remaining space in container will be filled up with this component
    flex: 1,
    //with/height to null so that it fits the size of its container
    width: null,
    height: null,
    //cover so that the image is scaled uniformly until it is equal to the container size 
    resizeMode: 'cover', 
  },
  detailsContainer: {
    //make sure that container within imagebackground also fills up the container;
    //give it semitransparent overlay and center everything
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 20,
  },
  textStyle: {
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
    color: 'white',
  },
  largeText: {
    fontSize: 44,
  },
  smallText: {
    fontSize: 18,
  },
});
