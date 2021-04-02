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
console.log(this);