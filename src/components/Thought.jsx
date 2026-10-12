function getTimeAgo(createdAt) {
    if (!createdAt) return ''

    const seconds = Math.max(
        0,
        Math.floor((Date.now() - new Date(createdAt).getTime()) / 1000)
    )

    if (Number.isNaN(seconds)) return ''

    if (seconds < 60) {
        return `${seconds} second${seconds === 1 ? '' : 's'} ago`
    }

    const minutes = Math.floor(seconds / 60)

    if (minutes < 60) {
        return `${minutes} minute${minutes === 1 ? '' : 's'} ago`
    }

    const hours = Math.floor(minutes / 60)

    if (hours < 24) {
        return `${hours} hour${hours === 1 ? '' : 's'} ago`
    }

    const days = Math.floor(hours / 24)

    return `${days} day${days === 1 ? '' : 's'} ago`
}

function Thought({ thought, onLike }) {
    return (
        <article className="thought-card">
            <p className="thought-message">{thought.message}</p>

            <div className="thought-footer">
                <div className="thought-likes">
                    <button
                        className="like-button"
                        type="button"
                        onClick={() => onLike(thought._id)}
                        aria-label={`Like this thought. Current hearts: ${thought.hearts}`}>
                        ❤️
                    </button>

                    <span className="heart-count">x {thought.hearts}</span>
                </div>
                <time className="thought-time" dateTime={thought.createdAt}>
                    {getTimeAgo(thought.createdAt)}
                </time>

            </div>
        </article>
    )
}

export default Thought