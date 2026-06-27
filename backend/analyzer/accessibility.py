from bs4 import BeautifulSoup


def accessibility_check(html, css):

    soup = BeautifulSoup(html, "html.parser")

    issues = []

    # Images without alt
    for img in soup.find_all("img"):

        if not img.get("alt"):

            issues.append({

                "severity": "High",

                "issue": "Image missing alt attribute"

            })

    # Inputs without placeholder
    for inp in soup.find_all("input"):

        if not inp.get("placeholder"):

            issues.append({

                "severity": "Medium",

                "issue": "Input missing placeholder"

            })

    # Small buttons
    for button in css.get("buttons", []):

        try:

            width = float(button["width"].replace("px", ""))

            height = float(button["height"].replace("px", ""))

            if width < 44 or height < 44:

                issues.append({

                    "severity": "Medium",

                    "issue": f'Small button "{button["text"]}"'

                })

        except (ValueError, AttributeError, KeyError):

            continue

    return {

        "issues": issues

    }