import React from 'react'
import { connect } from 'react-redux';
import { StyleSheet, View, Text, ImageBackground, Dimensions, FlatList } from 'react-native'
import { Restaurant, FoodModel, ApplicationState, UserState } from '../redux';
import { useNavigation, checkExistence } from '../utils'
import { ButtonWithIcon, FoodCard } from '../components';

interface RestaurantProps{ 
    userReducer: UserState,
    navigation: { getParam: Function, goBack: Function},
 }

const _RestaurantScreen: React.FC<RestaurantProps> = (props) => {

    const { getParam, goBack } = props.navigation;
    const { Cart } = props.userReducer;

    const { navigate } = useNavigation()
    const onTapFood = (item: FoodModel) => {    
        navigate('FoodDetailPage', { food: item})
    }

    const restaurant = getParam('restaurant') as Restaurant
  
    return (
        <View style={styles.container}>
            <View style={styles.navigation}>
                <ButtonWithIcon icon={require('../images/back_arrow.png')} onTap={() => goBack()} width={20} height={20} />
                <Text style={{ color: '#e45d2d', fontSize: 22, fontWeight: '100', marginLeft: 10}}> {restaurant.name}</Text>
            </View>
            <View style={styles.body}>
                <ImageBackground source={{ uri: `${restaurant.images[0]}`}}
                    style={{ width: Dimensions.get('screen').width, height: 300, justifyContent: 'flex-end', }}
                >
                    <View style={{ height: 75, backgroundColor: 'rgba(0,0,0,0.6)', padding: 10}}>
                        <Text style={{ color: '#FFF', fontSize: 20, fontWeight: '700' }} > {restaurant.name}</Text>
                        <Text style={{ color: '#FFF', fontSize: 16, fontWeight: '500' }} > {restaurant.address} { restaurant.phone}</Text>
                    </View>
                </ImageBackground>

                <FlatList 
                    showsVerticalScrollIndicator={false}
                    data={restaurant.foods}
                    renderItem={({ item}) => <FoodCard item={checkExistence(item, Cart)}  onTap={onTapFood}  onUpdateCart={() => {}}/>}
                    keyExtractor={(item) => `${item._id}`}
                />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: '#F7CC0F'
    },
    navigation: { 
        flex: 1, 
        marginTop: 40, 
        paddingLeft: 10, 
        flexDirection: 'row', 
        alignItems: 'center' 
    },
    body: { 
        flex: 11, 
        justifyContent: 'flex-start', 
        alignItems: 'center',
    },
    footer: { 
        flex: 1, 
        backgroundColor: 'cyan' 
    }
})


const mapToStateProps = (state: ApplicationState) => ({
    userReducer: state.userReducer,
})

const RestaurantScreen = connect(mapToStateProps)(_RestaurantScreen) 

export { RestaurantScreen }