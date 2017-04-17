module.exports = function errors(err, req, resp, next){
    if( !err){
        next();
    }else {
        resp.status(500);
        resp.json({
            status: 500,
            message: 'Server Error'
        })
    }
}
