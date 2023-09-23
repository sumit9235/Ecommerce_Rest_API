# Ecommerce_Rest_API

    <h1>E-commerce Backend Documentation</h1>

    <h1>E-commerce Backend Documentation</h1>
    <p>This documentation provides an overview of the key routes and functionality of an e-commerce backend built using Node.js, Express.js, and MongoDB. It includes user management, cart operations, order processing, and product management.</p>

    <h2>User Management</h2>

    <h3>User Registration</h3>
    <p><strong>Route:</strong> POST /register</p>
    <p><strong>Description:</strong> Registers a new user.</p>
    <p><strong>Responses:</strong></p>
    <ul>
        <li>201 Created: New user registered successfully.</li>
        <li>409 Conflict: User already exists.</li>
        <li>500 Internal Server Error: Registration error.</li>
    </ul>

    <h3>User Login</h3>
    <p><strong>Route:</strong> POST /login</p>
    <p><strong>Description:</strong> Logs in a user.</p>
    <p><strong>Responses:</strong></p>
    <ul>
        <li>200 OK: Login successful.</li>
        <li>400 Bad Request: Incorrect password.</li>
        <li>404 Not Found: Email does not exist.</li>
        <li>500 Internal Server Error: Login error.</li>
    </ul>

    <h2>Cart Operations</h2>

    <p><strong>Add Product to Cart:</strong> POST /addtocart</p>
    <p><strong>View Cart Products:</strong> GET /cart</p>
    <p><strong>Update Cart Item Quantity:</strong> PATCH /update</p>
    <p><strong>Remove Product from Cart:</strong> DELETE /removefromcart/:product_id</p>

    <h2>Order Processing</h2>

    <p><strong>Place Order:</strong> POST /placeorder</p>
    <p><strong>Fetch User's Order History:</strong> GET /user-orders</p>
    <p><strong>Fetch Order Details by Order ID:</strong> GET /order/:order_id</p>

    <h2>Product Management</h2>

    <h3>Product Operations</h3>
    <p><strong>Add Product:</strong> POST /addproduct</p>
    <p><strong>Change Product Availability:</strong> PUT /availability/:productId</p>
    <p><strong>Get Product Categories:</strong> GET /categories</p>
    <p><strong>Get Products by Category:</strong> GET /getcategories/:id</p>
    <p><strong>Get Product by Product ID:</strong> GET /getproduct/:id</p>

    <h2>Authentication</h2>
    <p>Authentication is implemented using JSON Web Tokens (JWT) for secure user access.</p>
    <p>Bcrypt is used for password hashing.</p>

    <h2>Notes</h2>
    <ul>
        <li>Ensure proper input validation and error handling.</li>
        <li>Set up environmental variables for sensitive information.</li>
        <li>Test API endpoints thoroughly.</li>
        <li>Consider using API documentation tools like Swagger for better visualization.</li>
    </ul>

    <p>This documentation provides a concise overview of the e-commerce backend's functionality and routes for developers and stakeholders. For a more interactive documentation experience, consider using API documentation tools.</p>