//--Form--//
// import
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");


//---Schema---//
// import
const Product = require("../schema/productSchema");
const { sortBy } = require("lodash");


//---Functions---//
// export
exports.ProductById = (req, res, next, id) => { // Find requested product id
  Product.findById(id).exec((error, product) => {
    if (error || !product) {
      return res.status(400).json({
        error: "Product not found"
      });
    }
    req.product = product
    next();
  })
}

// Sort by sold = /products?sortBy=sold&order=desc&limit=4
// Sort by newest = /products?sortBy=createdAt&order=desc&limit=4
// if no parameters given then all products are returned
exports.GetProducts = (req, res) => {
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let order = req.query.order ? req.query.order : "asc";
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  Product.find()
    .select("-photo") // Remove photo from query to limit response size
    .sort([[sortBy, order]]) // Get sortBy from req.query
    .limit(limit) // Get limit from req.query
    .exec((error, products) => {
      if (error) {
        return res.status(400).json({
          error: "Products not found"
        });
      }
      res.json(products);
    });
}

exports.GetProduct = (req, res) => { // Get requested product details by the id
  req.product.photo = undefined;
  return res.json(req.product);
}

exports.DeleteProduct = (req, res) => { // Get requested product details by the id
  let product = req.product;
  product.remove((error, product) => {
    if (error) {
      return res.status(400).json(error);
    }
  })
  res.json({
    deleted: product
  });
}

// Finds products by req.product category id
exports.ReleatedProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  Product.find({
    _id: { $ne: req.product },  // Used for filtering out current product, finds products id's expect req.product id "$ne=not included"
    category: req.product.category
  }).limit(limit) // Find products with same category and limit collection amount according to set limit
    .populate("category", "_id name")
    .exec((error, products) => {
      if (error) {
        return res.status(400).json({
          error: "Products not found",
        });
      }
      return res.json(products);
    })
}

exports.CreateProduct = (req, res) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true;
  form.parse(req, (error, fields, files) => {
    if (error) {
      return res.status(400).json({
        error: "Image could not be uploaded"
      });
    }

    // Check for a form fields that they are filled
    const { name, description, price, category, quantity, shipping } = fields;

    if (!name || !description || !price || !category || !quantity || !shipping) {
      return res.status(400).json({
        error: "Required fields not filled",
      });
    }

    let product = new Product(fields);

    // 1kb = 100
    // 1mb = 1000000
    if (files.photo) {
      console.log("FILES PHOTO: ", files.photo.filepath);
      if (files.photo.size > 1000000) { // Check image size
        return res.status(400).json({
          error: "Image should be less than 1mb in size",
        });
      }
      product.photo.data = fs.readFileSync(files.photo.filepath); // change path to filepath
      product.photo.contentType = files.photo.mimetype; // change typt to mimetype
    }

    product.save((error, result) => { // Save product to database
      if (error) {
        return res.status(400).json(error);
      }
      res.json(result);
    })
  })
}

exports.UpdateProduct = (req, res) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true;
  form.parse(req, (error, fields, files) => {
    if (error) {
      return res.status(400).json({
        error: "Image could not be uploaded"
      });
    }

    // Check for a form fields that they are filled
    const { name, description, price, category, quantity, shipping } = fields;

    if (!name || !description || !price || !category || !quantity || !shipping) {
      return res.status(400).json({
        error: "Required fields not filled",
      });
    }

    let product = req.product;
    product = _.extend(product, fields);
    console.log(product);

    // 1kb = 100
    // 1mb = 1000000
    if (files.photo) {
      console.log("FILES PHOTO: ", files.photo.filepath);
      if (files.photo.size > 1000000) { // Check image size
        return res.status(400).json({
          error: "Image should be less than 1mb in size",
        });
      }
      product.photo.data = fs.readFileSync(files.photo.filepath); // change path to filepath
      product.photo.contentType = files.photo.mimetype; // change typt to mimetype
    }

    product.save((error, result) => { // Save product to database
      if (error) {
        return res.status(400).json(error);
      }
      res.json(result);
    })
  })
}

exports.GetCategories = (req, res) => {
  Product.distinct("category", {}, (error, categories) => {
    if (error) {
      return res.status(400).json({
        error: "Products not found",
      });
    }
    return res.json(categories);
  })
}

exports.SearchProducts = (req,res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? req.body.limit : "100";
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
         findArgs[key] = {
          $gte: req.body.filters[key][0], // $gte = greater than
          $lte: req.body.filters[key][1] // $lte = less than
          // example if price is between 0-100, key[0]=0 and key[1]=100
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  Product.find(findArgs)
  .select("-photo")
  .populate("category")
  .sort([[sortBy, order]])
  .skip(skip)
  .limit(limit)
  .exec((err, data) => {
      if (err) {
          return res.status(400).json({
              error: "Products not found"
          });
      }
      res.json({
          size: data.length,
          data
      });
  });
};