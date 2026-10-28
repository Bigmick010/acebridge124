document.addEventListener("DOMContentLoaded", () => {
  // Theme switcher: remembers the user's choice in this browser.
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const savedTheme = localStorage.getItem("studynaija-theme");

  function setTheme(theme) {
    const isDark = theme === "dark";
    document.body.classList.toggle("dark-mode", isDark);
    themeIcon.className = isDark ? "bi bi-sun-fill" : "bi bi-moon-stars-fill";
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    localStorage.setItem("studynaija-theme", theme);
  }
  setTheme(savedTheme === "dark" ? "dark" : "light");
  themeToggle.addEventListener("click", () => {
    setTheme(document.body.classList.contains("dark-mode") ? "light" : "dark");
  });

  // document.getElementById("year").textContent = new Date().getFullYear();

  // Resource category filter and search work together.
  const searchInput = document.getElementById("resourceSearch");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const resourceItems = document.querySelectorAll(".resource-item");
  const noResults = document.getElementById("noResults");
  let activeFilter = "all";

  function filterResources() {
    const term = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;
    resourceItems.forEach(item => {
      const categoryMatch = activeFilter === "all" || item.dataset.category === activeFilter;
      const searchMatch = (item.dataset.search + " " + item.innerText).toLowerCase().includes(term);
      const show = categoryMatch && searchMatch;
      item.classList.toggle("d-none", !show);
      if (show) visibleCount++;
    });
    noResults.classList.toggle("d-none", visibleCount !== 0);
  }
  searchInput.addEventListener("input", filterResources);
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      activeFilter = button.dataset.filter;
      filterResources();
    });
  });

  // Starter content for resource cards. Replace or expand this with your own verified notes.
  const resources = {
    beceMath: {
      title: "JSS 3 Mathematics — BECE Revision",
      intro: "Use this outline to plan your revision. Add your own lesson notes, examples and practice questions as you build the library.",
      topics: ["Number bases, fractions and percentages", "Algebraic expressions and simple equations", "Angles, shapes, perimeter and area", "Statistics, graphs and probability"],
      note: "Tip: Work through examples yourself before checking a solution. Exam formats can vary, so confirm the current syllabus with your school or examination body."
    },
    beceEnglish: {
      title: "JSS 3 English Language — BECE Revision",
      intro: "Practise the main language skills regularly and ask a teacher to review your writing.",
      topics: ["Reading comprehension", "Grammar, parts of speech and sentence structure", "Summary and vocabulary", "Letter writing, essays and other composition tasks"],
      note: "Tip: Practise writing within a time limit and leave a few minutes to check spelling and punctuation."
    },
    waecScience: {
      title: "SS 3 Science Subjects — WAEC Revision",
      intro: "Break your science revision into manageable topic sessions. Keep a notebook of formulas, definitions and mistakes.",
      topics: ["Biology: cells, ecology, genetics and human systems", "Chemistry: atoms, bonding, acids and bases, calculations", "Physics: motion, energy, electricity and waves", "Practise labelled diagrams, calculations and explanations"],
      note: "Use the current syllabus and authorised materials. This starter page is a topic guide, not an official WAEC publication."
    },
    waecCore: {
      title: "SS 3 Core Subjects — WAEC Revision",
      intro: "Create a revision plan around the subjects you registered for and the topics you need to improve.",
      topics: ["English Language: comprehension, summary and writing", "Mathematics: algebra, geometry, statistics and graphs", "Review subject-specific syllabus objectives", "Practise timed questions and check every answer"],
      note: "Past-question collections should be shared only where you have permission to distribute them."
    },
    jambPractice: {
      title: "JAMB UTME — Practice Plan",
      intro: "Prepare for the four subjects in your selected UTME combination and review explanations after each practice session.",
      topics: ["Confirm the correct subject combination for your intended course", "Practise short timed sets for each subject", "Record weak topics and revisit them weekly", "Review wrong answers and understand why they were wrong"],
      note: "Check JAMB's official website for current registration information, subject combinations and examination updates."
    },
    jambEnglish: {
      title: "JAMB Use of English",
      intro: "Build accuracy through regular reading and targeted practice.",
      topics: ["Comprehension and interpretation", "Lexis and structure", "Vocabulary in context", "Sentence completion and grammatical usage"],
      note: "Use the current official syllabus and recommended reading information for the exam year you are preparing for."
    },
    admissionGuide: {
      title: "University Admission Guide",
      intro: "Admission rules differ by institution and course. Always verify requirements directly with the institution.",
      topics: ["Research course requirements and accepted O'level subjects", "Check the institution's current JAMB cut-off and screening process", "Prepare required documents and keep copies", "Monitor official admission portals and messages"],
      note: "Do not rely on unofficial posts for deadlines or guaranteed admission claims. Requirements can change each year."
    },
    admissionChecklist: {
      title: "University Aspirant Checklist",
      intro: "Use this checklist to organise your admission process. Tick each item when you complete it.",
      topics: ["Confirm your JAMB details and subject combination", "Check O'level result and course requirements", "Watch for official Post-UTME or screening announcements", "Keep registration slips, result details and required documents safe", "Check the official portal regularly for updates"],
      note: "Never share passwords, PINs or sensitive account details with anyone claiming to guarantee admission."
    }
  };

  const resourceModal = new bootstrap.Modal(document.getElementById("resourceModal"));
  document.querySelectorAll(".resource-open").forEach(button => {
    button.addEventListener("click", () => {
      const item = resources[button.dataset.resource];
      if (!item) return;
      document.getElementById("resourceModalTitle").textContent = item.title;
      document.getElementById("resourceModalBody").innerHTML = `
        <p>${item.intro}</p>
        <h3 class="h6 fw-bold mt-4">Suggested topics and steps</h3>
        <ul class="resource-content-list">${item.topics.map(topic => `<li>${topic}</li>`).join("")}</ul>
        <div class="resource-note mt-4"><i class="bi bi-info-circle me-2"></i>${item.note}</div>
      `;
      resourceModal.show();
    });
  });

    const questions = [
      { question: "Solve for x: 2x + 6 = 14.", options: ["A. 3", "B. 4", "C. 5", "D. 10"], correct: 1, explanation: "Subtract 6 from both sides: 2x = 8. Divide by 2, so x = 4." },
      { question: "What is 25% of 200?", options: ["A. 25", "B. 40", "C. 50", "D. 75"], correct: 2, explanation: "25% of 200 = 25/100 × 200 = 50." },
      { question: "Find the area of a rectangle with length 8 cm and width 5 cm.", options: ["A. 13 cm²", "B. 26 cm²", "C. 35 cm²", "D. 40 cm²"], correct: 3, explanation: "Area = length × width = 8 × 5 = 40 cm²." },
      {
        question: "Simplify: 3² + 4.", options: ["A. 9", "B. 13", "C. 16", "D. 25"], correct: 1, explanation: "3² = 9, and 9 + 4 = 13."},
      {
        question: "Express 0.75 as a fraction in its simplest form.", options: ["A. 1/2", "B. 2/3", "C. 3/4", "D. 4/5"], correct: 2, explanation: "0.75 = 75/100 = 3/4."}
    ];
    let questionIndex = 0;
    let score = 0;
    let answered = false;
    const questionText = document.getElementById("questionText");
    const answerOptions = document.getElementById("answerOptions");
    const quizFeedback = document.getElementById("quizFeedback");
    const nextQuestion = document.getElementById("nextQuestion");
    const scoreText = document.getElementById("scoreText");
    const questionCounter = document.getElementById("questionCounter");
    const quizProgress = document.getElementById("quizProgress");

    function renderQuestion() {
      const q = questions[questionIndex];
      answered = false;
      questionText.textContent = q.question;
      questionCounter.textContent = `Question ${questionIndex + 1} of ${questions.length}`;
      quizProgress.style.width = `${((questionIndex + 1) / questions.length) * 100}%`;
      quizProgress.parentElement.setAttribute("aria-valuenow", String(Math.round(((questionIndex + 1) / questions.length) * 100)));
      quizFeedback.textContent = "";
      nextQuestion.disabled = true;
      nextQuestion.innerHTML = questionIndex === questions.length - 1 ? "See results" : 'Next question <i class="bi bi-arrow-right ms-1"></i>';
      answerOptions.innerHTML = "";
      q.options.forEach((option, index) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "answer-option";
        btn.textContent = option;
        btn.addEventListener("click", () => chooseAnswer(index, btn));
        answerOptions.appendChild(btn);
      });
    }
    function chooseAnswer(selectedIndex, selectedButton) {
      if (answered) return;
      answered = true;
      const q = questions[questionIndex];
      const buttons = answerOptions.querySelectorAll(".answer-option");
      buttons.forEach((btn, index) => {
        btn.disabled = true;
        if (index === q.correct) btn.classList.add("correct");
      });
      if (selectedIndex === q.correct) {
        score++;
        quizFeedback.textContent = `Correct! ${q.explanation}`;
        quizFeedback.style.color = "#16834b";
      } else {
        selectedButton.classList.add("incorrect");
        quizFeedback.textContent = `Not quite. ${q.explanation}`;
        quizFeedback.style.color = "#d9534f";
      }
      scoreText.textContent = `Score: ${score}`;
      nextQuestion.disabled = false;
    }
    nextQuestion.addEventListener("click", () => {
      if (!answered) return;
      if (questionIndex < questions.length - 1) {
        questionIndex++;
        renderQuestion();
      } else {
        questionText.textContent = `You scored ${score} out of ${questions.length}.`;
        answerOptions.innerHTML = "";
        quizFeedback.textContent = score === questions.length ? "Excellent work! Keep practising." : "Good start. Review the explanations and try again.";
        quizFeedback.style.color = "var(--green)";
        nextQuestion.textContent = "Try again";
        nextQuestion.disabled = false;
        nextQuestion.onclick = () => {
          questionIndex = 0;
          score = 0;
          scoreText.textContent = "Score: 0";
          nextQuestion.onclick = null;
          renderQuestion();
        };
        answered = false;
      }
    });
    renderQuestion();
  });

const videoContainer = document.getElementById("videoContainer");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

nextBtn.addEventListener("click", function () {

    videoContainer.scrollBy({
        left: videoContainer.clientWidth * 0.8,
        behavior: "smooth"
    });

});

prevBtn.addEventListener("click", function () {

    videoContainer.scrollBy({
        left: -videoContainer.clientWidth * 0.8,
        behavior: "smooth"
    });

});

document.getElementById("currentYear").textContent =
    new Date().getFullYear();

