const router = require('express').Router();
const { Category, Product } = require('../../models');
// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try{
    const CategoryData = await Category.findAll({
    include: [{model: Product}]
    })
    res.status(200).json(CategoryData)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
 try{
  const CategoryData = await Category.findByPk(req.params.id,{
    include: [{model: Product}]
  });
  if (!CategoryData) {
    res.status(404).json({message: "No aligning category id found"});
    return;
  }
  res.status(200).json(CategoryData);
 } catch (err){
  res.status(500).json(err);
 }
});

router.post('/', async (req, res) => {
try{
  const createCategory = await Category.create(req.body);
  res.status(200).json(createCategory);
}catch (err){
  res.status(400).json(err);
}
});

router.put('/:id', async (req, res) => {
try{
  const updateCategory = await Category.update({
    category_name: req.body.category_name
  },
  { where:{
  id: req.params.id,
 }   
});
res.status(200).json(updateCategory)
} catch (err) {
  res.status(500).json(err)
}
});
router.delete('/:id', async (req, res) => {
try{
  const deleteCategory = await Category.destroy ({
    where: {
      id: req.params.id
    }
  });
  if (!deleteCategory){
    res.status(404).json({message:"No aligning category id found"});
    return;
  }
  res.status(200).json(deleteCategory)
  }catch (err){
      res.status(500).json(err)
    }
  });

module.exports = router;
