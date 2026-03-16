const Person=(function(){
    let count=0
    Person.getCount=function(){
        return count
    }
    return function Person(name){
        this.name=name
        count++
    }
})()