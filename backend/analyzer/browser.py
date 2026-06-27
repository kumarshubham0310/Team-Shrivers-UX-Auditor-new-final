from playwright.sync_api import sync_playwright

def capture_website(url):

    p = sync_playwright().start()
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()

    try:
        page.goto(url)

        html = page.content()

        if "Just a moment" in html or "Checking your browser" in html:
            browser.close()
            p.stop()
            raise Exception("Website is protected by Cloudflare.")   


        screenshot = "reports/screenshot.png"

        page.screenshot(path=screenshot)
        print(page.title())

        return {
            "html": html,
            "screenshot": screenshot,
            "page": page,
            "browser": browser,
            "playwright": p
        }

    except Exception as e:
        browser.close()
        p.stop()
        raise Exception(f"Failed to load website: {str(e)}")