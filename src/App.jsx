import { useEffect, useState } from "react";
import './App.css'
import Thought from './components/Thought'

const API_URL = 'https://happy-thoughts-api-4ful.onrender.com'

function App() {
  const [thoughts, setThoughts] = useState([])

  useEffect(() => {
    fetch(`${API_URL}/thoughts`)
      .then((response) => response.json())
      .then((data) => {
        setThoughts(data)
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

  return (
    <main>
      <h1>Happy Thoughts</h1>

      {thoughts.map((thought) => (
        <Thought
          key={thought._id}
          thought={thought}
          onLike={handleLike}
        />
      ))}
    </main>
  )
}

export default App
