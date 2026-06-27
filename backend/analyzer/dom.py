from bs4 import BeautifulSoup

def extract_dom(html):

    soup = BeautifulSoup(html, "html.parser")

    return {

        "buttons": len(soup.find_all("button")),

        "images": len(soup.find_all("img")),

        "forms": len(soup.find_all("form")),

        "links": len(soup.find_all("a")),

        "inputs": len(soup.find_all("input")),

        "headings": len(
            soup.find_all(["h1","h2","h3","h4","h5","h6"])
        ),

        "iframes": len(soup.find_all("iframe")),

        "tables": len(soup.find_all("table")),

        "lists": len(
            soup.find_all(["ul","ol"])
        ),

        "videos": len(soup.find_all("video"))
    }