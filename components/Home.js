import React, { Component } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    Platform,
    Dimensions,
    BackHandler,
    ToastAndroid
} from 'react-native';
import { MapView } from 'react-native-amap3d';
import coordtransform from 'coordtransform'

import cameraData from '../data/camera_20200302';
import cameraIcon from '../images/marker/camera_red.png';
const deviceH = Dimensions.get('window').height;

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date(),
        }

        this._coordinates = [
            {
                latitude: 39.806901,
                longitude: 116.397972,
            },
            {
                latitude: 39.806901,
                longitude: 116.297972,
            },
            {
                latitude: 39.906901,
                longitude: 116.397972,
            },
            {
                latitude: 39.706901,
                longitude: 116.397972,
            },
        ]

        this.firstClick = 0;

    }


    componentDidMount() {
        //如果当前是Android系统，则添加back键按下事件监听
        if (Platform.OS === "android") {
            this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
                return this.handleBackAndroid();
            });
        }
    }

    //back键按下事件响应
    handleBackAndroid() {
        //如果存在上一页则后退
        if (this.props.navigator) {
            let routes = this.props.navigator.getCurrentRoutes();
            let lastRoute = routes[routes.length - 1]; // 当前页面对应的route对象
            if (lastRoute.ignoreBack || lastRoute.component.ignoreBack) {
                // 路由或组件上决定这个界面忽略back键 
                return true;
            }
            if (lastRoute.onHardwareBackPress) {// 先执行route注册的事件
                let flag = lastRoute.onHardwareBackPress();
                if (flag === false) {// 返回值为false就终止后续操作
                    return true;
                }
            }
            if (routes.length === 1) {// 在第一页了,2秒之内点击两次返回键，退出应用
                if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
                    //最近2秒内按过back键，可以退出应用。
                    return false;
                }
                // 此处可以根据情况实现 点2次就退出应用，或者弹出rn视图等
                //记录点击返回键的时间
                this.lastBackPressed = Date.now();
                ToastAndroid.show('再按一次返回退出应用', ToastAndroid.SHORT);
                //BackHandler.exitApp();
                return true;
            } else {
                this.props.navigator.pop();
            }
        }
        return true;
    }

    //组件被卸载前会执行
    componentWillUnmount() {
        //如果当前是Android系统，则移除back键按下事件监听
        if (Platform.OS === "android") {
            //BackHandler.removeEventListener('hardwareBackPress', () => { });
            this.backHandler && this.backHandler.remove();
        }
    }

    renderMarker() {

        return cameraData.map((d, i) => {
            //var bd09togcj02 = coordtransform.bd09togcj02(d.pointx, d.pointy);
            return (
                <MapView.Marker
                    title={d.RoadName + "-" + d.CameraType}
                    description={d.RoadName + d.LocationDescript}
                    centerOffset={{ x: 0, y: -10 }}
                    key={i}
                    coordinate={{
                        latitude: d.Latitude,
                        longitude: d.Longitude,
                    }}
                    icon={() => (
                        <Image
                            source={cameraIcon}
                        />
                    )}
                />
            )
        })
    }

    render() {
        return (
            <MapView
                locationEnabled={true}
                rotateEnabled={false}
                showsCompass={true}
                showsLocationButton={true}
                showsZoomControls={true}
                style={{ height: deviceH - (Platform.OS === 'ios' ? 50 : 80) }}
                coordinate={{
                    latitude: 39.91095,
                    longitude: 116.37296,
                }}
            >
                {this.renderMarker()}
            </MapView>
        )
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    customIcon: {
        width: 40,
        height: 40,
    },
    customInfoWindow: {
        backgroundColor: '#8bc34a',
        padding: 10,
        borderRadius: 10,
        elevation: 4,
        borderWidth: 2,
        borderColor: '#689F38',
        marginBottom: 5,
    },
    customMarker: {
        backgroundColor: '#009688',
        alignItems: 'center',
        borderRadius: 5,
        padding: 5,
    },
    markerText: {
        color: '#fff',
    },
});
