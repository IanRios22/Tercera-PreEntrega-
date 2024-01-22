import fs from 'fs';

//ORIENTADO A FILESYSTEM

export default class ProductManager {
    constructor(path) {
        this.path = path;
    }
    //obtener productos del (GET)
    getProduct = async () => {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                const productsOBJ = JSON.parse(data);
                return productsOBJ;
            } else {
                // Manejar la situación donde el archivo no existe
                return [];
            }
        } catch (error) {
            console.log(`GetProduct en manager falló, error is ${error.message}`);
            // Puedes lanzar el error o manejarlo de otra manera según tus necesidades
            throw error;
        }
    };

    //Validacion de los datos
    checkProductValue = async (thisProd) => {
        isString = async (value) => {
            return typeof value === 'string';
        }
        isNumber = async (value) => {
            return typeof value === 'number';
        }
        const data = await fs.promises.readFileAsync(this.path, 'utf8');
        const productsOBJ = JSON.parse(data);
        try {
            //primera validacion, existencia de propiedades y tipo de dato de las mismas
            if (await isString(thisProd.title) === true &&
                await isString(thisProd.description) === true &&
                await isNumber(thisProd.price) === true &&
                await isString(thisProd.thumbnail) == true &&
                await isString(thisProd.category) === true &&
                await isString(thisProd.code) === true &&
                await isNumber(thisProd.stock) === true) {
                return true
            } else {
                console.log("Manager checkProductValues, primer validacion (existencia y tipo de datos) fallida.")
                return false
            }

        } catch (error) {
            console.log(`Manager CheckValues failed, ${error.message}`)
        }
    }
    //AÑADIR PRODUCTO (GET)
    addProduct = async (newProduct) => {

        const productsObj = await this.getProduct()

        try {
            if (fs.existsSync(this.path)) {
                if (await this.checkProductValue(newProduct) === true) {
                    let codeCheckIfFound = productsObj.some(x => x.code === newProduct.code)
                    if (codeCheckIfFound == true) {
                        return { status: "Failed", message: `AddProduct in manager failed, product already in database.` }
                    } else {
                        newProduct.id = productsObj.length + 1
                        productsObj.push(newProduct)
                        await fs.promises.writeFile(this.path, JSON.stringify(productsObj), null, "\t")
                        return { status: `Ok`, message: `AddProduct in manager Success.` }
                    }

                } else {
                    return { status: "Failed", message: `AddProduct in manager failed, check values of properties.` }
                }
            } else {
                return { status: "Failed", message: `AddProduct in manager failed, database doesn't exist, check path, ${this.path}` }
            }
        } catch (error) {
            console.log(`AddProduct in manager failed, error is ${error.message}`)
            return { status: `Failed`, message: `AddProduct in manager failed, error is ${error.message}.` }
        }
    }

    //OBBTENER PRODUCTO POR ID (GET)
    getProductById = async (thisId) => {
        try {
            const data = await fs.promises.readFile(this.path, "utf-8")
            const productsObj = JSON.parse(data)
            let foundId = productsObj.find(x => x.id === thisId)
            if (foundId) {
                return foundId
            } else {
                console.log("Producto NO ENCONTRADO.")
            }
        } catch (error) { console.log(`GPI error is ${error.message}`) }
    }

    //ACTUALIZAR PRODUCTO (PUT), funciona perfecto
    updateProduct = async (thisProduct) => {
        try {
            const productsObj = await this.getProduct()
            let foundProduct = productsObj.find(x => x.id === thisProduct.id)

            if (foundProduct) {

                if (await this.checkProductValue(thisProduct) === true) {
                    console.log(`UPDATE PRODUCT: Updating ${foundProduct.title + " " + foundProduct.description} with new values.`)
                    const foundIndex = productsObj.findIndex(x => x.id === thisProduct.id)
                    productsObj[foundIndex] = thisProduct
                    // console.log(thisProduct)
                    await fs.promises.writeFile(this.path, JSON.stringify(productsObj), null, "\t")
                    return { status: "Ok", message: "Update Product from manager successfull." }
                } else {
                    console.log("Update Product from manager failed, check values.")
                    return { status: "Failed", message: "Update Product from manager failed, check product values." }
                }
            } else {
                return { status: "Failed", message: "Update Product from manager, product not found in database." }
            }
        } catch (error) { console.log(`UpdateProduct in manager failed, error is ${error.message}`) }
    }

    //ELIMINAR PRODUCTO (DELETE)
    async deleteProduct(thisId) {
        try {
            const data = await fs.promises.readFile(this.path, "utf-8")
            const productsObj = JSON.parse(data)
            const foundIndex = productsObj.findIndex(x => x.id === thisId)

            if (foundIndex >= 0) {
                productsObj.splice(foundIndex, 1)
                await fs.promises.writeFile(this.path, JSON.stringify(productsObj), null, "\t")
            } else {
                console.log(`DELETE PRODUCT: Product not found.`)
            }
        } catch (error) { console.log(`DeleteProduct in manager failed, error is ${error.message}`) }
    }

}