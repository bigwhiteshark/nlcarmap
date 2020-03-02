import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    FlatList,
    TouchableOpacity,
    Dimensions
} from 'react-native';

import cameraData from '../data/camera_20200302'
import Home from './Home'

export default class List extends Component {
    _onPress() {
        const { navigator, component, name } = this.props;
        if (navigator) {
            navigator.push({
                name: '首页',
                component: Home
            })
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={cameraData}
                    keyExtractor={(item, index) => item.Id + index}
                    renderItem={
                        ({ item }) =>
                            <TouchableOpacity onPress={this._onPress.bind(this)}>
                                <View
                                    style={styles.listItem}
                                >
                                    <Text style={styles.pathname}>{item.RoadName}</Text>
                                    <Text style={styles.description}>{item.LocationDescript}</Text>
                                </View>
                            </TouchableOpacity>
                    }
                />
            </View>
        )
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    listItem: {
        padding: 10,
        height: 60,
        borderBottomColor: '#dedede',
        borderBottomWidth: 0.5,
        justifyContent: 'center'
    },
    pathname: {
        fontSize: 16
    },
    description: {
        color: 'gray',
        fontSize: 14
    }

});