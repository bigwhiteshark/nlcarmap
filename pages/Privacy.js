import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

export default class Privacy extends Component {
    _onPress() {
        const { navigator } = this.props;
        if (navigator) {
            navigator.pop();
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this._onPress.bind(this)}>
                    <Text>返回上一页</Text>
                </TouchableOpacity>
                <Text>隐私</Text>
            </View>
        )
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});