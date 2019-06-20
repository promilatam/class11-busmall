'use strict';

//Global variables
var arrayOfFileNames = []; //Array containing the file names
var arrayOfURLs = []; //Array containing the URLs of the images
var arrayOfPictures = []; //Array containing the Pictures Objects
var indexOfRecentPictues = []; //Array containing the ids of three most recent pictures
var lengthOfObjects = 20; //Update this variable with new images added into the project
var totalAllowedClicks = 0;


//Rendering Global variables to collect elements & tags
var imageSectionTag = document.getElementById('all_pictures');
var leftImageTag = document.getElementById('left_pic');
var leftPTag = document.getElementById('left_pic_h2');

var middleImageTag = document.getElementById('middle_pic');
var middlePTag = document.getElementById('middle_pic_h2');

var rightImageTag = document.getElementById('right_pic');
var rightPTag = document.getElementById('right_pic_h2');


/***************************** CONSTRUCTOR *****************************************/
function Pictures(name, id, URL) {
  this.name = name;
  this.id = id;
  this.URL = URL;
  this.clickCounter = 0;
  this.timeShown = 0;
}

/*********************** HELPER FUNCTIONS *******************************************/

function setFileNames() {
  arrayOfFileNames = ['Bag', 'Banana-cutter','iPad Holder', 'Boots', 'Breakfast Maker','Bubblegum', 'Chair', 'Cthulhu', 'Dog-duck', 'Dragon', 'Pen','Pet-Sweep', 'Scissors', 'Shark', 'Baby-Sweep', 'Tauntaun', 'Unicorn', 'USB', 'Water-can', 'Wine-glass'];
}

function setURLs() {
  arrayOfURLs = ['./assets/bag.jpg', './assets/banana.jpg', './assets/bathroom.jpg', './assets/boots.jpg', './assets/breakfast.jpg', './assets/bubblegum.jpg', './assets/chair.jpg', './assets/cthulhu.jpg', './assets/dog-duck.jpg', './assets/dragon.jpg', './assets/pen.jpg', './assets/pet-sweep.jpg', './assets/scissors.jpg', './assets/shark.jpg', './assets/sweep.png', './assets/tauntaun.jpg', './assets/unicorn.jpg', './assets/usb.gif', './assets/water-can.jpg', './assets/wine-glass.jpg'];
}

function createPicturesObjects() {
  setFileNames();
  setURLs();
  for (var i = 0; i < lengthOfObjects; i++) {
    var name = arrayOfFileNames[i];
    var URL = arrayOfURLs[i];
    arrayOfPictures.push(new Pictures(name, i, URL));
  }
}

function renderDisplayImages(left_id, middle_id, right_id) {
  leftImageTag.id = arrayOfPictures[left_id].id;
  leftImageTag.src = arrayOfPictures[left_id].URL;
  leftPTag.textContent = arrayOfPictures[left_id].name;

  middleImageTag.id = arrayOfPictures[middle_id].id;
  middleImageTag.src = arrayOfPictures[middle_id].URL;
  middlePTag.textContent = arrayOfPictures[middle_id].name;

  rightImageTag.id = arrayOfPictures[right_id].id;
  rightImageTag.src = arrayOfPictures[right_id].URL;
  rightPTag.textContent = arrayOfPictures[right_id].name;
}

//Rendering Summary in the display
function renderSummaryDisplay() {
  var ulId = document.getElementById('clicks-count');
  var liId = [];

  for (var i = 0; i < lengthOfObjects; i++) {
    liId[i] = document.createElement('li');
    liId[i].textContent = arrayOfPictures[i].name + ': ' + arrayOfPictures[i].clickCounter + '  Times'+ arrayOfPictures[i].timeShown;
    ulId.appendChild(liId[i]);
  }
}
//Generates three random indices (left_index, middle_index, & right_index) used torender the display
function generateRandomImageIndex(max) {
  //Generate left id that has not been used previously
  do {
    var left_id = Math.floor(Math.random() * Math.floor(max));
  } while(left_id === indexOfRecentPictues[0] || left_id === indexOfRecentPictues[1] || left_id === indexOfRecentPictues[2]);

  //Generate middle id that has not been used previously
  do {
    var middle_id = Math.floor(Math.random() * Math.floor(max));
  } while(middle_id === indexOfRecentPictues[0] || middle_id === indexOfRecentPictues[1] || middle_id === indexOfRecentPictues[2] || middle_id === left_id);

  //Generate right id that has not been used previously
  do {
    var right_id = Math.floor(Math.random() * Math.floor(max));
  } while(right_id === indexOfRecentPictues[0] || right_id === indexOfRecentPictues[1] || right_id === indexOfRecentPictues[2] || right_id === left_id || right_id === middle_id);

  //Delete the previous storage and maintain the recent copy of the used indices
  indexOfRecentPictues = [];
  indexOfRecentPictues.push(left_id);
  indexOfRecentPictues.push(middle_id);
  indexOfRecentPictues.push(right_id);

  return [left_id, middle_id, right_id];
}

//To display and verify from console
function consoleClickCounts() {
  for (var i = 0; i < 20; i++) {
    console.log(arrayOfPictures[i].name + ' ' + arrayOfPictures[i].clickCounter + ' Times Shown: '+ arrayOfPictures[i].timeShown);
  }
}

function createChart() {
  var percentages = [];
  for (var i =0; i < lengthOfObjects; i++) {
    percentages.push(Math.round((arrayOfPictures[i].clickCounter / arrayOfPictures[i].timeShown) * 100));
  }
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: arrayOfFileNames,
      datasets: [{
        label: '# of Votes',
        data: percentages,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

/*********************** HELPER FUNCTIONS ENDLINE *******************************************/



/*********************** DEFAULT *******************************************/

//Create default pictures and renderings before the click event
createPicturesObjects(); //Sets filenames, URLs and creates object with that information
var index_values = generateRandomImageIndex(lengthOfObjects-1);
arrayOfPictures[index_values[0]].timeShown++;
arrayOfPictures[index_values[1]].timeShown++;
arrayOfPictures[index_values[2]].timeShown++;
renderDisplayImages(index_values[0], index_values[1], index_values[2]);


/*********************** DRIVER *******************************************/

var handleClickOnImage = function(event){

  if (totalAllowedClicks < 5) {
    var id = event.target.id;
    var index_values = generateRandomImageIndex(lengthOfObjects-1);
    arrayOfPictures[index_values[0]].timeShown++;
    arrayOfPictures[index_values[1]].timeShown++;
    arrayOfPictures[index_values[2]].timeShown++;
    renderDisplayImages(index_values[0], index_values[1], index_values[2]);
    arrayOfPictures[id].clickCounter++;
    // console.log(event.target.id);
    totalAllowedClicks++;
  } else {
    leftImageTag.removeEventListener('click', handleClickOnImage);
    middleImageTag.removeEventListener('click', handleClickOnImage);
    rightImageTag.removeEventListener('click', handleClickOnImage);
    consoleClickCounts();
    // renderSummaryDisplay();
    createChart();
  }
};

leftImageTag.addEventListener('click', handleClickOnImage);
middleImageTag.addEventListener('click', handleClickOnImage);
rightImageTag.addEventListener('click', handleClickOnImage);

/*********************** DRIVER ENLDLINE *******************************************/