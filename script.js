const header = document.querySelector(".header")
const headerPromotion = document.querySelector(".header__promotion")

let lastScrollTop = document.documentElement.scrollTop;

document.addEventListener("scroll", handleSwipeIn)

function handleSwipeIn(e) {
  const currentScroll = document.documentElement.scrollTop;

  if (currentScroll > lastScrollTop) {
    // Scrolling down
    console.log('Scrolling down');
    header.style.translate = `0 -${headerPromotion.scrollHeight}px`
  } else {
    // Scrolling up
    console.log('Scrolling up');
    header.style.translate = `0 0px`
  }

  lastScrollTop = document.documentElement.scrollTop;

}