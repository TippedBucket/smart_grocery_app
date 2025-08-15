from fastapi import FastAPI
from pydantic import BaseModel
import json
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()  # create app first

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for development; in production, replace with your frontend URL
    allow_methods=["*"],  # allow GET, POST, OPTIONS, etc.
    allow_headers=["*"],  # allow all headers
)

class GroceryList(BaseModel):
    items: list[str]

# Load mock data
with open("mock_prices.json") as f:
    prices = json.load(f)

@app.post("/find-store")
def find_store(data: GroceryList):
    totals = {}
    for store, store_prices in prices.items():
        total = 0
        for item in data.items:
            total += store_prices.get(item.lower(), 999)  # 999 if not found
        totals[store] = total
    cheapest = min(totals, key=totals.get)
    return {"store": cheapest, "total": totals[cheapest]}
