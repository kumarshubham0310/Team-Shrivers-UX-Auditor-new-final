def extract_css(page):

    buttons = page.locator("button")

    result = []


    for i in range(buttons.count()):

        button = buttons.nth(i)


        style = button.evaluate(
            """
            el => {

                const css =
                window.getComputedStyle(el);


                return {

                    text: el.innerText,

                    width: css.width,

                    height: css.height,

                    display: css.display,

                    position: css.position,

                    fontSize: css.fontSize,

                    color: css.color

                }

            }
            """
        )


        result.append(style)


    return {
        "buttons": result
    }