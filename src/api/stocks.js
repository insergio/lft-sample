import { instance } from "./api";

export function fetchStocksList(){
    return instance.get('/stocks').then((result)=>result.data)
}

export function fetchStocksItem(id){
    return instance.get(`/stocks/${id}`).then((result)=>result.data)
}

export function createStock(data){
    return instance.post(`/stocks/`, {...data}).then((result)=>result.data)
}

export function deleteStock(id){
    return instance.delete(`/stocks/${id}`).then((result)=>result.data)
}
