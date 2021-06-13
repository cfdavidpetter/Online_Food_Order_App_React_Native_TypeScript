import React, { useEffect, useState} from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, Dimensions, Image, ScrollView, FlatList } from "react-native";
import { onAvailability, onSearchFoods ,UserState, ApplicationState, ShoppingState, Restaurant, FoodModel } from '../redux'
import { useNavigation } from '../utils'

import { SearchBar, ButtonWithIcon, CategoryCard, RestaurantCard } from '../components'
 
interface HomeProps{
    userReducer: UserState,
    shoppingReducer: ShoppingState,
    onAvailability: Function,
    onSearchFoods: Function
}


const _HomeScreen: React.FC<HomeProps> = (props) => {
    const { location } = props.userReducer;
    const { availability } = props.shoppingReducer;
    const { categories, foods, restaurants } = availability

    const { navigate } = useNavigation()

    useEffect(() => {
        props.onAvailability(location.postalCode)
        setTimeout(() => {
            props.onSearchFoods(location.postalCode)
        }, 1000 )
    }, [])

    const onTapRestaurant = (item: Restaurant) => {
        navigate('RestaurantPage', { restaurant: item })
    }

    const onTapFood = (item: FoodModel) => {    
        navigate('FoodDetailPage', { food: item })
    }

    return (
        <View style={style.contaner}>
            <View style={style.navigator}>
                <View style={style.navigatorLocation}>
                    <Text style={{ color: '#e45d2d' }}>{`${location.street}, ${location.name}, ${location.district} - ${location.city}`} </Text> 
                    <Text style={{ color: '#e45d2d' }}>Edit</Text>
                </View>
                <View style={style.navigatorSearchBar}>
                    <SearchBar didTouch={() => {
                        navigate('SearchPage')
                    }}  onTextChange={() => {}} />
                    <ButtonWithIcon onTap={() => {}} icon={require('../images/hambar.png')} width={50} height={40} />
                </View>
            </View>
            <View style={style.body}>
                <ScrollView>
                    <FlatList 
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={categories}
                        renderItem ={({ item }) =>  <CategoryCard item={item} onTap={() => { alert('Category tapped') }} /> } 
                        keyExtractor={(item) => `${item.id}`}
                    />
                
                    <View>
                        <Text style={{fontSize: 25, fontWeight: '600', color: '#e45d2d', marginLeft: 10 }} >Melhores Restaurantes</Text>
                    </View>

                    <FlatList 
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={restaurants}
                        renderItem ={({ item }) =>  <RestaurantCard item={item} onTap={onTapRestaurant} /> } 
                        keyExtractor={(item) => `${item._id}`}
                    />

                    <View>
                        <Text style={{fontSize: 25, fontWeight: '600', color: '#e45d2d', marginLeft: 10 }} >Pronto em 30 Minutos</Text>
                    </View>

                    <FlatList 
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={foods}
                        renderItem ={({ item }) =>  <RestaurantCard item={item} onTap={onTapFood} /> } 
                        keyExtractor={(item) => `${item._id}`}
                    />

                </ScrollView>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    contaner: {
        flex: 1,
        backgroundColor: '#F7CC0F'
    },
    navigator: {
        flex: 2,
    },
    navigatorLocation: {
        marginTop: 40, 
        flex: 4,
        paddingLeft: 20, 
        paddingRight: 20, 
        alignItems: 'center', 
        justifyContent: 'center', 
        flexDirection: 'row'
    },
    navigatorSearchBar: {
        display: 'flex', 
        height: 40, 
        justifyContent: 'space-around', 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginLeft: 5,
        marginRight: 15,
    },
    body: {
        flex: 9,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5
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