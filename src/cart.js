function notImplemented() {
  throw new Error("Корзина ещё не реализована. Сначала прочитайте тесты.");
}

function addToCart(cart, product, quantity) {
  if (quantity <= 0) {
    throw new RangeError("Количество должно быть больше нуля");
  }

  if (product.stock < quantity) {
    throw new RangeError("Количество товара на складе должно быть больше нуля");
  }

  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ ...product, quantity: quantity });
  }
  return cart;
}
function changeQuantity(cart, productId, quantity) {
  if (quantity <= 0) {
    throw new RangeError("Нельзя добавить товар меньше или ровно нулю");
  }

  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    if (existingItem.stock < quantity) {
      throw new RangeError("Нельзя добавить товар меньше или ровно нулю");
    }
    existingItem.quantity = quantity;
  }

  return cart;
}
function removeFromCart(cart, productId) {
  const filteredCart = cart.filter((product) => product.id !== productId);
  return filteredCart;
}
function calculateCartSubtotal(cart) {
  let totalSum = 0;

  cart.forEach((product) => {
    const productsPrice = product.price * product.quantity;
    totalSum += productsPrice;
  });
  return totalSum;
}
function calculateOrderTotal(cart, promocode) {
  const subtotal = cart.reduce((sum, product) => {
    return (sum += product.price * product.quantity);
  }, 0);

  let discount = 0;
  let delivery = 0;
  let total = 0;

  if (subtotal < 50000) {
    delivery = 30000;
  }

  if (promocode === "SAVE10") {
    if (subtotal >= 20000) {
      discount = subtotal * 0.1;
    }
  }

  total = subtotal - discount + delivery;

  return { subtotal, discount, delivery, total };
}

const cartApi = {
  addToCart,
  changeQuantity,
  removeFromCart,
  calculateCartSubtotal,
  calculateOrderTotal,
};

if (typeof module !== "undefined") module.exports = cartApi;
if (typeof window !== "undefined") window.cartApi = cartApi;
