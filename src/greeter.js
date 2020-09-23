class Student{
    constructor(obj){
        this.accountBook=obj.accountBook
    }

    bookId = () =>{
        return this.accountBook.tenant.domainName;
    }
}

let obj = new Student({
    accountBook:{
        tenant:{
            domainName:"domainName:域名"
        }
    }
})

console.log(obj.bookId())