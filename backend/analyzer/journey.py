from collections import deque

TASKS = {
    "Pricing": ["pricing", "plans", "plan"],
    "Contact": ["contact", "support", "help"],
    "Login": ["login", "log-in", "signin", "sign-in"],
    "Signup": ["signup", "sign-up", "register", "get-started"],
    "About": ["about", "company"]
}


def shortest_path(graph, start, keyword_list):

    visited = set()

    q = deque()

    q.append((start, 0))

    while q:

        node, dist = q.popleft()

        if node in visited:
            continue

        visited.add(node)

        lower = node.lower()

        for keyword in keyword_list:

            if keyword in lower:

                return dist, node

        for nxt in graph.get(node, []):

            if nxt not in visited:

                q.append((nxt, dist + 1))

    return None, None


def analyze_journey(crawler_data):

    graph = {}

    for page in crawler_data["pages"]:

        graph[page["url"]] = []

    for edge in crawler_data["edges"]:

      graph.setdefault(edge["from"], []).append(edge["to"])

      graph.setdefault(edge["to"], [])

    homepage = crawler_data["pages"][0]["url"]

    report = []

    for task, keywords in TASKS.items():

        clicks, page = shortest_path(
            graph,
            homepage,
            keywords
        )

        if page:

            report.append({

                "task": task,

                "status": "Reachable",

                "clicks": clicks,

                "page": page

            })

        else:

            report.append({

                "task": task,

                "status": "Missing",

                "clicks": None,

                "page": None

            })

    return report