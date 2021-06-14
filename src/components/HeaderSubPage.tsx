import React, { useState, useEffect} from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { ButtonWithIcon } from './ButtonWithIcon'

interface HeaderSubPageProps{ 
    title: String,
    navigation: { getParam: Function, goBack: Function},
}

const HeaderSubPage: React.FC<HeaderSubPageProps> = ({ title, navigation }) => {

    const { getParam, goBack } = navigation;

    return (
        <View style={styles.navigation}>
            <ButtonWithIcon icon={require('../images/back_arrow.png')} onTap={() => goBack()} width={25} height={25} />
            <Text style={{ fontSize: 20, fontWeight: '600', marginLeft: 10}}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    navigation: { 
        flex: 1,
        marginTop: 43, 
        paddingLeft: 10, 
        flexDirection: 'row', 
        alignItems: 'center' 
    }
})

export { HeaderSubPage }