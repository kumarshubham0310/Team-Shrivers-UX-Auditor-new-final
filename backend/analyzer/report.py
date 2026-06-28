def generate_report(score, recommendations):

    return {

        "overall_score": score["overall_score"],

        "grade": score["grade"],

        "summary": score["summary"],

        "recommendations": recommendations[:5]

    }