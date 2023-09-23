# E-commerce Backend Documentation

This documentation provides an overview of the key routes and functionality of an e-commerce backend built using Node.js, Express.js, and MongoDB. It includes user management, cart operations, order processing, and product management.

# User Management

## User Registration

- **Route:** POST /register
- **Description:** Registers a new user.
- **Responses:**
  - 201 Created: New user registered successfully.
  - 409 Conflict: User already exists.
  - 500 Internal Server Error: Registration error.

## User Login

- **Route:** POST /login
- **Description:** Logs in a user.
- **Responses:**
  - 200 OK: Login successful.
  - 400 Bad Request: Incorrect password.
  - 404 Not Found: Email does not exist.
  - 500 Internal Server Error: Login error.

## Add Product to Cart

- **Route:** POST /addtocart
- **Description:** Adds a product to the user's cart.
- **Responses:**
  - 200 OK: Product added to cart.
  - 400 Bad Request: Product is unavailable.
  - 500 Internal Server Error: Cart update error.

## View Cart Products

- **Route:** GET /cart
- **Description:** Retrieves products from the user's cart.
- **Responses:**
  - 200 OK: Cart products retrieved successfully.
  - 404 Not Found: User not found.
  - 500 Internal Server Error: Cart retrieval error.

## Update Cart Item Quantity

- **Route:** PATCH /update
- **Description:** Updates the quantity of a product in the user's cart.
- **Responses:**
  - 200 OK: Quantity updated in cart.
  - 400 Bad Request: Product is unavailable or not found in cart.
  - 500 Internal Server Error: Cart update error.

## Remove Product from Cart

- **Route:** DELETE /removefromcart/:product_id
- **Description:** Removes a product from the user's cart.
- **Responses:**
  - 200 OK: Product removed from cart.
  - 400 Bad Request: Product not found in cart.
  - 500 Internal Server Error: Cart update error.

## Place Order

- **Route:** POST /placeorder
- **Description:** Places an order for cart products.
- **Responses:**
  - 200 OK: Order placed successfully.
  - 404 Not Found: User not found.
  - 500 Internal Server Error: Order placement error.

## Fetch User's Order History

- **Route:** GET /user-orders
- **Description:** Retrieves the order history of a user.
- **Responses:**
  - 200 OK: User's order history retrieved successfully.
  - 404 Not Found: User not found.
  - 500 Internal Server Error: Order history retrieval error.

## Fetch Order Details by Order ID

- **Route:** GET /order/:order_id
- **Description:** Retrieves order details by order ID.
- **Responses:**
  - 200 OK: Order details retrieved successfully.
  - 404 Not Found: Order not found.
  - 500 Internal Server Error: Order retrieval error.

# Product Management

## Add Product

- **Route:** POST /addproduct
- **Description:** Adds a new product to the database.
- **Responses:**
  - 200 OK: Product added successfully.
  - 400 Bad Request: Product addition error.

## Change Product Availability

- **Route:** PUT /availability/:productId
- **Description:** Changes the availability status of a product.
- **Responses:**
  - 200 OK: Product availability updated successfully.
  - 404 Not Found: Product not found.
  - 500 Internal Server Error: Product availability update error.

## Get All Product Categories

- **Route:** GET /categories
- **Description:** Retrieves a list of product categories.
- **Responses:**
  - 200 OK: Categories retrieved successfully.
  - 500 Internal Server Error: Categories retrieval error.

## Get Products by Category

- **Route:** GET /getcategories/:id
- **Description:** Retrieves products of a particular category. Products have been divided into 4 major categories. "Cat-I":- Edibles related product, "Cat-II":- Electronic releated products, "Cat-III":- Clothing/Wearables products, "Cat-IV":- Daily need products.
- **Responses:**
  - 200 OK: Products retrieved successfully.
  - 500 Internal Server Error: Product retrieval error.

## Get Product by Product ID

- **Route:** GET /getproduct/:id
- **Description:** Retrieves a product by its unique ID.
- **Responses:**
  - 200 OK: Product retrieved successfully.
  - 500 Internal Server Error: Product retrieval error.
