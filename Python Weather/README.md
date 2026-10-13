# Python Weather

This project is a weather data analysis and visualization application built using Python and Flask.  
The application allows authenticated users to upload Australian weather data in CSV format and interact with a dynamic dashboard to explore trends and insights.

## Application Overview
The app begins with a login screen.
After logging in, users can upload the Australian CSV file.  
Once uploaded, the data is processed and displayed through a dashboard.

---

## System Architecture
The application follows a modular design separating responsibilities across different components:

- **Flask (app.py)** – Handles routing, authentication, and API endpoints  
- **Pandas** – Processes and analyzes the uploaded CSV data  
- **Jinja Templates (HTML)** – Renders UI pages such as login, upload, and dashboard  
- **JavaScript (fetch API + Chart.js)** – Handles dynamic updates without page reloads  
- **CSS** – Provides consistent styling across all pages  

### Flow of the Application:
1. User logs in through the login page  
2. User uploads a CSV file  
3. CSV is loaded into a Pandas DataFrame  
4. Dashboard is rendered with available city options  
5. User interacts with buttons and dropdown  
6. JavaScript sends requests to `/data` endpoint  
7. Flask processes data and returns JSON  
8. Graph and summary update dynamically  

---

## CSV Upload and Processing
Users upload a CSV file containing Australian weather data.  
The file is saved to the server and loaded into a Pandas DataFrame.
Processing steps include:
- Validating required columns such as `Location`
- Filtering data based on selected city
- Converting numeric columns (Rainfall, Temp3pm) to proper types
- Removing missing or invalid values
- Computing summary statistics such as averages
The processed data is then used to generate visualizations and summaries.

---

## Dashboard Functionality
The dashboard provides an interactive user experience using a combination of buttons and a dropdown menu.

### Buttons
- **Rainfall** – Displays rainfall over time for the selected city  
- **Temperature** – Displays temperature trends over time  
- **Summary** – Displays a textual summary of key statistics  

### Dropdown
- Populated dynamically with city names from the uploaded dataset  
- Changing the city updates the data displayed  

### Visualization Behavior
- Graphs are displayed using Chart.js  
- Data is plotted as a line graph over time (record index)  
- Updates occur without page reload using JavaScript `fetch()`  

### Summary Output
Each selection also displays a short summary including:
- Total number of records
- Average rainfall
- Average temperature  

---

## Security and Authentication
The application includes a basic authentication system:

- Users must log in before accessing upload or dashboard pages  
- Session-based authentication is used  
- Passwords are securely stored using hashing (Werkzeug)  
- Each route checks for a valid logged-in user  

---

## Test Cases
Basic tests were implemented using pytest to validate key functionality:

- `test_data_loading()` – Tests that data is loaded correctly into a DataFrame  
- `test_filter_by_city_rainfall()` – Tests filtering of data by selected city  
- `test_rainfall_average_calculation()` – Tests rainfall calculations  
- `test_temperature_average_calculation()` – Tests temperature calculations  
- `test_summary_category()` – Tests summary generation logic  
- `test_unauthorized_access()` – Tests authentication requirement  
- `test_missing_city_data()` – Tests handling of missing city data  

---

## Development Phases and Design Evolution

### Phase 1 – Initial Setup
The project began with a simple Flask application that implemented login and routing.  
Basic templates were created for login, upload, and dashboard pages.

### Phase 2 – Data Upload and Processing
CSV upload functionality was added and integrated with Pandas.  
Initial data cleaning and filtering logic was implemented.

### Phase 3 – Dashboard Implementation
Early versions used simple averages, but this was later improved with charts.

### Phase 4 – UI and Styling
CSS was added to create a consistent and clean layout across all pages.  
Headers were standardized to improve usability and presentation.

### Phase 5 – Testing and Refinement
Basic tests were added to validate functionality such as data loading and filtering.  
Error handling was improved to manage missing data and invalid inputs.

---

## Project Files

- `app.py` – Main Flask application  
- `templates/` – HTML templates (login, upload, dashboard)  
- `static/style.css` – Styling for UI  
- `uploads/` – Uploaded CSV files  
- `test_app.py` – Test cases  
- `README.md` – Project documentation  

---

## Installation
pip install flask pandas pytest python-dotenv

## Environment Setup
Create a .env file in the project's root directory
Add the following: SECRET_KEY=your-example-key

---

## Usage

Run the application:

```bash
python app.py
```

## Login Credentials
Username: admin
Password: password123

## Run Tests
pytest
