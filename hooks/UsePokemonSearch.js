// hooks/usePokemonSearch.js
import { useState, useEffect, useMemo } from 'react'

const ALL_URL = 'https://pokeapi.co/api/v2/pokemon?limit=100000'
let allCache = null // lista de nomes, baixada uma vez por sessão

export function usePokemonSearch(query) {
  const [all, setAll]         = useState(allCache)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  // baixa a lista de nomes uma única vez
  useEffect(() => {
    if (allCache) return
    setLoading(true)
    fetch(ALL_URL)
      .then(res => {
        if (!res.ok) throw new Error(`Erro ${res.status}`)
        return res.json()
      })
      .then(json => {
        allCache = json.results
        setAll(json.results)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  // "Mr Mime" → "mr-mime" (a API usa hífen no lugar de espaço)
  const term = query.trim().toLowerCase().replace(/\s+/g, '-')

  const results = useMemo(() => {
    if (!term || !all) return []

    // busca por número: "25" encontra o Pikachu
    if (/^\d+$/.test(term)) {
      return all.filter(p => p.url.split('/').at(-2) === term)
    }
    return all.filter(p => p.name.includes(term))
  }, [all, term])

  return { results, loading, error }
}