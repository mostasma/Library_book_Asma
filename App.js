let books = [
    {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        pages: 281,
        image: "https://covers.openlibrary.org/b/id/8226191-L.jpg",
        details: "A novel about the serious issues of rape and racial inequality."
    },
    {
        title: "1984",
        author: "George Orwell",
        pages: 328,
        image: "https://covers.openlibrary.org/b/id/7222246-L.jpg",
        details: "A dystopian social science fiction novel and cautionary tale about the dangers of totalitarianism."
    },
    {
        title: "Moby Dick",
        author: "Herman Melville",
        pages: 635,
        image: "https://covers.openlibrary.org/b/id/8103781-L.jpg",
        details: "The narrative of Captain Ahab's obsessive quest to seek revenge on Moby Dick, a giant white whale."
    }
];

function renderBooks() {
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = '';
    books.forEach((book, index) => {
        const li = document.createElement('li');
        li.className = 'book-item';
        li.innerHTML = `${book.title} <button onclick="showBookDetails(${index})">View</button> <button onclick="removeBook(${index})">Remove</button>`;
        bookList.appendChild(li);
    });
}

function showBookDetails(index) {
    const bookDetails = document.getElementById('book-details');
    const book = books[index];
    bookDetails.innerHTML = `
        <h3>${book.title}</h3>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Pages:</strong> ${book.pages}</p>
        <img src="${book.image}" alt="${book.title} cover" style="width: 150px;">
        <p>${book.details}</p>
    `;
}

document.getElementById('add-book-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const image = document.getElementById('image').value;
    const details = document.getElementById('details').value;
    
    if (title && author && pages) {
        const newBook = {
            title,
            author,
            pages,
            image,
            details
        };
        books.push(newBook);
        renderBooks();
        saveBooks();
        event.target.reset();
    } else {
        alert('Please fill in all required fields.');
    }
});

function removeBook(index) {
    books.splice(index, 1);
    renderBooks();
    saveBooks();
}

function saveBooks() {
    localStorage.setItem('books', JSON.stringify(books));
}

function loadBooks() {
    const savedBooks = localStorage.getItem('books');
    if (savedBooks) {
        books = JSON.parse(savedBooks);
    } else {
        alert('No books found.');
    }
    renderBooks();
}

loadBooks();
