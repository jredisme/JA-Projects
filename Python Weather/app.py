from flask import Flask, render_template, request, redirect, url_for, session, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv
load_dotenv()
import pandas as pd
import os

app = Flask(__name__)
app.secret_key = os.environ["SECRET_KEY"]

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Hardcoded user for demo
USER = {
    "username": "admin",
    "password": generate_password_hash("password123")
}

dataframe = None


# ==========================
# LOGIN
# ==========================
@app.route("/", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")

        if username == USER["username"] and check_password_hash(USER["password"], password):
            session["user"] = username
            return redirect(url_for("upload"))

        return render_template("login.html", error="Invalid credentials")

    return render_template("login.html")


# ==========================
# UPLOAD
# ==========================
@app.route("/upload", methods=["GET", "POST"])
def upload():
    if "user" not in session:
        return redirect(url_for("login"))

    global dataframe

    if request.method == "POST":
        file = request.files.get("file")

        if file:
            filepath = os.path.join(UPLOAD_FOLDER, file.filename)
            file.save(filepath)

            dataframe = pd.read_csv(filepath)

            return redirect(url_for("dashboard"))

    return render_template("upload.html")


# ==========================
# DASHBOARD
# ==========================
@app.route("/dashboard")
def dashboard():
    if "user" not in session:
        return redirect(url_for("login"))

    if dataframe is None:
        return redirect(url_for("upload"))

    if "Location" not in dataframe.columns:
        return "Uploaded CSV does not contain a Location column."

    cities = sorted(dataframe["Location"].dropna().unique().tolist())

    return render_template("dashboard.html", cities=cities)


# ==========================
# DATA API
# ==========================
@app.route("/data")
def get_data():
    if "user" not in session:
        return jsonify({"error": "Unauthorized"}), 403

    global dataframe

    if dataframe is None:
        return jsonify({"error": "No dataset uploaded"}), 400

    city = request.args.get("city")
    category = request.args.get("category")

    if not city or not category:
        return jsonify({"error": "Missing city or category"}), 400

    df = dataframe.copy()

    if "Location" not in df.columns:
        return jsonify({"error": "Location column not found"}), 400

    # Filter by selected city
    df = df[df["Location"] == city]

    if df.empty:
        return jsonify({"error": f"No data for {city}"}), 404

    # ==========================
    # RAINFALL
    # ==========================
    if category == "rainfall":
        if "Rainfall" not in df.columns:
            return jsonify({"error": "Rainfall column not available"}), 400

        # Clean rainfall data
        df["Rainfall"] = pd.to_numeric(df["Rainfall"], errors="coerce")
        df = df.dropna(subset=["Rainfall"])

        if df.empty:
            return jsonify({"error": f"No rainfall data for {city}"}), 404

        rainfall_values = df["Rainfall"].tolist()

        summary = (
            f"Rainfall over time for {city}. "
            f"Average rainfall: {df['Rainfall'].mean():.2f}. "
            f"Total records: {len(rainfall_values)}."
        )

        return jsonify({
            "chart_type": "line",
            "label": "Rainfall Over Time",
            "values": rainfall_values,
            "summary": summary
        })

    # ==========================
    # TEMPERATURE
    # ==========================
    elif category == "temperature":
        if "Temp3pm" not in df.columns:
            return jsonify({"error": "Temp3pm column not available"}), 400

        df["Temp3pm"] = pd.to_numeric(df["Temp3pm"], errors="coerce")
        df = df.dropna(subset=["Temp3pm"])

        if df.empty:
            return jsonify({"error": f"No temperature data for {city}"}), 404

        values = df["Temp3pm"].tolist()

        summary = (
            f"Temperature over time for {city}. "
            f"Average Temperature: {df['Temp3pm'].mean():.2f}. "
            f"Total records: {len(values)}."
        )

        return jsonify({
            "chart_type": "line",
            "label": "Temperature Over Time",
            "values": values,
            "summary": summary
        })

    # ==========================
    # SUMMARY
    # ==========================
    elif category == "summary":
        summary_parts = [f"{city} has {len(df)} total weather records."]

        if "Rainfall" in df.columns:
            rainfall = pd.to_numeric(df["Rainfall"], errors="coerce").dropna()
            if not rainfall.empty:
                summary_parts.append(f"Average rainfall: {rainfall.mean():.2f}.")

        if "Temp3pm" in df.columns:
            temp = pd.to_numeric(df["Temp3pm"], errors="coerce").dropna()
            if not temp.empty:
                summary_parts.append(f"Average Temperature: {temp.mean():.2f}.")

        return jsonify({
            "chart_type": "none",
            "label": "Summary",
            "values": [],
            "summary": " ".join(summary_parts)
        })

    return jsonify({"error": "Invalid category"}), 400


if __name__ == "__main__":
    app.run(debug=True)