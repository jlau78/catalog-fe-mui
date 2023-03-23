import axios, {AxiosResponse} from "axios";

// TODO: Could not get config or config.json to work. Startup errors with webpack.
// import config from "config";
// import config from 'config.json'

// const conf = require('config.json')('../config/default.json')

// const apiUrl = conf.services.internal.catalog_api.url;
// const apiUrl = config.get('services.internal.catalog-api.url')
const apiUrl = "http://localhost:4000"

export const getItems = async() => {

    try {
        const items = await axios.get(
            apiUrl + "/items"
        )
        return items

    } catch (error) {
        console.log(error)
        throw error
    }
    
}

export const getItemsByQuery = async(query) => {
    try {
        const items = await axios.get(
            apiUrl + `/items/${query}`
        )
        console.log(`Get item by query:${query}: items:${items}`)

        return items

    } catch (error) {
        console.log(error)
        throw error
    }
}

export const getItem = async(itemId)  => {
    try {
        const item = await axios.get(
            apiUrl + `/item/${itemId}`);
        
        return item;

    } catch (error) {
        console.log(error)
        throw error
    }
}

export const addItem = async(formData) => {
    try {
        const item = {
            itemId: formData.itemId,
            name: formData.name,
            description: formData.description,
            fullDescription: formData.fullDescription,
            price: formData.price,
            areaCodes: formData.areaCodes,
            thumbnails: formData.thumbnails,
            featureList: formData.featureList
        }

        const saveItem = await axios.post(
            apiUrl + "/add-item",
            item
        )
        
        return saveItem

    } catch (error) {
        console.log(error)
        throw error
    }
}

export const updateItem = async(item) => {
    try {
        const itemToUpdate = {
            itemId: item.itemId,
            name: item.name,
            description: item.description,
            fullDescription: item.fullDescription,
            price: item.price,
            areaCodes: item.areaCodes,
            thumbnails: item.thumbnails,
            featureList: item.featureList
        }


        const updatedItem = await axios.put(
            `${apiUrl}/update-item/${item.itemId}`,
            itemToUpdate
        )
        return updatedItem

    } catch (error) {
        console.log(error)
        throw error
    }
}

export const deleteItem = async(itemId) => {
    try {
        const deletedItem = await axios.delete(
            `${apiUrl}/delete-item/${itemId}`
        )
        return deletedItem;

    } catch (error) {
        console.log(error)
        throw error
    }
}