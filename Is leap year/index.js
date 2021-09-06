const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const isLeap = (year) => {
    if (year >= 1900 && year <= Math.pow(10, 5)) {
        return (year % 400 === 0) ? true : (year % 100 === 0) ? false : year % 4 === 0
    } 

    return "The year must be greater than 1900 and less than 10^5"
}

const readLine = () => {
    rl.question('Enter a year: ', answer => {
        if (isNaN(parseInt(answer))) {
            console.log("Enter a number!\n")
            readLine()    
            return        
        }
        console.log(isLeap(parseInt(answer)))
        continueQuestion()
        //rl.close()
    })
}

const continueQuestion = () => {
    rl.question('Do you want to continue? [y/N]: ', answer => {
        if (answer === 'Y' || answer === 'y') {
            readLine()
            return
        }
        rl.close()
        return process.exit(1)
    })
}


const main = () => {
    readLine()
}

if (require.main === module) {
    main()
}