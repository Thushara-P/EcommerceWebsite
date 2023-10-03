


  let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculate = () => {
   
    console.log(basket.map((x) => x.item).reduce((acc , curr) => acc + curr , 0));

    document.querySelector(".cartAmount").innerHTML = basket.map((x) => x.item).reduce((acc , curr) => acc + curr , 0);
}

calculate();

// Cart section starts here

var label = document.getElementById("label");
var shoppingCart = document.getElementById("shopping-cart");

let generateCartItems = () => {
   if(basket.length !== 0){
    return(shoppingCart.innerHTML = basket.map((x) => {
        let search = shopItemsDatas.find((y) => y.id === x.id) || [];
    return `<div class="cart-item">        
    <img src=${search.img} alt=""/>
    <div class="details" style="width: 100%;">
       <div class="title-price-x d-flex align-items-start justify-content-around">
            <h4 class="d-flex">
               <p>${search.name}</p>                   
            </h4>
            <span class="">$ ${search.price}</span>
            <i class="ri-close-line" onclick="removeItem(${x.id})"></i>
       </div>
       <div class="buttons">
                <i class="ri-subtract-line" onclick="decrement(${search.id})"></i>
                <div class="quantity" id="${search.id}">${x.item === undefined ? 0 : x.item}</div>
                <i class="ri-add-line" onclick="Increment(${search.id})"></i>
            </div>
       <h3>${x.item * search.price}</h3>
    </div>
    </div>`;
    }));
   }
   else{
      label.innerHTML = ` <h2>Card is empty</h2>
      <a href="scratchFile.html">
      <button class="HomeBtn btn btn-dark">Back to home</button>
      </a>`;
      shoppingCart.innerHTML = ``;
   }
}

generateCartItems();

let Increment = (id) => {

    let searchItem = id;

    let search = basket.find((x) => x.id === searchItem);

    if(search === undefined){
        basket.push(
         {
            id: searchItem,
            item: 1
         }            
        );
    }
    else{
        search.item += 1;
    }
    console.log(basket);
    update(searchItem);
    generateCartItems();
    localStorage.setItem("data" , JSON.stringify(basket));
        
}

let decrement = (id) => {
    let storeValue = id;

    let search = basket.find((x) => x.id === storeValue);

    if(search === undefined) return;
    else if(search.item === 0) return;
    else{
        search.item -= 1;
    }
    console.log(basket);

    update(storeValue);
    
    basket = basket.filter((x) => x.item !== 0);

    localStorage.setItem("data" , JSON.stringify(basket));
    generateCartItems();
 
}

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;

    calculate(id);
    totalAmount();
}

let removeItem = (id) => {
  basket = basket.filter((x) => x.id !== id);
  localStorage.setItem("data" , JSON.stringify(basket));
  generateCartItems();
  totalAmount();
  calculate();
}

let clearItem = () => {
    basket = [];
    generateCartItems();
    localStorage.setItem("data" , JSON.stringify(basket));
    calculate();
}

let totalAmount = () => {
   if(basket.length != 0){
    let amount = basket.map((x) =>{
        let search = shopItemsDatas.find((y) => y.id === x.id) || [];
        return x.item * search.price;
    }).reduce((acc , curr) => acc + curr , 0);
  
    label.innerHTML =  `<h2>Total Bill: $ ${amount}</h2>
    <button class="checkout">Checkout</button>
    <button onclick="clearItem()" class="RemoveAll">RemoveAll</button>
    `;

   }
   else return;
   
}

totalAmount();