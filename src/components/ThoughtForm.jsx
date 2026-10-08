import { useState } from 'react'

function ThoughtForm({ onCreate }) {
    const [message, setMessage] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()

        if (!message.trim()) {
            return
        }

        onCreate(message)
        setMessage('')
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
            <button type="submit">
                Send happy thought
            </button>
        </form>
    )
}

export default ThoughtForm