'use strick';

// Global Variables
var leftImgTag = document.getElementById('leftProductImage');
var middleImgTag = document.getElementById('middleProductImage');
var rightImgTag = document.getElementById('rightProductImage');

var productsContain = document.getElementById('allProducts');
var productsContain = document.getElementById('results');

// count of clicks
var clickCount = 0;
var maxClick = 7;

//Set up the constructor function
var Product = function(name,imgScr = 'default.jpg',timesClicked,timeShown){
    this.name = name;
    this.url = imgScr;
    //ternary operator - shorthand if/else statement
    this.timesClicked = timesClicked ? timesClicked :0;
    this.timeShown = thisShown || 0;
    Product.allItems.push(this);
};


Product.allItems = [];
Product.previousImage = [];

//make a new Product again
new buildProducts = function(){
    new Product('Bag', './assets/bag.jpg'),
    new Product('Banana', './assets/banana.jpg'),
    new Product('Bathroom', './assets/bathroom.jpg'),
    new Product('Boots', './assets/boots.jpg'),
    new Product('Breakfast', './assets/breakfast.jpg'),
    new Product('Bubblegum', './assets/bubblegum.jpg'),
    new Product('Chair', './assets/chair.jpg'),
    new Product('Cthulhu', './assets/cthulhu.jpg'),
    new Product('Dog Duck', './assets/dog-duck.jpg'),
    new Product('Dragon', './assets/dragon.jpg'),
    new Product('Pen', './assets/pen.jpg'),
    new Product('Pet Sweep', './assets/pet-sweep.jpg'),
    new Product('Scissors', './assets/scissors.jpg'),
    new Product('Shark', './assets/shark.jpg'),
    new Product('Sweep', './assets/sweep.png'),
    new Product('Tauntaun', './assets/tauntaun.jpg'),
    new Product('Unicorn', './assets/unicorn.jpg'),
    new Product('Usb', './assets/usb.gif'),
    new Product('Water Can', './assets/water-can.jpg'),
    new Product('Wine Glass', './assets/wine-glass.jpg')
};


var pickUniqueNonRepeating = function(currentPicks) {
    var index, product;
    do {
      index = getRandomIntInclusive(0, Product.allItems.length - 1);
      product = Product.allItems[index];
  
    } while (Product.previousImages.includes(product) || currentPicks.includes(product));
  
    return product;
  };
  
  var renderThreeNewProducts = function(){
    var currentPicks = [];
    //TODO: this should be a function pick VARIABLE X AMPOUNT unique images
    var leftProduct = pickUniqueNonRepeating(currentPicks);
    currentPicks.push(leftProduct);
    var rightProduct = pickUniqueNonRepeating(currentPicks);
    currentPicks.push(rightProduct);
    var middleProduct = pickUniqueNonRepeating(currentPicks);
    currentPicks.push(middleProduct);
  
    leftImgTag.src = leftProduct.url;
    rightImgTag.src = rightProduct.url;
    middleImgTag.src = middleProduct.url;
  
    Product.previousImages = currentPicks;
  };
  
  var handleClickOnImage = function(event){
    clickCount++;
    console.log(event.target.id);
    if(event.target.id === 'leftProductImage'){
      Product.previousImages[0].timesClicked++;
    }
    if (event.target.id === 'middleProductImage') {
      Product.previousImages[1].timesClicked++;
    }
    if (event.target.id === 'rightProductImage') {
      Product.previousImages[2].timesClicked++;
    }
    for(var i = 0; i < Product.previousImages.length; i++){
      Product.previousImages[i].timesShown++;
    }
  
    if(clickCount < maxClicks){
      renderThreeNewProducts();
    } else {
      productsContainer.removeEventListener('click', handleClickOnImage);
      makeBusChart();
  
    }
  };
  
  
  var initPage = function() {
    buildProducts();
    renderThreeNewProducts();
    productsContainer.addEventListener('click', handleClickOnImage);
  };
  
  initPage();
  
  // CHART TEST
  
  function makeBusChart() {
  
    var busChartCanvas = document.getElementById('busResults');
  
    var percents = [];
    var names = [];
  
    for (var i = 0; i < Product.allItems.length; i++) {
      var p = Math.floor((Product.allItems[i].timesClicked / Product.allItems[i].timesShown) * 100);
      names.push(Product.allItems[i].name);
      percents.push(p);
    }
  
    var chartData = {
      labels: names,
      datasets: [{
        label: '# of Votes',
        data: percents,
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
  
    };
  
    var busChartObject = {
      type: 'line',
      data : chartData,
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    };
  
    var busChart = new Chart(busChartCanvas, busChartObject);
  
  }