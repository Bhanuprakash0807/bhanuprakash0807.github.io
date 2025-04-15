
const textInput = document.getElementById("textInput");
const analyzeBtn = document.getElementById("analyzeBtn");
const backBtn = document.getElementById("backBtn");
const inputContainer = document.getElementById("input-container");
const resultsContainer = document.getElementById("results");

const basicStatsEl = document.getElementById("basicStats");
const pronounsListEl = document.getElementById("pronounsList");
const prepositionsListEl = document.getElementById("prepositionsList");
const articlesListEl = document.getElementById("articlesList");


const pronouns = [
  "i", "me", "my", "mine", "myself", "you", "your", "yours", "yourself", 
  "yourselves", "he", "him", "his", "himself", "she", "her", "hers", 
  "herself", "it", "its", "itself", "we", "us", "our", "ours", 
  "ourselves", "they", "them", "their", "theirs", "themselves", "who", 
  "whom", "whose", "which", "what", "this", "that", "these", "those"
];

const prepositions = [
  "about", "above", "across", "after", "against", "along", "amid", 
  "among", "around", "at", "before", "behind", "below", "beneath", 
  "beside", "between", "beyond", "by", "concerning", "considering", 
  "despite", "down", "during", "except", "for", "from", "in", "inside", 
  "into", "like", "near", "of", "off", "on", "onto", "out", "outside", 
  "over", "past", "regarding", "round", "since", "through", "throughout", 
  "to", "toward", "towards", "under", "underneath", "until", "unto", 
  "up", "upon", "with", "within", "without"
];

const indefiniteArticles = ["a", "an"];

analyzeBtn.addEventListener("click", function () {
  const text = textInput.value.trim();

  if (text.length < 10000) {
    alert("Please enter atleast 10000 words for the text to analyze");
    return;
  }

  analyzeText(text);

  inputContainer.style.display = "none";
  resultsContainer.style.display = "block";
});

backBtn.addEventListener("click", function () {
  inputContainer.style.display = "block";
  resultsContainer.style.display = "none";
});

function analyzeText(text) {
  
  const letterCount = (text.match(/[a-zA-Z]/g) || []).length;
  const wordCount = text
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
  const spaceCount = (text.match(/\s/g) || []).length;
  const newlineCount = (text.match(/\n/g) || []).length;
  const specialCount = (text.match(/[^\w\s]/g) || []).length;

  basicStatsEl.innerHTML = `
    <li><strong>Letters:</strong> ${letterCount}</li>
    <li><strong>Words:</strong> ${wordCount}</li>
    <li><strong>Spaces:</strong> ${spaceCount}</li>
    <li><strong>Newlines:</strong> ${newlineCount}</li>
    <li><strong>Special Symbols:</strong> ${specialCount}</li>
  `;

  const tokens = text
    .toLowerCase()
    .split(/\W+/)
    .filter((token) => token.length > 0);

  const pronounCounts = countWordsByCategory(tokens, pronouns);
  renderWordList(pronounsListEl, pronounCounts);

  const prepositionCounts = countWordsByCategory(tokens, prepositions);
  renderWordList(prepositionsListEl, prepositionCounts);


  const articleCounts = countWordsByCategory(tokens, indefiniteArticles);
  renderWordList(articlesListEl, articleCounts);
}


function countWordsByCategory(tokens, wordList) {
  const counts = {};

  for (const word of wordList) {
    counts[word] = 0;
  }

  for (const token of tokens) {
    if (wordList.includes(token)) {
      counts[token]++;
    }
  }

  
  const sortedCounts = Object.entries(counts)
    .filter(([_, count]) => count > 0)
    .sort((a, b) => b[1] - a[1]);

  return sortedCounts;
}


function renderWordList(container, wordCounts) {
  container.innerHTML = "";

  if (wordCounts.length === 0) {
    container.innerHTML = "<p>None found in text</p>";
    return;
  }

  for (const [word, count] of wordCounts) {
    const wordItem = document.createElement("div");
    wordItem.className = "word-item";
    wordItem.innerHTML = `
      <span>${word}</span>
      <span class="word-count">${count}</span>
    `;
    container.appendChild(wordItem);
  }
}


document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('.section');
  const navItems = document.querySelectorAll('.nav-item');
  
  
  function highlightNavItem() {
    let scrollPosition = window.scrollY;
    
    sections.forEach((section, index) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${sectionId}`) {
            item.classList.add('active');
          }
        });
      }
    });
  }
  
  window.addEventListener('scroll', highlightNavItem);
  
  
  highlightNavItem();
});



document.addEventListener("DOMContentLoaded", function() {
    
    console.log(`${new Date().toISOString()} , view , page:${document.title || 'home'}`);
    
    
    document.addEventListener("click", function(event) {
      const target = event.target;
      const tagName = target.tagName.toLowerCase();
      let objectType = "element";
      let objectName = "";
      
      
      if (tagName === "img") {
        objectType = "image";
        objectName = target.alt || target.src.split('/').pop();
      } else if (tagName === "a") {
        objectType = "link";
        objectName = target.innerText.trim() || target.href;
      } else if (tagName === "button") {
        objectType = "button";
        objectName = target.innerText.trim() || target.id;
      } else if (tagName === "select") {
        objectType = "drop-down";
        objectName = target.name || target.id;
      } else if (tagName === "input" || tagName === "textarea") {
        objectType = "input";
        objectName = target.id || target.name;
      } else if (["h1", "h2", "h3", "h4", "h5", "h6"].includes(tagName)) {
        objectType = "heading";
        objectName = target.innerText.trim();
      } else if (tagName === "p") {
        objectType = "text";
        objectName = target.innerText.trim().substring(0, 30);
      } else {
        objectName = target.id || target.className || target.innerText?.trim().substring(0, 30);
      }
      
      
      objectName = (objectName || "unnamed-element").replace(/\s+/g, ' ').trim();
      if (objectName.length > 30) objectName = objectName.substring(0, 27) + "...";
      console.log(`${new Date().toISOString()} , click , ${objectType}:${objectName}`);
    });
    
   
    const viewObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const tagName = element.tagName.toLowerCase();
          let objectType = "section";
          let objectName = "";
          
         
          if (tagName === "img") {
            objectType = "image";
            objectName = element.alt || element.src.split('/').pop();
          } else if (["h1", "h2", "h3", "h4", "h5", "h6"].includes(tagName)) {
            objectType = "heading";
            objectName = element.innerText.trim();
          } else if (tagName === "p") {
            objectType = "text";
            objectName = element.innerText.trim().substring(0, 30);
          } else if (tagName === "section" || element.id) {
            objectName = element.id || "unnamed-section";
          }
        
          objectName = (objectName || "element").replace(/\s+/g, ' ').trim();
          if (objectName.length > 30) objectName = objectName.substring(0, 27) + "...";
          console.log(`${new Date().toISOString()} , view , ${objectType}:${objectName}`);
          
         
          viewObserver.unobserve(element);
        }
      });
    }, { threshold: 0.5 });
    

    const elementsToTrack = document.querySelectorAll('section, p, img, h1, h2, h3, h4, h5, h6, div[id]');
    elementsToTrack.forEach(element => viewObserver.observe(element));
    
    
    document.querySelectorAll('a[href$=".pdf"]').forEach(link => {
      link.addEventListener("click", function() {
        console.log(`${new Date().toISOString()} , download , CV:Resume Download`);
      });
    });
  });