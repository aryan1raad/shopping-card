//دیتای آرایه
const products = [{
    id: "iphone-14-pro-1tb-Silver",
    name: "Apple iPhone 14 Pro 1TB Silver (MQ2V3)",
    price: 1499,
    image: "./Recources/Iphones/Iphone 14 pro 1.png",
},
{
    id: "iphone-11-normal-128GB-white",
    name: "Apple iPhone 11 128GB White (MQ233)",
    price: 510,
    image: "./Recources/Iphones/Iphone 14 pro 1.png",
},
{
    id: "iphone-14-pro-1tb-gold",
    name: "Apple iPhone 14 Pro 1TB Gold (MQ2V3)",
    price: 1499,
    image: "./Recources/Iphones/Iphone 3.png",
}];

//استیت
const cart = new Map();

//فرمت قیمت
const formatPrice = (price) => `$${price}`;

//ایونت هندلر با Event delegation
document.addEventListener('click', (e) => {
    //باتن
    if (e.target.classList.contains('btnp')) {
        const productDiv = e.target.closest('.in-grid');
        const productId = productDiv.dataset.id;
        
        // Add to cart
        const currentQuantity = cart.get(productId) || 0;
        console.log(currentQuantity);
        cart.set(productId, currentQuantity + 1);
        
        updateUI();
    }
    //جمع
    if (e.target.closest('.jam')){
        const productId = e.target.closest('.jam').dataset.productId;
        const currentQuantity = cart.get(productId) || 0;
        cart.set(productId, currentQuantity + 1);
        updateUI();
    }
    //کسر
    if (e.target.closest('.kasr')){
        const productId = e.target.closest('.kasr').dataset.productId;
        const currentQuantity = cart.get(productId) || 0;
        if (currentQuantity > 1) {
            cart.set(productId, currentQuantity - 1);
        } else {
            cart.delete(productId);
        }
        updateUI();

    }
});

function updateUI() {
  const cartContainer = document.querySelector(".top-right");
  if (!cartContainer) return;

  // پاک کردن همهٔ .addeds های قبلی (بدون ایجاد متغیر جدید)
  while (cartContainer.querySelector('.addeds')) {
    cartContainer.querySelector('.addeds').remove();
  }

  // اگر کارت خالی است، پیام نمایش بده
  if (cart.size === 0) {
    cartContainer.insertAdjacentHTML('beforeend',
      `<div class="addeds" style="opacity:.6">Cart is empty</div>`
    );
    return;
  }

  // رندر کردن آیتم‌های کارت
  cart.forEach ((quantity, productId) => {
    const mahsooleGerefte = products.find(p => p.id === productId);
    if (mahsooleGerefte) {
      const itemDiv = document.createElement("div");
      itemDiv.className = "addeds";
      itemDiv.innerHTML = `
        <div class="tedad" style="border: 10px #0055ff solid; width: 4rem; aspect-ratio: 1/1; border-radius: 50%; display: flex; justify-content: center; align-items: center;">
          ${quantity}
        </div>
        <div class="esm">${mahsooleGerefte.name}</div>
        <div class="gheymat">${formatPrice(mahsooleGerefte.price * quantity)}</div>
        <div class="math" style="display: flex; gap: 0.5rem; height: 2rem; width:max-content;">
          <div class="jam" data-product-id="${mahsooleGerefte.id}">
            <div>+</div>
          </div>
          <div class="kasr" data-product-id="${mahsooleGerefte.id}">
            <div>-</div>
          </div>
        </div>
      `;
      cartContainer.appendChild(itemDiv);

    }
  });
}
