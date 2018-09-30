import React from 'react'
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text
} from 'react-native'
import PropTypes from 'prop-types';

'use strict'

export default class Link extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        linkName: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
    }

    render() {
        return (
            <View>
                <TouchableOpacity style={styles.nameButton}>
                    <Text>
                        { this.props.linkName }
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    nameButton: {
        height: 50,
        width: 200,
        margin: 10,
        borderColor: '#7a42f4',
        borderWidth: 1
    }
})