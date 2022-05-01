class Book {
    constructor(page, pagePrice,baseType, baseTypePrice, typeBook, typeBookPrice, extras, extraPrice, totalPrice) {
      this.page = page;
      this.pagePrice = pagePrice;
      this.baseType = baseType;
      this.baseTypePrice = baseTypePrice;
      this.typeBook = typeBook;
      this.typeBookPrice = typeBookPrice;
      this.Extras = extras;
      this.extraPrice = extraPrice;
      this.totalPrice = totalPrice;
    }
  }

  let bookTypeMap = new Map();
  let bookPageMap = new Map();
  let bookBaseMap = new Map();

  let localCartBooks = [];
  let localTotalPrice = 0.00;

// Function to run on load to populate Maps 
$(function() {
    //Book Type Content
    bookTypeMap.set("Classics", "3.00");
    bookTypeMap.set("Mystery", "3.00");
    bookTypeMap.set("Kids", "3.00");
    bookTypeMap.set("Social", "8.00");

    // Book page Content
    bookPageMap.set("Little", "100");
    bookPageMap.set("Medium", "200");
    bookPageMap.set("Many", "400");

    // Book Base Content
    bookBaseMap.set("Science Fiction", "0.00");
    bookBaseMap.set("Dramatic", "1.00");
    bookBaseMap.set("Romantic", "2.00");
    bookBaseMap.set("Horror", "3.50");

    $("#priceTotal").html("$ "+ localTotalPrice);

    console.log("Book Stuff added");
});


// Book Order Button
$("#orderSubmitBtn").click(function(){

  var typeBook = $( "#bookCatSelect" ).val();
  var typeBookPrice = bookTypeMap.get(typeBook);

  var pageBook = $( "#bookPagesSelect" ).val();
  var pageBookPrice = bookPageMap.get(pageBook);

  var baseBook = $( "#bookBaseSelect" ).val();
  var baseBookPrice = bookBaseMap.get(baseBook);

  var checkTest = $('.checkTest:checkbox:checked');

  var extrasArray = [];

  $.each($("input[name='extraOption']:checked"), function(){
    extrasArray.push($(this).val());
  });
  var extraPrice = parseInt(extrasArray.length) * 2; // Number of extras * 2, each extra is $2

  var totalPrice = parseFloat(typeBookPrice) + parseFloat(pageBookPrice) + parseFloat(baseBookPrice) + parseFloat(extraPrice);

  var newBook = new Book(
    pageBook,
    pageBookPrice,
    baseBook,
    baseBookPrice,
    typeBook,
    typeBookPrice,
    extrasArray,
    extraPrice,
    totalPrice,
  );
  //Add Book to array
  localCartBooks.push(newBook);

  // Clear form once added to cart
  document.getElementById("orderForm").reset();
  
  // Update list of Books
  addContent();

  // Update total price
  localTotalPrice = localTotalPrice + newBook.totalPrice;
  // Update total price on html
  $("#priceTotal").html("$ "+localTotalPrice);
});


function addContent(){
  $("#groupOfBooks").empty();


  for(var v=0; v < localCartBooks.length; v ++){

    var book = localCartBooks[v];
    var topLineText = book.page + " " + book.baseType + " " + book.typyBook;
    //console.log(book);
    var topLine = $("<h6></h6>").text(topLineText);

    var priceLineText = "Total: $" + book.totalPrice;
    console.log(book.totalPrice);
    var priceLine = $("<p></p>").text(priceLineText).addClass("pt-2");
    
    var ulTopLine = $("<ul>");

    $("#groupOfBooks").append(topLine,ulTopLine);  

    var extraLineText ="";
    for(var b=0; b < book.Extras.length; b++){

      var extraSelected = book.Extras[b];
      extraLineText = extraLineText + extraSelected + "<br>";

      var extraItem = $("<li></li>").text(extraSelected);
      $("#groupOfBooks").append(extraItem);  
    }

    var ulBottomLine = $("</ul>");

    var extraLine = $("<p></p>").text(extraLineText);
    // Add content to page
    $("#groupOfBooks").append(ulBottomLine,priceLine);  
  }
  
}

$("#couponBtn").click(function(){
  var coup = $("#couponTextInput").val();

  if(localTotalPrice <= 0 || coup == null || coup == ""){
    //Price is 0, no way we doing discount on that!
    if(localTotalPrice <= 0){
      alert("Your carts empty! Add stuff before using discount");
    }
    else{
      
    }
   
  }
  else {
    if(coup == "book"){
      //Correct discount code, take 10% off 
       var discount = localTotalPrice / 10;
      localTotalPrice = localTotalPrice - discount;

      //Update the price text
      $("#priceTotal").html("$ "+ localTotalPrice);
    }
    else{
      alert("Thats not the correct coupon code! ");
    }   
    
  }
  $("#couponTextInput").val("");
});

$("#cancelOrderBtn").click(function(){
  if(confirm("What about your amazing book! Are you sure you want to cancel order?")){
   // Delete all books from array
   localCartBooks.length = 0;

   // Set price to 0
   localTotalPrice = 0;
   $("#priceTotal").html("$ "+ localTotalPrice);

   //Clear the div listing all Books
   $("#groupOfBooks").empty();

   var cartEmptyLine = $("<p></p>").text("Your Cart is empty!").addClass("text-center py-5");

    // Add content to page
    $("#groupOfBooks").append(cartEmptyLine);  
  }
});


$("#checkOutOrderBtn").click(function(){
  if(confirm("Are you sure you dont want add anything else?, Continue checkout?")){
   // Delete all books from array
   localCartBooks.length = 0;

   // Set price to 0
   localTotalPrice = 0;
   $("#priceTotal").html("$ "+ localTotalPrice);

   //Clear the div listing all books
   $("#groupOfBooks").empty();

   var cartEmptyLine = $("<p></p>").text("Your Cart is empty!").addClass("text-center py-5");

    // Add content to page
    $("#groupOfBooks").append(cartEmptyLine);  

    alert("Your order is being processed now, well deliver soon!");
  }
});
