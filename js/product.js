
// selections
const centerDOM = document.querySelector('.single-product-center');
const pageTitleDOM = document.querySelector('.page-hero-title');
const imgDOM = document.querySelector('.single-product-img');
const titleDOM = document.querySelector('.single-product-title');
const pagesDOM = document.querySelector('.single-product-pages');
const priceDOM = document.querySelector('.single-product-price');
const authorDOM = document.querySelector('.single-product-author');
const cartBtn = document.querySelector('.addToCartBtn');

//getting the products

// cart product
let productID;

// show product when page loads
window.addEventListener('DOMContentLoaded', async function () {
    let prodcutDiv = document.getElementById('single-product');
    var urlID = location.search
    // const urlID = '?id=hello'
    var uparts = urlID.split("=")[1];
    //var bookId = uparts.toString();
    console.log(uparts);
    let data = JSON.parse(localStorage.getItem('products'));
    console.log(data);
    //console.log(data.length);
    //let SelectedProduct = data.map(item => {
        for(let i = 0; i < data.items.length; i++) {
            //console.log("show");
            //console.log(data.items[i].id);
            if(data.items[i].id === uparts) {
                //return {...data[i]}
                //console.log(data.items[i].id);
                //console.log(data.items[i].fields.Name);
               var currentProduct = data.items[i].id;
               //const image = data.items[i].Image.fields.file.url;

            document.title = data.items[i].fields.Name;
            pageTitleDOM.textContent = data.items[i].fields.Name;
            imgDOM.src = data.items[i].fields.Image.fields.file.url;
            titleDOM.textContent =  data.items[i].fields.Name;
            priceDOM.textContent = data.items[i].fields.Price;
            authorDOM.textContent = data.items[i].fields.Author;
            pagesDOM.textContent = `Pages: ${data.items[i].fields.Pages}`;
            }
        }
    });

cartBtn.addEventListener('click', function () {
    addToCart(productID)
})