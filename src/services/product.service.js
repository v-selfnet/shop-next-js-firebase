const { default: DbConnect } = require("./DbConnect")

export const getProductsFromDb = async () => {
    const db = await DbConnect();
    const productCollection = db.collection('products');
    return productCollection.find({}).toArray();
}