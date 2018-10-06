import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    AsyncStorage,
    ScrollView,
    WebView,
    BackHandler,
    Platform,
    Dimensions,
    StatusBar
} from 'react-native'

import Link from './Link'
import uuidv1 from 'uuid/v1';

'use strict';

const { height, width } = Dimensions.get("window");

export default class Main extends Component {
    state = {
        name: '',
        url: '',
        links: [],
        webView: <View></View>,
        isLoaded: false
    }

    componentDidMount = () => {
        /* get data from async storage */
        const returnedVal = this.loadLinks();

        if (returnedVal.links != undefined) {
            this.setState({ links: returnedVal.links });
        }

        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }

    onBackPress = () => {
        const isLoaded = this.state.isLoaded;

        if (isLoaded) {
            this.setState({ isLoaded: false });
        } else {
            this.setState({isLoaded: true});
        }
        return isLoaded;
    };

    handleName = (text) => {
        this.setState({ name: text })
    }

    handleURL = (text) => {
        this.setState({ url: text })
    }

    appendNew = (name, url) => {
        const ID = uuidv1();
        const newLinkObj = {
            name: name,
            url: url,
            id: ID
        };

        const arr = this.state.links;
        arr.push(newLinkObj);

        this.setState({links: arr});
        this.saveLinks(arr);
    }

    renderContent = (url) => {
        this.state.isLoaded = true;
        const webView = <WebView source={{ uri: url }} startInLoadingState={true} javaScriptEnabled={true} domStorageEnabled={true} />

        this.setState({webView: webView});
    }

    loadLinks = async () => {
        let l;
        await AsyncStorage.getItem("linkArray", (err, res) => {
            if (err) {
                l = {links: []};
            } else {
                l = JSON.parse(res);
            }
        });
        return l;
    }

    saveLinks = async (links) => {
        await AsyncStorage.setItem("linkArray", JSON.stringify(links), (err) => {
            if (err) {
                alert(err);
            }
        });
    }

    render() {
        const { name, url, links, webView, isLoaded} = this.state;

        let link = links.map(l => {
            return <Link key={l.id} linkName={l.name} url={l.url} renderContent={this.renderContent} {...l} />
        });

        if (isLoaded) {
            return (
            <View style={styles.webContainer} >
                {webView}
            </View>);
        }

        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <Text style={styles.title}>WebApp</Text>
                <View style={styles.subContainer}>
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
                        {link}
                    </ScrollView>
                </View>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9232db'
    },
    subContainer: {
        backgroundColor: "white",
        flex: 1,
        width: width - 25,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        ...Platform.select({
            ios: {
                shadowColor: "rgb(50, 50, 50)",
                shadowOpacity: 0.5,
                shadowRadius: 5,
                shadowOffset: {
                    height: -1,
                    width: 0
                }
            },
            android: {
                elevation: 3
            }
        })
    },
    title: {
        color: '#e0cbef',
        fontSize: 20,
        marginTop: 25,
        fontWeight: "200",
        marginBottom: 15
    },
    webContainer: {
        flex: 1
    },
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
        width: 200,
        alignItems: 'center'
    },
    appendButtonText: {
        color: 'white'
    }
});