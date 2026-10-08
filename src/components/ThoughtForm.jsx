import { useState } from 'react'

function ThoughtForm({ onCreate }) {
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()

        if (!message.trim()) {
            return
        }

        setError('')

        onCreate(message)
            .then(() => {
                setMessage('')
            })
            .catch(() => {
                setError('Could not send your thought. Please try again.')
            })
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="message">
                What's making you happy right now?
            </label>

            <textarea
                id="message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Share a happy thought..."
            />

            {error && <p role="alert">{error}</p>}

            <button type="submit">
                Send happy thought
            </button>
        </form>
    )
}

export default ThoughtForm