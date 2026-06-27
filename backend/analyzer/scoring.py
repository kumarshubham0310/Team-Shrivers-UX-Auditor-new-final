def calculate_score(
    dom,
    css,
    accessibility,
    navigation,
    graph,
    journey
):

    score = 100

    reasons = []

    # -----------------------
    # Accessibility
    # -----------------------

    issues = accessibility.get("issues", [])

    score -= len(issues) * 5

    for issue in issues:
        reasons.append(issue)

    # -----------------------
    # Navigation
    # -----------------------

    if graph["max_depth"] > 5:

        score -= 10

        reasons.append(
            "Navigation depth is high."
        )

    if len(graph["dead_ends"]) > 5:

        score -= 10

        reasons.append(
            "Many dead-end pages detected."
        )

    # -----------------------
    # Journey
    # -----------------------

    missing = 0

    for task in journey:

        if task["status"] == "Missing":

            missing += 1

    score -= missing * 4

    if missing:

        reasons.append(
            f"{missing} important user journeys are missing."
        )

    # -----------------------
    # DOM
    # -----------------------

    if dom["forms"] == 0:

        score -= 3

        reasons.append(
            "No forms detected."
        )

    if dom["images"] == 0:

        score -= 3

        reasons.append(
            "No images detected."
        )

    if dom["links"] < 3:

        score -= 4

        reasons.append(
            "Very few navigation links."
        )

    # -----------------------
    # CSS
    # -----------------------

    buttons = css.get("buttons", [])

    if len(buttons) == 0:

        score -= 10

        reasons.append(
            "No interactive buttons found."
        )

    # -----------------------

    if score < 0:
        score = 0

    # -----------------------

    if score >= 90:
        grade = "A"

    elif score >= 80:
        grade = "B"

    elif score >= 70:
        grade = "C"

    elif score >= 60:
        grade = "D"

    else:
        grade = "F"

    return {

        "overall_score": score,

        "grade": grade,

        "summary": reasons
    }