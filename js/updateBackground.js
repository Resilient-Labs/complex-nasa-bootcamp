
function background() {
    images = ["one.jpg", "two.jpg", "three.jpg","four.jpg"]
    let selectedImage = images[Math.floor(Math.random() * images.length)]
    console.log(selectedImage)
    document.querySelector("body").style.background = `url('./img/${selectedImage}')`
}

 setInterval(background, 10000)
 background()