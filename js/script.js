
window.onload = () =>{

  if(window.scrollY > 80){
    document.querySelector('.header .header-2').classList.add('active');
  }else{
    document.querySelector('.header .header-2').classList.remove('active');
  }

}

var swiper = new Swiper(".books-slider", {
  loop: true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

var swiper = new Swiper(".featured-slider", {
  spaceBetween: 10,
  loop: true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    450: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
  },
});

var swiper = new Swiper(".arrivals-slider", {
  spaceBetween: 10,
  loop: true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

var swiper = new Swiper(".offers-slider", {
  spaceBetween: 10,
  grabCursor: true,
  loop: true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

var swiper = new Swiper(".blogs-slider", {
  spaceBetween: 10,
  grabCursor: true,
  loop: true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

/************************ Time of Offers *******************************/
var finalday = new Date("Jan 21, 2022 12:00:00").getTime();

var x = setInterval(function () {

  var todaydate = new Date().getTime();
  var diff = finalday - todaydate;

  var day = Math.floor(diff / (1000 * 60 * 60 * 24))
  var hour = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minute = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  var second = Math.floor((diff % (1000 * 60)) / (1000));


  document.getElementById("day").innerHTML = day;
  document.getElementById("hour").innerHTML = hour;
  document.getElementById("minute").innerHTML = minute;
  document.getElementById("second").innerHTML = second;

}, 1000);

/********************* Display Products *************************************/
//variables
const productsDOM = document.querySelector(".products-center");

//getting the products
class Products {
  async getProducts() {
    try {
      let result = await fetch("js/products.json");
      let data = await result.json();
      let products = data.items;
      products = products.map(item => {
        const { Name, Price } = item.fields;
        const { id } = item;
        const Image = item.fields.Image.fields.file.url;
        return { Name, Price, id, Image };
      });
      return products;
    } catch (error) {
      console.log(err);
    }
  }
}

// display products
class UI {
  displayProducts(products) {
    console.log(products);
    let result = "";
    products.forEach(product => {
      result += `
      <article class="product">
      <div class="img-container">
        <img
          src=${product.Image}
          alt="product"
          class="product-img"
        />
        <div class="product-icons">
        <a href="product.html?id=${product.id}" class="product-icon">
                <i class="fas fa-search"></i>
        </a>
        </div>
        <button class="bag-btn" data-id=${product.id}>
          <i class="fas fa-shopping-cart"></i>
          add to cart
        </button>
      </div>
      <h3>${product.Name}</h3>
      <h4>${product.Price}</h4>
    </article>
      `;
    });
    productsDOM.innerHTML = result;
  }
}

let PATH = 'js/products.json';
// Fetch data from products.json and store to local storage
function loadJSON(PATH) {
  console.log("Send data");
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        let data = JSON.parse(xhr.responseText);
        localStorage.setItem('products', JSON.stringify(data));
      } else {
        window.alert('Something went wrong, fetching!!');
      }
    }
  };
  xhr.open('GET', PATH, true);
  xhr.send();
}

/*
//local storage
class Storage { }
*/

document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const products = new Products();

  //get all products
  products.getProducts().then(products => ui.displayProducts(products));
  //send all
  loadJSON(PATH);
});


/**************************** Categories *************************************/
// Adding removing active class funtionality to categories
/*
function getAll() {
  document.getElementById('cat-mob').classList.remove('active');
  document.getElementById('cat-lap').classList.remove('active');
  document.getElementById('cat-all').classList.add('active');
}

function getClassics() {
  document.getElementById('cat-all').classList.remove('active');
  document.getElementById('cat-mystery').classList.remove('active');
  document.getElementById('cat-classics').classList.add('active');
}


function getMystery() {
  document.getElementById('cat-all').classList.remove('active');
  document.getElementById('cat-classics').classList.remove('active');
  document.getElementById('cat-mystery').classList.add('active');
}
*/