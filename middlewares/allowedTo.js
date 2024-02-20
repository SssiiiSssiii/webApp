function allowedTo(...roles){
    return (req, res, next) => {
        console.log(req.currUser.role);
        if(!roles.includes(req.currUser.role))
            return next(new Error("Error"));
        next();
    }
}

module.exports = {
    allowedTo
}