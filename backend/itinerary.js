const express = require("express")
const cors = require("cors")
const { v4: uuidv4 } = require("uuid")

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())

// In-memory itinerary data
let itinerary = [
  {
    id: uuidv4(),
    day: "Day 1 - Arrival",
    activities: [
      { time: "Morning", title: "Arrive at airport", description: "Meet guide and transfer to hotel" },
      { time: "Evening", title: "Welcome dinner", description: "Enjoy traditional local meal" }
    ]
  },
  {
    id: uuidv4(),
    day: "Day 2 - Sightseeing",
    activities: [
      { time: "9:00 AM", title: "Visit museum", description: "Explore historical exhibits" },
      { time: "2:00 PM", title: "Lunch at plaza", description: "Relax and enjoy local cuisine" }
    ]
  }
]

// GET all itinerary
app.get("/itinerary", (req, res) => {
  res.json(itinerary)
})

// DELETE a day by ID
app.delete("/itinerary/:dayId", (req, res) => {
  const { dayId } = req.params
  itinerary = itinerary.filter(day => day.id !== dayId)
  res.json({ message: "Day deleted successfully" })
})

// POST a new activity to a day
app.post("/itinerary/:dayId/activities", (req, res) => {
  const { dayId } = req.params
  const activity = req.body

  const day = itinerary.find(day => day.id === dayId)
  if (!day) return res.status(404).json({ error: "Day not found" })

  day.activities.push(activity)
  res.status(201).json(activity)
})

// DELETE an activity by index
app.delete("/itinerary/:dayId/activities/:activityIndex", (req, res) => {
  const { dayId, activityIndex } = req.params
  const day = itinerary.find(day => day.id === dayId)

  if (!day) return res.status(404).json({ error: "Day not found" })

  const index = parseInt(activityIndex)
  if (isNaN(index) || index < 0 || index >= day.activities.length) {
    return res.status(400).json({ error: "Invalid activity index" })
  }

  day.activities.splice(index, 1)
  res.json({ message: "Activity deleted successfully" })
})

// Optional: Add new day
app.post("/itinerary", (req, res) => {
  const { day, activities = [] } = req.body
  const newDay = { id: uuidv4(), day, activities }
  itinerary.push(newDay)
  res.status(201).json(newDay)
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
