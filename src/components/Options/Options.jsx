import { memo } from 'react'
import css from './Options.module.css'

const Options = memo(({ options, onLeaveFeedback, onReset, totalFeedback }) => {
  const handleClick = (option) => {
    requestAnimationFrame(() => {
      onLeaveFeedback(option)
    })
  }

  const handleReset = () => {
    requestAnimationFrame(() => {
      onReset()
    })
  }

  return (
    <div className={css.options}>
      {options.map(option => (
        <button
          key={option}
          onClick={() => handleClick(option)}
          type="button"
        >
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </button>
      ))}
      {totalFeedback > 0 && (
        <button type="button" onClick={handleReset}>
          Reset
        </button>
      )}
    </div>
  )
})

Options.displayName = 'Options'

export default Options
