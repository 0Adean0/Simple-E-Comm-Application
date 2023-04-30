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
      res.status(404).json({message:"No aligning tag id found"});
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

router.put('/:id', async (req, res) => {
  try{
    const UpdateTag = await Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  res.status(200).json(UpdateTag)
} catch (err){
res.status(500).json(err)
}
});
router.delete('/:id', async (req, res) => {
try{
  const DeleteTag = await Tag.destroy({
    where:{id: req.params.id
    }
  })
  if (!DeleteTag) {
    res.status(404).json({message: "No aligning teg id found"});
    return;
  }
  res.status(200).json(DeleteTag)
}catch (err){
  res.status(500).json(err)
}
});

module.exports = router;
