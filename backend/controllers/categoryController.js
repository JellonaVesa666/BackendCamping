//---Schema---//
// import
const Category = require("../schema/categorySchema")


//---Functions---//
// export
exports.CategoryById = (req, res, next, id) => {
  Category.findById(id).exec((error, category) => {
    if (error) {
      return res.status(400).json({
        error: "Category not found"
      });
    }
    req.category = category;
    next();
  })
}

// Get all categories
exports.GetCategories = (req, res,) => {
  Category.find().exec((error, data) => {
    if (error) {
      return res.status(400).json({
        error
      });
    }
    res.json(data);
  });
};

// Get category by using category id
exports.GetCategory = (req, res,) => {
  return res.json(req.category);
}

// Create Category from req.body
exports.CreateCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((error, data) => {
    if (error) {
      res.status(400).json({
        json: error
      });
    }
    res.json({ data });
  })
}

// Update category by categoryId
exports.UpdateCategory = (req, res,) => {
  const category = req.category;
  category.name = req.body.name;
  //console.log(req.category);
  //console.log(req.body.name);
  category.save((error, data) => {
    if (error) {
      return res.status(400).json({
        error
      });
    }
    res.json(data);
  });
};

// Delete category by categoryId
exports.DeleteCategory = (req, res,) => {
  const category = req.category;
  category.name = req.body.name;
  category.remove((error, data) => {
    if (error) {
      return res.status(400).json({
        error
      });
    }
    res.json({
      deleted: data
    });
  });
};