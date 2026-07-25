from fastapi import FastAPI
from pydantic import BaseModel
import pickle
import os

app = FastAPI(title="MediOptima ML API")

# Load model if exists
model = None
if os.path.exists('models/demand_model.pkl'):
    with open('models/demand_model.pkl', 'rb') as f:
        model = pickle.load(f)

class DemandRequest(BaseModel):
    day_of_week: int
    hour: int
    weather_severity: float
    past_demand: int

@app.post("/predict/demand")
def predict_demand(req: DemandRequest):
    if not model:
        return {"error": "Model not loaded. Please run train_models.py first."}
    
    features = [[req.day_of_week, req.hour, req.weather_severity, req.past_demand]]
    prediction = model.predict(features)[0]
    
    return {
        "predicted_demand": int(prediction),
        "confidence": 0.85
    }

@app.get("/health")
def health_check():
    return {"status": "ML API is running"}
