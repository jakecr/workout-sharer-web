const randomInt = () => {
    let num = Math.round(Math.random() * 9999)
    if(num < 10) {
        num = '000' + num
    }
    else if(num < 100) {
        num = '00' + num
    }
    else if(num < 1000) {
        num = '0' + num
    }else {
        num = num.toString()
    }
    return num
}


module.exports = randomInt