let myLibrary = [];
const cardContainer = document.querySelector(".container");
const addModal = document.getElementById("addModal");
const addMangaButton = document.querySelector(".add-btn");
const closeModal = document.querySelector(".modal-close-btn");
const addForm = document.getElementById("add-form");

addMangaButton.addEventListener("click", openAddModal);
closeModal.addEventListener("click", closeAddModal);
addForm.addEventListener("submit", addManga);
window.addEventListener("click", clickOutsideModal);

function clickOutsideModal(e) {
    if (e.target === addModal) {
        addModal.style.display = "none";
    }
}

function openAddModal() {
    addModal.style.display = "block";
    addForm.reset();
}

function closeAddModal() {
    addModal.style.display = "none";
}

function Manga(title, author, currentChapter, totalChapter, dataIndex) {
    this.title = title;
    this.author = author;
    this.currentChapter = currentChapter;
    this.totalChapter = totalChapter;
    this.dataIndex = dataIndex;
}

function addMangaToLibrary(manga) {
    myLibrary.push(manga);
} 

function addManga(e) {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const chaptersRead = document.getElementById("chapters-read").value;
    const totalChapters = document.getElementById("total-chapters").value;
    const dataIndex = myLibrary.length;
    const newManga = new Manga(title, author, chaptersRead, totalChapters, dataIndex);
    addMangaCard(newManga);
    addMangaToLibrary(newManga);
    closeAddModal();
    saveLocalStorage();
}

function addMangaCard(manga) {
    const card = document.createElement("div");
    const title = document.createElement("div");
    const author = document.createElement("div");
    const cardButtonsContainer = document.createElement("div");
    const removeButton = document.createElement("button");
    const chapters = document.createElement("div");

    card.classList.add("card");
    removeButton.classList.add("card-btn");
    removeButton.classList.add("remove-btn");
    removeButton.addEventListener("click", removeManga);
    title.classList.add("title");
    author.classList.add("author");
    cardButtonsContainer.classList.add("card-buttons-container");
    chapters.classList.add("chapters");

    card.dataset.index = manga.dataIndex;
    title.textContent = manga.title;
    author.textContent = manga.author;
    removeButton.textContent = "Remove";
    chapters.textContent = `Chapters read: ${manga.currentChapter}/${manga.totalChapter}`;

    cardButtonsContainer.appendChild(removeButton);
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(cardButtonsContainer);
    card.appendChild(chapters);
    cardContainer.appendChild(card);
}

function removeMangaCard(card) {
    card.remove();
}

function removeMangaFromLibrary(dataIndex) {
    myLibrary = myLibrary.filter(manga => manga.dataIndex != dataIndex);
}

function removeManga(e) {
    const mangaCard = e.target.parentNode.parentNode;
    const dataIndex = mangaCard.dataset.index;
    removeMangaCard(mangaCard);
    removeMangaFromLibrary(dataIndex);
    saveLocalStorage();
}

function saveLocalStorage() {
    localStorage.setItem("library", JSON.stringify(myLibrary));
}

function restoreLocalStorage() {
    if (localStorage.length === 0) {
        return;
    }
    else {
        myLibrary = JSON.parse(localStorage.getItem("library"));
        myLibrary.forEach(manga => addMangaCard(manga));
    }
}

window.onload = () => {
    restoreLocalStorage();
}
