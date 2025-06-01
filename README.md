# notification-poc
POC implementation of Notification system capable of scaling with large users.

🛠️ Setup Instructions

1. Clone the repository

        git clone git@github.com/s4sachin/notification-poc.git
    
        cd notification-poc

2. Install dependencies

Frontend

    cd notification-poc/frontend

    npm install

Backend

    cd notification-poc/backend

    npm install

3. Start the backend server

        cd notification-poc/backend

        node index.js

       • The backend runs on http://localhost:4000 (REST API and WebSocket).


4. Start the frontend (Next.js) app

        cd notification-poc/frontend

        npm run dev

        • The frontend runs on http://localhost:3000.

🧑‍💻 Usage
    
    1. Go to http://localhost:3000/signin and select a user to sign in.

    2. Home page: View demo posts. Click the "+" button to create a new post.
        
    3. Like a post: Click the "Like" button. You can only like each post once; the button will be disabled after liking.

    4. Notifications: If someone likes your post, you’ll receive a real-time notification (bell icon badge updates).

    5. View notifications: Click the bell icon to open the notification panel. Click "×" to clear all notifications and reset the bell.

🗂️ Project Structure

    notification-poc-frontend/
      src/
        app/
          layout.js
          page.js
          signin/
            page.js
        components/
          Navbar.js
          NotificationBell.js
          NotificationsPanel.js
          PostCard.js
          NewPostModal.js
        context/
          AuthContext.js
        styles/
          globals.css
    backend/
      index.js


⚙️ Basic Functionality Overview
     
     • Sign-in: User selects their identity (Sachin, Saurabh, Saumya).
       
     • Posts: Home page displays demo posts and allows new post creation.
    
     • Like: Each user can like any post once; after liking, the button is disabled.
     
     • Notifications: When a post is liked, the post owner receives a real-time notification via WebSocket.
    
     • Notification Panel: Shows notification type, time, and post info. Clearing notifications also resets the bell badge.

🌱 Future Improvements

     • Persistent Storage: Use a database for posts, likes, and notifications.
    
     • User Authentication: Implement real user accounts and secure sessions.
      
     • Mark Notifications as Read: Allow marking individual notifications as read/unread.
      
     • Notification History: Show all past notifications, not just those from the current session.
      
     • Push/Email Channels: Add support for email and push notifications.
       
     • User Preferences: Let users customize notification channels and quiet hours.
      
     • Multi-Tenancy: Support for multiple organizations or groups.
      
     • Backend API Enhancements: Add endpoints for posts, users, and notification management.
     
     • Testing & CI: Add automated tests and continuous integration.

📝 License
MIT

🙏 Acknowledgements
        • Next.js
        • Tailwind CSS
        • Express
        • ws (WebSocket)

Happy coding! If you have questions or suggestions, please open an issue or PR.
