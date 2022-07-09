export class CollectionList {
    #collections;
    constructor(collections){
        this.#collections = collections;
    }
    get collections() {
        return this.#collections;
    }
    getName(ind){
        try {
            return this.collections[ind].name;  
        } catch (error) {
            return 'All collections'; 
        }
        
    }
    getId(ind){
        
        if (ind  >= 0){
            if (ind > this.#collections.length) return -1;
            return this.#collections[ind].id; 
        }else{
            return -1;
        } 
    }

    numberById(colId){
        let ind = this.#collections.findIndex((item) => item.id == colId);
        return ind;
    }
  }

  try {
      module.exports = {CollectionList};
  } catch (error) {
      
  }