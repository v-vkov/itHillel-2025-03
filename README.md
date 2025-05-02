# 🍕 Pizza Shop API — Node.js + MongoDB Backend

## 🔧 Tech Stack

- Node.js
- Express.js
- MongoDB Atlas with Mongoose
- JWT for authentication
- Joi for input validation
- Postman for API testing

---

## 📦 Installation

1. Clone the repository
2. Run `npm install` to install dependencies
3. Create a `.env` file and add:
   - `MONGO_DB_URI=your_mongo_connection_string`
   - `JWT_SECRET=your_secret`
   - Any other necessary environment variables
4. Start the server:
   - Local: `npm run start-local`
---

## 🗂 Database Structure

**Collections:**
- `users`
- `products`
- `orders`

**Product Schema:**
```js
{
  name: String,
  unitPrice: Number,
  imageUrl: String,
  ingredients: [String],
  soldOut: Boolean
}
