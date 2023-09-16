const prod = false;

const server = prod ? '' :'http://127.0.0.1:8000/'


const asset = (path) => {
    return `${server}${path}`
}


export {
    asset,
}