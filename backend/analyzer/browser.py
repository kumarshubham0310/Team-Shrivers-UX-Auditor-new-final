from playwright.sync_api import sync_playwright


def capture_website(url):

    with sync_playwright() as p:

        browser = p.chromium.launch()

        page = browser.new_page()

        page.goto(url)

        html = page.content()

        page.screenshot(
            path="reports/screenshot.png"
        )

        browser.close()

        return {
            "html": html,
            "screenshot": "reports/screenshot.png"
        }