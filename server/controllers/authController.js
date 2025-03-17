const test = (req,rest) => {
    rest.json("test is working")
}


const registerUser = (req,res) => {
    try {
        const {name,email,password} =req.body;
    } catch (error) {

    }
}

module.exports = {
    test,
    registerUser
}