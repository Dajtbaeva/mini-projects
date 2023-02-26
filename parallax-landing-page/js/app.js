window.addEventListener("scroll", (e) => {
  /* получаем значение на которое мы пролистываем страничку вниз */
  document.body.style.cssText += `--scrollTop: ${this.scrollY}px`; /* тэгу бади присвоим переменную css, которую можно будет использовать в css файле */
  /* это css переменная которую мы уже интерполируем, получаем скролл по игрику */
});
gsap.registerPlugin(ScroolTrigger, ScroolSmoother);
ScroolSmoother.create({
  wrapper: ".wrapper",
  content: ".content",
});
