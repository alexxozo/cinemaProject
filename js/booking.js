
let scheduleChooser = document.querySelector('.schedule-chooser');
let daysSelector = scheduleChooser.querySelector('.days');
let days = daysSelector.querySelectorAll('li');
let hoursSelector = scheduleChooser.querySelector('.hours');

let schedule = [
    [
        '10:30 - Sala Ultra',
        '15:30 - Sala Cinema',
        '16:30 - Sala Mega'
    ],
    [
        '10:30 - Sala Ultra',
        '16:30 - Sala Mega'
    ],
    [
        '16:30 - Sala Mega'
    ],
    [
        '10:30 - Sala Ultra'
    ],
    [
        '10:30 - Sala Ultra',
        '15:30 - Sala Cinema',
        '16:30 - Sala Mega'
    ],
    [
        '10:30 - Sala Ultra',
        '15:30 - Sala Cinema'
    ],
    [
        '10:30 - Sala Ultra',
        '16:30 - Sala Mega'
    ],
];

// Setup
let i = 0;
days.forEach((element) => {
    element.setAttribute('data-number', i++);
});
delete i;

// For the first time the page loads sets the hours for the current day
schedule[0].forEach((hour) => {
    let a = document.createElement('a');
    let li = document.createElement('li');
    a.appendChild(document.createTextNode(hour));
    a.setAttribute("href", "bilete.html");
    a.addEventListener('click', () => {
        setCookie('movie-hour', hour, 3);
    });
    li.appendChild(a);
    hoursSelector.appendChild(li);
});

// Click Listener
days.forEach((element) => {
    element.addEventListener('click', (e) => {
        e.preventDefault();
        days.forEach((day) => {
            day.classList.remove('active');
        });
        element.classList.add('active');
        let dayOfTheWeek = element.getAttribute('data-number');
        while (hoursSelector.firstChild) {
            hoursSelector.removeChild(hoursSelector.firstChild);
        }
        schedule[dayOfTheWeek].forEach((hour) => {
            let a = document.createElement('a');
            let li = document.createElement('li');

            a.appendChild(document.createTextNode(hour));
            a.setAttribute("href", "bilete.html");

            a.addEventListener('click', () => {
                setCookie('movie-hour', hour, 3);
            });

            li.appendChild(a);
            hoursSelector.appendChild(li);
        });
    })
});