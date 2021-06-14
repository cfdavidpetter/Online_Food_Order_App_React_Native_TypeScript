import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions , Image } from 'react-native'
import * as Location from 'expo-location'
import { connect } from 'react-redux'
import { onUpdateLocation, UserState, ApplicationState } from '../redux'
import { useNavigation } from '../utils'

const screenWidth = Dimensions.get('screen').width

interface LandingProps{
    userReducer: UserState,
    onUpdateLocation: Function
}

const _LandingScreen: React.FC<LandingProps> = (props) => {
    const { userReducer, onUpdateLocation }  = props;
     
    const [errorMsg, setErrorMsg] = useState("")
    const [address, setAddress] = useState<Location.LocationGeocodedAddress>()
    
    const [displayAddress, setDisplayAddress] = useState("Esperando pela localização atual...")

    const { navigate } = useNavigation()

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted'){
                setErrorMsg('A permissão para acessar o local não foi concedida')
            }

            let location: any = await Location.getCurrentPositionAsync({});
            const { coords } = location

            if(coords){
                const { latitude, longitude} = coords;
                let addressResponse: any = await Location.reverseGeocodeAsync({ latitude, longitude})

                for(let item of addressResponse){

                    let dataLocation = {
                        "city": item.city !== null ? item.city : item.subregion,
                        "country": item.country,
                        "district": item.district,
                        "isoCountryCode": item.isoCountryCode,
                        "name": item.name,
                        "postalCode": item.postalCode,
                        "region": item.region,
                        "street":item.street,
                        "subregion": item.subregion,
                        "timezone": item.timezone,
                    }

                    setAddress(dataLocation)
                    onUpdateLocation(dataLocation)

                    let currentAddress = `${dataLocation.postalCode}, ${dataLocation.street}, ${dataLocation.name}, ${dataLocation.district}, ${dataLocation.city}, ${dataLocation.country}`
                    setDisplayAddress(currentAddress)

                    if(currentAddress.length > 0){
                        setTimeout(() =>{
                            navigate('homeStack')
                        }, 5000)
                    }

                    return;
                }
            }else{
                //notify user something went wrong with location
            }
        })();
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.navigation} /> 
                
            <View style={styles.body}>
                <Image source={require('../images/delivery_icon.png')} style={styles.deliveryIcon} />
                <View style={styles.addressContainer}>
                    <Text style={styles.addressTitle}>O Melhor Delivery Itajaí</Text>
                </View>
                <View style={styles.addressDisplayAddress}>
                    <Text style={styles.addressText}>{displayAddress}</Text>
                </View>
            </View>
            <View style={styles.footer} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(242,242,242,1)'
    },
    navigation: {
        flex: 2,
    },
    body: {
        flex: 9,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deliveryIcon:{
        width: 120,
        height: 120
    },
    addressContainer: {
        width: screenWidth - 100,
        borderBottomColor: 'red',
        borderBottomWidth: 0.5,
        padding: 5,
        marginBottom: 5,
        alignItems: 'center',
        
    },
    addressDisplayAddress: {
        width: screenWidth - 100
    },
    addressTitle:{
        fontSize: 22,
        fontWeight: '700',
        color: '#7D7D7D'
    },
    addressText: {
        fontSize: 16,
        fontWeight: '200',
        color: '#4F4F4F'
    },
    footer: {
        flex: 1,
    }
})

const mapToStateProps = (state: ApplicationState) => ({
    userReducer: state.userReducer
})

const LandingScreen = connect(mapToStateProps, { onUpdateLocation })(_LandingScreen)

export { LandingScreen }