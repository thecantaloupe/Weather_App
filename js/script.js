//Constants and Variables
let weatherData;
let coord;
let main;
let sys;
let wind;

const API_KEY = ''
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?'
//Cached Elements References
const $title = $('#title');
const $temp = $('#temp');
const $time = $('#time');
const $desc = $('#desc');
const $input = $('input[type="text"]')
const $tform = $('#tform');


// Event Listeners

// Functions

//kelvin to F converter
const keltoF = (temp) => {
    return (Math.round(((temp - 273.15) * 9 / 5 + 32))+"°F")
}
// console.log(keltoF(300))

//string uppercase
const capitalize = (string) =>{
    return string[0].toUpperCase() + string.substring(1)
}
// console.log(capitalize("hello"))

//q={city_name}&appid={API_KEY}
// console.log(`${BASE_URL}q=seattle&appid=${API_KEY}`)

//replace space with +
let test = "this test"
let replace = test.replace(/\s/g ,'+')
console.log(replace)

//convert time to pst
const timePSD = (epoch) => {
    let time = epoch * 1000
    let curDate = new Date(time)
    var pstDate = curDate.toLocaleString("en-US", {timeZone: "America/Los_Angeles"})
    let parseTime = (pstDate.split(', ')[1] + " PST")
    return parseTime
}
// console.log(timePSD(1629939676))

function handleGetData(event){
    event.preventDefault();
    console.log("Form Submitted");
    userInput = $input.val();
    $.ajax({
        url:`${BASE_URL}q=${$input.val()}&appid=${API_KEY}`
    }).then(
        function(data){
            coord = data.coord
            weather = data.weather
            main = data.main
            wind = data.wind
            sys = data.sys
            weatherData = data;
            
            console.log(data.main);
            const tempData = (obj) => {
                let $htmladd = $('<tr></tr>')
                for (let key in obj){
                    // if (!key){break}
                    let keys = capitalize(key)
                    let value = main[key];
                    if (value % 1 == 0){
                        value = main[key]
                    } else {
                        value = keltoF(main[key])
                    }
                    let insert = $("<div class='insert'  style='display:inline-block'>"+keys+": <span> "+value+" </span></div>")
                    $htmladd.append(insert)
                }
                return $htmladd
            }
    $temp.html(tempData(data.main))
    render()
    }, 
    function(error){
        console.log('bad request: ', error);
    })
    }
    


function render() {
    $title.text(weatherData.name)
    // $temp.html(tempData(main.temp))
    $time.text(timePSD(weatherData.dt))
    $desc.text(weatherData.weather[0].description)
}


//submit triggers
$('form').on('submit', handleGetData)


// const $title = $('#title');
// const $temp = $('#temp');
// const $time = $('#time');
// const $desc = $('#desc');
// const $input = $('input[type="text"]')