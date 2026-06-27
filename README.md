# Project 02: Dynamic Quiz Engine

An interactive, API-driven testing terminal engineered with asynchronous JavaScript (ES6+). This application decouples frontend UI design from static data elements by streaming multiple-choice queries from a remote public API database based on real-time user-configured criteria.

---

##  Tech Stack & Architecture

* **Frontend Structure:** Semantic HTML5 views with multi-screen state switching.
* **Style Engine:** Deep-slate dark theme using CSS Grid, CSS Custom Variables, and dynamic `<kbd>` tracking layouts.
* **Core Logic:** Asynchronous Vanilla JavaScript (ES6+), remote Network Web APIs fetching, and HTML character array entity sanitization.

---

##  Core Features Engineered

* **Live Network Request Integration:** Implemented an asynchronous network pipeline leveraging `fetch()` and `async/await` blocks to fetch fresh questions dynamically from the **Open Trivia Database API**.
* **Dynamic Content Decoupling:** Replaced static text fields by dynamically generating custom DOM components (`option-node`) on every state iteration.
* **Algorithmic Data Shuffling:** Integrated a non-biased mathematical sorting algorithm (`Math.random() - 0.5`) to mix correct and incorrect options randomly before rendering.
* **State Mapping Progress Trackers:** Engineered real-time mathematical score scaling and progress metric trackers that update UI element widths synchronously on every view step.

---

## Core Engineering Concepts Applied

1. Asynchronous API Orchestration
Bypassed procedural runtime delays by encapsulating remote network parameters inside safe error-handled pipelines:
```javascript
async function fetchQuizQuestions() {
    const response = await fetch(apiEndpoint);
    if(!response.ok) throw new Error("Network latency mismatch");
    const data = await response.json();
    // Application flow continuation logic
}
```

2. Runtime Entity Transformation
Because raw API records often return encoded string characters (like &quot;), I engineered an isolated DOM textarea rendering utility to clean and sanitize data streams:

```
function decodeHTMLEntities(text) {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
}
```

3. State Freezing UI Architecture
To enforce accurate assessment control metrics, interactive options are dynamically locked upon input detection to block multi-click exploitation:

```
allOptionNodes.forEach(btn => btn.classList.add('disabled'));
📂 File Directory Mapping
```

02-quiz-app

├── index.html  
├── style.css   
└── app.js   

👤 Development Context
Developed intentionally as part of the core JavaScript track assignments during the DevWeekends Fellowship program.
