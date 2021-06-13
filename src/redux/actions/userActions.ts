import axios from 'axios'
import { LocationGeocodedAddress } from 'expo-location'
import { Dispatch } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FoodModel } from '../models'

export interface UpdateLocationAction{
    readonly type: 'ON_UPDATE_LOCATION',
    payload: LocationGeocodedAddress
}


export interface UserErrorAction{
    readonly type: 'ON_USER_ERROR',
    payload: any
}


export interface UpdateCartAction{
    readonly type: 'ON_UPDATE_CART',
    payload: FoodModel
}

export interface UserLoginAction{
    readonly type: 'ON_USER_LOGIN',
    payload: string
}

export type UserAction = UpdateLocationAction | UserErrorAction | UpdateCartAction | UserLoginAction;

// User Actions trigger from Components
export const onUpdateLocation = (location: LocationGeocodedAddress) => {
    return async ( dispatch: Dispatch<UserAction>) => {
        try {
            const locationString = JSON.stringify(location)
            await AsyncStorage.setItem('user_location', locationString)
            // save our location in local storage
            dispatch({
                type: 'ON_UPDATE_LOCATION',
                payload: location
            })

        } catch (error) {
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            })
        }
    }
}