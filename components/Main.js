import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'

export default class Main extends Component {
    state = {
        name: '',
        url: ''
    }

    handleName = (text) => {
        this.setState({ name: text })
    }

    handleURL = (text) => {
        this.setState({ url: text })
    }

    appendNew = (name, url) => {
        alert('name: ' + name + ' url: ' + url)
    }

    render(){
        return (
            <View>
                <TextInput style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="The name of the new link"
                    placeholderTextColor="#9a73ef"
                    autoCapitalize="none"
                    onChangeText={this.handleName} />

                <TextInput style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="URL"
                    placeholderTextColor="#9a73ef"
                    autoCapitalize="none"
                    onChangeText={this.handleURL} />

                <TouchableOpacity
                    style={styles.appendButton}
                    onPress={
                        () => this.appendNew(this.state.name, this.state.url)
                    }>
                    <Text style={styles.appendButtonText}> Append </Text>
                </TouchableOpacity>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        width: 200,
        margin: 10,
        borderColor: '#7a42f4',
        borderWidth: 1
    },
    appendButton: {
        backgroundColor: '#7a42f4',
        padding: 10,
        margin: 10,
        height: 40,
        alignItems: 'center'
    },
    appendButtonText: {
        color: 'white'
    }
})