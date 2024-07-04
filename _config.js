var config = {}

// Update to have your correct username and password
config.mongoURI = {
    production: 'mongodb+srv://root:1234@cluster0.b1qkznk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    development: 'mongodb+srv://root:1234@cluster0.b1qkznk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    test: 'mongodb+srv://root:1234@cluster0.b1qkznk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
}
module.exports = config;
