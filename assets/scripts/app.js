const startAddMovieButton = document.querySelector('header button');
const backdrop = document.querySelector('#backdrop');
const addMovieModal = document.querySelector('#add-modal');
const cancelAddMovieButton = document.querySelector('.btn--passive');
const addMovieModalButton = cancelAddMovieButton.nextElementSibling;
const userInputs = document.querySelectorAll('input');
const entryTextSection = document.querySelector('#entry-text');
const movieList = document.querySelector('#movir-list');
const deleteMovieModal = document.getElementById('delete-modal');

const movies = [];

const UpdateUI = () => {
    if (movies.length > 0) {
        entryTextSection.style.display = 'none';
    }
    if (movies.length === 0) {
        entryTextSection.style.display = 'block';
    }
}

const deleteMovie = (movieId) => {
    let movieIndex = 0;
    for (const movie of movies) {
        if (movie.id === movieId) {
            break;
        }
        movieIndex++;
    }
    movies.splice(movieIndex, 1);
    const listRoot = document.getElementById('movie-list');
    listRoot.children[movieIndex].remove();
    closeMovieDeletion();
    UpdateUI();
};

const deleteMovieHandler = (movieId) => {
    deleteMovieModal.classList.add('visible');
    toggleBackdrop();

    const cancelDeletionButton = deleteMovieModal.querySelector('.btn--passive');
    let confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');

    confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true));

    confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');

    // confirmDeletionButton.removeEventListener('click', deleteMovie.bind(null, movieId));
    cancelDeletionButton.removeEventListener('click', closeMovieDeletion);


    cancelDeletionButton.addEventListener('click', closeMovieDeletion);
    confirmDeletionButton.addEventListener('click', deleteMovie.bind(null, movieId));
}

const closeMovieDeletion = () => {
    toggleBackdrop();
    deleteMovieModal.classList.remove('visible');
};

const renderNewMovieElements = (id, title, url, rating) => {
    const newMovieElement = document.createElement('li');
    newMovieElement.className = 'movie-element';
    newMovieElement.innerHTML = `
        <div class="movie-element__image">
            <img src="${url}" alt="${title}">
        </div>
        <div class="movie-element__info">
            <h2>${title}</h2>
            <p>${rating}/5 stars</p>
        </div>  
        `;

    newMovieElement.addEventListener('click', deleteMovieHandler.bind(null, id));
    const listRoot = document.getElementById('movie-list');
    listRoot.append(newMovieElement);
}

const clearMovieInput = () => {
    for (const userInput of userInputs) {
        userInput.value = '';
    }
}

const toggleBackdrop = () => {
    backdrop.classList.toggle('visible');
};

const closeMovieModal = () => {
    addMovieModal.classList.remove('visible')
};

const showMovieModal = () => {
    addMovieModal.classList.add('visible');
    toggleBackdrop();
};

const cancelMovieModalHandler = () => {
    closeMovieModal();
    clearMovieInput();
}

const addMovieHandler = () => {
    const titleValue = userInputs[0].value;
    const imageUrlValue = userInputs[1].value;
    const movieRating = userInputs[2].value;

    if (titleValue.trim() == "" || imageUrlValue.trim() === '' || movieRating === '' || (+movieRating < 0 || +movieRating > 5)) {
        alert('Please enter valid inputs');
    }
    else {
        const newMovies = {
            id: Math.random().toString(),
            title: titleValue,
            url: imageUrlValue,
            rating: movieRating
        };

        movies.push(newMovies);
        console.log(movies);
        closeMovieModal();
        toggleBackdrop();
        clearMovieInput();
        renderNewMovieElements(newMovies.id, newMovies.title, newMovies.url, newMovies.rating);
        UpdateUI();
    }
};

const backdropClickHandler = () => {
    closeMovieModal();
    closeMovieDeletion();
};

startAddMovieButton.addEventListener('click', showMovieModal);
backdrop.addEventListener('click', backdropClickHandler);
cancelAddMovieButton.addEventListener('click', cancelMovieModalHandler);
addMovieModalButton.addEventListener('click', addMovieHandler);