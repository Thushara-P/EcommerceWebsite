let shops = document.getElementById("shop");


  let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateCartItems = () => {
return(shops.innerHTML = shopItemsDatas.map((shopItemsData) => {
    var search = basket.find((x) => x.id === shopItemsData.id) || [];
return (`<div class="item">
            <img width="220" src="${shopItemsData.img}"/>
            <div class="details">
                <h3>${shopItemsData.name}</h3>
                <p>${shopItemsData.desc}</p>
                <div class="price-quantity">
                    <h2>$ ${shopItemsData.price}</h2>
                    <div class="buttons">
                        <i class="ri-subtract-line" onclick="decrement(${shopItemsData.id})"></i>
                        <div class="quantity" id="${shopItemsData.id}">${search.item === undefined ? 0 : search.item}</div>
                        <i class="ri-add-line" onclick="increment(${shopItemsData.id})"></i>
                    </div>
                </div>
            </div>
        </div>`)}).join(""));
}

generateCartItems();

let increment = (id) => {

    let searchItem = id;

    let search = basket.find((x) => x.id === searchItem);

    if(search === undefined){
        basket.push({
            id: searchItem,
            item: 1
         });
    }
    else{
        search.item += 1;
    }
    console.log(basket);
    update(searchItem);
    localStorage.setItem("data" , JSON.stringify(basket));
        
}

let decrement = (id) => {
    let searchItem = id;

    let search = basket.find((x) => x.id === searchItem);

    if(search === undefined) return;
    else if(search.item === 0) return;
    else{
        search.item -= 1;
    }
    console.log(basket);

    update(searchItem);

    basket = basket.filter((x) => x.item !== 0);

    localStorage.setItem("data" , JSON.stringify(basket));

 
}

let update = (searchItem) => {
    let search = basket.find((x) => x.id === searchItem);

    document.getElementById(searchItem).innerHTML = search.item;

    calculate();
    
}

let calculate = () => {
    let cartTotal = document.querySelector(".cartAmount");
    //console.log(basket.map(x => x.item).reduce((acc , curr) => acc + curr , 0));
    cartTotal.innerHTML = basket.map(x => x.item).reduce((acc , curr) => acc + curr , 0);
}

calculate();