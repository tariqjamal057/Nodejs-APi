module.exports = {
    validateRegister: (req,res,next)=> {
        const email = req.body.email;
        const password = req.body.password;
        if(!email || email.length < 3) {
            return res.status(400).send({
                message: "Please enter email"
            });
        }
        if(!password || password.length < 3) {
            return res.status(400).send({
                message: "Please enter password"
            });
        }
        next(); 
    },
    validateLogin: (req,res,next)=> {
        const email = req.body.email;
        const password = req.body.password;
        if(!email || email.length < 3) {
            return res.status(400).send({
                message: "Please enter email"
            });
        }
        if(!password || password.length < 3) {
            return res.status(400).send({
                message: "Please enter password"
            });
        }
        next(); 
    }
};