import React from 'react'
import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

function getPokemonData(whichPokemon: string, setPokemonData: any) {
  const backendURL = 'http://localhost:5001/pokemon/'
  try {
    axios.get(backendURL + whichPokemon).then((response) => {
      console.log(response.data)
      if (!response.data || response.data === 'Not Found') return
      setPokemonData(response.data)
    })
  } catch (error) {
    console.log(error)
  }
}

function App() {
  const [whichPokemon, setWhichPokemon] = useState('pikachu')
  const [pokemonName, setPokemonName] = useState('tomo')
  const [pokemonData, setPokemonData] = useState<any>({})

  useEffect(() => {
    if (!whichPokemon) return
    getPokemonData(whichPokemon, setPokemonData)
  }, [whichPokemon])

  return (
    <main className="w-1/3 m-auto my-16">
      <div className="flex flex-row items-center justify-between gap-4 mb-4">
        <input
          id="pokemonInput"
          type="text"
          className="input input-bordered w-full max-w-xs"
          placeholder={whichPokemon}
        />
        <input
          type="button"
          value="Get Pokemon"
          className="btn btn-neutral"
          onClick={() => {
            const newPokemon = (
              document.getElementById('pokemonInput') as HTMLInputElement
            ).value.trim()
            if (!newPokemon) return
            setWhichPokemon(newPokemon.toLowerCase())
          }}
        />
      </div>
      <div className="flex flex-row justify-between w-full mb-8">
        <button
          className="btn btn-neutral"
          onClick={() => setWhichPokemon('pikachu')}>
          Pikachu
        </button>
        <button
          className="btn btn-neutral"
          onClick={() => setWhichPokemon('charizard')}>
          Charizard
        </button>
        <button
          className="btn btn-neutral"
          onClick={() => setWhichPokemon('persian')}>
          Persian
        </button>
        <button
          className="btn btn-neutral"
          onClick={() => setWhichPokemon('graveler')}>
          Graveler
        </button>
      </div>
      <div className="card w-full bg-base-100 shadow-xl">
        <figure className="bg-gray-200 h-48">
          <img
            src={pokemonData.sprites?.front_default as string}
            alt="Pokemon"
            className="w-[96px]"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title uppercase font-bold">{pokemonData.name}</h2>

          <ul className="list-disc">
            <li>Height: {pokemonData?.height as string}</li>
            <li>Weight: {pokemonData?.weight as string}</li>

            <li>
              Abilities:{' '}
              {pokemonData?.abilities
                ?.map((ability: any) => ability?.ability?.name)
                .join(', ')}
            </li>
            {pokemonData?.types?.map((type: any) => (
              <li>Type: {type?.type?.name}</li>
            ))}
            {pokemonData?.stats && (
              <li>
                Stats:{' '}
                {pokemonData?.stats
                  ?.map(
                    (stat: any) =>
                      `${stat?.stat?.name}: ${stat?.base_stat} (${stat?.effort})`
                  )
                  .join(', ')}
              </li>
            )}
            {pokemonData?.moves && (
              <li>
                Moves:{' '}
                {pokemonData?.moves
                  ?.map((move: any) => move?.move?.name)
                  .slice(0, 5)
                  .join(', ')}
              </li>
            )}
          </ul>
        </div>
      </div>
    </main>
  )
}

export default App
