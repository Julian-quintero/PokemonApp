import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { SimplePokemon } from '../interfaces/pokemonInterfaces'
import { FadeInImage } from './FadeInImage'
import { TouchableOpacity } from 'react-native-gesture-handler'

interface Props {
    pokemon: SimplePokemon;
}

const windowWith = Dimensions.get('window').width

const PokemonCard = ({ pokemon }: Props) => {
    return (

        <TouchableOpacity

            activeOpacity={0.9}
        >
            <View style={{ ...styles.cardContainer, width: windowWith * 0.3 }}>

                <Text>{pokemon.name}</Text>

                <FadeInImage
                    uri={pokemon.picture}
                    style={{ height: 100, width: 100 }}
                />



            </View>

        </TouchableOpacity>

    )
}

export default PokemonCard

const styles = StyleSheet.create({

    cardContainer: {
        marginHorizontal: 5,
        backgroundColor: 'red',
        height: 120,
        marginBottom: 25,
        borderRadius: 10,
    }


})
