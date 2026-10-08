function Thought({ thought, onLike }) {
    return (
        <article>
            <p>{thought.message}</p>

            <button onClick={() => onLike(thought._id)}>
                ❤️ </button>
            <span>{thought.hearts}</span>
        </article>
    )
}

export default Thought