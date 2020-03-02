import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    Platform,
    Dimensions,
    BackHandler,
    ToastAndroid
} from 'react-native';


import TabNavigator from 'react-native-tab-navigator';
import { Navigator } from 'react-native-deprecated-custom-components';

import header from '../images/common/jinjing.jpg';
import car from '../images/setting/car.png';
import notice from '../images/setting/notice.png';
import punish from '../images/setting/punish.png';
import agreement from '../images/setting/agreement.png';
import privacy from '../images/setting/privacy.png';
import about from '../images/setting/about.png';


import Limit from '../pages/Limit';
import Notice from '../pages/Notice';
import Punish from '../pages/Punish';
import Agreement from '../pages/Agreement';
import Privacy from '../pages/Privacy';
import About from '../pages/About';

const dimensions = Dimensions.get('window');
const deviceW = dimensions.width;
export default class Settings extends Component {
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
            console.log(lastRoute.name)
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

    render() {
        return (
            <ScrollView style={styles.container}>
                <HeaderView />
                <View>
                    <SettingsItem component={Limit} name="北京市限行规定" icon={car} {...this.props} />
                    <SettingsItem component={Notice} name="进京证办理须知" icon={notice} {...this.props} />
                    <SettingsItem component={Punish} name="处罚标准" icon={punish} {...this.props} />
                </View>
                <View style={{ marginTop: 20 }}>
                    <SettingsItem component={Agreement} name="用户协议" icon={agreement} {...this.props} />
                    <SettingsItem component={Privacy} name="隐私声明" icon={privacy} {...this.props} />
                    <SettingsItem component={About} name="关于" icon={about} {...this.props} />
                </View>
            </ScrollView >
        )
    }
}

class HeaderView extends Component {
    render() {
        return (
            <View style={styles.header}>
                <Image style={styles.headerImage} source={header} />
            </View>
        )
    }
}

class Cell extends Component {
    render() {
        return (
            <View>
                <Image source={this.props.lefticon}></Image>
                <Text>{this.props.name}</Text>
            </View>
        )
    }
}

class SettingsItem extends Component {
    _onPress() {
        const { navigator, component, name } = this.props;
        if (navigator) {
            navigator.push({
                name,
                component
            })
        }
    }

    render() {
        return (
            <TouchableOpacity activeOpacity={0.5} onPress={this._onPress.bind(this)} >
                <View style={styles.settingItem}>
                    <Image source={this.props.icon} />
                    <Text style={styles.itemName}>{this.props.name}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}


let styles = StyleSheet.create({
    container: {
        backgroundColor: '#e8e8e8'
    },
    headerImage: {
        width: deviceW,
        height: 180
    },
    settingItem: {
        paddingLeft: 5,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderBottomColor: '#e8e8e8',
        borderBottomWidth: 0.5
    },
    itemName: {
        fontSize: 18,
        marginLeft: 10
    }
});