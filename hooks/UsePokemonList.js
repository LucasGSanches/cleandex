// hooks/UsePokemonList.js
import { useState, useEffect, useCallback, useRef } from 'react'

const FIRST_PAGE = 'https://pokeapi.co/api/v2/pokemon?limit=20'

export function usePokemonList() {
  const [list, setList]       = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)
  const nextRef       = useRef(FIRST_PAGE) // sempre o valor atual, sem closure velha
  const isFetchingRef = useRef(false)

  const loadMore = useCallback(async () => {
    const url = nextRef.current
    if (isFetchingRef.current || !url) return
    isFetchingRef.current = true
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error(`Erro ${res.status}`)
      const json = await res.json()

      nextRef.current = json.next   // atualiza ANTES de liberar a trava
      setHasMore(json.next !== null)

      setList(previous => {
        const seen = new Set(previous.map(p => p.name))
        const fresh = json.results.filter(p => !seen.has(p.name)) // rede de segurança
        return [...previous, ...fresh]
      })
    } catch (err) {
      setError(err.message)
    } finally {
      isFetchingRef.current = false
      setLoading(false)
    }
  }, []) // não depende de nada: lê tudo dos refs

  useEffect(() => {
    loadMore()
  }, [loadMore])

  return { list, loading, error, loadMore, hasMore }
}