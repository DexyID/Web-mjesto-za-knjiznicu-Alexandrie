const kartice = document.querySelectorAll('.knjiga-col');
const searchInput = document.querySelector('.search-input');
const chipsetKategorija = document.querySelectorAll('.filter-row:nth-child(1) .chip');
const chipsetDostupnost = document.querySelectorAll('.filter-row:nth-child(2) .chip');

let aktivnaKategorija = 'sve';
let aktivnaDostupnost = 'sve';

function filtriraj() {
    const upit = searchInput.value.toLowerCase().trim();

    kartice.forEach(col => {
        const kategorija = col.dataset.kategorija;
        const dostupnost = col.dataset.dostupnost;
        const naslov = col.querySelector('.knjiga-naslov').textContent.toLowerCase();
        const autor = col.querySelector('.knjiga-autor').textContent.toLowerCase();

        const odgovaraKategorija = aktivnaKategorija === 'sve' || kategorija === aktivnaKategorija;
        const odgovaraDostupnost = aktivnaDostupnost === 'sve' || dostupnost === aktivnaDostupnost;
        const odgovaraPretraga = !upit || naslov.includes(upit) || autor.includes(upit);

        col.style.display = odgovaraKategorija && odgovaraDostupnost && odgovaraPretraga ? '' : 'none';
    });
}

chipsetKategorija.forEach(chip => {
    chip.addEventListener('click', () => {
        chipsetKategorija.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        aktivnaKategorija = chip.textContent.trim().toLowerCase();
        filtriraj();
    });
});

chipsetDostupnost.forEach(chip => {
    chip.addEventListener('click', () => {
        chipsetDostupnost.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const tekst = chip.textContent.trim().toLowerCase();
        aktivnaDostupnost = tekst === 'posuđeno' ? 'posudeno' : tekst;
        filtriraj();
    });
});

searchInput.addEventListener('input', filtriraj);
