# AAMigo’s - Smart Device Repair & Pickup Platform (Development Stage)

AAMigo’s is a full-stack MERN-based service platform that connects users with repair service centers through pickup agents. It streamlines the device repair process by offering doorstep pickup, repair tracking, and secure delivery.

## How It Works:

1. Users request a device repair via the platform.
2. Agents pick up the device and take it to a predefined service center.
3. Repair status is updated in real-time.
4. Users pay if required and approve the repair.

Agents deliver the repaired device back to the user.

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
