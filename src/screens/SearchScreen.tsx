import React, { useState, useEffect} from 'react'
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image } from 'react-native'
import { connect } from 'react-redux'
import { ApplicationState, FoodModel, ShoppingState, UserState } from '../redux'

import { SearchBar } from '../components'
import { FlatList } from 'react-native-gesture-handler'


import { useNavigation } from '../utils'

interface SearchScreenProps{ 
    userReducer: UserState,
    shoppingReducer: ShoppingState,
    onUpdateCart: Function,
 }


const _SearchScreen: React.FC<SearchScreenProps> = (props) => {
    return (
        <View style={styles.container}>
            <Text>...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: '#F2F2F2'
    },
    navigation: { 
        flex: 1,  
        marginTop: 43, 
    },
    body: { 
        flex: 10, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    footer: { 
        flex: 1, 
        backgroundColor: 'cyan' 
    }
})

const mapStateToProps = (state: ApplicationState) => ({
    shoppingReducer: state.shoppingReducer,
    userReducer: state.userReducer
})


const SearchScreen = connect(mapStateToProps)(_SearchScreen)

export { SearchScreen }