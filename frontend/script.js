// ==========================================
// ChallengeConnect Frontend JavaScript
// ==========================================

console.log("ChallengeConnect frontend loaded successfully.");


// ===============================
// SEARCH AND CATEGORY FILTER
// ===============================

const searchInput = document.getElementById("challengeSearch");
const categoryFilter = document.getElementById("categoryFilter");
const noChallenges = document.getElementById("noChallenges");

function filterChallenges() {
    const searchText = searchInput
        ? searchInput.value.toLowerCase().trim()
        : "";

    const selectedCategory = categoryFilter
        ? categoryFilter.value
        : "all";

    const challengeCards =
        document.querySelectorAll(".challenge-card");

    let visibleChallenges = 0;

    challengeCards.forEach(function (card) {
        const challengeText =
            card.textContent.toLowerCase();

        const challengeCategory =
            card.getAttribute("data-category");

        const matchesSearch =
            challengeText.includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            challengeCategory === selectedCategory;

        if (matchesSearch && matchesCategory) {
            card.style.display = "";
            visibleChallenges++;
        } else {
            card.style.display = "none";
        }
    });

    if (noChallenges) {
        noChallenges.style.display =
            visibleChallenges === 0
                ? "block"
                : "none";
    }
}

// Search while typing
if (searchInput) {
    searchInput.addEventListener(
        "input",
        filterChallenges
    );
}

// Filter when category changes
if (categoryFilter) {
    categoryFilter.addEventListener(
        "change",
        filterChallenges
    );
}

// Run once when page loads
filterChallenges();


// ==========================================
// LOAD POSTED CHALLENGES
// ==========================================

const challengesContainer =
    document.getElementById("challengeList");

if (challengesContainer) {

    const savedChallenges =
        JSON.parse(
            localStorage.getItem("challenges")
        ) || [];

    savedChallenges.forEach(function (challenge) {

        const challengeCard =
            document.createElement("div");

        challengeCard.className =
            "card challenge-card";

        challengeCard.setAttribute(
            "data-category",
            challenge.category.toLowerCase()
        );

        challengeCard.innerHTML = `
            <h3>${challenge.title}</h3>

            <p>${challenge.description}</p>

            <p>
                <strong>Category:</strong>
                ${challenge.category}
            </p>

            <p>
                <strong>Posted By:</strong>
                ${challenge.postedBy}
            </p>

            <p>
                <strong>Location:</strong>
                ${challenge.location}
            </p>

            <p>
                <strong>Priority:</strong>
                ${challenge.priority}
            </p>

            <p>
                <strong>Deadline:</strong>
                ${challenge.deadline}
            </p>

            <button
                class="btn primary-btn"
                onclick="viewChallenge('${challenge.id}')">
                View Challenge
            </button>
        `;

        challengesContainer.appendChild(
            challengeCard
        );

    });

}


// ==========================================
// VIEW CHALLENGE
// ==========================================

function viewChallenge(challengeId) {

    window.location.href =
        "challenge-details.html?id=" +
        challengeId;

}

// ==========================================
// POST CHALLENGE FORM
// ==========================================

const challengeForm =
    document.getElementById("challengeForm");

const challengeMessage =
    document.getElementById("challengeMessage");

if (challengeForm) {

    challengeForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const title =
                document.getElementById("challengeTitle").value.trim();

            const description =
                document.getElementById("challengeDescription").value.trim();

            const category =
                document.getElementById("challengeCategory").value;

            const postedBy =
                document.getElementById("postedBy").value;

            const location =
                document.getElementById("challengeLocation").value.trim();

            const priority =
                document.getElementById("challengePriority").value;

            const deadline =
                document.getElementById("challengeDeadline").value;

            if (
                !title ||
                !description ||
                !category ||
                !postedBy ||
                !location ||
                !priority ||
                !deadline
            ) {

                challengeMessage.textContent =
                    "Please fill in all fields.";

                return;
            }

            const newChallenge = {

                id: "custom-" + Date.now(),

                title: title,

                description: description,

                category: category,

                postedBy: postedBy,

                location: location,

                priority: priority,

                deadline: deadline

            };

            const existingChallenges =
                JSON.parse(
                    localStorage.getItem("challenges")
                ) || [];

            existingChallenges.push(newChallenge);

            localStorage.setItem(
                "challenges",
                JSON.stringify(existingChallenges)
            );

            challengeMessage.textContent =
                "Challenge posted successfully!";

            challengeForm.reset();

        }
    );

}

// ==========================================
// CHALLENGE DETAILS
// ==========================================

const challengeData = {

    "digital-education": {

        title: "Digital Education Access",

        description:
            "Improve access to quality digital education for students in rural areas.",

        postedBy: "Government",

        category: "Education",

        location: "Rural India",

        priority: "High",

        deadline: "2026-12-31"

    },


    "smart-waste": {

        title: "Smart Waste Management",

        description:
            "Develop innovative solutions to improve waste collection and recycling.",

        postedBy: "Citizen",

        category: "Environment",

        location: "Hyderabad",

        priority: "Medium",

        deadline: "2026-11-30"

    },


    "healthcare-support": {

        title: "Community Healthcare Support",

        description:
            "Create technology-based solutions for improving healthcare access.",

        postedBy: "Government",

        category: "Healthcare",

        location: "India",

        priority: "High",

        deadline: "2026-12-15"

    },


    "smart-agriculture": {

        title: "Smart Agriculture",

        description:
            "Help farmers use technology to improve productivity and reduce resource usage.",

        postedBy: "Citizen",

        category: "Agriculture",

        location: "Telangana",

        priority: "High",

        deadline: "2026-11-15"

    },


    "digital-public-services": {

        title: "Digital Public Services",

        description:
            "Develop technology solutions that make government services easier and more accessible for citizens.",

        postedBy: "Government",

        category: "Technology",

        location: "India",

        priority: "High",

        deadline: "2026-12-20"

    }

};


// ==========================================
// LOAD CHALLENGE DETAILS
// ==========================================

const urlParams =
    new URLSearchParams(window.location.search);

const challengeId =
    urlParams.get("id");

let selectedChallenge = null;

// Check built-in challenges
if (challengeId && challengeData[challengeId]) {

    selectedChallenge =
        challengeData[challengeId];

}

// Check user-posted challenges
if (!selectedChallenge && challengeId) {

    const savedChallenges =
        JSON.parse(
            localStorage.getItem("challenges")
        ) || [];

    selectedChallenge =
        savedChallenges.find(function (challenge) {

            return challenge.id === challengeId;

        });

}

// Display challenge details
if (selectedChallenge) {

    const detailTitle =
        document.getElementById("detailTitle");

    const detailDescription =
        document.getElementById("detailDescription");

    const detailPostedBy =
        document.getElementById("detailPostedBy");

    const detailCategory =
        document.getElementById("detailCategory");

    const detailLocation =
        document.getElementById("detailLocation");

    const detailPriority =
        document.getElementById("detailPriority");

    const detailDeadline =
        document.getElementById("detailDeadline");


    if (detailTitle) {

        detailTitle.textContent =
            selectedChallenge.title;

    }


    if (detailDescription) {

        detailDescription.textContent =
            selectedChallenge.description;

    }


    if (detailPostedBy) {

        detailPostedBy.textContent =
            selectedChallenge.postedBy;

    }


    if (detailCategory) {

        detailCategory.textContent =
            selectedChallenge.category;

    }


    if (detailLocation) {

        detailLocation.textContent =
            selectedChallenge.location;

    }


    if (detailPriority) {

        detailPriority.textContent =
            selectedChallenge.priority;

    }


    if (detailDeadline) {

        detailDeadline.textContent =
            selectedChallenge.deadline;

    }

}

/*
// ==========================================
// LOGIN FORM
// ==========================================

const loginForm =
    document.getElementById("loginForm");

const loginError =
    document.getElementById("loginError");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function (event) {
            event.preventDefault();

            const email =
                document.getElementById("email").value.trim();

            const password =
                document.getElementById("password").value.trim();

            if (!email || !password) {
                loginError.textContent =
                    "Please enter your email and password.";
                return;
            }

            const savedEmail =
                localStorage.getItem("userEmail");

            const savedPassword =
                localStorage.getItem("userPassword");

            const savedName =
                localStorage.getItem("userName");

            const savedRole =
                localStorage.getItem("userRole");

            if (
                email === savedEmail &&
                password === savedPassword &&
                savedName &&
                savedRole
            ) {

                localStorage.setItem(
                    "loggedIn",
                    "true"
                );

                window.location.href =
                    "dashboard.html";

            } else {

                loginError.textContent =
                    "Invalid email or password.";
            }

        }
                        // Check fields
                        if (!email || !password) {

}

// ==========================================
// REGISTER FORM
// ==========================================

                        // Get all registered users
                        const users =
                            JSON.parse(
                                localStorage.getItem("users")
                            ) || [];

                        // Find matching account
                        let matchedUser =
                            users.find(function (user) {

                                return (
                                    user.email.toLowerCase() ===
                                    email.toLowerCase() &&
                                    user.password === password
                                );

                            });

                        // Compatibility with old single-account data
                        // This allows previously registered accounts
                        // to continue working.
                        if (!matchedUser) {

                            const savedEmail =
                                localStorage.getItem("userEmail");

                            const savedPassword =
                                localStorage.getItem("userPassword");

                            const savedName =
                                localStorage.getItem("userName");

                            const savedRole =
                                localStorage.getItem("userRole");

                            if (
                                savedEmail &&
                                savedPassword &&
                                savedName &&
                                savedRole &&
                                email.toLowerCase() ===
                                    savedEmail.toLowerCase() &&
                                password === savedPassword
                            ) {

                                matchedUser = {

                                    name: savedName,

                                    email: savedEmail,

                                    password: savedPassword,

                                    role: savedRole

                                };

                                // Add old account to users list
                                // if it is not already stored.
                                const oldAccountExists =
                                    users.some(function (user) {

                                        return user.email.toLowerCase() ===
                                            savedEmail.toLowerCase();

                                    });

                                if (!oldAccountExists) {

                                    users.push(matchedUser);

                                    localStorage.setItem(
                                        "users",
                                        JSON.stringify(users)
                                    );

                                }

                            }

                        }

                        // Login successful
                        if (matchedUser) {
                document.getElementById("registerEmail").value.trim();

            const password =
                document.getElementById("registerPassword").value.trim();

            const role =
                            localStorage.setItem(
                                "userName",
                                matchedUser.name
                            );

                            localStorage.setItem(
                                "userEmail",
                                matchedUser.email
                            );

                            localStorage.setItem(
                                "userPassword",
                                matchedUser.password
                            );

                            localStorage.setItem(
                                "userRole",
                                matchedUser.role
                            );

                            // Go to dashboard
                document.getElementById("role").value;

            // Check fields
                        }

                        // Login failed
                        else {

                registerError.textContent =
                    "Please fill in all fields.";

                return;
            }

            // Get existing registered users
            const users =
                JSON.parse(
                    localStorage.getItem("users")
                ) || [];

            // Check whether email is already registered
            const existingUser =
                users.find(function (user) {

                    return user.email.toLowerCase() ===
                        email.toLowerCase();

                });
                        // Check fields
                        if (!email || !password) {

            if (existingUser) {


                registerError.textContent =
                    "This email is already registered. Please login.";

                        // Get all registered users
                        const users =
                            JSON.parse(
                                localStorage.getItem("users")
                            ) || [];

                        // Find matching account
                        let matchedUser =
                            users.find(function (user) {

                                return (
                                    user.email.toLowerCase() ===
                                    email.toLowerCase() &&
                                    user.password === password
                                );

                            });

                        // Compatibility with old single-account data
                        // This allows previously registered accounts
                        // to continue working.
                        if (!matchedUser) {

                            const savedEmail =
                                localStorage.getItem("userEmail");

                            const savedPassword =
                                localStorage.getItem("userPassword");

                            const savedName =
                                localStorage.getItem("userName");

                            const savedRole =
                                localStorage.getItem("userRole");

                            if (
                                savedEmail &&
                                savedPassword &&
                                savedName &&
                                savedRole &&
                                email.toLowerCase() ===
                                    savedEmail.toLowerCase() &&
                                password === savedPassword
                            ) {

                                matchedUser = {

                                    name: savedName,

                                    email: savedEmail,

                                    password: savedPassword,

                                    role: savedRole

                                };

                                // Add old account to users list
                                // if it is not already stored.
                                const oldAccountExists =
                                    users.some(function (user) {

                                        return user.email.toLowerCase() ===
                                            savedEmail.toLowerCase();

                                    });

                                if (!oldAccountExists) {

                                    users.push(matchedUser);

                                    localStorage.setItem(
                                        "users",
                                        JSON.stringify(users)
                                    );

                                }

                            }

                        }

                        // Login successful
                        if (matchedUser) {

            // Save all users
            localStorage.setItem(
                "users",
                JSON.stringify(users)
            );
                            localStorage.setItem(
                                "userName",
                                matchedUser.name
                            );

                            localStorage.setItem(
                                "userEmail",
                                matchedUser.email
                            );

                            localStorage.setItem(
                                "userPassword",
                                matchedUser.password
                            );

                            localStorage.setItem(
                                "userRole",
                                matchedUser.role
                            );

                            // Go to dashboard

            // Keep the latest user information
            // for the existing dashboard system
                        }

                        // Login failed
                        else {
                "userName",
                name
            );
                        }
            localStorage.setItem(
                "userEmail",
                email
            );


            localStorage.setItem(
                "userRole",
                role
            );

            // Registration successful
            alert(
                "Registration successful! Please login."
            );

            // Go to Login page
            window.location.href =
                "login.html";

        }
    );

}

*/

// ==========================================
// LOGIN FORM
// ==========================================

const loginForm =
    document.getElementById("loginForm");

const loginError =
    document.getElementById("loginError");

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const email =
                document.getElementById("email").value.trim();

            const password =
                document.getElementById("password").value.trim();

            // Check fields
            if (!email || !password) {

                loginError.textContent =
                    "Please enter your email and password.";

                return;
            }

            // Get all registered users
            const users =
                JSON.parse(
                    localStorage.getItem("users")
                ) || [];

            // Find the account
            const matchedUser =
                users.find(function (user) {

                    return (
                        user.email.toLowerCase() ===
                        email.toLowerCase() &&
                        user.password === password
                    );

                });

            // Login successful
            if (matchedUser) {

                localStorage.setItem(
                    "loggedIn",
                    "true"
                );

                localStorage.setItem(
                    "userName",
                    matchedUser.name
                );

                localStorage.setItem(
                    "userEmail",
                    matchedUser.email
                );

                localStorage.setItem(
                    "userPassword",
                    matchedUser.password
                );

                localStorage.setItem(
                    "userRole",
                    matchedUser.role
                );

                window.location.href =
                    "dashboard.html";

            }

            // Login failed
            else {

                loginError.textContent =
                    "Invalid email or password.";

            }

        }
    );

}

// ==========================================
// REGISTER FORM
// ==========================================

const registerForm =
    document.getElementById("registerForm");

const registerError =
    document.getElementById("registerError");

if (registerForm) {

    registerForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const name =
                document.getElementById("name").value.trim();

            const email =
                document.getElementById("registerEmail").value.trim();

            const password =
                document.getElementById("registerPassword").value.trim();

            const role =
                document.getElementById("role").value;

            if (!name || !email || !password || !role) {

                registerError.textContent =
                    "Please fill in all fields.";

                return;
            }

            const users =
                JSON.parse(
                    localStorage.getItem("users")
                ) || [];

            const existingUser =
                users.find(function (user) {

                    return user.email.toLowerCase() ===
                        email.toLowerCase();

                });

            if (existingUser) {

                registerError.textContent =
                    "This email is already registered. Please login.";

                return;
            }

            const newUser = {
                name: name,
                email: email,
                password: password,
                role: role
            };

            users.push(newUser);

            localStorage.setItem(
                "users",
                JSON.stringify(users)
            );

            localStorage.setItem("userName", name);
            localStorage.setItem("userEmail", email);
            localStorage.setItem("userPassword", password);
            localStorage.setItem("userRole", role);

            alert(
                "Registration successful! Please login."
            );

            window.location.href =
                "login.html";

        }
    );

}

// ==========================================
// DASHBOARD USER INFORMATION
// ==========================================

const welcomeMessage =
    document.getElementById("welcomeMessage");

const userRole =
    document.getElementById("userRole");


const savedName =
    localStorage.getItem("userName");

const savedRole =
    localStorage.getItem("userRole");


if (welcomeMessage) {

    welcomeMessage.textContent =
    "Welcome, " + (savedName || "User") + "!";

}


if (userRole) {

    userRole.textContent =
    "Role: " + (savedRole || "User");

}

// ==========================================
// CONNECT CHALLENGE TO SOLUTION
// ==========================================

const submitSolutionLink =
    document.getElementById("submitSolutionLink");

if (submitSolutionLink && challengeId) {

    submitSolutionLink.href =
        "submit-solution.html?id=" +
        challengeId;
}

// ==========================================
// SUBMIT SOLUTION FORM
// ==========================================

const solutionForm =
    document.getElementById("solutionForm");

const solutionMessage =
    document.getElementById("solutionMessage");

if (solutionForm) {

    solutionForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const solutionTitle =
                document.getElementById("solutionTitle").value.trim();

            const solutionDescription =
                document.getElementById("solutionDescription").value.trim();

            const solutionApproach =
                document.getElementById("solutionApproach").value.trim();

            const expectedImpact =
                document.getElementById("expectedImpact").value.trim();

            // Check required fields
            if (
                !solutionTitle ||
                !solutionDescription ||
                !solutionApproach ||
                !expectedImpact
            ) {

                solutionMessage.textContent =
                    "Please fill in all fields.";

                return;

            }

            // Create new solution
            const newSolution = {

                id: "solution-" + Date.now(),

                title: solutionTitle,

                description: solutionDescription,

                approach: solutionApproach,

                impact: expectedImpact,

                challenge: selectedChallenge
                    ? selectedChallenge.title
                    : "Submitted Challenge",

                status: "Submitted",

                progress: 25,

                nextStep: "Initial Review"

            };

            // Get existing solutions
            const existingSolutions =
                JSON.parse(
                    localStorage.getItem("solutions")
                ) || [];

            // Add new solution
            existingSolutions.push(newSolution);

            // Save solutions
            localStorage.setItem(
                "solutions",
                JSON.stringify(existingSolutions)
            );

            // Show success message
            solutionMessage.textContent =
                "Solution submitted successfully!";

            // Clear the form
            solutionForm.reset();

        }
    );

}

// ==========================================
// LOAD SAVED SOLUTIONS
// ==========================================

const solutionList =
    document.getElementById("solutionList");

if (solutionList) {

    const savedSolutions =
        JSON.parse(
            localStorage.getItem("solutions")
        ) || [];

    savedSolutions.forEach(function (solution) {

        const solutionCard =
            document.createElement("div");

        solutionCard.className =
            "card";

        const currentUserRole =
            localStorage.getItem("userRole");

        let reviewButton = "";

        if (currentUserRole === "Government") {
            reviewButton = `
                <a
                    href="review-solution.html?id=${solution.id}"
                    class="btn secondary-btn"
                >
                    Review Solution
                </a>
            `;
        }

        solutionCard.innerHTML = `
            <h3>
                ${solution.title}
            </h3>

            <p>
                ${solution.description}
            </p>

            <p>
                <strong>Challenge:</strong>
                ${solution.challenge}
            </p>

            <p>
                <strong>Status:</strong>
                ${solution.status}
            </p>

            <button
                class="btn primary-btn"
                onclick="viewSolution('${solution.id}')"
            >
                View Solution
            </button>

            ${reviewButton}
        `;

        solutionList.appendChild(
            solutionCard
        );

    });

}

// ==========================================
// VIEW SOLUTION
// ==========================================

function viewSolution(solutionId) {

    window.location.href =
        "view-solution.html?id=" +
        solutionId;
}

// ==========================================
// SOLUTION DETAILS
// ==========================================

const solutionData = {

    "smart-waste-solution": {
        title: "Smart Waste Collection System",
        description:
            "A technology-based solution for improving waste collection and recycling in urban communities.",
        challenge:
            "Smart Waste Management",
        approach:
            "IoT-based smart bins, waste monitoring, route optimization and data analytics.",
        impact:
            "Improve waste collection efficiency, reduce overflowing bins and encourage better recycling.",
        status:
            "Under Review"
    },

    "digital-education-solution": {
        title: "Rural Digital Learning Platform",
        description:
            "A digital learning platform designed to improve access to quality education for students in rural areas.",
        challenge:
            "Digital Education Access",
        approach:
            "Web-based learning platform with digital resources, recorded lessons and accessible educational content.",
        impact:
            "Improve access to education and provide learning opportunities for students in rural communities.",
        status:
            "Submitted"
    }
};


// ==========================================
// DISPLAY SOLUTION DETAILS
// ==========================================

const solutionParams =
    new URLSearchParams(window.location.search);

const solutionId =
    solutionParams.get("id");

let selectedSolution = null;

// Check built-in solutions
if (solutionId && solutionData[solutionId]) {

    selectedSolution =
        solutionData[solutionId];

}

// Check user-submitted solutions
if (!selectedSolution && solutionId) {

    const savedSolutions =
        JSON.parse(
            localStorage.getItem("solutions")
        ) || [];

    selectedSolution =
        savedSolutions.find(function (solution) {

            return solution.id === solutionId;

        });

}

// Display solution details
if (selectedSolution) {

    const solutionTitle =
        document.getElementById("solutionTitle");

    const solutionDescription =
        document.getElementById("solutionDescription");

    const solutionChallenge =
        document.getElementById("solutionChallenge");

    const solutionApproach =
        document.getElementById("solutionApproach");

    const solutionImpact =
        document.getElementById("solutionImpact");

    const solutionStatus =
        document.getElementById("solutionStatus");


    if (solutionTitle) {
        solutionTitle.textContent =
            selectedSolution.title;
    }

    if (solutionDescription) {
        solutionDescription.textContent =
            selectedSolution.description;
    }

    if (solutionChallenge) {
        solutionChallenge.textContent =
            selectedSolution.challenge;
    }

    if (solutionApproach) {
        solutionApproach.textContent =
            selectedSolution.approach;
    }

    if (solutionImpact) {
        solutionImpact.textContent =
            selectedSolution.impact;
    }

    if (solutionStatus) {
        solutionStatus.textContent =
            selectedSolution.status;
    }
}

// ==========================================
// LOGOUT
// ==========================================

function logoutUser() {

    localStorage.removeItem("loggedIn");

    window.location.href = "index.html";
}

// ==========================================
// DASHBOARD LOGIN PROTECTION
// ==========================================

if (window.location.pathname.endsWith("dashboard.html")) {

    const loggedIn =
        localStorage.getItem("loggedIn");

    if (loggedIn !== "true") {
        window.location.href = "login.html";
    }
}

// ==========================================
// PROTECT USER PAGES
// ==========================================

const protectedPages = [
    "challenges.html",
    "post-challenge.html",
    "my-solutions.html",
    "track-progress.html",
    "submit-solution.html",
    "view-solution.html",
    "challenge-details.html",
    "review-solutions.html",
    "review-solution.html"
];

const currentPage =
    window.location.pathname.split("/").pop();

const loggedInUser =
    localStorage.getItem("loggedIn");

if (
    protectedPages.includes(currentPage) &&
    loggedInUser !== "true"
) {
    window.location.href = "login.html";
}

// ==========================================
// GOVERNMENT-ONLY REVIEW ACCESS
// ==========================================

if (
    currentPage === "review-solutions.html" ||
    currentPage === "review-solution.html"
) {
    const currentUserRole =
        localStorage.getItem("userRole");

    if (currentUserRole !== "Government") {
        alert(
            "Access denied. Only Government users can review solutions."
        );

        window.location.href =
            "dashboard.html";
    }
}

// Track Progress - Load saved solutions
const progressList =
    document.getElementById("progressList");

if (progressList) {

    const savedSolutions =
        JSON.parse(
            localStorage.getItem("solutions")
        ) || [];

    savedSolutions.forEach(function (solution) {

        const progressCard =
            document.createElement("div");

        progressCard.className = "card";

        let progress = solution.progress || 25;
        let nextStep = solution.nextStep || "Initial Review";

        if (solution.status === "Under Review") {
            progress = 50;
            nextStep = "Government Review";
        }
        else if (solution.status === "Implementation") {
            progress = 80;
            nextStep = "Final Deployment";
        }
        else if (solution.status === "Completed") {
            progress = 100;
            nextStep = "Completed";
        }

        progressCard.innerHTML = `
            <h3>${solution.title}</h3>

            <p>
                ${solution.description}
            </p>

            <p>
                <strong>Status:</strong>
                ${solution.status}
            </p>

            <p>
                <strong>Progress:</strong>
                ${progress}%
            </p>

            <p>
                <strong>Next Step:</strong>
                ${nextStep}
            </p>
        `;

        progressList.appendChild(progressCard);
    });
}

// ==========================================
// REVIEW SOLUTION - UPDATE STATUS
// ==========================================

const reviewForm =
    document.getElementById("reviewForm");

if (reviewForm) {

    const reviewSolutionId =
        new URLSearchParams(window.location.search).get("id");

    const savedSolutions =
        JSON.parse(
            localStorage.getItem("solutions")
        ) || [];

    const reviewSolution =
        savedSolutions.find(function (solution) {

            return solution.id === reviewSolutionId;

        });


    // Display solution information
    if (reviewSolution) {

        const reviewSolutionTitle =
            document.getElementById("reviewSolutionTitle");

        const reviewChallenge =
            document.getElementById("reviewChallenge");

        const reviewDescription =
            document.getElementById("reviewDescription");

        const reviewApproach =
            document.getElementById("reviewApproach");

        const reviewImpact =
            document.getElementById("reviewImpact");

        const currentStatus =
            document.getElementById("currentStatus");

        const statusSelect =
            document.getElementById("solutionStatusSelect");


        if (reviewSolutionTitle) {
            reviewSolutionTitle.textContent =
                reviewSolution.title;
        }

        if (reviewChallenge) {
            reviewChallenge.textContent =
                reviewSolution.challenge;
        }

        if (reviewDescription) {
            reviewDescription.textContent =
                reviewSolution.description;
        }

        if (reviewApproach) {
            reviewApproach.textContent =
                reviewSolution.approach;
        }

        if (reviewImpact) {
            reviewImpact.textContent =
                reviewSolution.impact;
        }

        if (currentStatus) {
            currentStatus.textContent =
                reviewSolution.status;
        }

        if (statusSelect) {
            statusSelect.value =
                reviewSolution.status;
        }


        // Update solution status
        reviewForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const newStatus =
                    statusSelect.value;


                reviewSolution.status =
                    newStatus;


                // Update progress
                if (newStatus === "Submitted") {

                    reviewSolution.progress = 25;

                    reviewSolution.nextStep =
                        "Initial Review";

                }

                else if (newStatus === "Under Review") {

                    reviewSolution.progress = 50;

                    reviewSolution.nextStep =
                        "Government Review";

                }

                else if (newStatus === "Approved") {

                    reviewSolution.progress = 65;

                    reviewSolution.nextStep =
                        "Implementation Preparation";

                }

                else if (newStatus === "Implementation") {

                    reviewSolution.progress = 80;

                    reviewSolution.nextStep =
                        "Final Deployment";

                }

                else if (newStatus === "Completed") {

                    reviewSolution.progress = 100;

                    reviewSolution.nextStep =
                        "Completed";

                }


                // Save updated solutions
                localStorage.setItem(
                    "solutions",
                    JSON.stringify(savedSolutions)
                );


                // Update displayed status
                if (currentStatus) {

                    currentStatus.textContent =
                        newStatus;

                }


                const reviewMessage =
                    document.getElementById("reviewMessage");

                if (reviewMessage) {

                    reviewMessage.textContent =
                        "Solution status updated successfully!";

                }

            }
        );

    }

}

// ==========================================
// ROLE-BASED DASHBOARD
// ==========================================

const roleTitle =
    document.getElementById("roleTitle");

const roleDescription =
    document.getElementById("roleDescription");

const currentUserRole =
    localStorage.getItem("userRole");

if (roleTitle && roleDescription) {

    if (currentUserRole === "Citizen") {

        roleTitle.textContent =
            "Citizen Dashboard";

        roleDescription.textContent =
            "Discover societal challenges, share ideas and submit solutions that can help your community.";

    }

    else if (currentUserRole === "Government") {

        roleTitle.textContent =
            "Government Dashboard";

        roleDescription.textContent =
            "Post public challenges, review submitted solutions and track solutions toward implementation.";

    }

    else if (currentUserRole === "Student") {

        roleTitle.textContent =
            "Student Dashboard";

        roleDescription.textContent =
            "Explore real-world challenges, develop innovative ideas and submit solutions.";

    }

    else if (currentUserRole === "University") {

        roleTitle.textContent =
            "University Dashboard";

        roleDescription.textContent =
            "Connect students and academic teams with real-world challenges and innovative solution opportunities.";

    }

    else if (currentUserRole === "Industry") {

        roleTitle.textContent =
            "Industry Dashboard";

        roleDescription.textContent =
            "Explore challenges, contribute industry expertise and support practical solution implementation.";

    }

    else {

        roleTitle.textContent =
            "User Dashboard";

        roleDescription.textContent =
            "Manage your challenges and solutions through ChallengeConnect.";

    }

}

// ==========================================
// ROLE-BASED ACTIONS
// ==========================================

const roleActionsTitle =
    document.getElementById("roleActionsTitle");

const roleActionsDescription =
    document.getElementById("roleActionsDescription");

if (roleActionsTitle && roleActionsDescription) {

    if (currentUserRole === "Citizen") {

        roleActionsTitle.textContent =
            "Citizen Actions";

        roleActionsDescription.textContent =
            "Explore community challenges, submit solutions and track your contributions.";

    }

    else if (currentUserRole === "Student") {

        roleActionsTitle.textContent =
            "Student Actions";

        roleActionsDescription.textContent =
            "Explore challenges, submit innovative solutions and track your solution progress.";

    }

    else if (currentUserRole === "Government") {

        roleActionsTitle.textContent =
            "Government Actions";

        roleActionsDescription.textContent =
            "Post societal challenges, review submitted solutions and monitor implementation.";

    }

    else if (currentUserRole === "University") {

        roleActionsTitle.textContent =
            "University Actions";

        roleActionsDescription.textContent =
            "Connect students with challenges and encourage academic solutions.";

    }

    else if (currentUserRole === "Industry") {

        roleActionsTitle.textContent =
            "Industry Actions";

        roleActionsDescription.textContent =
            "Explore challenges, contribute expertise and support solution implementation.";

    }

    else {

        roleActionsTitle.textContent =
            "Available Actions";

        roleActionsDescription.textContent =
            "Explore challenges and participate in ChallengeConnect.";

    }

}

// Load submitted solutions for Government Review
const reviewSolutionsList = document.getElementById("reviewSolutionsList");
const noReviewSolutions = document.getElementById("noReviewSolutions");

if (reviewSolutionsList) {
    const savedSolutions = JSON.parse(localStorage.getItem("solutions")) || [];

    if (savedSolutions.length === 0) {
        if (noReviewSolutions) {
            noReviewSolutions.style.display = "block";
        }
    } else {
        if (noReviewSolutions) {
            noReviewSolutions.style.display = "none";
        }

        savedSolutions.forEach(function (solution) {
            const solutionCard = document.createElement("div");

            solutionCard.className = "card";

            solutionCard.innerHTML = `
                <h3>${solution.title}</h3>

                <p>${solution.description}</p>

                <p>
                    <strong>Challenge:</strong>
                    ${solution.challenge}
                </p>

                <p>
                    <strong>Status:</strong>
                    ${solution.status}
                </p>

                <a href="review-solution.html?id=${solution.id}"
                   class="btn primary-btn">
                    Review Solution
                </a>
            `;

            reviewSolutionsList.appendChild(solutionCard);
        });
    }
}

