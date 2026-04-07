from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import AlignmentRequest, AlignmentResponse
from algorithm import perform_smith_waterman

app = FastAPI(title="Smith-Waterman Alignment API")

# Configure CORS
origins = [
    "http://localhost:5173",  # React app port
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Smith-Waterman API is running"}

@app.post("/align", response_model=AlignmentResponse)
def align_sequences(request: AlignmentRequest):
    result = perform_smith_waterman(
        request.patientSeq.upper(),
        request.refSeq.upper(),
        request.matchScore,
        request.mismatchScore,
        request.gapPenalty
    )
    return AlignmentResponse(**result)
