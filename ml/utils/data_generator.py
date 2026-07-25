import pandas as pd
import numpy as np

def generate_mock_data(num_samples=1000):
    np.random.seed(42)
    
    # Features: DayOfWeek, Hour, WeatherSeverity (0-10), PastDemand
    # Target: CurrentDemand
    data = []
    for _ in range(num_samples):
        day = np.random.randint(0, 7)
        hour = np.random.randint(0, 24)
        weather = np.random.uniform(0, 10)
        past_demand = np.random.randint(10, 200)
        
        # Base logic for target
        target_demand = past_demand * (1.2 if day > 4 else 1.0) * (1.5 if weather > 7 else 1.0)
        target_demand += np.random.normal(0, 10) # add noise
        
        data.append([day, hour, weather, past_demand, max(0, int(target_demand))])
        
    df = pd.DataFrame(data, columns=['day_of_week', 'hour', 'weather_severity', 'past_demand', 'current_demand'])
    return df

if __name__ == "__main__":
    df = generate_mock_data()
    df.to_csv("mock_demand_data.csv", index=False)
    print("Generated mock_demand_data.csv with 1000 samples.")
