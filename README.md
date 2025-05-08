Welcome to Karinderia Mobile App


🚀 Getting Started
📦 Prerequisites
Before running this project, ensure the following are installed:

Node.js (v18+ recommended)

Yarn or npm

Expo CLI

json-server (used to simulate a backend)

🛠️ Installation
Clone the repository:

bash
Copy
Edit
git clone https://github.com/ron-thecertifiedbomb/karinderia_app.git
cd your-repo
Install dependencies:

bash
Copy
Edit
yarn install
# or
npm install
Install json-server globally (if not installed):

bash
Copy
Edit
npm install -g json-server
🧾 Starting the Fake API Server
Make sure the db.json file exists in the root directory (contains menu, users, etc.)

Run the server:

bash
Copy
Edit
json-server --watch db.json --port 3001
This will start the API at: http://localhost:3001

📱 Running the App
To start the Expo development server:

bash
Copy
Edit
yarn start
# or
npm start
Open Expo Go app on your device and scan the QR code, or

Press i to open on iOS simulator (Mac only)

Press a to open on Android emulator

🧪 Optional: Clear Cache
If you encounter issues:

bash
Copy
Edit
expo start -c

