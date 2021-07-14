const express = require('express');

const app = express()

//Add json body parser middleware
app.use(express.json())

const products = [
    { id: 1, name: "suman" },
    { id: 2, name: "kumar" },
    { id: 3, name: "jha" }
]
//Get /app
app.get('/', (req, res) => {
    res.send('Hello Suman Kumar')
})

//Get api/products

app.get('/api/products', (req, res) => {
    res.json({ products })
})

//query parameters //Get /api/products/1
app.get('/api/products/:id', (req, res) => {

    //Find the products on the basis of id 
    const product = products.find(p => p.id === parseInt(req.params.id));
    //If there is no product then send the respond wiht error 404
    if (!product) return res.status(404).send('error there is no product');
    //send the product back in the responce
    return res.json({ product })
    //return res.send(req.params)
})

//POST /api/products
app.post('/api/products', (req, res) => {

    //validate the name property
    if (!req.body.name) return res.status(400).send('Name is require field');
    //create a new products
    const product = {
        id: products.length + 1,
        name: req.body.name
    }
    //add new products to our list
    products.push(product)
    //send the newly created products in the responce
    return res.status(200).send(product)
})

//Delete 
app.delete('/api/products/:id', (req, res) => {

    //Find the products on the basis of id 
    const product = products.find(p => p.id === parseInt(req.params.id));
    //If there is no product then send the respond wiht error 404
    if (!product) return res.status(404).send('error there is no product');
    //find the index of the products
    const index = products.indexOf(product);
    //delete the product from array
    products.splice(index, 1);
    //send asimple msg recored delete
    return res.json({ msg: `product is deleted with id ${req.params.id}` })

})

//Update ENDPOINT /put ENDPOINT
app.put('/api/proucts/:id', (req, res) => {

    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('error there is no product');

    //create a new recoredToUpdate only name
    const recoredToUpdate = { id: product.id }
    //check if user wants to update only name
    if (req.body.name) {
        //add this name property to recored to update
        recoredToUpdate.name = req.body.name
    }
    //find the index of the products
    const index = products.indexOf(product)
    //update the array
    products[index] = recoredToUpdate;
    //seend the updated recored back
    return res.status(200).json(products)
})

//set environment
const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`App is running at ${PORT}`))

