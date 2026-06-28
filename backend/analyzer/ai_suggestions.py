import ollama


def generate_ai_improvements(
    dom,
    css,
    accessibility,
    navigation,
    graph,
    journey,
    recommendations
):
    """
    Uses Ollama to generate UX improvement suggestions.
    """

    prompt = f"""
You are an expert Senior UX/UI Designer.

Analyze the following website audit and provide professional recommendations.

========================
DOM ANALYSIS
========================
{dom}

========================
CSS ANALYSIS
========================
{css}

========================
ACCESSIBILITY
========================
{accessibility}

========================
NAVIGATION
========================
{navigation}

========================
GRAPH ANALYSIS
========================
{graph}

========================
USER JOURNEY
========================
{journey}

========================
CURRENT RECOMMENDATIONS
========================
{recommendations}

--------------------------------------------------------

Return your response in EXACTLY the following format.

# Overall UX Summary

Provide a short paragraph describing the overall quality of the website.

# Major UX Problems

List the biggest usability issues.

# Visual Design Improvements

Suggest improvements for:

- Typography
- Colors
- Buttons
- Cards
- Layout
- Spacing
- Navigation
- Forms

# Accessibility Improvements

Suggest WCAG improvements.

# User Journey Improvements

Explain how navigation and important flows can be improved.

# Improved HTML

Provide example HTML snippets if required.

# Improved CSS

Provide improved CSS snippets that modernize the design.

# Priority

Finally classify improvements as:

High Priority
Medium Priority
Low Priority

Only provide useful UX recommendations.
Do not invent information.
Base everything only on the supplied audit.
"""

    try:

        response = ollama.chat(
            model="qwen2.5:3b",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        return response["message"]["content"]

    except Exception as e:

        return f"AI generation failed: {str(e)}"