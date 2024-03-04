const watchOrders = async () => {
  const result = await fetch("http://localhost:8080/api/orders");
  const data = await result.json();
  console.log({ orders: data.result });
};

const renderOrders = async () => {
  const result = await fetch("http://localhost:8080/api/orders");
  const data = await result.json();
  const fragment = document.createDocumentFragment();
  data.result.forEach((order) => {
    const div = document.createElement("div");
    const priceP = document.createElement("p");
    const statusP = document.createElement("p");
    const numberP = document.createElement("p");
    priceP.innerHTML = `Order Total: $${order.totalPrice}`;
    statusP.innerHTML = `Status: $${order.status}`;
    numberP.innerHTML = `Order number: $${order.number}`;
    div.appendChild(numberP);
    div.appendChild(priceP);
    div.appendChild(statusP);
    fragment.appendChild(div);
  });
  const orderContainer = document.getElementById("orders");
  orderContainer.appendChild(fragment);
};

watchOrders();
renderOrders();
