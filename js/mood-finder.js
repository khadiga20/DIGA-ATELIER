/* ==========================================
   DIGA — Interactive Mood Finder Engine
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  initMoodFinder();
});

// Quiz State & Archetype Profiles
const MOOD_PROFILES = {
  ELECTRIC_REBEL: {
    name: "ELECTRIC REBEL",
    tagline: "Unapologetic Voltage & Sharp Architecture",
    description: "Your mood is charged with kinetic energy and rebellious poise. You don't blend into space—you transform it. Your style demands high contrast, structured silhouettes, and vivid electric magenta rim lighting.",
    gradient: "radial-gradient(ellipse at 50% 40%, #536DFE 0%, #E0247D 45%, #050407 85%)",
    accentColor: "#E0247D",
    glowColor: "rgba(224, 36, 125, 0.6)",
    products: [
      { name: "Voltaic Sculpted Blazer", price: "$540", img: "assets/images/collection_lifestyle_2.jpg" },
      { name: "Restless Cutout Overcoat", price: "$690", img: "assets/images/gallery_restless.jpg" },
      { name: "Ablaze Kinetic Silk Dress", price: "$620", img: "assets/images/gallery_ablaze.jpg" },
      { name: "Obsidian High-Waist Trousers", price: "$380", img: "assets/images/hero_bg.jpg" }
    ]
  },
  FLUID_ETHEREAL: {
    name: "FLUID ETHEREAL",
    tagline: "Translucent Motion & Weightless Grace",
    description: "Your mood moves like sheer silk caught in a gentle draft. Subtle, atmospheric, and deeply intuitive. You favor asymmetric draping, ethereal violet tones, and garments that flow with every gesture.",
    gradient: "radial-gradient(ellipse at 50% 40%, #7A22C4 0%, #536DFE 50%, #050407 85%)",
    accentColor: "#7A22C4",
    glowColor: "rgba(122, 34, 196, 0.6)",
    products: [
      { name: "Asymmetric Stage Gown", price: "$480", img: "assets/images/collection_lifestyle_1.jpg" },
      { name: "Sheer Violet Wrap", price: "$340", img: "assets/images/hero_bg.jpg" },
      { name: "Solitude Draped Tunic", price: "$410", img: "assets/images/gallery_unbothered.jpg" },
      { name: "Ablaze Motion Silk Dress", price: "$620", img: "assets/images/gallery_ablaze.jpg" }
    ]
  },
  QUIET_SOLITUDE: {
    name: "QUIET SOLITUDE",
    tagline: "Unbothered Confidence & Restrained Precision",
    description: "Your mood is serene, grounded, and unbothered by noise. You let quality, texture, and tailored minimalism speak for you. Monochromatic palettes and oversized architectural coats define your presence.",
    gradient: "radial-gradient(ellipse at 50% 40%, #2A2633 0%, #111016 55%, #050407 85%)",
    accentColor: "#B4AAA0",
    glowColor: "rgba(180, 170, 160, 0.5)",
    products: [
      { name: "Unbothered Oversized Coat", price: "$720", img: "assets/images/gallery_unbothered.jpg" },
      { name: "Voltaic Sculpted Blazer", price: "$540", img: "assets/images/collection_lifestyle_2.jpg" },
      { name: "Minimalist Wool Trousers", price: "$390", img: "assets/images/hero_bg.jpg" },
      { name: "Asymmetric Stage Gown", price: "$480", img: "assets/images/collection_lifestyle_1.jpg" }
    ]
  },
  FIERCE_LUMINARY: {
    name: "FIERCE LUMINARY",
    tagline: "Commanding Stance & Deep Stage Bleed",
    description: "Your mood is intense, bold, and magnetic. You walk with purpose and dress with quiet dominance. Deep purple lighting and dramatic cutout wools suit your fierce emotional spectrum.",
    gradient: "radial-gradient(ellipse at 50% 40%, #C2185B 0%, #4A148C 50%, #050407 85%)",
    accentColor: "#C2185B",
    glowColor: "rgba(194, 24, 91, 0.6)",
    products: [
      { name: "Restless Cutout Overcoat", price: "$690", img: "assets/images/gallery_restless.jpg" },
      { name: "Ablaze Motion Silk Dress", price: "$620", img: "assets/images/gallery_ablaze.jpg" },
      { name: "Asymmetric Stage Gown", price: "$480", img: "assets/images/collection_lifestyle_1.jpg" },
      { name: "Voltaic Sculpted Blazer", price: "$540", img: "assets/images/collection_lifestyle_2.jpg" }
    ]
  }
};

function initMoodFinder() {
  const steps = document.querySelectorAll('.quiz-step');
  const progressBarFill = document.getElementById('progress-bar-fill');
  const progressStepText = document.getElementById('progress-step-text');
  const curtain = document.getElementById('fabric-curtain');
  const beginBtn = document.getElementById('btn-begin-quiz');

  let currentStepIndex = 0;
  const totalQuestionSteps = 5;

  // Archetype score tallies
  const scores = {
    ELECTRIC_REBEL: 0,
    FLUID_ETHEREAL: 0,
    QUIET_SOLITUDE: 0,
    FIERCE_LUMINARY: 0
  };

  // Step 0: Begin Quiz button
  if (beginBtn) {
    beginBtn.addEventListener('click', () => {
      goToStep(1);
    });
  }

  // Option Card Clicks
  const optionCards = document.querySelectorAll('.option-card');
  optionCards.forEach(card => {
    card.addEventListener('click', () => {
      if (card.classList.contains('imploding')) return;

      const profileTally = card.getAttribute('data-points');
      if (profileTally && scores[profileTally] !== undefined) {
        scores[profileTally] += 2;
      }

      // Implosion scale feedback animation
      card.classList.add('imploding');

      // Update background gradient dynamically towards cumulative mood
      updateDynamicGradient();

      setTimeout(() => {
        card.classList.remove('imploding');
        const nextStepNum = currentStepIndex + 1;
        goToStep(nextStepNum);
      }, 450);
    });
  });

  function goToStep(targetIndex) {
    // Trigger curtain wipe transition
    if (curtain) {
      curtain.classList.remove('wipe-off');
      curtain.classList.add('wipe-down');
    }

    setTimeout(() => {
      steps.forEach((step, idx) => {
        step.classList.toggle('active', idx === targetIndex);
      });

      currentStepIndex = targetIndex;

      // Update Progress Header
      if (targetIndex > 0 && targetIndex <= totalQuestionSteps) {
        const percent = (targetIndex / totalQuestionSteps) * 100;
        if (progressBarFill) progressBarFill.style.width = `${percent}%`;
        if (progressStepText) progressStepText.textContent = `STEP 0${targetIndex} / 0${totalQuestionSteps}`;
      } else if (targetIndex > totalQuestionSteps) {
        // Result Screen reached
        if (progressBarFill) progressBarFill.style.width = '100%';
        if (progressStepText) progressStepText.textContent = 'SPECTRUM REVEALED';
        renderResultScreen();
      }

      // Open curtain
      if (curtain) {
        curtain.classList.remove('wipe-down');
        curtain.classList.add('wipe-off');
      }
    }, 450);
  }

  function updateDynamicGradient() {
    let topProfile = 'FLUID_ETHEREAL';
    let maxScore = -1;

    for (const [key, val] of Object.entries(scores)) {
      if (val > maxScore) {
        maxScore = val;
        topProfile = key;
      }
    }

    const targetGrad = MOOD_PROFILES[topProfile].gradient;
    document.body.style.background = targetGrad;
  }

  function renderResultScreen() {
    // Determine winner archetype
    let winningKey = 'ELECTRIC_REBEL';
    let maxVal = -1;

    for (const [key, val] of Object.entries(scores)) {
      if (val > maxVal) {
        maxVal = val;
        winningKey = key;
      }
    }

    const profile = MOOD_PROFILES[winningKey];

    // Set background
    document.body.style.background = profile.gradient;
    document.documentElement.style.setProperty('--quiz-accent-2', profile.accentColor);
    document.documentElement.style.setProperty('--quiz-glow', profile.glowColor);

    // Headline letter by letter reveal
    const headlineEl = document.getElementById('result-headline');
    if (headlineEl) {
      headlineEl.innerHTML = '';
      const letters = profile.name.split('');

      letters.forEach((char, idx) => {
        const span = document.createElement('span');
        span.className = 'letter-glow';
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.animationDelay = `${idx * 0.08}s`;
        headlineEl.appendChild(span);
      });
    }

    // Set description & tagline
    const tagEl = document.getElementById('result-tagline');
    const descEl = document.getElementById('result-description');
    if (tagEl) tagEl.textContent = profile.tagline;
    if (descEl) descEl.textContent = profile.description;

    // Populate Lookbook Capsule
    const capsuleGrid = document.getElementById('capsule-grid');
    if (capsuleGrid) {
      capsuleGrid.innerHTML = '';

      profile.products.forEach((prod, idx) => {
        const item = document.createElement('article');
        item.className = 'capsule-card';
        item.innerHTML = `
          <div class="capsule-card-img-wrap">
            <img src="${prod.img}" alt="${prod.name}" class="capsule-card-img" loading="lazy">
          </div>
          <div class="capsule-card-info">
            <div>
              <h4 class="capsule-item-name">${prod.name}</h4>
              <span style="font-size: 0.75rem; letter-spacing: 0.15em; color: var(--text-muted); text-transform: uppercase;">Curated Choice</span>
            </div>
            <span class="capsule-item-price">${prod.price}</span>
          </div>
        `;
        capsuleGrid.appendChild(item);

        // Staggered reveal (~150ms per item)
        setTimeout(() => {
          item.classList.add('revealed');
        }, 300 + (idx * 150));
      });
    }

    // Share button listener
    const shareBtn = document.getElementById('btn-share-mood');
    if (shareBtn) {
      shareBtn.addEventListener('click', () => {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(window.location.href);
          shareBtn.textContent = 'MOOD LINK COPIED ✓';
          setTimeout(() => {
            shareBtn.textContent = 'SAVE / SHARE MOOD';
          }, 3000);
        }
      });
    }
  }
}
