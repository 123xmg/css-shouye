/* 固定导航 */
const headerEl = document.querySelector("header");

const scrollToTop = document.querySelector(".scrollToTop");

window.addEventListener("scroll", () => {
  let height = headerEl.getBoundingClientRect().height;
  if (window.pageYOffset - height > 800) {
    if (!headerEl.classList.contains("sticity")) {
      headerEl.classList.add("sticity");
    }
  } else {
    headerEl.classList.remove("sticity");
  }
  /* 返回顶部 */
  if (window.pageYOffset > 2000) {
    scrollToTop.style.display = "block";
  } else {
    scrollToTop.style.display = "none";
  }
});

/* 轮播 */
const glide = new Glide("*.glide");

/* 给轮播中的标题添加动画，先让它的css中的透明度为0 */
const captionsEL = document.querySelectorAll(".slide-caption");
/* 添加事件监听，在加载时，轮播开始时监听 */
glide.on(["mount.after", "run.after"], () => {
  const caption = captionsEL[glide.index];
  anime({
    targets: caption.children,
    opacity: [0, 1],
    duration: 400,
    easing: "linear",
    delay: anime.stagger(400, { start: 300 }), //这个函数h1出现400ms后出现h3
    tranlateY: [anime.stagger([40, 10]), 0], //h1从40-0 h3从30-0 button从10-0
  });
});
/* 在轮播之前，加载之前，透明度回归原来 */
glide.on(["run.before"], () => {
  document.querySelectorAll(".slide-caption > *").forEach((item) => {
    item.style.opacity = 0;
  });
});

glide.mount();

/* 在成功案例的位置，使用iso的库 */
const isotope = new Isotope(".cases", {
  layoutMode: "fitRows",
  itemSelector: ".case-item",
});
const filterBtns = document.querySelector(".filter-btns");
filterBtns.addEventListener("click", (e) => {
  let { target } = e;
  const filterOption = target.getAttribute("data-filter");
  if (filterOption) {
    /* .filter-btn.active只有一个，保险起见，添加foreach遍历 */
    document.querySelector(".filter-btn.active").classList.remove("active");
    target.classList.add("active");
    isotope.arrange({ filter: filterOption });
  }
});
/* 信息框动画 */
const staggeringOption = {
  delay: 300,
  distance: "50px",
  duration: 500,
  easing: "ease-in-out",
  origin: "bottom",
};
ScrollReveal().reveal(".feature", { ...staggeringOption, interval: 350 });
ScrollReveal().reveal(".service-item", { ...staggeringOption, interval: 350 });
/* 数字增长 更新背景*/

const dataSectionEl = document.querySelector(".data-section");

ScrollReveal().reveal(".data-section", {
  beforeReveal: () => {
    anime({
      targets: ".data-piece .num",
      innerHTML: (el) => {
        return [0, el.innerHTML];
      },
      duration: 2000,
      round: 1,
      easing: "easeInExpo",
    });
    dataSectionEl.style.backgroundPosition = `center calc(-${
      dataSectionEl.getBoundingClientRect().bottom / 5
    }px)`;
  },
});
/* 背景视差 */
window.addEventListener("scroll", () => {
  const bottom = dataSectionEl.getBoundingClientRect().bottom;
  const top = dataSectionEl.getBoundingClientRect().top;
  if (bottom >= 0 && top <= window.innerHeight) {
    dataSectionEl.style.backgroundPosition = `center calc(-${bottom / 5}px)`;
  }
});
/* 导航流畅跳转 */
const scroll = new SmoothScroll('nav a[href*="#"], .scrollToTop a[href*="#"]', {
  header: "header",
  offset: 80,
});

document.addEventListener("scrollStart",()=>{
  if(headerEl.classList.contains("open")){
    headerEl.classList.remove("open");
  }
})



/* 回到首页按钮，返回到首页 */
const exploreEls = document.querySelectorAll(".explore-btn");
exploreEls.forEach((exploreEl) => {
  exploreEl.addEventListener("click", () => {
    scroll.animateScroll(document.querySelector("#about-us"));
  });
});
/* 折叠按钮 */
const burgetEl = document.querySelector(".burger");
burgetEl.addEventListener("click", () => {
  headerEl.classList.toggle("open");
});
