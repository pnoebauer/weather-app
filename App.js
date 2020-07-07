import React from 'react';
import {
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  View
} from 'react-native';

import getImageForWeather from './utils/getImageForWeather';
import SearchInput from './components/SearchInput';

export default class App extends React.Component {
  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <ImageBackground 
          source={getImageForWeather('Clear')} 
          style={styles.imageContainer} 
          imageStyle={styles.image}
        >
          <View style={styles.detailsContainer}>
            <Text style={[styles.largeText, styles.textStyle]}>Sydney</Text>
            <Text style={[styles.smallText, styles.textStyle]}>Clear</Text>
            <Text style={[styles.largeText, styles.textStyle]}>25°</Text>

            <SearchInput
              placeholder={'Search any city'}
            />
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
