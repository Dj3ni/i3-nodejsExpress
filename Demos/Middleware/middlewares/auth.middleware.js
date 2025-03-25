export default auth= (req, res, next) =>{
    const token = req.headers.authorization;
    console.log("Token :", token);
    next();
}