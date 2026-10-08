import { useEffect, useState } from 'react';
import './App.css'
import Thought from './components/Thought'
import ThoughtForm from './components/ThoughtForm'

const API_URL = 'https://happy-thoughts-api-4ful.onrender.com'

function App() {
  const [thoughts, setThoughts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`${API_URL}/thoughts`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch thoughts.')
        }

        return response.json()
      })
      .then((data) => {
        const sortedThoughts = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
        setThoughts(sortedThoughts)
      })
      .catch((error) => {
        console.error('Failed to fetch thoughts:', error)
        setError('Could not load happy thoughts. Please try again.')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])
  const handleLike = (id) => {
    fetch(`${API_URL}/thoughts/${id}/like`, {
      method: 'POST',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`)
        }

        return response.json()
      })
      .then((updatedThought) => {
        setThoughts((currentThoughts) =>
          currentThoughts.map((thought) =>
            thought._id === updatedThought._id
              ? updatedThought
              : thought
          )
        )
      })
      .catch((error) => {
        console.error('Failed to like thought:', error)
      })
  }

  const handleCreate = (message) => {
    return fetch(`${API_URL}/thoughts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: message,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`)
        }

        return response.json()
      })
      .then((newThought) => {
        setThoughts((currentThoughts) => [
          newThought,
          ...currentThoughts,
        ])
      })
      .catch((error) => {
        console.error('Failed to create thought:', error)
        throw error
      })
  }

  return (
    <main>
      <h1>Happy Thoughts</h1>

      <ThoughtForm onCreate={handleCreate} />
      {isLoading ? (
        <p>Loading happy thoughts...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        thoughts.map((thought) => (
          <Thought
            key={thought._id}
            thought={thought}
            onLike={handleLike}
          />
        ))
      )}
    </main>
  )
}

export default App
