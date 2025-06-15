const ensureAuthenticated = require("../Middlewares/Auth");


const router = require("express").Router();

router.get("/", ensureAuthenticated ,(req, res) => {
  console.log("User authenticated:", req.user); // Log the authenticated user information
  res.status(200).json([
    {
      id: 1,
      name: "Mobile Phone",
      price: 100,
      description: "Description for Product 1",
      imageUrl: "https://via.placeholder.com/150"
    },
    {
      id: 2,
      name: " Telivision",
      price: 200,
      description: "Description for Product 2",
      imageUrl: "https://via.placeholder.com/150"
    },
    {
      id: 3,
      name: " Laptop",
      price: 300,
      description: "Description for Product 3",
      imageUrl: "https://via.placeholder.com/150"
    }
  ]);
});
module.exports = router;
