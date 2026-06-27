from collections import defaultdict, deque


def build_graph(crawler_data):

    graph = defaultdict(list)

    indegree = defaultdict(int)

    pages = set()

    # Build graph
    for edge in crawler_data["edges"]:

        src = edge["from"]
        dst = edge["to"]

        graph[src].append(dst)

        indegree[dst] += 1

        pages.add(src)
        pages.add(dst)

    if not pages:
        return {
            "total_pages": 0,
            "dead_ends": [],
            "orphan_pages": [],
            "max_depth": 0,
            "average_outgoing_links": 0
        }

    homepage = crawler_data["pages"][0]["url"]

    # -------- BFS for depth --------

    depth = {}

    q = deque()

    q.append(homepage)

    depth[homepage] = 0

    while q:

        node = q.popleft()

        for nxt in graph[node]:

            if nxt not in depth:

                depth[nxt] = depth[node] + 1

                q.append(nxt)

    # Dead ends

    dead_ends = []

    for page in pages:

        if len(graph[page]) == 0:

            dead_ends.append(page)

    # Orphans

    orphan_pages = []

    for page in pages:

        if indegree[page] == 0 and page != homepage:

            orphan_pages.append(page)

    # Average outgoing links

    total = 0

    for page in pages:

        total += len(graph[page])

    avg_links = round(total / len(pages), 2)

    return {

        "total_pages": len(pages),

        "dead_ends": dead_ends,

        "orphan_pages": orphan_pages,

        "max_depth": max(depth.values()) if depth else 0,

        "average_outgoing_links": avg_links
    }