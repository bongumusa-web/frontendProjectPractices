const InputBox = document.getElementById("input-box");
const listContaner = document.getElementById("list-container");


function Addtask(){
    if(InputBox.value === ''){
        alert("you must write someting");
    }
    else{
        let li =document.createElement('li');
        li.innerHTML = InputBox.value;
        listContaner.appendChild(li);

        let span = document.createElement("span");
        span.innerHTML = '\u00d7';
        li.appendChild(span);
    }

    InputBox.value ='';
    saveData();

}


listContaner.addEventListener('click', function(e){
    if(e.target.tagName ==='LI'){
        e.target.classList.toggle("checked");
        saveData();

    }
    else if(e.target.tagName === 'SPAN'){

    e.target.parentElement.remove();
    saveData();

    }
}, false);



function saveData(){
    localStorage.setItem("data", listContaner.innerHTML);
}

function showTask(){
    listContaner.innerHTML = localStorage.getItem('data');

}

showTask();



//theme 

// THEME TOGGLE 
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

// Add a text element next to the icon
const themeText = document.createElement('span');
themeText.id = 'theme-text';
themeText.style.marginLeft = '8px';
themeText.style.fontWeight = 'bold';
themeText.style.fontSize = '24px';
themeText.style.verticalAlign = 'middle';
themeText.style.padding = '5px'
themeToggle.appendChild(themeText);

// Load saved theme
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeIcon.src = 'images/sun.png';
    themeText.textContent = 'Light Mode';
    themeText.style.color = 'white';
} else {
    themeIcon.src = 'images/moon.png';
    themeText.textContent = 'Dark Mode';
    themeText.style.color = 'black';
}

// Toggle theme on click
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
        themeIcon.src = 'images/sun.png'; // switch to sun
        themeText.textContent = 'Light Mode';
        themeText.style.color = 'white';
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.src = 'images/moon.png'; // switch to moon
        themeText.textContent = 'Dark Mode';
        themeText.style.color = 'black';
        localStorage.setItem('theme', 'light');
    }
});
