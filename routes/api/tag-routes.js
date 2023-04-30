const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
try {
  const TagData = await Tag.findAll({
    include: [{model: Product}]
  })
  res.status(200).json(TagData)
}catch (err){
  res.status(500).json(err);
}
});

router.get('/:id', async (req, res) => {
try {
  const TagData = await Tag.findByPk(req.params.id, {
    include: [{model:Product}]})
    if (!TagData){
      res.status(404).json({message:"No aligning category id found"});
      return;
    }
    res.status(200).json(TagData);
  }catch (err){
    res.status(500).json(err);
  }
  });

router.post('/',async (req, res) => {
try{
  const NewTag = await Tag.create(req.body);
  res.status(200).json(NewTag);
}catch (err){
  res.status(400).json(err);
}
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
