import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
} from 'react-native';

export default class SearchInput extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<TextInput
		          autoCorrect={false}
		          placeholder={this.props.placeholder}
		          placeholderTextColor="white"
		          style={styles.textInput}
		          clearButtonMode="always"
	        	/>
	        </View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
	    height: 40,
	    marginTop: 20,
	    backgroundColor: '#666',
	    marginHorizontal: 40,
	    paddingHorizontal: 10,
	    borderRadius: 5,
  	},
  	textInput: {
    	flex: 1,
    	width: 300,
    	color: 'white',
  	},
});