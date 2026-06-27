from fastapi import FastAPI
from pydantic import BaseModel
from analyzer.dom import extract_dom

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
    dom_data = extract_dom(result["html"])

    return {
    "screenshot": result["screenshot"],
    "dom": dom_data
    }