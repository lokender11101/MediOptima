import pandas as pd
from sklearn.ensemble import RandomForestRegressor
import pickle
import os
from utils.data_generator import generate_mock_data

def train_demand_model():
    print("Generating synthetic data...")
    df = generate_mock_data(5000)
    
    X = df[['day_of_week', 'hour', 'weather_severity', 'past_demand']]
    y = df['current_demand']
    
    print("Training Random Forest Regressor for Demand Prediction...")
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X, y)
    
    os.makedirs('models', exist_ok=True)
    with open('models/demand_model.pkl', 'wb') as f:
        pickle.dump(model, f)
    
    print("Model saved to models/demand_model.pkl")

if __name__ == "__main__":
    train_demand_model()
