const router = require('express').Router();
const File = require('../models/file');

router.get('/:uuid', async (req, res) => {
   // Extract link and get file from storage send download stream 
   const file = await File.findOne({ uuid: req.params.uuid });
   // Link expired
   if(!file) {
        return res.render('download', { error: 'Link has been expired.'});
   } 
   file.downloaded = true;
   const response = await file.save();
   const filePath = `../${file.path}`;
   res.download(filePath);
});


module.exports = router;