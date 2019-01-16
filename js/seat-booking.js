let selectedMovie, selectedHour, ticketsTaken, ticketsAvailable, selectedTickets, glasses, ticketType, bookingName, additionalInfo, movieList = [], countDownTime;

let movieTitleElement, timerElement, selectedHourElement, selectedMovieElement, ticketsAvailableElement, ticketsTakenElement, ticketsRangeElement, glassesOptionElement, glassesSelectElement, ticketTypeElement, bookingNameElement, additionalInfoElement, hourSelected;

movieTitleElement = document.querySelector('#movie-title');
timerElement = document.querySelector('#timer');
selectedHourElement = document.querySelector('#hourSelect');
selectedMovieElement = document.querySelector('#movieSelect');
ticketsTakenElement = document.querySelector('#ticketsTaken');
ticketsAvailableElement = document.querySelector('#ticketsAvailable');
ticketsRangeElement = document.querySelector('#ticketsRange');
ticketsNumber = document.querySelector('#tickets');
glassesSelectElement = document.querySelector('#glassesSelect');
glassesOptionElement = document.querySelector('input[name="glasses"]');
hourSelected = document.querySelector('#hourSelected');
timerElement = document.querySelector('#timer');

let minutes = 10, seconds = 0;
countDownTime = (+new Date) + 1000 * (60 * minutes + seconds) + 500;

// Request the data for the movies
$.ajax({
    url: "js/dummyJSON/movies.json",
    dataType: "json",
    success: function (response) {
        response.forEach(element => {
            movieList.push(element);
        });
        selectedMovie = getCurrentMovie('Home Alone');
        setInitialData();
    }
});

// Set the initial data
function setInitialData() {
    // Movie title 
    movieTitleElement.appendChild(document.createTextNode(selectedMovie.title));
    // Hours option
    selectedMovie.schedule.forEach((e) => {
        let option = document.createElement('option');
        option.value = e;
        option.appendChild(document.createTextNode(e));
        selectedHourElement.appendChild(option);
    });
    // Hours Selected
    hourSelected.appendChild(document.createTextNode(selectedHourElement.value));
    // Movies option
    movieList.forEach((e) => {
        let option = document.createElement('option');
        option.value = e.title;
        option.appendChild(document.createTextNode(e.title));
        selectedMovieElement.appendChild(option);
    });
    // Movie tickets
    ticketsTakenElement.appendChild(document.createTextNode(selectedMovie.ticketsTaken));
    ticketsAvailableElement.appendChild(document.createTextNode(selectedMovie.ticketsAvailable));
    // Range
    ticketsRangeElement.min = 1;
    ticketsRangeElement.max = selectedMovie.ticketsAvailable;
    ticketsNumber.appendChild(document.createTextNode(ticketsRangeElement.value));
    // 3D Glasses 
    glassesSelectElement.setAttribute('disabled', '');
    glassesOptionElement.checked = true;
    for (let i = 0; i < ticketsRangeElement.value; i++) {
        let option = document.createElement('option');
        option.value = i + 1;
        option.appendChild(document.createTextNode(i + 1));
        glassesSelectElement.appendChild(option);
    }
}

// Remove Old Data
function removeOldMovieData() {
    // Movie title 
    movieTitleElement.removeChild(movieTitleElement.lastChild);
    // Hours option
    while (selectedHourElement.lastChild) {
        selectedHourElement.removeChild(selectedHourElement.lastChild);
    }
    // Hours Selected
    hourSelected.removeChild(hourSelected.lastChild);
    // Movies option
    while (selectedMovieElement.lastChild) {
        selectedMovieElement.removeChild(selectedMovieElement.lastChild);
    }
    // Range
    ticketsNumber.removeChild(ticketsNumber.lastChild);
    // Movie tickets
    ticketsTakenElement.removeChild(ticketsTakenElement.lastChild);
    ticketsAvailableElement.removeChild(ticketsAvailableElement.lastChild);
}

// Update onchange
function updateMovieData(movieName) {
    selectedMovie = getCurrentMovie(movieName);
    removeOldMovieData();
    setInitialData();
    showVal(ticketsNumber.value);
}

// Get current movie
function getCurrentMovie(movieTitle) {
    return movieList.find(movie => movie.title == movieTitle);
}

// Show value  of tickets number
function showVal(value) {
    ticketsNumber.removeChild(ticketsNumber.lastChild);
    ticketsNumber.appendChild(document.createTextNode(value));
    // 3D Glasses clear
    while (glassesSelectElement.firstChild) {
        glassesSelectElement.removeChild(glassesSelectElement.firstChild);
    }
    // 3D Glasses add
    for (let i = 0; i < ticketsRangeElement.value; i++) {
        let option = document.createElement('option');
        option.value = i + 1;
        option.appendChild(document.createTextNode(i + 1));
        glassesSelectElement.appendChild(option);
    }
    glassesSelectElement.selectedIndex = ticketsRangeElement.value - 1;
}

// Toggles the select for the number of glasses
function toggleSelect() {
    if (glassesOptionElement.checked)
        glassesSelectElement.setAttribute('disabled', '');
    else
        glassesSelectElement.removeAttribute('disabled', '');
}

// Change hour
function changeHour() {
    // Hours Selected remove
    hourSelected.removeChild(hourSelected.lastChild);
    // Hours Selected add
    hourSelected.appendChild(document.createTextNode(selectedHourElement.value));
}

// Update timer
setInterval(() => {
    let distance = countDownTime - (+new Date);
    let time = new Date(distance);
    minutes = time.getUTCMinutes();
    if (time.getUTCSeconds() <= 9)
        seconds = "0" + time.getUTCSeconds();
    else
        seconds = time.getUTCSeconds();
    timerElement.innerHTML = minutes + ':' + seconds;

    if (distance < 1000) {
        alert('This session has expired!');
    }
}, 1000);

// Map
// -1 - nonexistant
// 0 - not taken
// 1 - taken
let seatMatrix = [
    [-1, 0, 0, 0, 1, 1, 1, 0, 0, -1],
    [-1, 1, 1, 1, 1, 1, 1, 1, 1, -1],
    [-1, -1, 1, 1, 1, 1, 1, 1, -1, -1],
    [-1, 0, 0, 1, 1, 1, 1, 0, 0, -1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
let rows = 5, cols = 10;
let mapElement = document.getElementById('map-holder');
let selectedSeats = 0;
let rowLetter = 'A', colNumber = 1;

function nextChar(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
}

for (let i = -1; i < rows; i++) {
    let tr = document.createElement('tr');
    for (let j = -1; j < cols; j++) {
        let td = document.createElement('td');
        if (i == -1 && j == -1) {
            // do nothing
            td.classList.add('label');
        } else if (i == -1) {
            td.classList.add('label');
            td.appendChild(document.createTextNode(colNumber++));
        } else if (j == -1) {
            td.classList.add('label');
            td.appendChild(document.createTextNode(rowLetter));
            rowLetter = nextChar(rowLetter);
        } else if (seatMatrix[i][j] == -1) {
            td.classList.add('none');
        } else if (seatMatrix[i][j] == 0) {
            td.classList.add('free');
        } else if (seatMatrix[i][j] == 1) {
            td.classList.add('taken');
        }
        tr.appendChild(td);
    }
    mapElement.appendChild(tr);
}

// On Click
let tdElements = document.querySelectorAll('td');

tdElements.forEach((e) => {
    e.addEventListener('click', () => {
        if (e.classList.contains('free')) {
            selectedSeats++;
            e.classList.replace('free', 'selected');
        } else if (e.classList.contains('selected')) {
            selectedSeats--;
            e.classList.replace('selected', 'free');
        }
    });
});