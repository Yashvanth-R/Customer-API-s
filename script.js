const express = require('express');
const Joi = require('joi');
const app = express(); //This creates an express applcation on the app variable
app.use(express.json());

const customers = [
    {title: 'George', id: 1},
    {title: 'John', id: 2},
    {title: 'Jane', id: 3},
    {title: 'Vishnu', id: 4},
    {title: 'Manoj', id: 5}
];

app.get('/', (req, res) => {
    res.send('Welcome to the Customers API');
});

app.get('/api/customers', (req, res) => {
    res.send(customers);
});

app.get('/api/customers/:id', (req, res) => {
    const customer = customers.find(c => c.id === parseInt(req.params.id));
    if (!customer) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: red;">Customer not found</h2>');
    res.send(customer);
});

//Request Handler for POST method
app.post('/api/customers', (req, res) => {

    const {error} = validateCustomer(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const customer = {
        id: customers.length + 1,
        title: req.body.title
    };
    customers.push(customer);
    res.send(customer);
});

//Request Handler for PUT method
// app.put('/api/customers/:id', (req,res) => {
//     const customer = customers.find(c => c.id === parseInt(req.params.id));
//     if(!customer) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: red;">Customer not found</h2>');

//     const 
// )

//Validation Information
function validateCustomer(customer) {
    const schema ={
        title: Joi.string().min(3).required()
    };
    return Joi.validate(customer, schema);
}

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));