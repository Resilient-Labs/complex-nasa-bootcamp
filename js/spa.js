// fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?brand=covergirl&product_type=lipstick`)
// .then(res=>res.json())
// .then(data => {
//     console.log(data)
// })
document.querySelector('button').addEventListener('click', cons)
function cons(){
    let userInput = document.getElementById('users').value
 fetch(`https://api.fda.gov/cosmetic/event.json?search=products.product_name:${userInput}`)
.then(res=>res.json())
.then(async data => {
    console.log(data)
    // The product and will then use this output as an input for the other API
    console.log(data.results[0].products[0].product_name)
    let productName = data.results[0].products[0].product_name
    document.getElementById('prod').innerText = productName
     console.log(productName.split(' ')[0])
    let productInfos = productName.split(' ')[0]
    console.log(productInfo(productInfos))
    let otherApi = await productInfo(productInfos)
    console.log(otherApi)
    document.querySelector('a').href = otherApi
    console.log(data.results[0].reactions)
    // Patients reaction
    console.log(data.results[0].reactions.forEach(element => {element}))
    data.results[0].reactions.forEach(element => {
    let headyThree = document.createElement('h3')
    headyThree.innerText = element
     document.body.appendChild(headyThree)})
    
})}

function productInfo(products){
return fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?brand=${products}`)
.then(res=>res.json())
.then(data => {
    console.log(data[0].website_link)
    return data[0].website_link
})
}