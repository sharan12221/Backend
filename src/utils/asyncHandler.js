
// this is the wrapper function to use in entier project -
// by passing just function as parameter in this function

// using try catch 
// const asyncHandler = (requestHandler) => async () => {
//     try {
//         await requestHandler(req, res, next)
//     }catch (error) {
//         res.status(error.code || 500).json({
//             success: false,
//             message:  error.message
//         })
//     }
// }






// using promises
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).
        catch((err) => next(err))
    }
}

export {asyncHandler}
