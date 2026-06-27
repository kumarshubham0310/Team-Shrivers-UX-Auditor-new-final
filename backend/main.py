from fastapi import FastAPI
from pydantic import BaseModel

from analyzer.browser import capture_website


app = FastAPI()


class URLRequest(BaseModel):
    url:str



@app.get("/")
def home():
    return {
        "message":"Backend Running"
    }



@app.post("/scan")
def scan(request:URLRequest):

    result = capture_website(
        request.url
    )

    return result