import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Button
} from 'react-native';

import t from 'tcomb-form-native';

const Form = t.form.Form;

const Link = t.struct({
    name: t.String,
    URL: t.String
});

export default class Main extends Component {
    handleSubmit = () => {
        const value = this._form.getValue();
        console.log('value: ', value);
    }

    render() {
        return (
            <View style={styles.container}>
                <Form ref={c=>this._form = c} type={Link} options={options} />
                <Button title="OK" onPress={this.handleSubmit} />
                <View>
                    //
                </View>
            </View>
        );
    }
}

const options = {
    fields: {
        name: {
            error: 'Please input the name of the new link'
        },
        URL: {
            error: 'Please input the url of the new link'
        }
    }
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 50,
        padding: 20,
        backgroundColor: '#ffffff',
    },
});