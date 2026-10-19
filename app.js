/* CLINIQUE LES HIBISCUS — interactions */
const PRESTATIONS = [
  { id:"generale", nom:"Consultation générale", cat:"generaliste", catTxt:"Généraliste", prix:"10 000 FCFA",
    duree:"Durée : 30 min", img:"images/consultation.jpg",
    desc:"Diagnostic complet, ordonnance et suivi personnalisé." },
  { id:"pediatrie", nom:"Pédiatrie", cat:"pediatrie", catTxt:"Pédiatrie", prix:"12 000 FCFA",
    duree:"Durée : 30 min", img:"images/pediatrie.jpg",
    desc:"Suivi de l'enfant, vaccinations, conseils aux parents." },
  { id:"labo", nom:"Analyses de laboratoire", cat:"laboratoire", catTxt:"Laboratoire", prix:"15 000 FCFA",
    duree:"Résultats en 24 h", img:"images/laboratoire.jpg",
    desc:"NFS, glycémie, paludisme — résultats en 24 heures." },
  { id:"dentaire", nom:"Soins dentaires", cat:"dentaire", catTxt:"Dentaire", prix:"20 000 FCFA",
    duree:"Durée : 45 min", img:"images/hero-clinique.jpg",
    desc:"Détartrage, soins conservateurs, urgences dentaires." },
  { id:"echo", nom:"Échographie", cat:"imagerie", catTxt:"Imagerie", prix:"25 000 FCFA",
    duree:"Durée : 30 min", img:"images/consultation.jpg",
    desc:"Échographies abdominales et obstétricales." },
  { id:"vaccination", nom:"Vaccination", cat:"prevention", catTxt:"Prévention", prix:"8 000 FCFA",
    duree:"Sans rendez-vous", img:"images/pediatrie.jpg",
    desc:"Calendrier vaccinal, carnet de santé, rappels." },
];

function cartePresta(p){
  return `<article class="carte-presta reveal">
    <a href="reservation.html?prestation=${p.id}"><div class="carte-img">
      <img src="${p.img}" alt="${p.nom}" loading="lazy">
      <span class="badge">${p.catTxt}</span>
      <span class="prix-tag">${p.prix}</span>
    </div></a>
    <div class="carte-corps">
      <h3><a href="reservation.html?prestation=${p.id}">${p.nom}</a></h3>
      <p class="carte-duree">${p.duree}</p>
      <p class="desc">${p.desc}</p>
      <a class="carte-lien" href="reservation.html?prestation=${p.id}">Réserver →</a>
    </div>
  </article>`;
}

function initCatalogue(){
  const grille = document.getElementById("grille-presta");
  if(!grille) return;
  const boutons = document.querySelectorAll(".filtre-btn");
  function afficher(cat){
    const res = PRESTATIONS.filter(p => !cat || p.cat === cat);
    grille.innerHTML = res.length ? res.map(cartePresta).join("")
      : `<p class="vide">Aucune prestation dans cette catégorie pour le moment.</p>`;
    observerReveals();
  }
  boutons.forEach(b => b.addEventListener("click", () => {
    boutons.forEach(x => x.classList.remove("actif"));
    b.classList.add("actif");
    afficher(b.dataset.cat || "");
  }));
  afficher("");
}

function initReservation(){
  const form = document.getElementById("form-resa");
  if(!form) return;
  const sel = document.getElementById("r-prestation");
  PRESTATIONS.forEach(p => {
    const o = document.createElement("option");
    o.value = p.id; o.textContent = `${p.nom} — ${p.prix}`;
    sel.appendChild(o);
  });
  const pre = new URLSearchParams(location.search).get("prestation");
  if(pre && PRESTATIONS.some(p => p.id === pre)) sel.value = pre;
  // Créneaux
  const creneaux = ['08:00', '09:30', '11:00', '14:00', '15:30', '17:00'];
  const box = document.getElementById("creneaux");
  const hidden = document.getElementById("r-creneau");
  creneaux.forEach((c,i) => {
    const d = document.createElement("div");
    d.className = "creneau" + (i===0 ? " choisi" : "");
    d.textContent = c;
    d.addEventListener("click", () => {
      box.querySelectorAll(".creneau").forEach(x => x.classList.remove("choisi"));
      d.classList.add("choisi"); hidden.value = c;
    });
    box.appendChild(d);
  });
  hidden.value = creneaux[0];
  // Date min = demain
  const date = document.getElementById("r-date");
  const dem = new Date(); dem.setDate(dem.getDate()+1);
  date.min = dem.toISOString().split("T")[0];
}

function initMenu(){
  const burger = document.getElementById("burger"), nav = document.getElementById("nav");
  if(!burger) return;
  burger.addEventListener("click", () => {
    nav.classList.toggle("ouvert"); burger.classList.toggle("ouvert");
  });
}
function initHeader(){
  const h = document.getElementById("header");
  const onScroll = () => h.classList.toggle("header--scrolled", scrollY > 40);
  addEventListener("scroll", onScroll); onScroll();
}
let observer;
function observerReveals(){
  document.querySelectorAll(".reveal:not(.visible)").forEach(el => observer.observe(el));
}
function initReveals(){
  observer = new IntersectionObserver(es => es.forEach(e => {
    if(e.isIntersecting){ e.target.classList.add("visible"); observer.unobserve(e.target); }
  }), {threshold:.12});
  observerReveals();
}
function initFormulaires(){
  document.querySelectorAll("form[data-demo]").forEach(f => {
    f.addEventListener("submit", e => {
      e.preventDefault();
      f.querySelector(".form-ok").style.display = "block";
      f.querySelectorAll("input[type=text],input[type=tel],input[type=email],textarea").forEach(i => i.value = "");
      f.scrollIntoView({behavior:"smooth", block:"center"});
    });
  });
}
function initDivers(){
  const y = document.getElementById("annee"); if(y) y.textContent = new Date().getFullYear();
  const page = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a").forEach(a => {
    if(a.getAttribute("href") === page) a.classList.add("actif");
  });
}
document.addEventListener("DOMContentLoaded", () => {
  initMenu(); initHeader(); initReveals(); initCatalogue(); initReservation(); initFormulaires(); initDivers();
});
