/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  Dimensions
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';
import { Navigator } from 'react-native-deprecated-custom-components';


import tabbar_home from '../images/tabbar/tabbar_home.png';
import tabbar_list from '../images/tabbar/tabbar_list.png';
import tabbar_settings from '../images/tabbar/tabbar_settings.png';

import tabbar_home_selected from '../images/tabbar/tabbar_home_highlighted.png';
import tabbar_list_selected from '../images/tabbar/tabbar_list_highlighted.png';
import tabbar_settings_selected from '../images/tabbar/tabbar_settings_highlighted.png';

import Home from './Home';
import List from './List';
import Settings from "./Settings";

export default class Main extends Component {
  state = {
    selectedTab: 'home'
  }

  renderTabBarItem(componentName, component, iconname, selectedIconName, selectedTab, badgeText = 0) {
    return (
      <TabNavigator.Item
        selected={this.state.selectedTab === selectedTab}
        title={componentName}
        badgeText={badgeText}
        selectedTitleStyle={{ color: "#3496f0" }}
        renderIcon={() => <Image source={iconname} style={styles.icon} />}
        renderSelectedIcon={() => <Image source={selectedIconName} style={styles.icon} />}
        onPress={() => this.setState({ selectedTab: selectedTab })}>
        <Navigator
          initialRoute={{ name: componentName, component: component }}
          configureScene={() => {
            return Navigator.SceneConfigs.PushFromRight;
          }}
          renderScene={(route, navigator) => {
            let Component = route.component;
            return <Component {...route.passProps} navigator={navigator} />;
          }}
        />
      </TabNavigator.Item>
    )
  }

  render() {
    return (
      <TabNavigator
        tabBarStyle={styles.tabBar}
      >
        {this.renderTabBarItem('首页', Home, tabbar_home, tabbar_home_selected, 'home')}
        {this.renderTabBarItem('列表', List, tabbar_list, tabbar_list_selected, 'list')}
        {this.renderTabBarItem('设置', Settings, tabbar_settings, tabbar_settings_selected, 'settings')}
      </TabNavigator>
    );
  }
}

const styles = StyleSheet.create({
  tabBar: {
    height: Platform.OS === 'ios' ? 50 : 56,
    overflow: 'hidden',
    borderTopWidth: 1,
    borderTopColor: '#DDDDDD'
  }
});