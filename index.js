const userIP = $.getJSON("https://api.ipify.org?format=json", function (data) {
    $(".ip_add").html(data.ip);
})



document.getElementById("data-page").style.display = "none"
const searchbutton = document.getElementById("btn")
const latElement = document.getElementById("lat")
const longElement = document.getElementById("long")
const cityElement = document.getElementById("city")
const orgElement = document.getElementById("organisation")
const regionElement = document.getElementById("region")
const hostElement = document.getElementById("hostname")
const timezoneElement = document.getElementById("timeZone")
const dntElement = document.getElementById("dnt")
const pincodeElement = document.getElementById("Pincode")
const messageelement = document.getElementById("message")

let locationInfoContainer = document.getElementById("data-page");

// location---------
const userLocationpromise = new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((data) => {
        resolve(data)
    },
        (error) => {
            reject(error);
        }
    )
})


async function getUserLocation() {
    const userLocation = await userLocationpromise;
    // console.log(userLocation)
    let lobgi = userLocation.coords.longitude
    let late = userLocation.coords.latitude
    longElement.innerText = userLocation.coords.longitude
    latElement.innerText = userLocation.coords.latitude

    const iframeElement = document.createElement('iframe')
    iframeElement.classList = 'mapimage'
    iframeElement.width = '60%';
    iframeElement.height = '300px';
    iframeElement.src = `https://maps.google.com/maps?q=${late},${lobgi}&z=15&output=embed`
    iframeElement.scrolling = 'no';
    document.getElementById('mapimage1').appendChild(iframeElement)


}
searchbutton.addEventListener("click", () => {
    document.getElementById("main-page").style.display = "none"
    document.getElementById("data-page").style.display = "block"

    getUserLocation()

    // const urlapi = (userIP.responseJSON.ip)

    // console.log(usertime)
    let finalURL = `https://ipinfo.io/${userIP.responseJSON.ip}/geo`
    // console.log(finalURL)
    fetch(finalURL).then((response) => response.json())
        .then((data) => {
            let desc = data;
            // console.log(desc)
            cityElement.innerText = desc.city
            orgElement.innerText = desc.org
            regionElement.innerText = desc.region
            timezoneElement.innerText = desc.timezone
            pincodeElement.innerText = desc.postal
           
            const fetchpin = desc.postal
            let input= new URL(finalURL)
            hostElement.innerText = input.hostname;
            const usertime = new Date()
            const timeuser=usertime.toLocaleString("en-US", { timeZone: "Asia/Kolkata", timeStyle: "medium", hourCycle: 'h24'})
            
            const t1=usertime.toLocaleString("en-US", { timeZone: "Asia/Kolkata",dateStyle:'short'})
            dntElement.innerText=`${t1} ${timeuser}   `



            
            let pinURL = `https://api.postalpincode.in/pincode/${fetchpin}`
            // console.log(pinURL)
            fetch(pinURL).then((resp) => resp.json())
                .then((getdata) => {
                    let descrip = getdata;
                    let firstarray = (descrip[0])
                    // console.log(firstarray)
                    messageelement.innerText = (firstarray.Message)
                   
                    const postorder = (i) => {
                        let coldiv = document.createElement('div')
                        let ullist = document.createElement('ul')
                        let list1 = document.createElement('li')
                        let list2 = document.createElement('li')
                        let list3 = document.createElement('li')
                        let list4 = document.createElement('li')
                        let list5 = document.createElement('li')

                        coldiv.classList = 'col-md-6'
                        ullist.classList = 'list-group list-group-flush'
                        list1.classList = 'list-group-item list1'
                        list2.classList = 'list-group-item list2'
                        list3.classList = 'list-group-item list3'
                        list4.classList = 'list-group-item list4'
                        list5.classList = 'list-group-item list5'

                        ullist.appendChild(list1)
                        ullist.appendChild(list2)
                        ullist.appendChild(list3)
                        ullist.appendChild(list4)
                        ullist.appendChild(list5)

                        coldiv.appendChild(ullist)
                        document.getElementById('order-card').appendChild(coldiv)

                        let branchelement = firstarray.PostOffice[i].BranchType
                        let nameelement = firstarray.PostOffice[i].Name
                        let deliveryelement = firstarray.PostOffice[i].DeliveryStatus
                        let districtelement = firstarray.PostOffice[i].District
                        let divisionelement = firstarray.PostOffice[i].Division
                        list1.innerHTML = `Name : ${nameelement}`
                        list2.innerHTML = `Branch Type : ${branchelement}`
                        list3.innerHTML = `Delivery Status : ${deliveryelement}`
                        list4.innerHTML = `District : ${districtelement}`
                        list5.innerHTML = `Division : ${divisionelement}`

                    }

                    for (let i = 0; i < firstarray.PostOffice.length; i++) {

                        postorder(i)

                    }
                })
        })


})
// document.addEventListener('DOMContentLoaded',searchbutton)

