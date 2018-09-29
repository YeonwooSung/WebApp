import React from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

export default class InputForm extends React.Component {
    render() {
        <View>
            <FormLabel>Name</FormLabel>
            <FormInput onChangeText={someFunction} />
            <FormValidationMessage> { 'this field is required' } </FormValidationMessage>
        </View>
    }
}