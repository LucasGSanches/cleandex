import { useState, useEffect } from 'react'

export function usePokemon(url) {
  const [data, setData]       = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]       = useState(null)

  useEffect(() => {
    if (!url) return
    const controller = new AbortController()
    setLoading(true)
    setError(null)

    fetch(url, { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error(`Erro ${res.status}`)
        return res.json()
      })
      .then(json => setData(json))
      .catch(err => {
        if (err.name !== 'AbortError') setError(err.message)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [url])

  return { data, loading, error }
}