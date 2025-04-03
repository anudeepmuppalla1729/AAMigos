# AAMigo's

AAMigo's is a full-stack MERN application designed for managing device pickup and repair requests efficiently. The platform connects users with agents who handle device servicing based on predefined service centers, devices, and companies.

## Features

- User and Agent roles with distinct functionalities
- Request creation and approval process
- Real-time status updates using Socket.io
- Payment processing for non-warranty repairs
- Manual location entry for service request allocation
- Communication between users and agents

## Tech Stack

- **Frontend:** React, Tailwind CSS, Vite
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Real-time updates:** Socket.io
- **Validation:** Joi

## Installation

### Prerequisites
- Node.js and npm installed
- MongoDB instance running

### Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/AAmigos.git
   cd AAmigos
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables in a `.env` file.
4. Start the development server:
   ```sh
   npm run dev
   ```

## Usage

- Users can create repair requests by entering device details and selecting a service center.
- Agents review requests and approve or decline them.
- Users and agents can communicate regarding service status.
- Payments are processed through the platform if the device is not under warranty.

## Roadmap

- Implement additional authentication methods
- Enhance UI/UX with improved design
- Add admin dashboard for managing service centers and agents

## Contributing

Contributions are welcome. Please fork the repository and submit a pull request with your improvements.

## License

This project is licensed under the MIT License.
