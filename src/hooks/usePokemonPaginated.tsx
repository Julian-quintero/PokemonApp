import React, {useEffect, useRef, useState} from 'react'
import {View, Text} from 'react-native'
import {PokemonPaginatedResponse, SimplePokemon, Result} from '../interfaces/pokemonInterfaces'

const usePokemonPaginated = () => {
    const [isLoading, setisLoading] = useState(true) //loading
    const nextPageUrl = useRef('https://pokeapi.co/api/v2/pokemon?limit=40') //creo una referencia 
    const [simplePokemonList, setsimplePokemonList] = useState <SimplePokemon[]> ([]) // useState de tipo simplePokemon arreglo

    async function api<T>(): Promise<PokemonPaginatedResponse>// devuelve una promesa de tipo pokemonPaginatedResponse
    {
    let resp = await fetch(nextPageUrl.current) //recibo una respuesta del useref actual
    return await resp.json()
    }

    function mapPokemonList(pokmeonList: Result[]) { //recibo pokemonlist de tipo Result[] es un arreglo       
        

       const newPokemonList:SimplePokemon[] = pokmeonList.map(({name,url})=>{ 
       //devuelve una lista de tipo SimplePokemon con el formato 
       /**
         {
             id:
             picture:
             name:
         }
        * 
        * 
        * 
        */




        const urlParts = url.split('/'); // esto es para sacar el id por que no viene en un formato bueno
        const id = urlParts[urlParts.length-2] //esto es para moverme en el formato del api
        const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
        return {
            id,
            picture,
            name // al ser tipo pokemon list necesito devolver lo mismo
        }
       })
       

       setsimplePokemonList([...simplePokemonList,...newPokemonList]) //creo una arreglo con la lista actual y le sumo la nueva lista
       setisLoading(false)

    }

    const loadPokemons = async () => {
     
        setisLoading(true)
        const data = await api()             
       
       /** RESULTADO DEL LLAMADO A LA API
    [
       {
    "count": 1118,
    "next": "https://pokeapi.co/api/v2/pokemon?offset=40&limit=40",
    "previous": null,
    "results": [
          {
            "name": "bulbasaur",
            "url": "https://pokeapi.co/api/v2/pokemon/1/"
        },     
    ]
}
       
       */
        nextPageUrl.current = data.next //cambio la pagina actual a la siguiente usando 'next' de la api
        mapPokemonList(data.results) //paso a la funcion los resultados actuales


    }

    useEffect(() => {
        loadPokemons()

    }, [])

    return {
        isLoading,
        simplePokemonList,
        loadPokemons
    }


}

export default usePokemonPaginated
