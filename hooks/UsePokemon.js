import { useState, useEffect } from 'react'

export function usePokemon(url) {
  const [data, setData]       = useState(null)
  const [loading, setLoading] = useState(false)
  const [erro, setErro]       = useState(null)

  useEffect(() => {
    if (!url) return

    const controller = new AbortController()
    setLoading(true)
    setErro(null)

    fetch(url, { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error(`Erro ${res.status}`)
        return res.json()
      })
      .then(json => setData(json))
      .catch(err => {
        if (err.name !== 'AbortError') setErro(err.message)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [url])

  return { data, loading, erro }
}