var myArgs = process.argv.slice(2)
let myNumber = myArgs[0]

let hexStr = Number(myNumber).toString(16)

while (hexStr.length < 64) {
    hexStr = "0" + hexStr
}

hexStr = "0x" + hexStr

console.log(hexStr)
