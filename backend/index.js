const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 4000;

// In-memory data stores for demo
const notificationQueue = [];

 // Store notifications for users
const notifications = [];

const userPreferences = {
  sachin: {
    likes: true,
    maxNotificationsPerHour: 5,
    notificationsSent: 0,
    lastReset: Date.now(),
  },
  saurabh: {
    likes: true,
    maxNotificationsPerHour: 5,
    notificationsSent: 0,
    lastReset: Date.now(),
  },
  saumya: {
    likes: true,
    maxNotificationsPerHour: 5,
    notificationsSent: 0,
    lastReset: Date.now(),
  },
};

const server = http.createServer(app);

// Create WebSocket server
const wss = new WebSocket.Server({ server });

const clients = new Map();

wss.on("connection", (ws, req) => {
  const params = new URLSearchParams(req.url.replace("/", ""));
  const userId = params.get("userId");

  if (!userId || !userPreferences[userId]) {
    ws.close(1008, "Invalid or missing userId");
    return;
  }

  clients.set(userId, ws);
  console.log(`WebSocket connected: ${userId}`);

  ws.on("close", () => {
    clients.delete(userId);
    console.log(`WebSocket disconnected: ${userId}`);
  });
});

// Helper: Send notification via WebSocket if user connected
function sendWebSocketNotification(userId, notification) {
  const ws = clients.get(userId);
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(notification));
  }
}

// Rate limiting 
function resetRateLimits() {
  const now = Date.now();
  for (const userId in userPreferences) {
    if (now - userPreferences[userId].lastReset > 3600000) {
      userPreferences[userId].notificationsSent = 0;
      userPreferences[userId].lastReset = now;
    }
  }
}

// API to receive "like" events
app.post("/api/like", (req, res) => {
  const { likedBy, contentOwner, contentId } = req.body;
  if (!likedBy || !contentOwner || !contentId) {
    return res
      .status(400)
      .json({ error: "likedBy, contentOwner, and contentId are required" });
  }
  if (!userPreferences[likedBy] || !userPreferences[contentOwner]) {
    return res
      .status(400)
      .json({ error: "Invalid likedBy or contentOwner user" });
  }

  // Enqueue notification event
  notificationQueue.push({
    type: "like",
    likedBy,
    contentOwner,
    contentId,
    createdAt: new Date(),
  });
  res.status(202).json({ message: "Like event received" });
});

function processNotifications() {
  resetRateLimits();

  while (notificationQueue.length > 0) {
    const event = notificationQueue.shift();

    // Check user preferences and rate limit
    const prefs = userPreferences[event.contentOwner];
    if (!prefs) {
      console.log(
        `No preferences found for user ${event.contentOwner}, skipping notification.`
      );
      continue;
    }
    if (!prefs.likes) {
      console.log(
        `User ${event.contentOwner} has disabled like notifications.`
      );
      continue;
    }
    if (prefs.notificationsSent >= prefs.maxNotificationsPerHour) {
      console.log(`User ${event.contentOwner} reached notification limit.`);
      continue;
    }

    const message = `${capitalize(event.likedBy)} liked your post (ID: ${
      event.contentId
    })`;

    // Save notification (in-memory)
    const notification = {
      id: `${Date.now()}-${Math.random()}`,
      userId: event.contentOwner,
      message,
      read: false,
      createdAt: new Date(),
    };
    notifications.push(notification);

    // Send real-time notification via WebSocket
    sendWebSocketNotification(event.contentOwner, notification);

    prefs.notificationsSent += 1;

  }

  setTimeout(processNotifications, 1000);
}

processNotifications();

// Capitalize helper
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Start server
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
  console.log(`WebSocket server running on ws://localhost:${PORT}`);
});
