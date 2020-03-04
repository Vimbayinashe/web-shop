var basket = [];

/** Jag har tillagt 2 bilder med olika storlek för att ha en responsiv sidan*/

var products = [{
        name: "Personalised Cake",
        id: 1,
        image1: "pictures/barney-100.jpg",
        image2: "pictures/barney-200.jpg",
        image3: "pictures/barney-400.jpg",
        price: 500,
        color: "purple",
        size: "20 inches"
    },
    {
        name: "Fondant Cake",
        id: 2,
        image1:"pictures/blue-cake-100.jpg",
        image2:"pictures/blue-cake-200.jpg",
        image3:"pictures/blue-cake-400.jpg",
        price: 400,
        color: "blue",
        size: "8 inches"
    },
    {
        name: "Fresh Cream Cake",
        id: 3,
        image1:"pictures/fruity-cake-100.jpg",
        image2:"pictures/fruity-cake-200.jpg",
        image3:"pictures/fruity-cake-400.jpg",
        price: 250,
        color: "red & orange",
        size: "12 inches"
    },
    {
        name: "Cupcake",
        id: 4,
        image1: "pictures/green-cupcakes-100.jpg",
        image2: "pictures/green-cupcakes-200.jpg",
        image3: "pictures/green-cupcakes-400.jpg",
        price: 10,
        color: "green",
        size: "80g"
    }
];


function getProduct(productId = null) {

    if ((productId) && (productId <= products.length)) {

        var result = {};
        products.forEach(function (element) {
            if (element.id == productId) {
                result = element;
            }
        })
        //return result;
        console.log(result);

    } else {
        products.forEach(element => {
            //return element;  
            //**Outputis nothing now, Change all back to console.log?
            console.log(element);
        });
    }
}

function ItemInBasket (product, number) {
    this.name = product.name;
    this.id = product.id;
    this.price = product.price;
    this.count = number;
    this.totalPrice = function () { return this.price * this.count };
}

function addToBasket(productId, number = 1) {

    if (basket.length == 0) {

        basket.unshift(products[productId - 1]);
        basket[0].count = number

    } else if (basket.length > 0) {
        let itemIndex;
        let itemFound = false;
        let count = 0;

        basket.forEach( (item, index) =>{ 
            if(item.id == productId) {
                itemIndex = index;
                itemFound = true;
                count++
            }
        });

        if (itemFound == true) {
            basket[itemIndex].count += number;

        } else if (itemFound == false) {
            basket.unshift(products[productId - 1]);
            basket[0].count = number;
        }
    

    console.log(basket)

}
}


function removeFromBasket(productId, number = 1) {

    if (basket.length == 0) {

        console.log("Your basket is empty");

    } else if (basket.length > 0) {
        let itemIndex;
        let itemFound = false;

        basket.forEach( (item, index) =>{ 
            if(item.id == productId) {
                itemIndex = index;
                itemFound = true;
            }
        });

        if (itemFound == true) {
            if (basket[itemIndex].count > number ) {
                basket[itemIndex].count -= number;
            } else if (basket[itemIndex].count <= number) {
                basket.splice(itemIndex,1);
            }

        } 
        // else if (itemFound == false) {
        //     console.log("This product is not in your basket")
        // }
    

    console.log(basket)

}
}

function emptyBasket() {

    basket = [];
    cartContents.innerHTML = "Your basket is now empty";

    //return ("Your basket is now empty" + basket);
    console.log("Your basket is now empty");
    console.log(basket);
}


var cartContents = document.getElementById("cart-contents");

function getBasket() {

    if (basket.length > 0) {  
        cartContents.innerHTML = "";
        basket.forEach(item => {
            // console.log("There is " + item.count + " x "+ item.name + " in the basket at " + item.price + " kr each.");

            let div = document.createElement("div");
            div.classList.add("basket-item");
            div.innerHTML = `
                <div>${item.count} x</div>
                <div>${item.name}</div>
                <div>(${item.price} kr each)</div> `;
                
            cartContents.appendChild(div);
        });
        
        var totalPrice = basket.reduce(function(acc, item) {
          return acc += (item.price * item.count);
        }, 0)
  
        //console.log("The total price is " + totalPrice + "kr.")

        let div = document.createElement("div");
        div.classList.add("cart-total");
        div.innerHTML = `Total Price: ${totalPrice} kr`;
        cartContents.appendChild(div);

    } else {
        console.log("Your basket is empty");
        cartContents.innerHTML = "";
        let div = document.createElement("div");
        div.innerHTML = `Your basket is currently empty`; 
        cartContents.appendChild(div);

        /** Detta skulle utvecklas så att det finns en div med ett meddelande
         "Your basket is empty" och växla mellan attribute "hidden" beroende på varukorgens innehåll. Jag borde ha gjort detta i början för att det stör alla mina event-listeners och sidan slutar fungera när jag lägger till  den diven nu.   */
      }

}

//getBasket();

/** populate website */

var main = document.getElementsByTagName("main");
var shop = document.getElementById("shop");
var cart = document.getElementById("cart");

function populate () {

    for (let i = 0; i < products.length; i++) {
        let div = document.createElement("div");
        div.classList.add("products");
        div.innerHTML= `    <div class = "pictures">
                                <img class = "pdt" 
                                    alt="${products[i].name}"
                                    src="${products[i].image1}" 
                                    srcset="${products[i].image2} 2x, 
                                    ${products[i].image3} 4x"
                                >
                            </div>
                            <div><h3>${products[i].name}</h3></div>
                            <div>${products[i].price} kr</div>
                            <div class = "temp hidden" >Color:  ${products[i].color}  </div>  
                            <div class = "temp hidden" >Size:  ${products[i].size}
                            </div>
                            <div class = "add-basket">
                                <button value = "${products[i].id}" class = "add">Add to cart</button>
                                <div class = "amounts">
                                    <button class = "decrease">-</button>
                                    <input class = "input" type="text" value="1">
                                    <button class = "increase">+</button>
                                </div>
                            </div>
                        `
        shop.appendChild(div);
       // main[0].appendChild(div);
    }
}

{/* <button class = "increase"></button>
                              <input class = "input" type="number" value="1">
                              <button class = "decrease"></button> */}

populate()

var temp = document.getElementsByClassName("temp");

function moreDetails(e) {
    let id = parseInt(e.target.id);
    console.log(id);

    setTimeout( (id)=>{
        temp[id].classList.remove("hidden");
    },5000);
}




var pictures = document.getElementsByClassName("pictures");
var btn = document.getElementById("btn");
var emptyButton = document.getElementById("empty");
var input = document.getElementsByClassName("input");

main[0].addEventListener('click', (e)=> {

    console.log(e);
    console.log(e.target);
    
    console.log(e.target.parentNode.parentNode.childNodes);

    
    //console.log(thisProduct)
    
    
    if (e.target.className == "pdt"){
        let thisProduct = e.target.parentNode.parentNode.childNodes;

        thisProduct.forEach( item => {
            if (item.className == "temp hidden") {
                item.classList.remove("hidden");
            } 
            // else if (item.className == "temp"){
            //     item.classList.add("hidden");
            // }
        })

        setTimeout(function () {
            thisProduct.forEach( item => {
                if (item.className == "temp"){
                    item.classList.add("hidden");
                }
            })
          }, 8000)
    }

    //console.log(e.target.nextElementSibling.className);

    if (e.target.id == "btn") {
        let className = e.target.nextElementSibling.className;
        if (className == "cart hidden") {
            getBasket();
            cart.classList.remove("hidden");
            btn.innerText = "Hide Cart"
        } else if (className == "cart") {
            cart.classList.add("hidden");
            btn.innerText = "Show Cart"
        }
    }

    if (e.target.id == "bin") {
        emptyBasket();
        //getBasket();
    }

    if (e.target.className == "increase") {
       let thisInput = e.target.previousElementSibling;
       let currentValue = parseInt(thisInput.value);

       if (currentValue < 9) {
           currentValue++;
           thisInput.value = currentValue;
           console.log(currentValue);
        } else {
            alert("Please telephone or email for orders of 10 or more per cake and receive a special discount.");
        }
    }

    if (e.target.className == "decrease") {
       let thisInput = e.target.nextElementSibling;
       let currentValue = parseInt(thisInput.value);

        if (currentValue > 1) {
            currentValue--;
            thisInput.value = currentValue;
            console.log(currentValue);
        }
    }

    if (e.target.className == "add") {
      let index = parseInt(e.target.value);
      let thisInput = e.target.nextElementSibling.children[1];
      let number = parseInt(thisInput.value);
                //children[1] childNodes[3]

        addToBasket(index, number);
        getBasket();
        thisInput.value = 1;
       console.log(index);
       console.log(number);
    }

});

/** Vidare Utveckling:
 * 1.   Jag kan skapa två knappar i varukorgen vilka man kan klicka på och 
 *      öka eller minska antal av varsin produkter med en.
 */