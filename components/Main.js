import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    AsyncStorage,
    ScrollView
} from 'react-native'

import Link from './Link'

'use strict';

export default class Main extends Component {
    state = {
        name: '',
        url: '',
        links: []
    }

    handleName = (text) => {
        this.setState({ name: text })
    }

    handleURL = (text) => {
        this.setState({ url: text })
    }

    appendNew = (name, url) => {
        this.setState( prevState => {

            const newLinkObj = {
                name: name,
                url: url
            };

            const newState = {
                ...prevState,
                newName: name,
                newUrl: url,
                links: {
                    ...prevState.links,
                    newLinkObj
                }
            };

            this.saveLinks(newState.links);
            return {...newState};
        });
    }

    saveLinks = links => {
        AsyncStorage.setItem("links", JSON.stringify(links));
    }

    render(){
        const { name, url, links} = this.state;
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
                        () => this.appendNew(name, url)
                    }>
                    <Text style={styles.appendButtonText}> Append </Text>
                </TouchableOpacity>
                <ScrollView>
                    {Object.values(links)
                    .reverse()
                    .map( link => (
                        <Link linkName={link.name} url={link.url} {...link} />
                    ))}
                </ScrollView>
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