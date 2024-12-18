# Polyline Station & Offset Calculator

This project calculates the **Station** and **Offset** of a point in relation to a polyline. 
It takes an ASCII file containing polyline coordinates and a specific point coordinate, then returns the Station and Offset values and displays the point projection onto the polyline.

## Features
- Upload ASCII files for polyline processing.
- Input coordinates (X, Y) to calculate station and offset.
- Interactive chart visualization using Plotly.js.
- Environment using Docker.

## Technologies Used
- Node.js
- TypeScript
- Express
- Vue.js
- Axios
- Plotly
## Requirements
- [Docker](https://www.docker.com)


## Installation and Setup

Follow these steps to set up the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/nsbarbosa/polyline-app.git
   cd polyline-app
2. Build and run the containers:
   ```bash
   docker-compose up --build
3. Access the application:
  The application should now be running at http://localhost:4000

## Usage
1. Upload an ASCII file containing the polyline coordinates in the frontend.
2. Input the X and Y coordinates for the point.

3. Click "Calculate" to compute the station and offset.
4. View the results and chart visualization
