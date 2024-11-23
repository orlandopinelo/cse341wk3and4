const productSchema = require('../model/Product');

const getAllProducts = async (req, res) => {
    //#swagger.tags=['Products']
    try {
        const products = await productSchema.find();
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error.message);
        res.status(500).json({ error: 'Failed to retrieve products' });
    }
};


const getSingleProduct = async (req, res) => {
    //#swagger.tags=['Products']
    try {
        const productId = req.params.id;
        const product = await productSchema.findById(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error('Error fetching product:', error.message);
        res.status(500).json({ error: 'Failed to retrieve product' });
    }
};


const createProduct = async (req, res) => {
    //#swagger.tags=['Products']
    try {
        const product = new productSchema({
            productName: req.body.productName,
            price: req.body.price,
            description: req.body.description,
            quantity: req.body.quantity,
            purchaseDate: req.body.purchaseDate,
            discount: req.body.discount,
            providerId: req.body.providerId,
        });

        const response = await product.save();
        res.status(201).json(response);
    } catch (error) {
        console.error('Error creating product:', error.message);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: 'Failed to create product' });
    }
};


const updateProduct = async (req, res) => {
    //#swagger.tags=['Products']
    try {
        const productId = req.params.id;
        const updatedProduct = {
            productName: req.body.productName,
            price: req.body.price,
            description: req.body.description,
            quantity: req.body.quantity,
            purchaseDate: req.body.purchaseDate,
            discount: req.body.discount,
            providerId: req.body.providerId,
        };

        const response = await productSchema.findByIdAndUpdate(productId, updatedProduct, {
            new: true, // Return the updated document
            runValidators: true, // Validate updates against schema
        });

        if (!response) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json(response);
    } catch (error) {
        console.error('Error updating product:', error.message);
        res.status(500).json({ error: 'Failed to update product' });
    }
};


const deleteProduct = async (req, res) => {
    //#swagger.tags=['Products']
    try {
        const productId = req.params.id;
        const response = await productSchema.findByIdAndDelete(productId);

        if (!response) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(204).send(); // Successfully deleted, no content
    } catch (error) {
        console.error('Error deleting product:', error.message);
        res.status(500).json({ error: 'Failed to delete product' });
    }
};



module.exports = {getAllProducts,getSingleProduct,createProduct,updateProduct,deleteProduct};
