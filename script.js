function evaluateEmployee() {
    let name = document.getElementById("name").value;
    let productivity = parseInt(document.getElementById("productivity").value);
    let quality = parseInt(document.getElementById("quality").value);
    let teamwork = parseInt(document.getElementById("teamwork").value);
    let attendance = parseInt(document.getElementById("attendance").value);
    let initiative = parseInt(document.getElementById("initiative").value);

    let score =
        productivity * 0.30 +
        quality * 0.25 +
        teamwork * 0.20 +
        attendance * 0.15 +
        initiative * 0.10;

    score = score * 20;

    // Expert Rules
    if (attendance == 5)
        score += 3;

    if (teamwork <= 2)
        score -= 5;

    if (productivity >= 4 && quality >= 4)
        score += 5;

    if (initiative <= 2)
        score -= 3;

    if (score > 100)
        score = 100;

    if (score < 0)
        score = 0;

    let rating = "";
    let advice = "";

    if (score >= 90) {
        rating = "Outstanding";
        advice = "Promotion Recommended";
    }
    else if (score >= 80) {
        rating = "Excellent";
        advice = "Eligible for Bonus";
    }
    else if (score >= 70) {
        rating = "Very Good";
        advice = "Eligible for Bonus";
    }
    else if (score >= 60) {
        rating = "Good";
        advice = "Needs Improvement";
    }
    else if (score >= 50) {
        rating = "Average";
        advice = "Needs Improvement";
    }
    else {
        rating = "Needs Improvement";
        advice = "Training Required";
    }

    document.getElementById("result").innerHTML =
        "Employee: " + name + "<br>" +
        "Final Score: " + score.toFixed(2) + "%<br>" +
        "Rating: " + rating + "<br>" +
        "Advice: " + advice;
}