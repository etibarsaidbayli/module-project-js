const cardWrapper = document.querySelector(".card-wrapper");
const basket = document.querySelector(".basket");
const basketItems = document.querySelector(".basket-items");
let basketCount=document.querySelector('.basketCount')
basketCount.textContent=0
function getReceivingProducts() {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      for (let product of data.data) {
        html += getProductHtml(product);
      }
      cardWrapper.insertAdjacentHTML("afterbegin", html);
    });
}

getReceivingProducts();

function getProductHtml({ title, content, price, image }) {
  return `
    <div class="col-xl-3">
                <div class="card">
                    <img class="image" src="${image}" alt="">
                    <h2 class="title text-center">${title}</h2>
                    <p class="content ">${content}</p>
                    <p class="price text-center">${price}</p>
                    <button
                    data-title=${title}
                    data-price=${price}
                     class="add btn btn-secondary">Elave et</button>
                </div>
            </div>
    `;
}

basket.addEventListener("click", function (event) {
    if(event.target.matches('.basket')) {
          basketItems.classList.toggle("open");
    }

});

cardWrapper.addEventListener("click",function (event) {
    addProductToBasket(event)
    basketCount.textContent++
});

function addProductToBasket(event) {
  if (event.target.matches(".add")) {
    const button = event.target;
    const { title, price } = button.dataset;
    basketItems.insertAdjacentHTML(
      "afterbegin",
      `<div class='items-box'>
      <h3 class="title">${title}</h3>
        <p class="price">${price}</p>
        <button class='removeBtn'>Sil</button>
        </div>
        
        `
    );
  }
}

basketItems.addEventListener('click',function (event) {
    if(event.target.matches('.removeBtn')) {
        event.target.parentElement.remove()
        basketCount.textContent--
    }
})