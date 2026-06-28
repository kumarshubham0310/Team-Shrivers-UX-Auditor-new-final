def generate_recommendations(
    dom,
    css,
    accessibility,
    navigation,
    graph,
    journey
):

    recommendations = []

    # -------------------------
    # Accessibility
    # -------------------------

    for issue in accessibility.get("issues", []):

        recommendations.append({

            "severity": "High",

            "category": "Accessibility",

            "issue": issue,

            "recommendation": "Follow WCAG accessibility guidelines."

        })

    # -------------------------
    # Journey
    # -------------------------

    for task in journey:

        if task["status"] == "Missing":

            recommendations.append({

                "severity": "Medium",

                "category": "Navigation",

                "issue": f'{task["task"]} page not found.',

                "recommendation": f'Provide an easy-to-find {task["task"]} page.'

            })

        elif task["clicks"] is not None and task["clicks"] > 3:

            recommendations.append({

                "severity": "Medium",

                "category": "Journey",

                "issue": f'{task["task"]} requires {task["clicks"]} clicks.',

                "recommendation": "Reduce the number of clicks required."

            })

    # -------------------------
    # Graph
    # -------------------------

    if graph["max_depth"] > 5:

        recommendations.append({

            "severity": "High",

            "category": "Navigation",

            "issue": f'Maximum navigation depth is {graph["max_depth"]}.',

            "recommendation": "Simplify the navigation hierarchy."

        })

    if len(graph["dead_ends"]) > 5:

        recommendations.append({

            "severity": "Medium",

            "category": "Navigation",

            "issue": f'{len(graph["dead_ends"])} dead-end pages detected.',

            "recommendation": "Ensure users always have a path to continue browsing."

        })

    # -------------------------
    # DOM
    # -------------------------

    if dom["images"] == 0:

        recommendations.append({

            "severity": "Low",

            "category": "Content",

            "issue": "No images found.",

            "recommendation": "Consider adding relevant visuals."

        })

    if dom["forms"] == 0:

        recommendations.append({

            "severity": "Low",

            "category": "Interaction",

            "issue": "No forms detected.",

            "recommendation": "Add forms if user input is required."

        })

    if dom["links"] < 5:

        recommendations.append({

            "severity": "Medium",

            "category": "Navigation",

            "issue": "Very few navigation links detected.",

            "recommendation": "Improve discoverability by adding navigation links."

        })

    # -------------------------
    # CSS
    # -------------------------

    for button in css.get("buttons", []):

        try:

            width = float(button["width"].replace("px", ""))

            height = float(button["height"].replace("px", ""))

            if width < 44 or height < 44:

                recommendations.append({

                    "severity": "High",

                    "category": "Accessibility",

                    "issue": f'Small button "{button["text"]}".',

                    "recommendation": "Increase button size to at least 44×44 pixels."

                })

        except:

            pass

    # -------------------------

    if len(recommendations) == 0:

        recommendations.append({

            "severity": "Info",

            "category": "General",

            "issue": "No major UX issues detected.",

            "recommendation": "Overall user experience appears good."

        })

    return recommendations