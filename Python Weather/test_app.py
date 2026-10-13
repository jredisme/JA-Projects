import pandas as pd
import pytest
import app


@pytest.fixture
def client():
    app.app.config["TESTING"] = True

    with app.app.test_client() as client:
        yield client


def login_session(client):
    """
    Helper function to simulate a logged-in user.
    """
    with client.session_transaction() as sess:
        sess["user"] = "admin"


def test_data_loading():
    """
    Test that dataframe can be assigned and contains expected records.
    """
    app.dataframe = pd.DataFrame({
        "Location": ["Albury", "Sydney"],
        "Rainfall": [1.0, 2.0],
        "Temp3pm": [20.0, 25.0]
    })

    assert app.dataframe is not None
    assert len(app.dataframe) == 2
    assert "Location" in app.dataframe.columns


def test_filter_by_city_rainfall(client):
    """
    Test that filters records by selected city for rainfall.
    """
    app.dataframe = pd.DataFrame({
        "Location": ["Albury", "Sydney", "Albury"],
        "Rainfall": [1.0, 2.0, 3.0],
        "Temp3pm": [20.0, 25.0, 22.0]
    })

    login_session(client)

    response = client.get("/data?city=Albury&category=rainfall")
    data = response.get_json()

    assert response.status_code == 200
    assert data["label"] == "Rainfall Over Time"
    assert data["values"] == [1.0, 3.0]
    assert "Albury" in data["summary"]


def test_rainfall_average_calculation(client):
    """
    Test rainfall average calculation in summary text.
    """
    app.dataframe = pd.DataFrame({
        "Location": ["Albury", "Albury"],
        "Rainfall": [2.0, 4.0],
        "Temp3pm": [20.0, 22.0]
    })

    login_session(client)

    response = client.get("/data?city=Albury&category=rainfall")
    data = response.get_json()

    assert response.status_code == 200
    assert "Average rainfall: 3.00" in data["summary"]


def test_temperature_average_calculation(client):
    """
    Test temperature average calculation in summary text.
    """
    app.dataframe = pd.DataFrame({
        "Location": ["Sydney", "Sydney"],
        "Rainfall": [1.0, 2.0],
        "Temp3pm": [24.0, 26.0]
    })

    login_session(client)

    response = client.get("/data?city=Sydney&category=temperature")
    data = response.get_json()

    assert response.status_code == 200
    assert data["label"] == "Temperature Over Time"
    assert data["values"] == [24.0, 26.0]
    assert "Average Temperature: 25.00" in data["summary"]


def test_summary_category(client):
    """
    Test summary category output for a city.
    """
    app.dataframe = pd.DataFrame({
        "Location": ["Melbourne", "Melbourne"],
        "Rainfall": [1.0, 3.0],
        "Temp3pm": [18.0, 22.0]
    })

    login_session(client)

    response = client.get("/data?city=Melbourne&category=summary")
    data = response.get_json()

    assert response.status_code == 200
    assert data["chart_type"] == "none"
    assert data["values"] == []
    assert "Melbourne has 2 total weather records." in data["summary"]
    assert "Average rainfall: 2.00." in data["summary"]
    assert "Average Temperature: 20.00." in data["summary"]


def test_unauthorized_access(client):
    """
    Test that user must be logged in to access /data.
    """
    app.dataframe = pd.DataFrame({
        "Location": ["Albury"],
        "Rainfall": [1.0],
        "Temp3pm": [20.0]
    })

    response = client.get("/data?city=Albury&category=rainfall")

    assert response.status_code == 403
    assert response.get_json()["error"] == "Unauthorized"


def test_missing_city_data(client):
    """
    Test error when selected city has no records.
    """
    app.dataframe = pd.DataFrame({
        "Location": ["Albury"],
        "Rainfall": [1.0],
        "Temp3pm": [20.0]
    })

    login_session(client)

    response = client.get("/data?city=Sydney&category=rainfall")
    data = response.get_json()

    assert response.status_code == 404
    assert data["error"] == "No data for Sydney"