import React from "react";
import { connect } from 'react-redux'
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import { onAvailability, onSearchFoods ,UserState, ApplicationState, ShoppingState, Restaurant, FoodModel } from '../redux'
import { useNavigation } from '../utils'
 
interface HomeProps{
    userReducer: UserState,
    shoppingReducer: ShoppingState,
    onAvailability: Function,
    onSearchFoods: Function
}


const _HomeScreen: React.FC<HomeProps> = (props) => {

    const { location } = props.userReducer;
    const { availability } = props.shoppingReducer;

    return (
        <View style={style.contaner}>
            <View style={style.navigator}>
                <View style={style.navigator_location}>
                    <Text>{`${location.street}, ${location.name}, ${location.district} - ${location.city}`} </Text> 
                    <Text> Edit</Text>
                </View>
            </View>
            <View style={style.body}>
                <Text>Body {JSON.stringify(location)}</Text>
            </View>
            <View style={style.footer}>
                <Text>Footer</Text>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    contaner: {
        flex: 1,
        backgroundColor: '#FA0501'
    },
    navigator: {
        flex: 2,
        backgroundColor: '#0F84FA'
    },
    navigator_location: {
        marginTop: 50, 
        flex: 4, 
        backgroundColor: 'white', 
        paddingLeft: 20, 
        paddingRight: 20, 
        alignItems: 'center', 
        justifyContent: 'center', 
        flexDirection: 'row'
    },
    body: {
        flex: 9,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F7CC0F'
    },
    footer: {
        flex: 1,
        backgroundColor: '#49F70F'
    }
})

const mapToStateProps = (state: ApplicationState) => ({
    userReducer: state.userReducer,
    shoppingReducer: state.shoppingReducer
})

const HomeScreen = connect(mapToStateProps, { onAvailability,  onSearchFoods })(_HomeScreen)

export { HomeScreen }