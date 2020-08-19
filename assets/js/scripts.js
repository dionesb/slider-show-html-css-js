function SliderShow() {
  const arrowLeft = document.querySelector('.slider-arrow-left')
  const arrowRight = document.querySelector('.slider-arrow-right')
  const imagesSlider = [...document.querySelector('#slider-images').children]
  const header = document.querySelector('#header')

  const imagesSliderArr = imagesSlider.map(image => ({
    image,
    container: image.querySelector('.container')
  }))

  let count = 0;

  function resetSliderImages() {
    imagesSliderArr.map((image, index) => {
      if (index !== 0) {
        image.image.style.visibility = 'hidden'
      }
    })
  }

  function changeNavColor() {

    if (imagesSliderArr[count].image.className.includes('nav-dark')) {
      header.classList.toggle('dark', true)
    } else {
      header.classList.toggle('dark', false)
    }
  }

  function handleContainer() {

    if (imagesSliderArr[count].container) {
      imagesSliderArr.map(image => image.container.classList.toggle('active', false))
      imagesSliderArr[count].container.classList.toggle('active', true)
    }
  }

  function nextImage() {
    imagesSliderArr[count].image.style.visibility = 'visible'
    imagesSliderArr[count].image.style.animation = 'from-right 2s'
  }

  function previousImage() {
    imagesSliderArr[count + 1].image.style.visibility = 'hidden'
    imagesSliderArr[count + 1].image.style.animation = 'from-left 2s'
  }

  function listenForChange() {

    arrowLeft.addEventListener('click', () => {
      if (count <= 0) {
        count = 0
      } else {
        count -= 1
        previousImage()
        handleContainer()
      }

      changeNavColor()
    })

    arrowRight.addEventListener('click', () => {
      if (count >= imagesSliderArr.length - 1) {
        count = imagesSliderArr.length - 1
      } else {
        count += 1
        nextImage()
        handleContainer()
      }

      changeNavColor()
    })
  }

  function init() {
    resetSliderImages()
    handleContainer()
    listenForChange()
    changeNavColor()
  }

  return {
    init
  }
}

window.addEventListener('load', () => {
  const sliderShow = SliderShow()
  sliderShow.init()
})
