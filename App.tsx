import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createAppContainer, createSwitchNavigator  } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Provider } from 'react-redux'
import { store } from './src/redux'

import { LandingScreen } from "./src/screens/LandingScreen";
import { HomeScreen } from "./src/screens/HomeScreen";
import { SearchScreen } from './src/screens/SearchScreen';
import { RestaurantScreen } from "./src/screens/RestaurantScreen";
import { FoodDetailScreen } from "./src/screens/FoodDetailScreen";


const switchNavigator = createSwitchNavigator({
  landingStack: {
    screen: createStackNavigator({
      Landing: LandingScreen,
    }, {
      defaultNavigationOptions: {
        headerShown: false
      }
    }),
  },
  homeStack:  createBottomTabNavigator({
    // Home tab Icon
    Inicio: {
      screen: createStackNavigator({
        HomePage: HomeScreen,
        SearchPage: SearchScreen,
        RestaurantPage: RestaurantScreen,
        FoodDetailPage: FoodDetailScreen
      },{
        defaultNavigationOptions: {
          headerShown: false
        }
      }),
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor}) => {
          let icon = focused == true ? require('./src/images/home_icon.png') : require('./src/images/home_n_icon.png') 
          return <Image source={icon} style={styles.tabIcon} />
        }
      }
    },

    Promoções: {
      screen: createStackNavigator({
        OfferPage: HomeScreen,
      }),
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor}) => {
          let icon = focused == true ? require('./src/images/offer_icon.png') : require('./src/images/offer_n_icon.png') 
          return <Image source={icon} style={styles.tabIcon} />
        }
      }
    },

    Carrinho: {
      screen: createStackNavigator({
        CartPage: HomeScreen,
      }, {
        defaultNavigationOptions: {
          headerShown: false
        }
      }),
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor}) => {
          let icon = focused == true ? require('./src/images/cart_icon.png') : require('./src/images/cart_n_icon.png') 
          return <Image source={icon} style={styles.tabIcon} />
        }
      }
    },

    Conta: {
      screen: createStackNavigator({
        AccountPage: HomeScreen,
      }),
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor}) => {
          let icon = focused == true ? require('./src/images/account_icon.png') : require('./src/images/account_n_icon.png') 
          return <Image source={icon} style={styles.tabIcon} />
        }
      }
    }

  })
})

const AppNavigation = createAppContainer(switchNavigator);

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7CC0F'
  },
  tabIcon: {
    width: 30,
    height: 30
  }
});
