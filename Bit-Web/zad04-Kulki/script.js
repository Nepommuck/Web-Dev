let box_counter = 0
let SEC = 1
let FPS = 25
let TICKS = SEC * FPS

let active_counter = 0
let active = new Array(100)

let color = new Array(100)
let eee = new Array(100)
let rad = new Array(100)

for (let i = 0; i < color.length; i++) {
    color[i] = new Array(3)
    eee[i] = new Array(3)
    active[i] = false
    rad[i] = 0
}

let MAX_RADIUS = 55


function add_box() {
    let val = document.getElementById("red_slider").value
    console.log(val)
    if (active_counter <= 0) {
        // let new_html = document.getElementById("boxholder").innerHTML
        let new_html = '<div class="box" id="box'+box_counter+'" onclick="click_box('+box_counter+')"></div>'
        document.getElementById("boxholder").innerHTML += new_html
        box_counter += 1
    }
}

function click_box(nr) {
    if (!active[nr]) {
        active[nr] = true
        elem = document.getElementById('box' + nr)
        elem.style.backgroundColor = 'rgb(255, 0, 0)'
                
        color[nr][0] = document.getElementById("red_slider").value
        color[nr][1] = document.getElementById("green_slider").value
        color[nr][2] = document.getElementById("blue_slider").value

        eee[nr][0] = color[nr][0] / TICKS
        eee[nr][1] = color[nr][1] / TICKS
        eee[nr][2] = color[nr][2] / TICKS

        rad[nr] = MAX_RADIUS
        let timer = TICKS
    
        active_counter += 1
        darken(elem, nr, timer, color[nr], eee[nr], rad[nr])
    }

}

function darken(elem, nr, timer, colors, change, radius) {
    // console.log(timer)
    // console.log(colors)
    // console.log(change)
    if (timer > 0) {
        for (let i=0; i<3; i++)
            colors[i] -= change[i]
        radius -= (MAX_RADIUS / TICKS)

        elem.style.backgroundColor = 'rgb('+colors[0]+', '+colors[1]+', '+colors[2]+')'
        elem.style.borderRadius = radius + 'px'; 
        setTimeout(function() {
            darken(elem, nr, timer-1, colors, change, radius);
        }, 1000 / FPS)
    }
    else {
        active_counter -= 1
        active[nr] = false
    }
}


function main() {
    // for (let i=0; i<30; i++)
    //     add_box()
    document.getElementById("add").setAttribute("onclick", "add_box()")
}