const loader = document.querySelector('.loader');

const coffeeJar = document.querySelector(".coffee-pot-icon"),
coffeeJarContainer = document.querySelector(".coffee-pot-container"),
coffeeCup = document.querySelector(".coffee-cup"),
coffeeSmoke = document.querySelector(".coffee-smoke");
let after_of_coffeeJarContainer = window.getComputedStyle(coffeeJarContainer, '::after'),
quantity = 0;
const coffeeDown = document.getElementById('coffee-down');
const coffeeUp = document.getElementById('coffee-up');

const plus = document.querySelector('.plus'),
minus = document.querySelector('.minus'),
result = document.querySelector('.result');

const cartIcon = document.querySelector('.cart-icon'),
cartNumber = document.querySelector('#cart-number'),
buyButton = document.querySelector('.buy-button');
let cartIconStyle = window.getComputedStyle(cartIcon);

const sizeButtonsArray = Array.from(document.querySelectorAll('#size-button'));
let prices = ['26.00', '32.00', '41.00'];
const price = document.querySelector('.price');

const productDescription = document.querySelector('.product-description-inner'),
subContentDescription = document.querySelector('.sub-content-card');

const right = document.querySelector('.right');
const left = document.querySelector('.left');
let cards, cardz, cars;
cards = document.querySelector('.cards');

const productImage = document.querySelector('.product-photo');

let nameOfProduct = Array.from(document.querySelector('h1').textContent);
nameOfProduct.pop();
nameOfProduct = nameOfProduct.join('');




function loop(size, quantity, name) {
  if(typeof localStorage.getItem([name, size]) == 'undefined' || typeof localStorage.getItem([name, size]) == 'null') {
    localStorage.setItem([name, size], quantity);
  }
  else {
    let result = Number(localStorage.getItem([name, size])) + quantity;
    localStorage.setItem([name, size], result);
  }

};
window.addEventListener('load', () => {
  loader.classList.add('disappear');
  loader.addEventListener('transitionend', () => {
    loader.style.display = 'none';
  })
})
const images = document.querySelectorAll('[data-src]');

function loading(img) {
  const dataSrc = img.getAttribute('data-src');
  if(!dataSrc){return;}
  else {
    img.src = dataSrc;
  }
  console.log(dataSrc);
};

const lazyLoader = new IntersectionObserver(function (images, lazyLoader) {
  images.forEach(image => {
    if(!image.isIntersecting){return;}
    else{
    loading(image.target);
    lazyLoader.unobserve(image.target);
    }
  });
}, {rootMargin: '200px'});

images.forEach(image => {
  lazyLoader.observe(image);
});
productDescription.addEventListener('click', () => {
  productDescription.classList.toggle('returned');
});
subContentDescription.addEventListener('click', () => {
  subContentDescription.classList.toggle('returned');
});

function setUpSlider () {
  cards = document.querySelector('.cards');
  cardz = cards.children;
  cars = window.getComputedStyle(cardz[1]);
  let firstCard = cards.firstElementChild;
  let lastCard = cards.lastElementChild;
  firstCard.style.display = 'flex';
  lastCard.style.display = 'flex';
};
function resetSlider () {
  firstCard = cards.firstElementChild;
  firstCard.style.display = 'none';
  lastCard = cards.lastElementChild;
  lastCard.style.display = 'none';
}

function leftFunction() {
  if(cars.animationPlayState == 'running') {
    return;
  }
  let products = document.querySelectorAll('.card');
  products.forEach(card => {
    card.classList.add('switching-to-right');
    })
  cards.addEventListener('animationend', () => {
    products.forEach(card => {
      card.classList.remove('switching-to-right');
    })
    cards.removeChild(cards.lastElementChild);    
    cards.removeChild(cards.lastElementChild);
    let celuiDeLaFin = cards.lastElementChild.cloneNode(true);
    let celuiDuDebut = cards.firstElementChild.cloneNode(true);
    cards.insertBefore(celuiDeLaFin, cards.firstElementChild);
    cards.appendChild(celuiDuDebut);
    resetSlider();
  }, {once: true})
}

function rightFunction() {
  if(cars.animationPlayState == 'running') {
    return;
  }
  let products = document.querySelectorAll('.card');
  products.forEach(card => {
    card.classList.add('switching-to-left');
    })
  cards.addEventListener('animationend', () => {
    products.forEach(card => {
      card.classList.remove('switching-to-left');
    })
    cards.removeChild(cards.firstElementChild);    
    cards.removeChild(cards.firstElementChild);
    let celuiDeLaFin = cards.lastElementChild.cloneNode(true);
    let celuiDuDebut = cards.firstElementChild.cloneNode(true);
    cards.insertBefore(celuiDeLaFin, cards.firstElementChild);
    cards.appendChild(celuiDuDebut);
    resetSlider();
  }, {once: true})
}

// const scrollTop = document.documentElement.scrollHeight;

left.addEventListener('click', () => {
  setUpSlider();
  leftFunction();
});

right.addEventListener('click', () => {
  setUpSlider();
  rightFunction();
})
const main = document.querySelector('main');
let mouseYInImage, mouseXInImage, percentX, percentY

productImage.addEventListener('click', function () {
  this.classList.toggle('zoomed');
  if(!this.classList.contains('zoomed')) {
    productImage.style.setProperty('background-position', '50% 50%');
  }
  productImage.addEventListener('mousemove', (e) => {
    if(productImage.classList.contains('zoomed')) {
      mouseYInImage = e.clientY - productImage.offsetTop; 
      mouseXInImage = e.clientX - main.offsetLeft - productImage.offsetLeft;
      percentX = Math.floor( mouseXInImage / productImage.offsetWidth * 100);
      percentY =  Math.floor( mouseYInImage / productImage.offsetHeight * 100);
      if(percentX>100 || percentX<0 || percentY>100 || percentY<0 ) {return;}
      productImage.style.setProperty('background-position', percentX +'%' + percentY + '%');
    }
  })
})
productImage.addEventListener('mouseleave', function() {
  if(this.classList.contains('zoomed')) {this.classList.remove('zoomed');}
  productImage.style.setProperty('background-position', '50% 50%');
})


sizeButtonsArray.forEach(btn => {
    btn.addEventListener('click', event => {
      if (btn.classList.contains('chosen')) {
        btn.classList.remove('chosen');
      }
      else {
        if(sizeButtonsArray[0].classList.contains('chosen')) {
          sizeButtonsArray[0].classList.remove('chosen');
        }
        else if (sizeButtonsArray[1].classList.contains('chosen')) {
          sizeButtonsArray[1].classList.remove('chosen');
        }
        else {
          sizeButtonsArray[2].classList.remove('chosen');
        }
        btn.classList.add('chosen');
        price.textContent = '$' + prices[sizeButtonsArray.indexOf(btn)];
      }
    })
  })

buyButton.addEventListener('click', () => {
  let a = Number(cartNumber.innerHTML),
  b = Number(result.innerHTML);
  if(cartIconStyle.animationPlayState == 'running') {
    return;
  }
  else if(b === 0){
    cartIcon.style.setProperty('transform', 'translateX(-1rem)');
    cartIcon.addEventListener('transitionend', () => {
      cartIcon.classList.add('no-product');
    }, {once: true})
    
    cartIcon.addEventListener('animationend', ()=>{
        cartIcon.style.removeProperty('transform');
        cartIcon.classList.remove('no-product');
      })
  }
  else {
    cartNumber.innerHTML = a + b;
    cartIcon.classList.add('spinning');
    cartIcon.addEventListener('animationend', () => {
      cartIcon.classList.remove('spinning');
    })

    if(sizeButtonsArray[0].classList.contains('chosen')) {
      loop('M', b, nameOfProduct);
    }
    else if(sizeButtonsArray[1].classList.contains('chosen')) {
      loop('L', b, nameOfProduct);
    }
    else {
      loop('XL', b, nameOfProduct);
    }
    result.innerHTML = 0;
    quantity = 0;

  }
})


function test (valeurTest) {
  if(valeurTest>0) {
    quantity--;
    return result.innerHTML = quantity;
  }
  else {
    return result.innerHTML=0;
  }
};

plus.addEventListener('click', function() {
  quantity++
  result.innerHTML = quantity;

});

minus.addEventListener('click', function() {
  test(quantity);
});



let attr = window.getComputedStyle(coffeeDown);
let atr = window.getComputedStyle(coffeeUp);

coffeeJarContainer.addEventListener('click', () => {

  if (after_of_coffeeJarContainer.width=='0px'){
    coffeeJar.classList.add("active");
    coffeeDown.beginElement();
    coffeeCup.classList.add('out');
    coffeeJarContainer.style.setProperty('--animation', 'liquid .7s');
    coffeeJarContainer.addEventListener('animationend', () => {
      coffeeSmoke.classList.add('visible');
      coffeeJarContainer.setAttribute("aria-expanded", true);
      })
    }
  else {
    coffeeJar.classList.remove("active");
    coffeeUp.beginElement();
    coffeeJarContainer.style.setProperty('--animation', 'liquid-reverse 0.4s');
    coffeeJarContainer.addEventListener('animationend', () => {
      coffeeCup.classList.remove('out');
      coffeeSmoke.classList.remove('visible');
      }, {once: true})
    coffeeJarContainer.setAttribute("aria-expanded", false);
    }
});

