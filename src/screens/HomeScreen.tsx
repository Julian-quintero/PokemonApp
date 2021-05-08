import React from 'react'
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native'
import { styles } from '../theme/apptheme'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import usePokemonPaginated from '../hooks/usePokemonPaginated'
import { FlatList } from 'react-native-gesture-handler'
import PokemonScreen from './PokemonScreen'
import { FadeInImage } from '../components/FadeInImage'
import PokemonCard from '../components/PokemonCard'


const HomeScreen = () => {
    const { top } = useSafeAreaInsets()
    const { simplePokemonList, loadPokemons } = usePokemonPaginated()


    return (
        <>
            <Image
                style={styles.pokebolaBG}
                source={require('../../assets/pokebola.png')}
            />

            <View

            style={{
          
                alignItems:'center'
            }}
            >

            <FlatList


                data={simplePokemonList}
                keyExtractor={(pokemon) => pokemon.id}
                onEndReached={loadPokemons}
                onEndReachedThreshold={0.4}
                ListHeaderComponent={ <Text style={{...styles.title,...styles.globalMargin,top:top}}>Pokedex</Text> }
                numColumns={3}
                ListFooterComponent={<ActivityIndicator size={20} color={'blue'} style={{ height: 100 }}></ActivityIndicator>}
                renderItem={({ item, index }) => (
                    <PokemonCard pokemon={item}/>

                

              
        
                )}



            />

</View>





            
        </>)
}

export default HomeScreen


