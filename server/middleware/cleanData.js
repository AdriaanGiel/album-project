module.exports = {
    clean(req,res,next){
        return next()
    },

    setAllowedMethods(req,res,next)
    {
        if(req.method === 'OPTIONS')
        {
            res.header('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
            res.header('Allow','POST,GET,OPTIONS');
            return res.status(200).json({});
        }
    }
};
