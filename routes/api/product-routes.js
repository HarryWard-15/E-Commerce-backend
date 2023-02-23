const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  // find all products
  await Product.findAll({
		attributes: ["id", "product_name", "price", "stock", "category_id"],
		include: [
			{
				model: Tag,
				attributes: ["id", "tag_name"],
				through: "ProductTag",
			},
			{
				model: Category,
				attributes: ["id", "category_name"],
			},
		],
	})
		.then((productData) => {
			res.json(productData);
		})
		.catch((err) => {
			res.json(err);
		});
  // be sure to include its associated Category and Tag data
});

// get one product
router.get('/:id', (req, res) => {
  // find a single product by its `id`
  Product.findByPk(req.params.id, {
		include: [
			{
				model: Tag,
				attributes: ["id", "tag_name"],
				through: "ProductTag",
			},
			{
				model: Category,
				attributes: ["id", "category_name"],
			},
		],
	})
		.then((specProduct) => {
			res.json(specProduct);
		})
		.catch((err) => {
			res.json(err);
		});
  // be sure to include its associated Category and Tag data
});

// create new product
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body)
	.then((product) => {
		if (req.body.tagIds.length) {
			const productTags = req.body.tagIds.map((tag_id) => {
				return {
					product_id: product.id,
					tag_id,
				};
			});
			return ProductTag.bulkCreate(productTags);
		} else {
			  res.status(200).json(product);
			}
		})
		.then((productIds) => res.status(200).json(productIds))
		.catch((err) => {
			console.log(err);
			res.status(400).json(err);
	});
});

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete one product by its `id` value
  let delProduct = Product.findByPk(req.params.id);
	Product.destroy({
		where: {
			id: req.params.id,
		},
	})
	.then((product) => {
		res.json(`${delProduct} was removed from the database`);
	})
	.catch((err) => {
		res.json(err);
	});
});

module.exports = router;
