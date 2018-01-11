class Product {
    constructor(opts = {}) {
        this.barCode = opts.barCode || '';
        this.createdName = opts.createdName || '';
        this.creationTime = __utils.time(opts.creationTime) || null;
        this.highDefinitionImage = opts.highDefinitionImage || '';
        this.id = opts.id || null;
        this.lastUpdateTime = __utils.time(opts.lastUpdateTime) || null;
        this.lastUpdatedName = opts.lastUpdatedName || '';
        this.productDescription = opts.productDescription || '';
        this.productName = opts.productName || '';
        this.productNo = opts.productNo || '';       
        this.remark = opts.remark || '';  
        this.status = opts.status || 0;  
        this.thumbnail = opts.thumbnail || '';
    }

}


export default class Pagination {
    constructor(opts = {}) {
        this.dataList = this.getDataList(opts.dataList);
        this.firstPage = opts.firstPage || 0;
        this.hasNextPage = opts.hasNextPage || false;
        this.hasPreviousPage = opts.hasPreviousPage || false;
        this.lastPage = opts.lastPage || 1;
        this.navigatePages = opts.navigatePages || 8;
        this.pageNum = opts.pageNum || 1;
        this.total = opts.total || 1;
    }

    getDataList(list) {
        let newList = [];
        list.map((res, index) => {
            newList.push(new Product(res));          
        });
        newList = newList.sort((a,b)=>{return a.id-b.id})
        return newList;
    }
}