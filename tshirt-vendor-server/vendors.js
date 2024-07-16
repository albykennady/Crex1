const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());  // Enable CORS
app.use(express.json());

const vendors = [
  {
    "id": 1,
    "name": "Vendor A",
    "tshirts": [
      { "id": 1, "size": "M", "color": "Red", "price": 19.99 },
      { "id": 2, "size": "L", "color": "Blue", "price": 21.99 },
      { "id": 3, "size": "S", "color": "Green", "price": 18.99 },
      { "id": 4, "size": "XL", "color": "Black", "price": 22.99 },
      { "id": 5, "size": "M", "color": "Yellow", "price": 20.99 },
      { "id": 6, "size": "L", "color": "White", "price": 19.49 },
      { "id": 7, "size": "S", "color": "Purple", "price": 21.49 },
      { "id": 8, "size": "XL", "color": "Pink", "price": 23.49 },
      { "id": 9, "size": "M", "color": "Orange", "price": 18.49 },
      { "id": 10, "size": "L", "color": "Gray", "price": 20.49 },
      { "id": 11, "size": "S", "color": "Brown", "price": 22.49 },
      { "id": 12, "size": "XL", "color": "Cyan", "price": 24.49 },
      { "id": 13, "size": "M", "color": "Magenta", "price": 19.99 },
      { "id": 14, "size": "L", "color": "Teal", "price": 21.99 },
      { "id": 15, "size": "S", "color": "Lime", "price": 18.99 },
      { "id": 16, "size": "XL", "color": "Navy", "price": 22.99 },
      { "id": 17, "size": "M", "color": "Olive", "price": 20.99 },
      { "id": 18, "size": "L", "color": "Maroon", "price": 19.49 },
      { "id": 19, "size": "S", "color": "Silver", "price": 21.49 },
      { "id": 20, "size": "XL", "color": "Gold", "price": 23.49 },
      { "id": 21, "size": "M", "color": "Coral", "price": 18.49 },
      { "id": 22, "size": "L", "color": "Turquoise", "price": 20.49 },
      { "id": 23, "size": "S", "color": "Ivory", "price": 22.49 },
      { "id": 24, "size": "XL", "color": "Beige", "price": 24.49 },
      { "id": 25, "size": "M", "color": "Red", "price": 19.99 },
      { "id": 26, "size": "L", "color": "Blue", "price": 21.99 },
      { "id": 27, "size": "S", "color": "Green", "price": 18.99 },
      { "id": 28, "size": "XL", "color": "Black", "price": 22.99 },
      { "id": 29, "size": "M", "color": "Yellow", "price": 20.99 },
      { "id": 30, "size": "L", "color": "White", "price": 19.49 },
      { "id": 31, "size": "S", "color": "Purple", "price": 21.49 },
      { "id": 32, "size": "XL", "color": "Pink", "price": 23.49 },
      { "id": 33, "size": "M", "color": "Orange", "price": 18.49 },
      { "id": 34, "size": "L", "color": "Gray", "price": 20.49 },
      { "id": 35, "size": "S", "color": "Brown", "price": 22.49 },
      { "id": 36, "size": "XL", "color": "Cyan", "price": 24.49 },
      { "id": 37, "size": "M", "color": "Magenta", "price": 19.99 },
      { "id": 38, "size": "L", "color": "Teal", "price": 21.99 },
      { "id": 39, "size": "S", "color": "Lime", "price": 18.99 },
      { "id": 40, "size": "XL", "color": "Navy", "price": 22.99 },
      { "id": 41, "size": "M", "color": "Olive", "price": 20.99 },
      { "id": 42, "size": "L", "color": "Maroon", "price": 19.49 },
      { "id": 43, "size": "S", "color": "Silver", "price": 21.49 },
      { "id": 44, "size": "XL", "color": "Gold", "price": 23.49 },
      { "id": 45, "size": "M", "color": "Coral", "price": 18.49 },
      { "id": 46, "size": "L", "color": "Turquoise", "price": 20.49 },
      { "id": 47, "size": "S", "color": "Ivory", "price": 22.49 },
      { "id": 48, "size": "XL", "color": "Beige", "price": 24.49 },
      { "id": 49, "size": "M", "color": "Red", "price": 19.99 },
      { "id": 50, "size": "L", "color": "Blue", "price": 21.99 }
    ]
  },
  {
    "id": 2,
    "name": "Vendor B",
    "tshirts": [
      { "id": 1, "size": "S", "color": "Green", "price": 18.99 },
      { "id": 2, "size": "XL", "color": "Black", "price": 22.99 },
      { "id": 3, "size": "M", "color": "Yellow", "price": 20.99 },
      { "id": 4, "size": "L", "color": "White", "price": 19.49 },
      { "id": 5, "size": "S", "color": "Purple", "price": 21.49 },
      { "id": 6, "size": "XL", "color": "Pink", "price": 23.49 },
      { "id": 7, "size": "M", "color": "Orange", "price": 18.49 },
      { "id": 8, "size": "L", "color": "Gray", "price": 20.49 },
      { "id": 9, "size": "S", "color": "Brown", "price": 22.49 },
      { "id": 10, "size": "XL", "color": "Cyan", "price": 24.49 },
      { "id": 11, "size": "M", "color": "Magenta", "price": 19.99 },
      { "id": 12, "size": "L", "color": "Teal", "price": 21.99 },
      { "id": 13, "size": "S", "color": "Lime", "price": 18.99 },
      { "id": 14, "size": "XL", "color": "Navy", "price": 22.99 },
      { "id": 15, "size": "M", "color": "Olive", "price": 20.99 },
      { "id": 16, "size": "L", "color": "Maroon", "price": 19.49 },
      { "id": 17, "size": "S", "color": "Silver", "price": 21.49 },
      { "id": 18, "size": "XL", "color": "Gold", "price": 23.49 },
      { "id": 19, "size": "M", "color": "Coral", "price": 18.49 },
      { "id": 20, "size": "L", "color": "Turquoise", "price": 20.49 },
      { "id": 21, "size": "S", "color": "Ivory", "price": 22.49 },
      { "id": 22, "size": "XL", "color": "Beige", "price": 24.49 },
      { "id": 23, "size": "M", "color": "Red", "price": 19.99 },
      { "id": 24, "size": "L", "color": "Blue", "price": 21.99 },
      { "id": 25, "size": "S", "color": "Green", "price": 18.99 },
      { "id": 26, "size": "XL", "color": "Black", "price": 22.99 },
      { "id": 27, "size": "M", "color": "Yellow", "price": 20.99 },
      { "id": 28, "size": "L", "color": "White", "price": 19.49 },
      { "id": 29, "size": "S", "color": "Purple", "price": 21.49 },
      { "id": 30, "size": "XL", "color": "Pink", "price": 23.49 },
      { "id": 31, "size": "M", "color": "Orange", "price": 18.49 },
      { "id": 32, "size": "L", "color": "Gray", "price": 20.49 },
      { "id": 33, "size": "S", "color": "Brown", "price": 22.49 },
      { "id": 34, "size": "XL", "color": "Cyan", "price": 24.49 },
      { "id": 35, "size": "M", "color": "Magenta", "price": 19.99 },
      { "id": 36, "size": "L", "color": "Teal", "price": 21.99 },
      { "id": 37, "size": "S", "color": "Lime", "price": 18.99 },
      { "id": 38, "size": "XL", "color": "Navy", "price": 22.99 },
      { "id": 39, "size": "M", "color": "Olive", "price": 20.99 },
      { "id": 40, "size": "L", "color": "Maroon", "price": 19.49 },
      { "id": 41, "size": "S", "color": "Silver", "price": 21.49 },
      { "id": 42, "size": "XL", "color": "Gold", "price": 23.49 },
      { "id": 43, "size": "M", "color": "Coral", "price": 18.49 },
      { "id": 44, "size": "L", "color": "Turquoise", "price": 20.49 },
      { "id": 45, "size": "S", "color": "Ivory", "price": 22.49 },
      { "id": 46, "size": "XL", "color": "Beige", "price": 24.49 },
      { "id": 47, "size": "M", "color": "Red", "price": 19.99 },
      { "id": 48, "size": "L", "color": "Blue", "price": 21.99 },
      { "id": 49, "size": "S", "color": "Green", "price": 18.99 },
      { "id": 50, "size": "XL", "color": "Black", "price": 22.99 }
    ]
  },
  {
    id: 3,
    name: "Athira",
    tshirts: Array.from({ length: 100 }, (_, index) => ({
      id: index + 1,
      size: "free-size",
      price: 25.99
    }))
  }
  
];

// Get all vendors
app.get('/vendors', (req, res) => {
  res.json(vendors);
});

// Get a single vendor by ID
app.get('/vendors/:id', (req, res) => {
  const vendor = vendors.find(v => v.id === parseInt(req.params.id));
  if (!vendor) return res.status(404).send('Vendor not found');
  res.json(vendor);
});

// Get T-shirts for a specific vendor
app.get('/vendors/:id/tshirts', (req, res) => {
  const vendor = vendors.find(v => v.id === parseInt(req.params.id));
  if (!vendor) return res.status(404).send('Vendor not found');
  res.json(vendor.tshirts);
});

// Add a new vendor
app.post('/vendors', (req, res) => {
  const newVendor = {
    id: vendors.length + 1,
    name: req.body.name,
    tshirts: req.body.tshirts || []
  };
  vendors.push(newVendor);
  res.status(201).json(newVendor);
});

// Add a new T-shirt to a vendor
app.post('/vendors/:id/tshirts', (req, res) => {
  const vendor = vendors.find(v => v.id === parseInt(req.params.id));
  if (!vendor) return res.status(404).send('Vendor not found');
  const newTshirt = {
    id: vendor.tshirts.length + 1,
    size: req.body.size,
    color: req.body.color,
    price: req.body.price
  };
  vendor.tshirts.push(newTshirt);
  res.status(201).json(newTshirt);
});

// Update a vendor
app.put('/vendors/:id', (req, res) => {
  const vendor = vendors.find(v => v.id === parseInt(req.params.id));
  if (!vendor) return res.status(404).send('Vendor not found');
  vendor.name = req.body.name;
  vendor.tshirts = req.body.tshirts;
  res.json(vendor);
});

// Delete a vendor
app.delete('/vendors/:id', (req, res) => {
  const vendorIndex = vendors.findIndex(v => v.id === parseInt(req.params.id));
  if (vendorIndex === -1) return res.status(404).send('Vendor not found');
  vendors.splice(vendorIndex, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
