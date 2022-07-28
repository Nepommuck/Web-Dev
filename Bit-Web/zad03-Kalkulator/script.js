correct = false

function calculate() {
    console.log("Calculate")
    dozw = "0123456789+-*/()[]. \t\n^"
    let nap = document.getElementById("inp").value
    let result = document.getElementById("result")
    // return eval(akt)

    correct = true
    just_space = true
    for (let i=0; i<nap.length; i++) {
        if (!dozw.includes(nap.charAt(i))) {
            result.value = "Invalid character: " + nap.charAt(i)
            correct = false
        }
        if (nap.charAt(i) != ' ')
            just_space = false
    }

    if (just_space) {
        result.style.color = 'lightgray'
        result.value = 'Result'
        correct = false
        return correct
    }

    if (correct) {
        try {
            result.value = eval(
                to_calc(nap)
            ).toPrecision(5)
            correct = true
        }
        catch(err) {
            result.value = "Incorrect expression"
            correct = false
        }
    }

    if (correct)
        result.style.color = 'gray'
    else
        result.style.color = 'lightgray'

    return correct
}

function get_answer() {
    if (correct) {
        let ans = document.getElementById("result").value
        if (ans.includes('e')) {
            let num = eval(to_calc(
                document.getElementById('inp').value
            ))
            let exp = 0

            while (num < 1) {
                num *= 10
                exp -= 1
            }
            while (num > 10) {
                num /= 10
                exp += 1
            }
            
            ans = ''
            if (num != 1)
                ans += num.toPrecision(5) + '*'
            ans += '10^' + exp
        }
        document.getElementById("inp").value = ans
    }
}

//   '^' -> '**'
function to_calc(str) {
    let nstr = str
    for (let i=0; i<nstr.length; i++)
        if (nstr.charAt(i) == '^')
            nstr = nstr.slice(0, i) + '**' + nstr.slice(i+1)
    return nstr
}

function add_char(c) {
    console.log("Added char")
    let result = document.getElementById("inp")
    result.value = result.value + c
    calculate()
}

function clearr() {
    console.log("Cleared")
    let inp = document.getElementById("inp")
    inp.value = ''

    let result = document.getElementById("result")
    result.value = 'Result'
    result.style.color = 'lightgray'
}

function backspace() {
    console.log("Deleted char")
    let result = document.getElementById("inp")
    result.value = result.value.slice(0, -1)
    calculate()
}

function create_buttons() {
    // let chars = "789/456*123-0.=+"
    let chars = "‎C⌫()^*789/456-123+.0="
    // let chars = "‎CX()^*789/456-123+.0="
    let newlines = [2, 6, 10]
    let text = ''
    for (let i=0; i<22; i++) {
        let c = chars.charAt(i)
        text += '<button class="but" id="but'+i+'" onclick="add_char(\''+c+'\')">'+c+'</button>'

        if (newlines.includes(i))
            text += '<br>'
    }
    document.getElementById("contenainer").innerHTML += text

    // 0:   ' '
    document.getElementById("but0").setAttribute("onclick", "add_char(' ')")
    // 1:   C -> CLEAR
    document.getElementById("but1").setAttribute("onclick", "clearr()")
    // 2:   BACKSPACE
    document.getElementById("but2").setAttribute("onclick", "backspace()")
    // 5:   ^  ->  **
    // document.getElementById("but5").setAttribute("onclick", "add_char('**')")
    // 21:  =  ->  EQUALS
    document.getElementById("but21").setAttribute("onclick", "get_answer()")
}

function main() {
    create_buttons()

    clearr()
}
