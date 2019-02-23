//housing your logic into usable and followable content to be exported.

module.exports = {
    // Create prodcut function
    create: ( req, res, next ) => {
        let {name, description, price, image_url} = req.body;

        req.app.get('db').create_product({name, description, price, image_url})
        .then(() => {
            res.status(200).send('Created');
        }).catch(err => res.status(500).send('Failed'));
    },

    // Read 1 product function
    getOne: (req, res, next) => {
        let {id} = req.params;

        req.app.get('db').read_product({id}).then((product)=> {
            res.status(200).send('product');
        }).catch(error => {
            res.status(500).send('Could not get product');
            console.log(error);
        });
    },
    // Read all product function
    getAll: (req, res, next) => {
        req.app.get('db').read_products().then((products)=> {
            res.status(200).send('products');
        }).catch(() => res.status(500).send('Could not get products'));
    },

    // Update product function
    update: (req, res, next) => {
        let {id} = req.params;
        let {desc} = req.query;

        req.app.get('db').update_product({id, desc}).then(() => {
            res.status(200).send('Updated');
        }).catch(()=> res.status(500).send('Failed'));
    },
    // Delete product function
    delete: (req, res, next) => {
        let {id} = req.params;

        req.app.get('db').delete_product({id}).then(() => {
            res.status(200).send('Deleted');
        }).catch(()=> res.status(500).send('Failed'));
    }
}