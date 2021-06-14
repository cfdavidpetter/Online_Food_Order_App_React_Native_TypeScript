import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { ButtonWithIcon, CategoryCard, SearchBar, RestaurantCard } from '../components'
import { onAvailability, onSearchFoods ,UserState, ApplicationState, ShoppingState, Restaurant, FoodModel } from '../redux'
import { useNavigation } from '../utils'
 
interface HomeProps{
    userReducer: UserState,
    shoppingReducer: ShoppingState,
    onAvailability: Function,
    onSearchFoods: Function
}

export const _HomeScreen: React.FC<HomeProps> = (props) => {
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
        <View style={styles.container}>
            <View> 
                <View style={{ marginTop: 50, marginLeft: 15, height: 25, alignItems: 'center', flexDirection: 'row'}}>
                    <Text>{`${location.street} - ${location.name}, ${location.district} - ${location.city}`}</Text> 
                </View>
                <View style={{ display: 'flex', height: 60, justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center', marginLeft: 15, marginRight: 15 }}>
                    <SearchBar didTouch={() => {
                        navigate('SearchPage')
                    }}  onTextChange={() => {}} />
                    <View style={{ width: 10 }} />
                    <ButtonWithIcon onTap={() => {}} icon={require('../images/hambar.png')} width={50} height={40} />
                </View>
            </View>
            
            <View style={styles.body}>
                <ScrollView>
                    <FlatList 
                        style={{ marginLeft: 5 }}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={categories}
                        renderItem ={({ item }) =>  <CategoryCard item={item} onTap={() => { alert('Category tapped') }} /> } 
                        keyExtractor={(item) => `${item.id}`}
                    />

                    <View>
                        <Text style={{fontSize: 25, fontWeight: '600', color: '#f15b5d', marginLeft: 10 }} >Melhores Restaurantes</Text>
                    </View>

                    <FlatList 
                        style={{ marginLeft: 5 }}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={restaurants}
                        renderItem ={({ item }) =>  <RestaurantCard item={item} onTap={onTapRestaurant} /> } 
                        keyExtractor={(item) => `${item._id}`}
                    />

                    <View>
                        <Text style={{fontSize: 25, fontWeight: '600', color: '#f15b5d', marginLeft: 10 }} >Pronto em 30 Minutos</Text>
                    </View>

                    <FlatList 
                        style={{ marginLeft: 5 }}
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

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    body: {
        flex: 10,
        justifyContent: 'center',
        alignItems: 'center',
     },
})

const mapToStateProps = (state: ApplicationState) => ({
    userReducer: state.userReducer,
    shoppingReducer: state.shoppingReducer
})

const HomeScreen = connect(mapToStateProps, { onAvailability,  onSearchFoods })(_HomeScreen)

export { HomeScreen }