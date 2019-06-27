var transporter =require('../.././helper/mailerConfig');

module.exports.index = function(req, res){
    transporter.send();
    res.render('react', { title: 'React Test' });
};