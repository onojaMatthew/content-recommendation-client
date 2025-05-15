import { useState, useEffect } from 'react';
import api from '../app/services/api';

const useAnalytics = () => {
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [timeRange, setTimeRange] = useState('7d')

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true)
        const { data } = await api.get(`/analytics/content?timeRange=${timeRange}`)
        setAnalytics(data.data)
      } catch (err: any) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [timeRange])

  return { analytics, loading, error, timeRange, setTimeRange }
}

export default useAnalytics