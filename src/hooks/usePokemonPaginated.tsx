import React, {useEffect, useRef, useState} from 'react'
import {View, Text} from 'react-native'
import {PokemonPaginatedResponse, SimplePokemon, Result} from '../interfaces/pokemonInterfaces'

const usePokemonPaginated = () => {

    const nextPageUrl = useRef('https://pokeapi.co/api/v2/pokemon?limit=40')
    const [simplePokemonList, setsimplePokemonList] = useState < SimplePokemon[] > ([]) // useState de tipo simplePokemon arreglo

    async function api<T>(): Promise<PokemonPaginatedResponse>{let resp = await fetch(nextPageUrl.current)
    return await resp.json()}

    function mapPokemonList(pokmeonList: Result[]) {

        pokmeonList.forEach(poke => console.log(poke.url))

    }

    const loadPokemons = async () => {

        const data = await api()
        nextPageUrl.current = data.next
        mapPokemonList(data.results)


    }

    useEffect(() => {
        loadPokemons()

    }, [])


}

export default usePokemonPaginated
