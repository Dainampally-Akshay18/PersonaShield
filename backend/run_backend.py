import os
import sys
import uvicorn

# Add current directory to path to ensure 'app' is found
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

if __name__ == "__main__":
    print("🚀 Starting PersonaShield Backend Orchestrator...")
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
