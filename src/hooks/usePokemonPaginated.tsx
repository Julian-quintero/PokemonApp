import React, {useEffect, useRef, useState} from 'react'
import {View, Text} from 'react-native'
import {PokemonPaginatedResponse, SimplePokemon, Result} from '../interfaces/pokemonInterfaces'

const usePokemonPaginated = () => {
    const [isLoading, setisLoading] = useState(true)
    const nextPageUrl = useRef('https://pokeapi.co/api/v2/pokemon?limit=40')
    const [simplePokemonList, setsimplePokemonList] = useState < SimplePokemon[] > ([]) // useState de tipo simplePokemon arreglo

    async function api<T>(): Promise<PokemonPaginatedResponse>// devuelve una promesa de tipo pokemonPaginatedResponse
    {
    let resp = await fetch(nextPageUrl.current)
    return await resp.json()
    }

    function mapPokemonList(pokmeonList: Result[]) {

       const newPokemonList:SimplePokemon[] = pokmeonList.map(({name,url})=>{ //devuelve una lista de tipo Pokemon list


        const urlParts = url.split('/'); // esto es para sacar el id por que no viene en un formato bueno
        const id = urlParts[urlParts.length-2]
        const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
        return {
            id,
            picture,
            name // al ser tipo pokemon list necesito devolver lo mismo
        }
       })

       setsimplePokemonList([...simplePokemonList,...newPokemonList])
       setisLoading(false)

    }

    const loadPokemons = async () => {
     
        setisLoading(true)
        const data = await api()
        nextPageUrl.current = data.next
        mapPokemonList(data.results)


    }

    useEffect(() => {
        loadPokemons()

    }, [])

    return {
        isLoading,
        simplePokemonList
    }


}

export default usePokemonPaginated
