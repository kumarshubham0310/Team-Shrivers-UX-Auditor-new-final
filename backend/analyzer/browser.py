from playwright.sync_api import sync_playwright


def capture_website(url):

    p = sync_playwright().start()

    browser = p.chromium.launch()

    page = browser.new_page()

    page.goto(url)


    html = page.content()


    screenshot = "reports/screenshot.png"

    page.screenshot(
        path=screenshot
    )


    return {
        "html": html,
        "screenshot": screenshot,
        "page": page,
        "browser": browser,
        "playwright": p
    }