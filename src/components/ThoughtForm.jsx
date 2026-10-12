import { useState } from 'react'

function ThoughtForm({ onCreate }) {
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault()

        if (!trimmedMessage || isSubmitting) return

        setError('')
        setIsSubmitting(true)

        onCreate(trimmedMessage)
            .then(() => {
                setMessage('')
            })
            .catch(() => {
                setError('Could not send your thought. Please try again.')
            })
            .finally(() => {
                setIsSubmitting(false)
            })
    }

    return (
        <form className="thought-form" onSubmit={handleSubmit}>
            <label htmlFor="message">
                What's making you happy right now?
            </label>

            <textarea
                id="message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Share a happy thought..."
                required
            />

            {error && <p className="form-error" role="alert">{error}</p>}

            <button
                className="submit-button"
                type="submit"
                disabled={!message.trim() || isSubmitting}
            >
                ❤️ {isSubmitting ? 'Sending...' : 'Send Happy Thought'} ❤️
            </button>
        </form>
    )
}

export default ThoughtForm