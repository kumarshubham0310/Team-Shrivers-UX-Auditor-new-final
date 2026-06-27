from bs4 import BeautifulSoup


def extract_dom(html):

    soup = BeautifulSoup(
        html,
        "html.parser"
    )


    return {

        "buttons": len(
            soup.find_all("button")
        ),

        "images": len(
            soup.find_all("img")
        ),

        "forms": len(
            soup.find_all("form")
        ),

        "links": len(
            soup.find_all("a")
        )
    }