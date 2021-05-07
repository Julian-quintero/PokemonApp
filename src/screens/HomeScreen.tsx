import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { styles } from '../theme/apptheme'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import usePokemonPaginated from '../hooks/usePokemonPaginated'


const HomeScreen = () => {
   const {top} =  useSafeAreaInsets()
   const {simplePokemonList}=usePokemonPaginated()
   console.log(simplePokemonList);
   
    return (
        <>
        <Image 
        style={styles.pokebolaBG}
        source={require('../../assets/pokebola.png')}
        />
            <Text style={{...styles.title,...styles.globalMargin,top:top}}>Pokedex</Text>
             </> )
}

export default HomeScreen


