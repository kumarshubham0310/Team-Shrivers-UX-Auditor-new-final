from urllib.parse import urljoin, urlparse
from bs4 import BeautifulSoup


def crawl_site(page, max_pages=8):

    visited = set()

    pages = []

    edges = []

    queue = [page.url]

    domain = urlparse(page.url).netloc

    while queue and len(visited) < max_pages:

        current = queue.pop(0)

        if current in visited:
            continue

        try:

            page.goto(
              current,
              wait_until="domcontentloaded",
              timeout=10000
)

        except:
            continue

        visited.add(current)

        html = page.content()

        soup = BeautifulSoup(html, "html.parser")

        links = []

        for a in soup.find_all("a", href=True):

            href = a["href"].strip()

            if href.startswith("#"):
                continue

            if href.startswith("javascript"):
                continue

            if href.startswith("mailto"):
                continue

            absolute = urljoin(current, href)

            parsed = urlparse(absolute)

            if parsed.netloc != domain:
                continue

            absolute = parsed.scheme + "://" + parsed.netloc + parsed.path

            links.append(absolute)

            edges.append({

                "from": current,

                "to": absolute

            })

            if absolute not in visited and absolute not in queue:

                queue.append(absolute)

        pages.append({

            "url": current,

            "title": page.title(),

            "links": len(links)

        })

    return {

        "pages": pages,

        "edges": edges

    }