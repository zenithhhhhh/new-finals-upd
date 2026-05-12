const products = [
  {
    title: "D&D Player's Handbook",
    genre: "dnd",
    category: "DND BOOKS",
    tag: "Tabletop RPG",
    price: 2499,
    desc: "Core fantasy role-playing guide for character creation, spells, and adventures.",
    cls: "c1"
  },
  {
    title: "D&D Monster Manual",
    genre: "dnd",
    category: "DND BOOKS",
    tag: "Bestiary",
    price: 2299,
    desc: "A collection of creatures, monsters, and enemies for tabletop campaigns.",
    cls: "c2"
  },
  {
    title: "Dungeon Master's Guide",
    genre: "dnd",
    category: "DND BOOKS",
    tag: "Campaign Tools",
    price: 2399,
    desc: "Worldbuilding, treasure, magic items, and rules for running adventures.",
    cls: "c3"
  },
  {
    title: "D&D 1st Edition",
    genre: "dnd",
    category: "DND BOOKS",
    tag: "Classic",
    price: 1299,
    desc: "The original Dungeons & Dragons first edition ruleset for early tabletop play.",
    cls: "c4"
  },
  {
    title: "D&D 2nd Edition",
    genre: "dnd",
    category: "DND BOOKS",
    tag: "Classic",
    price: 1399,
    desc: "The revised second edition of Dungeons & Dragons with expanded setting support.",
    cls: "c1"
  },
  {
    title: "D&D 3.5 Edition",
    genre: "dnd",
    category: "DND BOOKS",
    tag: "Rules Update",
    price: 1499,
    desc: "The updated 3.5 edition of Dungeons & Dragons with refined combat and character rules.",
    cls: "c2"
  },
  {
    title: "D&D 4th Edition",
    genre: "dnd",
    category: "DND BOOKS",
    tag: "Modern",
    price: 1599,
    desc: "The fourth edition of D&D focusing on tactical play and balanced character roles.",
    cls: "c3"
  },
  {
    title: "D&D 5th Edition",
    genre: "dnd",
    category: "DND BOOKS",
    tag: "Current",
    price: 1699,
    desc: "The latest edition of Dungeons & Dragons with streamlined rules and flexible storytelling.",
    cls: "c4"
  },
  {
    title: "Poor Wizard's Almanac & Book of Facts",
    genre: "dnd",
    category: "DND BOOKS",
    tag: "Regional Guide",
    price: 699,
    desc: "A classic guidebook to the timeline and events of the D&D Mystara setting.",
    cls: "c1"
  },
  {
    title: "The Hobbit",
    genre: "lotr",
    category: "LOTR BOOKS",
    tag: "Adventure Fantasy",
    price: 1399,
    desc: "Bilbo Baggins begins his journey with dwarves and a dragon in Middle-earth.",
    cls: "c2"
  },
  {
    title: "The Fellowship of the Ring",
    genre: "lotr",
    category: "LOTR BOOKS",
    tag: "Epic Fantasy",
    price: 1699,
    desc: "The first volume of The Lord of the Rings follows the formation of the Fellowship.",
    cls: "c3"
  },
  {
    title: "The Two Towers",
    genre: "lotr",
    category: "LOTR BOOKS",
    tag: "Epic Fantasy",
    price: 1699,
    desc: "The second volume of The Lord of the Rings continues the quest across Middle-earth.",
    cls: "c1"
  },
  {
    title: "The Return of the King",
    genre: "lotr",
    category: "LOTR BOOKS",
    tag: "Epic Fantasy",
    price: 1699,
    desc: "The final volume of The Lord of the Rings concludes the epic battle for Middle-earth.",
    cls: "c4"
  },
  {
    title: "The Silmarillion",
    genre: "lotr",
    category: "LOTR BOOKS",
    tag: "Legendary Fantasy",
    price: 1899,
    desc: "Tolkien's history of Middle-earth, covering the creation of the world and the First Age.",
    cls: "c3"
  },
  {
    title: "The Lord of the Rings",
    genre: "lotr",
    category: "LOTR BOOKS",
    tag: "Epic Fantasy",
    price: 1799,
    desc: "A legendary journey across Middle-earth filled with friendship, war, and destiny.",
    cls: "c4"
  },
  {
    title: "Harry Potter and the Sorcerer's Stone",
    genre: "hp",
    category: "HARRY POTTER BOOKS",
    tag: "Magic School",
    price: 349,
    desc: "Book 1: Harry discovers he is a wizard and starts his first year at Hogwarts.",
    cls: "c2"
  },
  {
    title: "Harry Potter and the Chamber of Secrets",
    genre: "hp",
    category: "HARRY POTTER BOOKS",
    tag: "Magic School",
    price: 349,
    desc: "Book 2: Harry returns to Hogwarts and uncovers a hidden chamber.",
    cls: "c1"
  },
  {
    title: "Harry Potter and the Prisoner of Azkaban",
    genre: "hp",
    category: "HARRY POTTER BOOKS",
    tag: "Magic School",
    price: 349,
    desc: "Book 3: Harry faces escaped prisoner Sirius Black and learns more about his past.",
    cls: "c4"
  },
  {
    title: "Harry Potter and the Goblet of Fire",
    genre: "hp",
    category: "HARRY POTTER BOOKS",
    tag: "Magic School",
    price: 349,
    desc: "Book 4: Harry competes in the Triwizard Tournament and confronts dark forces.",
    cls: "c3"
  },
  {
    title: "Harry Potter and the Order of the Phoenix",
    genre: "hp",
    category: "HARRY POTTER BOOKS",
    tag: "Magic School",
    price: 349,
    desc: "Book 5: Harry forms Dumbledore's Army and battles the Ministry of Magic.",
    cls: "c2"
  },
  {
    title: "Harry Potter and the Half-Blood Prince",
    genre: "hp",
    category: "HARRY POTTER BOOKS",
    tag: "Magic School",
    price: 349,
    desc: "Book 6: Harry learns more about Voldemort's history and the Horcruxes.",
    cls: "c1"
  },
  {
    title: "Harry Potter and the Deathly Hallows",
    genre: "hp",
    category: "HARRY POTTER BOOKS",
    tag: "Magic School",
    price: 349,
    desc: "Book 7: Harry, Ron, and Hermione finish their quest to defeat Voldemort.",
    cls: "c4"
  }
];

const grid = document.getElementById('productGrid');
const searchInput = document.getElementById('searchInput');
const genreFilter = document.getElementById('genreFilter');
const cartCount = document.getElementById('cartCount');
let cart = 0;

function peso(value) {
  return '₱' + value.toLocaleString('en-PH');
}

function renderProducts() {
  const query = searchInput.value.toLowerCase().trim();
  const genre = genreFilter.value;
  const filtered = products.filter(item => {
    const matchesQuery = item.title.toLowerCase().includes(query) || item.tag.toLowerCase().includes(query) || item.desc.toLowerCase().includes(query);
    const matchesGenre = genre === 'all' || item.genre === genre;
    return matchesQuery && matchesGenre;
  });

  const grouped = filtered.reduce((acc, item) => {
    const group = item.category || 'OTHER BOOKS';
    if (!acc[group]) acc[group] = [];
    acc[group].push(item);
    return acc;
  }, {});

  const groupOrder = ['DND BOOKS', 'LOTR BOOKS', 'HARRY POTTER BOOKS', 'OTHER BOOKS'];
  const groups = Object.keys(grouped).sort((a, b) => {
    const aIndex = groupOrder.indexOf(a);
    const bIndex = groupOrder.indexOf(b);
    if (aIndex === -1 || bIndex === -1) return a.localeCompare(b);
    return aIndex - bIndex;
  });

  grid.innerHTML = groups.map(group => `
    <section class="product-group">
      <h2 class="group-title">${group}</h2>
      <div class="group-items">
        ${grouped[group].map(item => `
          <article class="product-card">
            <div class="cover ${item.cls}">${item.title}<small>${item.tag}</small></div>
            <div class="product-info">
              <span class="tag">${item.tag}</span>
              <h3>${item.title}</h3>
              <p>${item.desc}</p>
              <div class="price-row">
                <span class="price">${peso(item.price)}</span>
                <button class="add-btn" onclick="addToCart('${item.title.replace(/'/g, "\\'")}')">Add</button>
              </div>
            </div>
          </article>
        `).join('')}
      </div>
    </section>
  `).join('') || `<p style="font-family: Arial, sans-serif; color: var(--muted);">No enchanted books found. Try another search.</p>`;
}

function addToCart(title) {
  cart++;
  cartCount.textContent = cart;
  showToast(title + ' added to cart!');
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 1900);
}

searchInput.addEventListener('input', renderProducts);
genreFilter.addEventListener('change', renderProducts);
renderProducts();
