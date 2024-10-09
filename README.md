API Chaining Dashboard
#Description
This React application demonstrates API chaining, where users can:

#Fetch a list of users.
Create a post for a selected user.
View comments associated with the created post.
The project illustrates how data flows from one API call to another, showcasing practical use of API chaining. The application also handles loading states, error messages, and provides feedback during interactions.

#Setup Instructions
Clone the Repository:
git clone <repository-url>

#Install Dependencies:
Navigate to the project directory and run:

#bash
npm install
Start the Development Server:
Run the following command to start the app:

bash
npm start
The app will be available at http://localhost:3000.

Features
GET Users: Fetches a list of users from a placeholder API.
Create Post: Allows the user to input a post's title and body and submit it for the selected user.
Display Comments: Shows comments associated with the created post after submission.
Error Handling & Loading States: Displays relevant messages during API interactions.
Assumptions
The application uses mock APIs from jsonplaceholder.typicode.com.
Users must fill in both the title and body fields to create a post successfully.
The application automatically increments the user ID for each post created.
Known Issues
The API flow chart visualization component is a placeholder and needs further implementation.
The current user ID resets after refreshing the page, which might need improvement for persistent state management
