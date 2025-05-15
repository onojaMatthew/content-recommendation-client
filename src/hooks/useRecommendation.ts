import { useEffect, useState } from 'react'
import api from '../app/services/api'
import { Content } from '../types/content'

const useRecommendations = () => {
  const [recommendations, setRecommendations] = useState<Content[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true)
        const { data } = await api.get('/recommendations')
        setRecommendations(data.data)
      } catch (err: any) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendations()
  }, [])

  return { recommendations, loading, error }
}

export default useRecommendations