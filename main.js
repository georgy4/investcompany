let optionsItem = document.querySelectorAll('.options-item');
let labelImg = document.querySelectorAll('.label-img');
let options = document.querySelector('.options');
let inputTitle = document.querySelector('.input-title');
let menuInner = document.querySelector('.menu-inner');
let option = document.querySelectorAll('.option');
let background = document.querySelector('.background');
let content = document.querySelector('.content');
let contentInner = document.querySelectorAll('.content-inner');


let counter = 0;

optionsItem.forEach(function(element) {
  element.addEventListener('click', function(){

    if(!counter) {
      options.style.top = -150 + 'px';
      option.forEach(function(elem) {
        setTimeout(() => {
          elem.style.height=140+'px';
          background.style.backgroundImage = 'url("img/bg2.png")';  
        }, 500);
        elem.classList.add('option-opacity');
      });
      labelImg.forEach(function(el) {
        el.style.opacity = 0;
      });
      setTimeout(() => {
        options.style.borderBottom = '2px solid rgba(201, 200, 200, 0.432)';
        content.style.height = 'auto';
        content.style.opacity = 1;
      }, 1000);  
      counter = 1;
    }
  
  });
})

for (let j = 0; j< optionsItem.length; j++) {
  optionsItem[j].addEventListener('click', function(){
    contentInner.forEach(function(contentInn){
      contentInn.style.display='none'; 
    });

    contentInner[j].style.display = 'block';
  });
}

let optionMobile = document.querySelectorAll('.option-mobile');
let button = document.querySelectorAll('.button');
let bottomImage = document.querySelectorAll('.bottom-image');

for (let i = 0; i<optionMobile.length; i++) {
  optionMobile[i].addEventListener('click', function(evt){
    background.style.backgroundImage='none';
    background.style.ackgroundColor = 'rgb(231, 227, 207)';
    contentInner.forEach(function(inner){
      inner.style.height = 0;
    }); 
    bottomImage.forEach(function(image){
      image.style.display = 'none';
    }) 
    contentInner[i].style.height = 'auto';
    
    bottomImage[i].style.display = 'block';
  });
}