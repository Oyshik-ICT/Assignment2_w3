document.getElementById('anywhere').addEventListener("click", displayBar);
document.getElementById('anyweek').addEventListener("click", displayBar);
document.getElementById('addguest').addEventListener("click", displayBar);
document.getElementById('anywhere').addEventListener("click", displayBar);
document.getElementById('where').addEventListener("click", displayMap);
document.getElementById('add-guest').addEventListener("click", showGuest);
document.getElementById('check-in').addEventListener("click", displayCalendar);
document.getElementById('section1__share-btn_id').addEventListener("click", displayShare);
document.getElementById('region-item-1').addEventListener("click", showCountryname);
document.getElementById('region-item-2').addEventListener("click", showCountryname);
document.getElementById('region-item-3').addEventListener("click", showCountryname);
document.getElementById('region-item-4').addEventListener("click", showCountryname);
document.getElementById('region-item-5').addEventListener("click", showCountryname);
document.getElementById('region-item-6').addEventListener("click", showCountryname);


const daysContainer = document.getElementById('daysContainer');
const monthYear = document.getElementById('monthYear');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');
const dateRangeButtons = document.querySelectorAll('.date-range button');
const viewOptions = document.querySelectorAll('.view-options button');

let currentDate = new Date();
let selectedDate = null;
let selectedRange = 'exact';
let currentView = 'dates';


let form = document.getElementById('map_container');
let calendar = document.getElementById('calendar-container');
let guest = document.getElementById('counter-container')
let in_add_date = document.getElementById('in_date_info')
let out_add_date = document.getElementById('out_date_info')
let share = document.getElementById('shareModal')
let section2_left_1_txt_get = document.getElementById('section2_left_1_txt')
let count_in_out = 0

   // Get the modal
var modal = document.getElementById("shareModal");


   // Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

let data = document.getElementsByClassName('range');
for (let i = 0; i < data.length; i++) {
    data[i].addEventListener("click", fun);
}

document.querySelectorAll('.counter-controls').forEach(control => {
    const minusButton = control.querySelector('.minus');
    const plusButton = control.querySelector('.plus');
    const valueSpan = control.querySelector('.counter-value');

    plusButton.addEventListener('click', () => {
        let value = parseInt(valueSpan.textContent);
        valueSpan.textContent = value + 1;
        minusButton.disabled = false;
    });

    minusButton.addEventListener('click', () => {
        let value = parseInt(valueSpan.textContent);
        if (value > 0) {
            valueSpan.textContent = value - 1;
            if (value - 1 === 0) {
                minusButton.disabled = true;
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const heartIcon = heartButton.querySelector('svg');
    
    const isSaved = localStorage.getItem('heartSaved') === 'true';
    if (isSaved) {
        heartIcon.setAttribute('fill', 'red');
    }

    heartButton.addEventListener('click', function() {
        
        if (heartIcon.getAttribute('fill') == 'none') {
            heartIcon.setAttribute('fill', 'red');
            localStorage.setItem('heartSaved', 'true');
        } else {
            heartIcon.setAttribute('fill', 'none');
            localStorage.setItem('heartSaved', 'false');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const showAllBtn = document.querySelector('.img_button');
    const fullGallery = document.getElementById('fullGallery');
    const closeBtn = document.getElementById('closeBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const fullImage = document.getElementById('fullImage');
    const imageCounter = document.getElementById('imageCounter');

    // Get all images from the main view
    const images = Array.from(document.querySelectorAll('.section1_img')).map(img => img.src);
    let currentIndex = 0;

    function updateImage() {
        fullImage.src = images[currentIndex];
        imageCounter.textContent = `${currentIndex + 1} / ${images.length}`;
    }

    showAllBtn.addEventListener('click', function() {
        fullGallery.style.display = 'block';
        updateImage();
    });

    closeBtn.addEventListener('click', function() {
        fullGallery.style.display = 'none';
    });

    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateImage();
    });

    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % images.length;
        updateImage();
    });
});

function fun(event){
    let add = event.target.textContent
    add = add.split(' ')
    in_add_date.innerHTML += ' ' + add[0]
    out_add_date.innerHTML += ' ' + add[0]
}

function displayBar(){
   let form = document.getElementById('search-bar_after');
   console.dir(form)
   if (form.style.display === 'none' || form.style.display === '') {
        form.style.display = 'flex';
     
        form.style.zIndex = '2'
       
}  
else{
    form.style.display = 'none'
}

}

function displayMap(){
    console.log(guest)
    if (form.style.display === 'none' || form.style.display === ''){
        if (calendar.style.display === 'block'){
            calendar.style.display = 'none'
        }
        if (guest.style.display === 'block'){
            guest.style.display = 'none'
        }
        form.style.display = 'block'
        form.style.zIndex = '2'
    }
    else{
        form.style.display = 'none'
    }
}

function showCountryname(){
    let text = this.querySelector('.region-name').textContent;
    document.getElementById('des_name').innerHTML = text

}



function renderCalendar() {
    daysContainer.innerHTML = '';
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    
    monthYear.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}`;

    for (let i = 0; i < firstDay.getDay(); i++) {
        const dayElement = createDayElement('');
        dayElement.classList.add('other-month');
        daysContainer.appendChild(dayElement);
    }

    for (let day = 1; day <= lastDay.getDate(); day++) {
        const dayElement = createDayElement(day);
        if (day === currentDate.getDate() && 
            currentDate.getMonth() === new Date().getMonth() && 
            currentDate.getFullYear() === new Date().getFullYear()) {
            dayElement.classList.add('selected');
            selectedDate = new Date(currentDate);
        }
        daysContainer.appendChild(dayElement);
    }
}

function createDayElement(day) {
    const dayElement = document.createElement('div');
    dayElement.classList.add('day');
    dayElement.textContent = day;
    dayElement.addEventListener('click', () => selectDate(day));
    return dayElement;
}

function selectDate(day) {
    if (selectedDate) {
        const oldSelected = document.querySelector('.selected');
        if (oldSelected) oldSelected.classList.remove('selected');
    }
    selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const newSelected = Array.from(daysContainer.children).find(el => el.textContent == day);
    if (newSelected) newSelected.classList.add('selected');

    if (typeof onDateSelected === 'function') {
        const monthAbbr = currentDate.toLocaleString('default', { month: 'short' });
        onDateSelected(day, monthAbbr);
    }
}

function onDateSelected(date, month) {
    if (count_in_out == 0){
        in_add_date.innerHTML = month + ' ' + date
        count_in_out = 1
    }
    else{
        out_add_date.innerHTML = month + ' ' + date
        count_in_out = 0
    }
    console.log(date, month);
    // Perform any action with the selected date
}

prevMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

dateRangeButtons.forEach(button => {
    button.addEventListener('click', () => {
        dateRangeButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        selectedRange = button.dataset.range;
    });
});

viewOptions.forEach(button => {
    button.addEventListener('click', () => {
        viewOptions.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        currentView = button.dataset.view;
        // Here you would implement the logic to switch between views
        console.log(`Switched to ${currentView} view`);
    });
});

renderCalendar();

// calendar-end

function displayCalendar(){
    if (calendar.style.display === 'none' || calendar.style.display === ''){
        if (form.style.display === 'block'){
            form.style.display = 'none'
        }
        if (guest.style.display === 'block'){
            guest.style.display = 'none'
        }
        calendar.style.display = 'block'
        calendar.style.zIndex = '2'
    }
    else{
        calendar.style.display = 'none'
    }
}



function showGuest(){
    if (guest.style.display === 'none' || guest.style.display === ''){
        if (calendar.style.display === 'block'){
            calendar.style.display = 'none'
        }
        if (form.style.display === 'block'){
            form.style.display = 'none'
        }
        guest.style.display = 'block'
        guest.style.zIndex = '2'
        

    }

    else{
        guest.style.display = 'none'
    }
}


function displayShare(){
    if (guest.style.display === 'none' || guest.style.display === ''){
        if (calendar.style.display === 'block'){
            calendar.style.display = 'none'
        }
        if (form.style.display === 'block'){
            form.style.display = 'none'
        }
        share.style.display = 'block'
        share.style.zIndex = '2'
        document.getElementById('modal-content_country').innerHTML = section2_left_1_txt_get.textContent

    }

    else{
        share.style.display = 'none'
    }
}



   span.onclick = function() {
       modal.style.display = "none";
   }

   // When the user clicks anywhere outside of the modal, close it
   window.onclick = function(event) {
       if (event.target == modal) {
           modal.style.display = "none";
       }
   }

   function copyToClipboard() {
       var dummy = document.createElement('input'),
       text = window.location.href;
       document.body.appendChild(dummy);
       dummy.value = text;
       dummy.select();
       document.execCommand('copy');
       document.body.removeChild(dummy);
       alert("URL copied to clipboard!");
   }