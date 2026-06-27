def extract_styles(locator):

    result = []

    count = locator.count()

    for i in range(count):

        element = locator.nth(i)

        style = element.evaluate(
        """
        el => {

            const css = window.getComputedStyle(el);

            return {

                text: el.innerText || "",

                width: css.width,

                height: css.height,

                fontSize: css.fontSize,

                color: css.color,

                background: css.backgroundColor,

                display: css.display,

                visibility: css.visibility,

                padding: css.padding,

                margin: css.margin,

                border: css.border
            }

        }
        """
        )

        result.append(style)

    return result


def extract_css(page):

    return {

        "buttons": extract_styles(
            page.locator("button")
        ),

        "inputs": extract_styles(
            page.locator("input")
        ),

        "links": extract_styles(
            page.locator("a")
        )
    }