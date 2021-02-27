let container = document.querySelector('.container'),
    seats = document.querySelectorAll('.row .seat:not(occupied)'),
    count = document.getElementById('count'),
    total = document.getElementById('total'),
    movieSelect = document.getElementById('movie'),
    bookBtn = document.getElementById('book'),
    error = document.getElementById('error'),
    resultScreen = document.getElementById("result"),
    bookSeats = document.getElementById("book-seats"),
    bookMovie = document.getElementById("book-movie"),
    resultScreenCloser = document.getElementById('closer'),
    ticketPrice = parseInt(movieSelect.value);


// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Show Error
function showError(message) {
    error.innerText = message;
}

// Update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
    bookSeats.innerText = selectedSeatsCount;

}

// Refresh selected count
function refreshSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;

    const selectedMoviePrice = localStorage.getItem('selectedMoviePrice');
    total.innerText = selectedMoviePrice * selectedSeatsCount;
    bookSeats.innerText = selectedSeatsCount;

}

// Get data from local storage and populate UI
(function populateUI() {

    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }

    refreshSelectedCount();

})();

// Movie select Event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, ticketPrice);
    updateSelectedCount();

})

// Seat click Event
container.addEventListener('click', e => {
    const selectedMoviePrice2 = localStorage.getItem('selectedMoviePrice');

    if (
        e.target.classList.contains('seat') && !e.target.classList.contains('occupied') && selectedMoviePrice2 === null) {
        e.target.classList.toggle('selected')
        updateSelectedCount();
    }
    else if (
        e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected')

        updateSelectedCount();

        refreshSelectedCount();

    }
});

// Book Event Listner
bookBtn.addEventListener('click', () => {
    const selectedIndex = movieSelect.selectedIndex;
    const movieName = movieSelect.children[selectedIndex].innerText.split("(")[0];
    if (movieSelect.children[selectedIndex].value == 0) {
        showError("You should select your movie at first")
    } else if (count.innerText === "0") {
        showError("You should select seats at first");
    } else {
        bookMovie.innerText = movieName;
        resultScreen.style.visibility = "visible";
        resultScreen.style.opacity = "1";
        document.body.style.overflow = "hidden";
        error.innerText = "";
    }

});

// Result Screen closer

resultScreenCloser.addEventListener('click', () => {
    resultScreen.style.visibility = "hidden";
    resultScreen.style.opacity = "0";
    document.body.style.overflow = "";

})
