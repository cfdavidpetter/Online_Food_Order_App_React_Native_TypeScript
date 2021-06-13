import React from 'react'
import { StyleSheet, View, Text, ImageBackground, Dimensions } from 'react-native'
import { ButtonWithIcon, FoodCard } from '../components';
import { ApplicationState, FoodModel, UserState } from '../redux';
import { connect } from 'react-redux';

import { useNavigation, checkExistence } from '../utils'


interface FoodDetailProps{ 
    navigation: { getParam: Function, goBack: Function}
    userReducer: UserState,
 }

const _FoodDetailScreen: React.FC<FoodDetailProps> = (props) => {
    const { getParam, goBack } = props.navigation;
    const { Cart } = props.userReducer;

    const { navigate } = useNavigation()

    const food = getParam('food') as FoodModel
  
    return (
        <View style={styles.container}>
            <View style={styles.navigation}>
                <ButtonWithIcon icon={require('../images/back_arrow.png')} onTap={() => goBack()} width={20} height={20} />
                <Text style={{ color: '#e45d2d', fontSize: 22, fontWeight: '100', marginLeft: 10}}> {food.name}</Text>
            </View>
            <View style={styles.body}>
                <ImageBackground 
                    source={{ uri: `${food.images[0]}`}}
                    style={{ width: Dimensions.get('screen').width, height: 300, justifyContent: 'flex-end', }}
                    >
                    <View style={{ height: 75, backgroundColor: 'rgba(0,0,0,0.6)', padding: 10}}>
                        <Text style={{ color: '#FFF', fontSize: 20, fontWeight: '700' }} > {food.name}</Text>
                        <Text style={{ color: '#FFF', fontSize: 16, fontWeight: '500' }} > {food.category} </Text>
                    </View>
                </ImageBackground>  
                <View style={{ display: 'flex', padding: 20}}> 
                    <Text> Food Will be ready within {food.readyTime}  Minite(s)</Text>
                    <Text>{food.description} </Text>
                </View> 
                <View style={{ height: 120,}}>
                    <FoodCard item={checkExistence(food, Cart)} onTap={() => {}} onUpdateCart={() => {}} />
                </View>
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
        marginTop: 43, 
        paddingLeft: 10, 
        flexDirection: 'row', 
        alignItems: 'center' 
    },
    body: { 
        flex: 10, 
        justifyContent: 'flex-start', 
        alignItems: 'center',
        paddingBottom: 160
    },
    footer: { 
        flex: 1, 
        backgroundColor: 'cyan' 
    }
})


const mapToStateProps = (state: ApplicationState) => ({
    userReducer: state.userReducer,
})

const FoodDetailScreen = connect(mapToStateProps)(_FoodDetailScreen) 

export { FoodDetailScreen }