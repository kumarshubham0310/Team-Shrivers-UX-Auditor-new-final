from bs4 import BeautifulSoup


def navigation_analysis(html):

    soup = BeautifulSoup(html, "html.parser")

    internal = []
    external = []

    for a in soup.find_all("a", href=True):

        href = a["href"]

        if href.startswith("/"):
            internal.append(href)

        elif href.startswith("http"):
            external.append(href)

    return {

        "internal_links": len(internal),

        "external_links": len(external),

        "total_links": len(internal) + len(external)
    }