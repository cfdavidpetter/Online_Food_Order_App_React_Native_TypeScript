import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";

export const HomeScreen = () => {
    return (
        <View style={style.contaner}>
            <View style={style.navigator}>
                <Text>Navigator</Text>
            </View>
            <View style={style.body}>
                <Text>Body</Text>
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