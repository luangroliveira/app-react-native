import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, Text, TextInput } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from "expo-location";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import axios from '../services/api'

function Main({ navigation }) {
    const [currentRegion, setCurrentRegion] = useState(null);

    useEffect(() => {
        async function loadInitialLocation() {
            const { granted } = await requestPermissionsAsync();
            if (granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });

                const { latitude, longitude } = coords;

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.2,
                    longitudeDelta: 0.2
                });
            }
        }
        loadInitialLocation();
    }, []);

    async function loadDevs(){
        
    }

    if (!currentRegion) {
        return null;
    }

    return (
        <>
            <MapView initialRegion={currentRegion} style={styles.map} >
                <Marker coordinate={{ latitude: -22.4722489, longitude: -44.4649924 }}>
                    <Image style={styles.avatar} source={{ uri: 'https://cdn.pensador.com/img/authors/ho/me/homer-simpson-l.jpg' }} />
                    <Callout style={styles.callout} onPress={() => {
                        navigation.navigate('Profile', { github_username: 'luangroliveira' });
                    }}>
                        <View>
                            <Text style={styles.devName}>Luan Oliveira</Text>
                            <Text style={styles.devBio}>Bio do Luan Oliveira, o bom em programação</Text>
                            <Text style={styles.devTechs}>ReactJs, Php, NodeJs, Laravel</Text>
                        </View>
                    </Callout>
                </Marker>
            </MapView>
            <View style={styles.searchForm}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar devs por techs"
                    placeholderTextColor="#999"
                    autoCapitalize='words'
                    autoCorrect={false}
                />
                <TouchableOpacity onPress={() => { }} style={styles.loadButton}>
                    <MaterialIcons name='my-location' size={20} color="#fff" />
                </TouchableOpacity>
            </View>
        </>
    )
}

export default Main;

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#fff'
    },
    callout: {
        width: 260
    },
    devName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    devBio: {
        color: '#666',
        marginTop: 5,
    },
    devTechs: {
        marginTop: 5,
    },
    searchForm: {
        position: 'absolute',
        top: 20,
        right: 20,
        left: 20,
        zIndex: 5,
        flexDirection: 'row',
    },
    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: '#fff',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4,
        }
    },
    loadButton: {
        width: 50,
        height: 50,
        backgroundColor: '#8e40ff',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
    }

});