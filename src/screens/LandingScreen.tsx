import React, { useState, useReducer, useEffect } from "react"
import { View, Text, StyleSheet, Dimensions, Image } from "react-native"
import * as Location from "expo-location"
import { useNavigation } from '../utils'

import { connect } from 'react-redux'
import { onUpdateLocation, UserState, ApplicationState } from '../redux'

//const screenWidth = Dimensions.get('screen').width

const _LandingScreen = () => {
    const [errorMsg, setErrorMsg] = useState("")
    const [address, setAddress] = useState<Location.LocationGeocodedAddress>()
    const [displayAddress, setDisplayAddress] = useState("Esperando pela localização atual...")

    const { navigate } = useNavigation()

    useEffect(() => {
        (async () => { //PermissionsAsync
            let { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                setErrorMsg('Premission to access location is not granted')
            }

            let location: any = await Location.getCurrentPositionAsync({})
            const { coords } = location
            
            if (coords) {
                const { latitude, longitude } = coords
                let addressResponse: any = await Location.reverseGeocodeAsync({ latitude, longitude })

                for(let item of addressResponse){
                    setAddress(item)
                    let currentAddress = `${item.name},${item.street},${item.postalCode},${item.country}`
                    setDisplayAddress(currentAddress)

                    if(currentAddress.length > 0){
                        setTimeout(() =>{
                            navigate('homeStack')
                        }, 2000)
                    }

                    return
                }
            } else {
                // ...
                console.log('...');
            }
        })()
    }, [])

    return (
        <View style={style.contaner}>
            <View style={style.navigator} />

            <View style={style.body}>
                <Image source={require('../images/delivery_icon.png')} style={style.logo} />
                <View style={style.view_title}>
                    <Text style={style.title}>The Best Delivery Itajaí</Text>
                </View>
                <View style={style.view_address}> 
                    <Text style={style.address}>{displayAddress}</Text>
                </View>
            </View>

            <View style={style.footer} />
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
        backgroundColor: '#F7CC0F'
    },
    body: {
        flex: 9,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F7CC0F'
    },
    logo: {
        width: 120,
        height: 120
    },
    view_title: {
        marginTop: 10,
        width: 200
    },
    view_address: {
        borderTopColor: '#fff',
        borderTopWidth: 2,
        paddingTop: 4,
        marginTop: 10,
        width: 200
    },
    title: {
        fontStyle: 'italic',
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#e45d2d',
        fontSize: 30,
    },
    address: {
        color: '#000',
        fontSize: 16
    },
    footer: {
        flex: 1,
        backgroundColor: '#F7CC0F'
    }
})

const mapToStateProps = (state: ApplicationState) => ({
    userReducer: state.userReducer
})

const LandingScreen = connect(mapToStateProps, { onUpdateLocation })(_LandingScreen)

export { LandingScreen }