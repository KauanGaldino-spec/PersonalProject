const animedata = [
    {id:'a1', title: 'NeonBlossom', genres:['Action', 'Sci-Fi'],
     year:2023, episodes:12, synopsis:'A pilot with a secret mech protects the city from shadow drones.', image:''
    },
    {
      id:'a2', title:'Moonlight Coffee',genres:['Slice of life', 'Drama'], year:2021,episodes:24,synopsis:'Friends and strangers meet nightly at a quiet cafe where stories are brewed.',image:'',
    },
    {
    id:'a3', title:'Starlit Journey',genres:['Adventure', 'Fantasy'], year:2019,episodes:26,synopsis:'Two companions travel to reclaim lost constellations across floating isles.',image:'',
    },
    {
      id:'a4', title:'Blade of Dawn',genres:['Action', 'Fantasy'], year:2020,episodes:13,synopsis:'A lone swordswoman seeks an ancient blade to end the long night.',image:'',  
    },
    {
     id:'a5', title:'Cyber Court',genres:['Sci-Fi', 'Mystery'], year:2024,episodes:10,synopsis:'A detective navigates virtual courts to uncover a conspiracy in the net.',image:'',
    },
    {
     id:'a6', title:'Quiet Library',genres:['Mystery', 'Slice of life'], year:2018,episodes:12,synopsis:'A library holds secrets and those who read them sometimes disappear into stories.',image:'', 
    }
];

const dom = {
    grid: document.getElementById('grid'),
    search: document.getElementById('search'),
    genre: document.getElementById('genre-filter'),
    showFavs: document.getElementById('show-favorites'),
    modal: document.getElementById('modal'),
    modalBody: document.getElementById('modal-body'),
    modalClose: document.getElementById('modal-close')
};

let favorites = new Set(JSON.parse(localStorage.getItem('favorites') || '[]'));
let showOnlyFavorites = false;

function saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify([...favorites]));
}

function getAllGenres() {
    const s = new Set();
    animedata.forEach(a => a.genres.forEach(g => s.add(g)));
    return [...s].sort();
}

function renderGenreOptions() {
    const genres = getAllGenres();
    dom.genre.innerHTML = '<option value="">All genres</option>';
    genres.forEach(g => {
        const opt = document.createElement('option');
        opt.value = g;
        opt.textContent = g;
        dom.genre.appendChild(opt);
    });
} 

function posterInitials(title) { return title.split(' ').slice(0, 2).map(w => w[0] || '').join('').toUpperCase(); }

function createCard(a) {
    const card = document.createElement('article'); card.className = 'card';
    const poster = document.createElement('div'); poster.className = 'poster';
    if (a.image) {
        poster.style.backgroundImage = `url(${a.image})`; poster.style.backgroundSize = 'cover';
    } else {
        poster.textContent = posterInitials(a.title);
    }
    const title = document.createElement('h3'); title.className = 'title'; title.textContent = a.title;
    const meta = document.createElement('div'); meta.className = 'meta'; meta.textContent = `${a.year} · ${a.episodes} eps`; 

    const actions = document.createElement('div'); actions.className = 'actions';
    const view = document.createElement('button'); view.className ='button'; view.textContent='view'; view.addEventListener('click',()=>openModal(a));
    const heart = document.createElement('button'); heart.className = 'button heart'; heart.innerHTML = favorites.has(a.id) ? '❤️' : '🤍'; heart.addEventListener('click', () => { if (favorites.has(a.id)) { favorites.delete(a.id); } else { favorites.add(a.id); } saveFavorites(); heart.innerHTML = favorites.has(a.id) ? '❤️' : '🤍'; });

    actions.appendChild(view); actions.appendChild(heart);
    card.appendChild(poster); card.appendChild(title); card.appendChild(meta); card.appendChild(actions);
    return card;
}

 function openModal(a) {
    dom.modalBody.innerHTML = `<h2>${a.title}</h2><p class="meta">${a.year} · ${a.genres.join(', ')} · ${a.episodes} eps</p><p>${a.synopsis}</p>`;
    dom.modal.classList.add('open');
    dom.modal.setAttribute('aria-hidden', 'false');
    dom.modalClose.focus();
} 
function closeModal() { dom.modal.classList.remove('open'); dom.modal.setAttribute('aria-hidden', 'true'); }

dom.modalClose.addEventListener('click', closeModal);
window.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

function render() {
    const q = dom.search.value.trim().toLowerCase();
    const g = dom.genre.value;
    dom.grid.innerHTML = '';
    const items = animedata.filter(a => {
        if (showOnlyFavorites && !favorites.has(a.id)) return false;
        if (q && !a.title.toLowerCase().includes(q)) return false;
        if (g && a.genres.indexOf(g) === -1) return false;
        return true;
    });
    if (items.length === 0) { dom.grid.innerHTML = '<p style="color:#94a3b8">No results found.</p>'; return; }
    const frag = document.createDocumentFragment();
    items.forEach(a => frag.appendChild(createCard(a)));
    dom.grid.appendChild(frag);
} 

// events
dom.search.addEventListener('input', render);
dom.genre.addEventListener('change', render);
// show favorites toggle
dom.showFavs.setAttribute('aria-pressed', String(showOnlyFavorites));
dom.showFavs.addEventListener('click', () => {
    showOnlyFavorites = !showOnlyFavorites;
    dom.showFavs.setAttribute('aria-pressed', String(showOnlyFavorites));
    render();
});

document.addEventListener('click',e=>{ if(e.target===dom.modal) closeModal(); });

//init
renderGenreOptions(); render();