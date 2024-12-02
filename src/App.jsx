import { useState, useEffect, useCallback } from 'react'
import Description from './components/Description/Description'
import Feedback from './components/Feedback/Feedback'
import Options from './components/Options/Options'
import Notification from './components/Notification/Notification'
import './App.css'

const App = () => {
  const [feedback, setFeedback] = useState(() => {
    try {
      const savedFeedback = localStorage.getItem('feedback')
      return savedFeedback ? JSON.parse(savedFeedback) : {
        good: 0,
        neutral: 0,
        bad: 0
      }
    } catch {
      return {
        good: 0,
        neutral: 0,
        bad: 0
      }
    }
  })

  useEffect(() => {
    const saveToStorage = () => {
      try {
        localStorage.setItem('feedback', JSON.stringify(feedback))
      } catch (error) {
        console.error('Failed to save to localStorage:', error)
      }
    }

    const timeoutId = setTimeout(saveToStorage, 500)
    return () => clearTimeout(timeoutId)
  }, [feedback])

  const totalFeedback = feedback.good + feedback.neutral + feedback.bad
  const positivePercentage = totalFeedback ? Math.round((feedback.good / totalFeedback) * 100) : 0

  const onLeaveFeedback = useCallback((option) => {
    setFeedback(prevFeedback => ({
      ...prevFeedback,
      [option]: prevFeedback[option] + 1
    }))
  }, [])

  const onReset = useCallback(() => {
    setFeedback({
      good: 0,
      neutral: 0,
      bad: 0
    })
  }, [])

  return (
    <div className="container">
      <Description />
      
      <Options 
        options={Object.keys(feedback)} 
        onLeaveFeedback={onLeaveFeedback}
        onReset={onReset}
        totalFeedback={totalFeedback}
      />

      {totalFeedback > 0 ? (
        <Feedback 
          feedback={feedback}
          total={totalFeedback}
          positivePercentage={positivePercentage}
        />
      ) : (
        <Notification message="There is no feedback yet" />
      )}
    </div>
  )
}

export default App
