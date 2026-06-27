from fastapi import FastAPI
from pydantic import BaseModel

from analyzer.browser import capture_website
from analyzer.dom import extract_dom
from analyzer.css import extract_css
from analyzer.accessibility import accessibility_check
from analyzer.navigation import navigation_analysis
from analyzer.crawler import crawl_site
from analyzer.graph import build_graph
from analyzer.journey import analyze_journey
from analyzer.scoring import calculate_score
from analyzer.recommendations import generate_recommendations
from analyzer.report import generate_report
from analyzer.ai_suggestions import generate_ai_improvements

app = FastAPI()


class URLRequest(BaseModel):
    url: str


@app.get("/")
def home():
    return {
        "message": "Backend Running"
    }


@app.post("/scan")
def scan(request: URLRequest):

    result = None

    try:

        print("\n========== STARTING SCAN ==========")

        result = capture_website(request.url)
        print("✅ Browser Capture")

        dom_data = extract_dom(result["html"])
        print("✅ DOM")
        print(type(dom_data))

        css_data = extract_css(result["page"])
        print("✅ CSS")
        print(type(css_data))

        accessibility = accessibility_check(
            result["html"],
            css_data
        )
        print("✅ Accessibility")
        print(type(accessibility))
        print(accessibility)

        navigation = navigation_analysis(
            result["html"]
        )
        print("✅ Navigation")
        print(type(navigation))
        print(navigation)

        crawler = crawl_site(
            result["page"],
            max_pages=30
        )
        print("✅ Crawler")
        print(type(crawler))

        graph = build_graph(crawler)
        print("✅ Graph")
        print(type(graph))
        print(graph)

        journey = analyze_journey(crawler)
        print("✅ Journey")
        print(type(journey))
        print(journey)

        print("➡ Calculating Score...")

        score = calculate_score(
            dom_data,
            css_data,
            accessibility,
            navigation,
            graph,
            journey
        )

        print("✅ Score")
        print(type(score))
        print(score)

        print("➡ Generating Recommendations...")

        recommendations = generate_recommendations(
            dom_data,
            css_data,
            accessibility,
            navigation,
            graph,
            journey
        )

        print("✅ Recommendations")
        print(type(recommendations))
        ai_report = generate_ai_improvements(
    dom_data,
    css_data,
    accessibility,
    navigation,
    graph,
    journey,
    recommendations
)

        print("✅ AI Suggestions Generated")

        print("➡ Generating Report...")



        report = generate_report(
            score,
            recommendations
        )

        print("✅ Report Generated")

        return {
    "status": "success",
    "screenshot": result["screenshot"],
    "dom": dom_data,
    "css": css_data,
    "accessibility": accessibility,
    "navigation": navigation,
    "crawler": crawler,
    "graph": graph,
    "journey": journey,
    "score": score,
    "recommendations": recommendations,
    "ai_report": ai_report,
    "report": report
}

    except Exception as e:

        import traceback

        print("\n========== ERROR ==========")
        traceback.print_exc()

        return {
            "status": "error",
            "message": str(e)
        }

    finally:

        if result:

            try:
                result["browser"].close()
            except:
                pass

            try:
                result["playwright"].stop()
            except:
                pass