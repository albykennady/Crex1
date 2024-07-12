import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getStorage, ref, listAll, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";
import { getDatabase, ref as dbRef, onValue, set } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDczLLPnaREY3SahAMeKJ-DOMyVENmWwLk",
  authDomain: "crex-f9f68.firebaseapp.com",
  databaseURL: "https://crex-f9f68-default-rtdb.firebaseio.com",
  projectId: "crex-f9f68",
  storageBucket: "crex-f9f68.appspot.com",
  messagingSenderId: "209664661907",
  appId: "1:209664661907:web:933435dab65ebb20913066"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
const database = getDatabase(app);

const username = 'Rayan';

// Function to list all images
let displayedImages = {};

function listAllImages() {
  const listRef = ref(storage, "CartFolder/cart/");

  listAll(listRef)
    .then((res) => {
      res.items.forEach((itemRef) => {
        const imageName = itemRef.name;
        if (!displayedImages[imageName]) {
          checkIfImageExists(imageName, itemRef);
        }
      });
    })
    .catch((error) => {
      console.error('Error listing images:', error.message, error.code);
    });
}

async function checkIfImageExists(imageName, itemRef) {
  const productFolders = ['Tshirt', 'Hoodie', 'Totebag', 'Raincoat', 'Jacket', 'Sweater', 'Cap'];
  let productType = '';
  let unitPrice = null;

  for (const folder of productFolders) {
    try {
      const productRef = ref(storage, `CartFolder/${folder}/${imageName}`);
      await getDownloadURL(productRef);
      productType = folder;
      unitPrice = await fetchPrice(folder.toLowerCase());
      break;
    } catch (error) {
      // Ignore error if image does not exist in the folder
    }
  }

  if (unitPrice) {
    getDownloadURL(itemRef)
      .then((url) => {
        displayImage(url, imageName, unitPrice, productType);
        displayedImages[imageName] = true;
      })
      .catch((error) => {
        console.error('Error getting download URL:', error.message, error.code);
      });
  } else {
    console.log(`Price not found for ${imageName}`);
  }
}

// Function to fetch price from the database
function fetchPrice(productType) {
  return new Promise((resolve, reject) => {
    const productRef = dbRef(database, `crex/product/${productType}`);
    onValue(productRef, (snapshot) => {
      if (snapshot.exists()) {
        resolve(snapshot.val().price);
      } else {
        reject(`No data found for ${productType}`);
      }
    }, (error) => {
      reject(error);
    });
  });
}

// Function to update quantity and recalculate price and grand total
function updateQuantity(name, change, unitPrice) {
  const quantityDisplay = document.getElementById(`quantity-${name}`);
  let quantity = parseInt(quantityDisplay.innerHTML);
  quantity = Math.max(1, quantity + change); // Ensure quantity is at least 1
  quantityDisplay.innerHTML = quantity;

  const priceDisplay = document.getElementById(`price-${name}`);
  
  const newPrice = unitPrice * quantity;
  priceDisplay.innerHTML = `$${newPrice.toFixed(2)}`;

  calculateGrandTotal(); // Calculate grand total after updating quantity and price
}

// Function to remove an item from Firebase Storage and from the cart table
function removeItem(row, imageName, itemTotal) {
  const imageRef = ref(storage, 'CartFolder/cart/' + imageName);

  // Delete the image from Firebase Storage
  deleteObject(imageRef).then(() => {
    console.log(`Image ${imageName} deleted successfully from Firebase Storage.`);
    row.remove();
    calculateGrandTotal(); // Recalculate grand total after removing the item
  }).catch((error) => {
    console.error(`Error deleting image '${imageName}':`, error.message, error.code);
  });
}

// Function to display images in the cart table
function displayImage(url, name, unitPrice, productType) {
  const tableBody = document.getElementById('cart-table').getElementsByTagName('tbody')[0];

  const row = tableBody.insertRow();

  const cellImage = row.insertCell(0);
  const cellProduct = row.insertCell(1);
  const cellQuantity = row.insertCell(2);
  const cellPrice = row.insertCell(3);
  const cellButton = row.insertCell(4);

  const img = document.createElement("img");
  img.src = url;
  img.alt = name;
  img.className = "ath-image"; 
  img.width = 100; // Adjust size as needed
  cellImage.appendChild(img);
  cellProduct.className = "product-name"; 
  cellProduct.innerHTML = productType;

  const quantityContainer = document.createElement('div');
  const minusButton = document.createElement('button');
  minusButton.innerHTML = '-';
  minusButton.addEventListener('click', () => updateQuantity(name, -1, unitPrice));

  const quantityDisplay = document.createElement('span');
  quantityDisplay.id = `quantity-${name}`;
  quantityDisplay.innerHTML = '1'; // Show 1 as default quantity

  const plusButton = document.createElement('button');
  plusButton.innerHTML = '+';
  plusButton.addEventListener('click', () => updateQuantity(name, 1, unitPrice));

  quantityContainer.appendChild(minusButton);
  quantityContainer.appendChild(quantityDisplay);
  quantityContainer.appendChild(plusButton);
  cellQuantity.appendChild(quantityContainer);

  cellPrice.id = `price-${name}`;
  cellPrice.className = "price";
  cellPrice.innerHTML = `$${(unitPrice * 1).toFixed(2)}`; // Display price for 1 quantity

  const removeButton = document.createElement('button');
  removeButton.innerHTML = 'Remove';
  removeButton.className = "remove-btn";
  removeButton.addEventListener('click', () => removeItem(row, name, unitPrice * parseInt(quantityDisplay.innerHTML)));

  cellButton.appendChild(removeButton);

  calculateGrandTotal(); // Calculate grand total after adding each item
}

// Function to calculate and display the grand total
function calculateGrandTotal() {
  const tableBody = document.getElementById('cart-table').getElementsByTagName('tbody')[0];
  let grandTotal = 0;

  for (let row of tableBody.rows) {
    const priceCell = row.cells[3];
    const price = parseFloat(priceCell.innerHTML.replace('$', ''));
    grandTotal += price;
  }

  document.getElementById('grand-total').innerHTML = `Grand Total: $${grandTotal.toFixed(2)}`;
}

// Function to generate a unique order ID
function generateOrderId() {
  return 'order_' + new Date().getTime();
}



// Function to collect order items and quantities
function collectOrderDetails() {
    const orderItems = [];
    const quantity = {};
  
    const tableBody = document.getElementById('cart-table').getElementsByTagName('tbody')[0];
    for (let row of tableBody.rows) {
      const name = row.cells[0].getElementsByTagName('img')[0].alt;
      const productType = row.cells[1].innerHTML;
      const qty = parseInt(row.cells[2].getElementsByTagName('span')[0].innerHTML);
  
      orderItems.push({ name, productType });
      quantity[name] = qty;
    }
  
    console.log('Collected Order Items:', orderItems);
    console.log('Collected Quantities:', quantity);
  
    return { orderItems, quantity };
  }
  
  // Function to add order details to the database
  function addOrderToDatabase(username, orderItems, quantity, orderDate) {
    const orderId = generateOrderId();
    const orderRef = dbRef(database, `orders/${orderId}`);
  
    const sanitizedOrderItems = orderItems.map(item => ({
      ...item,
      name: item.name.replace(/[.#$/\[\]]/g, '_')
    }));
  
    const sanitizedQuantity = {};
    for (const key in quantity) {
      sanitizedQuantity[key.replace(/[.#$/\[\]]/g, '_')] = quantity[key];
    }
  
    const orderDetails = {
      username,
      orderItems: sanitizedOrderItems,
      quantity: sanitizedQuantity,
      orderDate
    };
  
    console.log('Order Details to be added:', orderDetails);
  
    set(orderRef, orderDetails)
      .then(() => {
        console.log('Order details added to database successfully.');
      })
      .catch((error) => {
        console.error('Error adding order details to database:', error);
      });
  }
  
 // Function to handle the checkout process
function checkout() {
  const { orderItems, quantity } = collectOrderDetails();
  const orderDate = new Date().toISOString();

  // Add order details to the database
  addOrderToDatabase(username, orderItems, quantity, orderDate);

  // Clear the cart folder in Firebase Storage
  clearCartFromFirebase()
    .then(() => {
      // Clear the cart table in the UI
      const tableBody = document.getElementById('cart-table').getElementsByTagName('tbody')[0];
      tableBody.innerHTML = ''; // Clearing all rows

      // Update the grand total in the UI
      document.getElementById('grand-total').innerHTML = `Grand Total: $0.00`;

      // Redirect to feedback.html
      window.location.href = 'feedback.html';
    })
    .catch((error) => {
      console.error('Error clearing cart from Firebase:', error);
    });
}

// Function to clear the cart folder in Firebase Storage
function clearCartFromFirebase() {
  return new Promise((resolve, reject) => {
    const cartRef = ref(storage, 'CartFolder/cart/');
    listAll(cartRef)
      .then((res) => {
        const deletePromises = res.items.map((itemRef) => deleteObject(itemRef));
        Promise.all(deletePromises)
          .then(() => {
            console.log('All items deleted from Firebase Storage successfully.');
            resolve();
          })
          .catch((error) => {
            console.error('Error deleting items from Firebase Storage:', error);
            reject(error);
          });
      })
      .catch((error) => {
        console.error("Error listing items in 'cart' folder:", error);
        reject(error);
      });
  });
}

document.getElementById('checkoutBtn').addEventListener('click', () => {
  checkout();
});

  
// List all images when the page loads
 listAllImages();
