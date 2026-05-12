const fs = require('fs');

const books_data = [
    // Harry Potter
    ["Harry Potter and the Sorcerer's Stone", "hp", "Magic School", 699, "The boy who lived begins his magical journey."],
    ["Harry Potter and the Chamber of Secrets", "hp", "Magic School", 750, "A monster is unleashed in Hogwarts."],
    ["Harry Potter and the Prisoner of Azkaban", "hp", "Magic School", 799, "Sirius Black escapes from Azkaban."],
    ["Harry Potter and the Goblet of Fire", "hp", "Magic School", 899, "The Triwizard Tournament brings dark trials."],
    ["Harry Potter and the Order of the Phoenix", "hp", "Magic School", 950, "Dumbledore's Army rises against the darkness."],
    ["Harry Potter and the Half-Blood Prince", "hp", "Magic School", 899, "Voldemort's past is revealed."],
    ["Harry Potter and the Deathly Hallows", "hp", "Magic School", 999, "The final battle for Hogwarts."],
    ["Fantastic Beasts and Where to Find Them", "hp", "Lore", 599, "Newt Scamander's guide to magical creatures."],
    ["Quidditch Through the Ages", "hp", "Lore", 499, "The definitive guide to the magical sport."],
    ["The Tales of Beedle the Bard", "hp", "Lore", 550, "Classic wizarding fairy tales."],
    ["Harry Potter and the Cursed Child", "hp", "Play", 799, "The eighth story, nineteen years later."],
    // D&D
    ["Player's Handbook", "dnd", "Core Rulebook", 2499, "Essential adventurer rules for forging your legend."],
    ["Monster Manual", "dnd", "Bestiary", 2299, "A menagerie of deadly monsters and horrid creatures."],
    ["Dungeon Master's Guide", "dnd", "Campaign", 2399, "The master toolkit for weaving epic campaigns."],
    ["Tasha's Cauldron of Everything", "dnd", "Expansion", 2199, "New subclasses, spells, and magical options."],
    ["Xanathar's Guide to Everything", "dnd", "Expansion", 2199, "A wealth of new rules and character options."],
    ["Volo's Guide to Monsters", "dnd", "Lore", 2099, "Deep dive into iconic D&D monsters."],
    ["Mordenkainen's Tome of Foes", "dnd", "Bestiary", 2099, "Conflicts of the multiverse and new foes."],
    ["Sword Coast Adventurer's Guide", "dnd", "Setting", 1999, "Details on the Forgotten Realms setting."],
    ["Eberron: Rising from the Last War", "dnd", "Setting", 2299, "A world of magic and steampunk technology."],
    ["Guildmasters' Guide to Ravnica", "dnd", "Setting", 2299, "Explore the worldwide cityscape of Ravnica."],
    ["Mythic Odysseys of Theros", "dnd", "Setting", 2299, "A world inspired by Greek mythology."],
    ["Curse of Strahd", "dnd", "Adventure", 2499, "A gothic horror adventure in Barovia."],
    ["Baldur's Gate: Descent into Avernus", "dnd", "Adventure", 2399, "A journey into the Nine Hells."],
    ["Waterdeep: Dragon Heist", "dnd", "Adventure", 2199, "A treasure hunt in the City of Splendors."],
    ["Out of the Abyss", "dnd", "Adventure", 2299, "Escape the demons of the Underdark."],
    ["Tomb of Annihilation", "dnd", "Adventure", 2399, "A deadly jungle curse awaits."],
    ["Storm King's Thunder", "dnd", "Adventure", 2399, "Giants run amok across the Realms."],
    // LOTR
    ["The Fellowship of the Ring", "lotr", "Epic", 1799, "The journey to Mount Doom begins."],
    ["The Two Towers", "lotr", "Epic", 1799, "The fellowship is broken, war brews."],
    ["The Return of the King", "lotr", "Epic", 1899, "The final stand of Men against Sauron."],
    ["The Hobbit", "lotr", "Adventure", 1499, "There and back again: a hobbit's tale."],
    ["The Silmarillion", "lotr", "Mythology", 1999, "The ancient myths of Middle-earth's First Age."],
    ["The Children of Húrin", "lotr", "Mythology", 1599, "A tragic tale of the First Age."],
    ["Beren and Lúthien", "lotr", "Mythology", 1599, "A romance spanning mortality and immortality."],
    ["The Fall of Gondolin", "lotr", "Mythology", 1699, "The destruction of the hidden elven city."],
    ["Unfinished Tales", "lotr", "Lore", 1799, "Stories from Middle-earth's history."],
    ["The History of Middle-earth", "lotr", "Lore", 2999, "Comprehensive notes on Tolkien's legendarium."],
    // Percy Jackson
    ["The Lightning Thief", "pj", "Mythology", 799, "Percy discovers he is a demigod."],
    ["The Sea of Monsters", "pj", "Mythology", 799, "A quest to the Bermuda Triangle."],
    ["The Titan's Curse", "pj", "Mythology", 850, "Artemis is kidnapped by a mysterious foe."],
    ["The Battle of the Labyrinth", "pj", "Mythology", 899, "Navigating Daedalus' deadly maze."],
    ["The Last Olympian", "pj", "Mythology", 950, "The final battle against Kronos in Manhattan."],
    ["The Lost Hero", "pj", "Roman Myth", 899, "A new generation of heroes emerges."],
    ["The Son of Neptune", "pj", "Roman Myth", 899, "Percy arrives at Camp Jupiter."],
    ["The Mark of Athena", "pj", "Roman Myth", 950, "Greeks and Romans must unite."],
    ["The House of Hades", "pj", "Roman Myth", 999, "A journey through Tartarus itself."],
    ["The Blood of Olympus", "pj", "Roman Myth", 999, "The final battle against Gaea."],
    ["The Hidden Oracle", "pj", "Apollo", 850, "Apollo is cast down to earth as a mortal."],
    ["The Dark Prophecy", "pj", "Apollo", 850, "Apollo's quest for redemption continues."],
    ["The Burning Maze", "pj", "Apollo", 899, "A deadly labyrinth of fire awaits."],
    ["The Tyrant's Tomb", "pj", "Apollo", 899, "A defense of Camp Jupiter."],
    ["The Tower of Nero", "pj", "Apollo", 950, "Apollo faces his final trial against the Emperor."],
    // Dark Fantasy / ASOIAF / Witcher
    ["A Game of Thrones", "dark", "Political", 1699, "Winter is coming to the realm of Westeros."],
    ["A Clash of Kings", "dark", "Political", 1799, "The War of the Five Kings erupts."],
    ["A Storm of Swords", "dark", "Political", 1999, "Betrayal and blood across the Seven Kingdoms."],
    ["A Feast for Crows", "dark", "Political", 1699, "The aftermath of the devastating war."],
    ["A Dance with Dragons", "dark", "Political", 1899, "Daenerys rules in Meereen."],
    ["Fire & Blood", "dark", "Lore", 1999, "The history of House Targaryen."],
    ["A Knight of the Seven Kingdoms", "dark", "Prequel", 1499, "The tales of Dunk and Egg."],
    ["The Last Wish", "dark", "Witcher", 899, "Geralt of Rivia's origins as a monster hunter."],
    ["Sword of Destiny", "dark", "Witcher", 899, "More tales of the White Wolf."],
    ["Blood of Elves", "dark", "Witcher", 950, "Ciri begins her training at Kaer Morhen."],
    ["The Time of Contempt", "dark", "Witcher", 950, "A coup reshapes the Northern Kingdoms."],
    ["Baptism of Fire", "dark", "Witcher", 999, "Geralt forms a new fellowship."],
    ["The Tower of the Swallow", "dark", "Witcher", 999, "Ciri runs from those who hunt her."],
    ["The Lady of the Lake", "dark", "Witcher", 1050, "The epic conclusion of Geralt and Ciri's saga."],
    ["Season of Storms", "dark", "Witcher", 950, "A standalone adventure of the Witcher."],
    ["The Blade Itself", "dark", "First Law", 1299, "A gritty tale of barbarians and torturers."],
    ["Before They Are Hanged", "dark", "First Law", 1350, "The journey into the unknown."],
    ["Last Argument of Kings", "dark", "First Law", 1450, "The bloody conclusion to the trilogy."],
    ["The Black Company", "dark", "Mercenary", 1199, "Annals of an elite mercenary company."],
    ["Prince of Thorns", "dark", "Broken Empire", 1099, "A ruthless prince seeks revenge."],
    // High Epic (Sanderson, Wheel of Time, Kingkiller)
    ["The Final Empire", "epic", "Mistborn", 1199, "A masterful heist involving allomantic magic."],
    ["The Well of Ascension", "epic", "Mistborn", 1250, "Ruling a ruined empire is harder than conquering it."],
    ["The Hero of Ages", "epic", "Mistborn", 1350, "The world ends in ash and mist."],
    ["The Alloy of Law", "epic", "Mistborn Era 2", 1099, "Guns and magic in a new era."],
    ["Shadows of Self", "epic", "Mistborn Era 2", 1150, "A hunt for a rogue allomancer."],
    ["The Bands of Mourning", "epic", "Mistborn Era 2", 1199, "Searching for the Lord Ruler's power."],
    ["The Lost Metal", "epic", "Mistborn Era 2", 1299, "The conclusion of the Wax and Wayne saga."],
    ["The Way of Kings", "epic", "Stormlight", 1999, "Life before death. Strength before weakness."],
    ["Words of Radiance", "epic", "Stormlight", 2099, "The Knights Radiant must stand again."],
    ["Oathbringer", "epic", "Stormlight", 2199, "Uncovering the dark secrets of the past."],
    ["Rhythm of War", "epic", "Stormlight", 2299, "A brutal war of attrition begins."],
    ["Elantris", "epic", "Cosmere", 1299, "A cursed city of fallen gods."],
    ["Warbreaker", "epic", "Cosmere", 1299, "A magic system fueled by breath and color."],
    ["The Eye of the World", "epic", "Wheel of Time", 1499, "The Dragon is reborn."],
    ["The Great Hunt", "epic", "Wheel of Time", 1550, "The search for the Horn of Valere."],
    ["The Dragon Reborn", "epic", "Wheel of Time", 1599, "Rand accepts his destiny."],
    ["The Shadow Rising", "epic", "Wheel of Time", 1699, "Journey to the Aiel Waste."],
    ["The Fires of Heaven", "epic", "Wheel of Time", 1699, "The forsaken prepare their strike."],
    ["Lord of Chaos", "epic", "Wheel of Time", 1750, "The Black Tower is founded."],
    ["A Crown of Swords", "epic", "Wheel of Time", 1750, "The search for the Bowl of the Winds."],
    ["The Path of Daggers", "epic", "Wheel of Time", 1699, "The Seanchan invasion intensifies."],
    ["Winter's Heart", "epic", "Wheel of Time", 1699, "Cleansing the male half of the True Source."],
    ["Crossroads of Twilight", "epic", "Wheel of Time", 1650, "The world reacts to the cleansing."],
    ["Knife of Dreams", "epic", "Wheel of Time", 1799, "Tarmon Gai'don approaches."],
    ["The Gathering Storm", "epic", "Wheel of Time", 1899, "The final preparations for the Last Battle."],
    ["Towers of Midnight", "epic", "Wheel of Time", 1899, "The forces of Light gather."],
    ["A Memory of Light", "epic", "Wheel of Time", 2199, "The Last Battle is fought."],
    ["The Name of the Wind", "epic", "Kingkiller", 1399, "The legend of Kvothe, the arcane musician."],
    ["The Wise Man's Fear", "epic", "Kingkiller", 1499, "Kvothe's journey into the Fae realm."],
    ["The Slow Regard of Silent Things", "epic", "Kingkiller", 999, "A week in the life of Auri."],
    // Portal Fantasy / Other
    ["The Lion, the Witch and the Wardrobe", "portal", "Narnia", 899, "Step through the wardrobe into a frozen land."],
    ["Prince Caspian", "portal", "Narnia", 850, "The return to a much-changed Narnia."],
    ["The Voyage of the Dawn Treader", "portal", "Narnia", 899, "A journey to the edge of the world."],
    ["The Silver Chair", "portal", "Narnia", 899, "The quest to find the lost prince."],
    ["The Horse and His Boy", "portal", "Narnia", 850, "An escape across the desert."],
    ["The Magician's Nephew", "portal", "Narnia", 899, "The creation of Narnia."],
    ["The Last Battle", "portal", "Narnia", 950, "The end of the Narnian world."],
    ["Alice's Adventures in Wonderland", "portal", "Classic", 699, "Down the rabbit hole."],
    ["Through the Looking-Glass", "portal", "Classic", 699, "A game of magical chess."],
    ["Coraline", "portal", "Dark", 799, "The Other Mother waits."],
    ["Neverwhere", "portal", "Urban", 950, "London Below is a dangerous place."],
    ["A Wizard of Earthsea", "portal", "Earthsea", 899, "Ged faces the shadow he unleashed."],
    ["The Tombs of Atuan", "portal", "Earthsea", 850, "A priestess in the dark labyrinth."],
    ["The Farthest Shore", "portal", "Earthsea", 899, "Magic is draining from the world."],
    ["Tehanu", "portal", "Earthsea", 850, "The later life of Ged and Tenar."],
    ["The Other Wind", "portal", "Earthsea", 899, "Mending the rift between life and death."]
];

const book_images = [
    "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1629196914539-7871adfaeb4e?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1511108690759-009324a90311?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1524578974057-3f3baecae251?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1555448248-2571daf6344b?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1614113489855-66422ad300a4?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1626618012641-bfbca5a31239?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1618365908648-e71bd5716cba?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1533613220915-609f661a6fe1?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1478098711614-b7512d409616?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1455390582262-044cdead27d8?auto=format&fit=crop&w=600&q=80"
];

let fantasy_books_json = [];
for (let i = 0; i < books_data.length; i++) {
    const b = books_data[i];
    const img = book_images[Math.floor(Math.random() * book_images.length)];
    fantasy_books_json.push({
        title: b[0],
        genre: b[1],
        tag: b[2],
        price: b[3],
        desc: b[4],
        img: img,
        id: i + 1
    });
}

const js_array_str = "const fantasyBooks = " + JSON.stringify(fantasy_books_json, null, 4) + ";";

const file_path = "c:\\Users\\PC\\Documents\\For-the-finals-2nd-year-main\\Finals\\index.html";

let content = fs.readFileSync(file_path, 'utf8');

// Replace the array
content = content.replace(/const fantasyBooks = \[\s*\{[\s\S]*?\}\s*\];/, js_array_str);

// Advanced feature 1: Update the Genre Filter
const filter_area_regex = /<select id="genreFilter">[\s\S]*?<\/select>/;
const new_filters = `<select id="genreFilter">
          <option value="all">All Realms</option>
          <option value="dnd">Dungeons & Dragons</option>
          <option value="lotr">Tolkien's Legendarium</option>
          <option value="hp">Harry Potter & Wizardry</option>
          <option value="pj">Percy Jackson & Mythology</option>
          <option value="dark">Dark Fantasy & Grit</option>
          <option value="epic">High Epic & Magic Systems</option>
          <option value="portal">Portal Fantasy & Realms</option>
        </select>
        <select id="sortBooks">
          <option value="default">Sort By: Mystical Power</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="name_asc">Title: A-Z</option>
          <option value="name_desc">Title: Z-A</option>
        </select>`;
content = content.replace(filter_area_regex, new_filters);

// Advanced feature 2: Add pagination button
const grid_end_regex = /<div id="booksContainer" class="books-grid"><\/div>\s*<\/div>/;
const pagination_html = `<div id="booksContainer" class="books-grid"></div>
      <div style="text-align: center; margin-top: 4rem; display: none;" id="loadMoreContainer">
        <button class="btn-primary" id="loadMoreBtn" style="padding: 16px 40px; font-size: 1.1rem;">
          <i class="fa-solid fa-book-open-reader"></i> Reveal More Tomes
        </button>
      </div>
    </div>`;
content = content.replace(grid_end_regex, pagination_html);

const new_script_top = `
    let cart = [];
    let orders = [];
    let currentPage = 1;
    const booksPerPage = 16;
    let currentFilteredBooks = [];

    // DOM Elements
    const cartCountSpan = document.getElementById('cartCountBadge');
    const booksContainer = document.getElementById('booksContainer');
    const searchInput = document.getElementById('searchBooks');
    const genreFilter = document.getElementById('genreFilter');
    const sortFilter = document.getElementById('sortBooks');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const loadMoreContainer = document.getElementById('loadMoreContainer');
    const toastElem = document.getElementById('globalToast');
    const toastText = document.getElementById('toastMsgText');

    function showToast(text) {
      toastText.textContent = text;
      toastElem.classList.add('show');
      setTimeout(() => toastElem.classList.remove('show'), 3000);
    }

    function updateCartUI() {
      cartCountSpan.innerText = cart.length;
      cartCountSpan.classList.add('badge-pop');
      setTimeout(() => cartCountSpan.classList.remove('badge-pop'), 300);
    }

    // Advanced 3D Tilt Effect
    function applyTiltEffect() {
      const cards = document.querySelectorAll('.book-card');
      cards.forEach(card => {
        card.addEventListener('mousemove', e => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = ((y - centerY) / centerY) * -10;
          const rotateY = ((x - centerX) / centerX) * 10;
          card.style.transform = \`perspective(1000px) rotateX(\${rotateX}deg) rotateY(\${rotateY}deg) scale3d(1.02, 1.02, 1.02)\`;
        });
        card.addEventListener('mouseleave', () => {
          card.style.transform = \`perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)\`;
        });
      });
    }

    // Render Books
    function renderBooks(resetPage = true) {
      if (resetPage) currentPage = 1;

      const query = searchInput.value.toLowerCase();
      const genre = genreFilter.value;
      const sort = sortFilter ? sortFilter.value : 'default';

      currentFilteredBooks = fantasyBooks.filter(b => 
        (b.title.toLowerCase().includes(query) || b.tag.toLowerCase().includes(query)) && 
        (genre === 'all' || b.genre === genre)
      );

      // Sorting
      if (sort === 'price_asc') currentFilteredBooks.sort((a,b) => a.price - b.price);
      else if (sort === 'price_desc') currentFilteredBooks.sort((a,b) => b.price - a.price);
      else if (sort === 'name_asc') currentFilteredBooks.sort((a,b) => a.title.localeCompare(b.title));
      else if (sort === 'name_desc') currentFilteredBooks.sort((a,b) => b.title.localeCompare(a.title));

      // Pagination
      const paginatedBooks = currentFilteredBooks.slice(0, currentPage * booksPerPage);
      
      let html = '';
      paginatedBooks.forEach(book => {
        html += \`
        <div class="book-card" style="transition: transform 0.1s ease-out, box-shadow 0.3s ease;">
          <div class="book-cover">
            <img src="\${book.img}" class="book-cover-img" alt="\${book.title}" loading="lazy">
            <span class="book-tag">\${book.tag}</span>
          </div>
          <div class="book-info">
            <h3>\${book.title}</h3>
            <p>\${book.desc}</p>
            <div class="price-action">
              <span class="price">₱\${book.price.toLocaleString()}</span>
              <button class="add-btn" data-title="\${book.title.replace(/'/g, "\\\\'")}" data-price="\${book.price}">
                <i class="fa-solid fa-plus"></i> Add
              </button>
            </div>
          </div>
        </div>
      \`;
      });
      
      if (currentFilteredBooks.length === 0) {
        html = \`
          <div style="text-align:center; grid-column:1/-1; padding: 4rem; color: var(--text-muted);">
            <i class="fa-solid fa-ghost" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
            <h3>No grimoires found in the archives.</h3>
          </div>\`;
        if(loadMoreContainer) loadMoreContainer.style.display = 'none';
      } else {
        if (paginatedBooks.length < currentFilteredBooks.length) {
          if(loadMoreContainer) loadMoreContainer.style.display = 'block';
        } else {
          if(loadMoreContainer) loadMoreContainer.style.display = 'none';
        }
      }
      
      booksContainer.innerHTML = html;
      
      // Re-attach listeners
      applyTiltEffect();
      document.querySelectorAll('.add-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const title = btn.getAttribute('data-title');
          const price = parseInt(btn.getAttribute('data-price'));
          cart.push({ title, price });
          updateCartUI();
          showToast(\`Summoned \${title} to your cart\`);
        });
      });
    }

    if(loadMoreBtn) {
      loadMoreBtn.addEventListener('click', () => {
        currentPage++;
        renderBooks(false);
      });
    }
`;

const splitPart1 = content.split(/let cart = \[\];[\s\S]*?function showToast\(text\) \{/);
if (splitPart1.length > 1) {
    content = splitPart1[0] + new_script_top.split("function showToast(text) {")[0] + "function showToast(text) {" + splitPart1.slice(1).join("function showToast(text) {");
}

const splitPart2 = content.split(/\/\/ Render Books[\s\S]*?function updateTrackerUI/);
if (splitPart2.length > 1) {
    content = splitPart2[0] + new_script_top.split("// Render Books")[1] + "\n\n    function updateTrackerUI" + splitPart2.slice(1).join("function updateTrackerUI");
}

content = content.replace("genreFilter.addEventListener('change', renderBooks);", "genreFilter.addEventListener('change', renderBooks);\n    if(sortFilter) sortFilter.addEventListener('change', renderBooks);");

content = content.replace(/Over \d+ enchanted copies await\./, `Over ${fantasy_books_json.length} unique enchanted copies await.`);

fs.writeFileSync(file_path, content, 'utf8');

console.log("Update completed successfully.");
