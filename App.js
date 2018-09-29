import React, {Component} from 'react';
import { 
  StyleSheet,
  View
} from 'react-native';

import Main from './components/Main';

export default class App extends Component {
  state = {
    isLoaded: false
  };

  render() {
    const { isLoaded } = this.state;
    return (
      <View style={styles.container}>
        {
          isLoaded ? <Main></Main> : <Main></Main>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff' //'#F5FCFF'
  }
});
