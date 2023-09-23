# Ecommerce_Rest_API

E-commerce Backend Documentation
This documentation provides an overview of the key routes and functionality of an e-commerce backend built using Node.js, Express.js, and MongoDB. It includes user management, cart operations, order processing, and product management.

User Management
User Registration
Route: POST /register
Description: Registers a new user.
Responses:
201 Created: New user registered successfully.
409 Conflict: User already exists.
500 Internal Server Error: Registration error.
User Login
Route: POST /login
Description: Logs in a user.
Responses:
200 OK: Login successful.
400 Bad Request: Incorrect password.
404 Not Found: Email does not exist.
500 Internal Server Error: Login error.
Cart Operations
Add Product to Cart: POST /addtocart
View Cart Products: GET /cart
Update Cart Item Quantity: PATCH /update
Remove Product from Cart: DELETE /removefromcart/:product_id
Order Processing
Place Order: POST /placeorder
Fetch User's Order History: GET /user-orders
Fetch Order Details by Order ID: GET /order/:order_id
Product Management
Product Operations
Add Product: POST /addproduct
Change Product Availability: PUT /availability/:productId
Get Product Categories: GET /categories
Get All Products by CategoryID: GET /getcategories/:id
*Products ahve been divided into 4 categories "Cat-I":-for Edibles product, "Cat-II":- for electronic products, "Cat-III":- for Clothing/Wearables product, "Cat-IV":- for Daily use products
Get Product by Product ID: GET /getproduct/:id
Authentication
Authentication is implemented using JSON Web Tokens (JWT) for secure user access.
Bcrypt is used for password hashing.
Notes
Ensure proper input validation and error handling.
Set up environmental variables for sensitive information.
Test API endpoints thoroughly.
Consider using API documentation tools like Swagger for better visualization.
This documentation provides a concise overview of the e-commerce backend's functionality and routes for developers and stakeholders. For a more interactive documentation experience, consider using API documentation tools.