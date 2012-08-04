
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('new_index', { title: 'World' });
};
