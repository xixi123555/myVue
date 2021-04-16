const commomObject = {
    enumerable: true,
    configurable: true,
    get: undefined,
    set: undefined
}

commomObject.get = () => {
    console.log(this);
    return ''
}

commomObject.get();


let aString = 'asdfghjklaa'

function handle (str,alf){
    let sortArr = str.split(alf).map(el => el.length)
    let longst = sortArr.length > 2 ?sortArr.sort().pop() : 0
    return longst
}


let setArr = Array.from(new Set(aString.split('')))
let longst = setArr.map(el => handle(aString,el)).sort().pop()

console.log(1111,longst,setArr,aString.split(''),handle(aString,'a'));
