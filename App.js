import React, {Component} from 'react';
import { 
  StyleSheet
} from 'react-native';

import Main from './components/main/Main';

export default class App extends Component {
  render() {
    return (    
      <Main>
        
      </Main>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
