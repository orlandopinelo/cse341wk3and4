const customerSchema = require('../model/Customer');

const getAllCustomers = async (req, res) => {
    try {
        //#swagger.tags=['Customers']
        const customers = await customerSchema.find();
        res.status(200).json(customers);
    } catch (error) {
        console.error('Error fetching customers:', error.message);
        res.status(500).json({ error: 'Failed to fetch customers' });
    }
};
 

const getSingleCustomer = async (req, res) => {
    try {
        //#swagger.tags=['Customers']
        const contactId = req.params.id; // Mongoose handles string to ObjectId conversion
        const customer = await customerSchema.findById(contactId);

        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        res.status(200).json(customer);
    } catch (error) {
        console.error('Error fetching customer:', error.message);
        res.status(500).json({ error: 'Failed to fetch customer' });
    }
};



const createCustomer = async (req, res) => {
    //#swagger.tags=['Customers']
    try {
        // Create a new instance of the schema with data from the request body
        const customer = new customerSchema({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            itin: req.body.itin,
            businessName: req.body.businessName,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address
        });

        // Save the document to the database
        const response = await customer.save();

        // Send the response with the created document
        res.status(201).json(response);
    } catch (error) {
        console.error('Error creating customer:', error.message);

        // Handle validation errors or other issues
        if (error.name === 'ValidationError') {
            res.status(400).json({ error: error.message }); // Bad Request
        } else {
            res.status(500).json({ error: 'Some error occurred while creating the contact' });
        }
    }
};


const updateCustomer = async (req, res) => {
    //#swagger.tags=['Customers']
    try {
        const contactId = req.params.id; // Mongoose will convert to ObjectId
        const updateCustomerData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            itin: req.body.itin,
            businessName: req.body.businessName,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address
        };

        const response = await customerSchema.findByIdAndUpdate(contactId, updateCustomerData, {
            new: true, // Return the updated document
            runValidators: true, // Validate the update against the schema
        });

        if (!response) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        res.status(204).send(); // No content to send back
    } catch (error) {
        console.error('Error updating customer:', error.message);
        res.status(500).json({ error: 'Some error occurred while updating the contact' });
    }
};

const deleteCustomer = async (req, res) => {
    //#swagger.tags=['Customers']
    try {
        const contactId = req.params.id; // Mongoose will convert to ObjectId
        const response = await customerSchema.findByIdAndDelete(contactId);

        if (!response) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        res.status(204).send(); // No content to send back
    } catch (error) {
        console.error('Error deleting customer:', error.message);
        res.status(500).json({ error: 'Some error occurred while deleting the contact' });
    }
};



module.exports = {getAllCustomers,getSingleCustomer,createCustomer,updateCustomer,deleteCustomer};
