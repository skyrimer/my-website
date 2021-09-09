window.onload = () => {
  const AnimationSpeed = 0.8;
  const AnimationDuration = 1;

  function animate(
    item,
    from,
    to,
    duration = AnimationDuration,
    delay = AnimationSpeed / 2
  ) {
    to["duration"] = duration;
    to["delay"] = delay;
    gsap.fromTo(item, from, to);
  }

  function initialAnimation(title, text, odd) {
    animate(title, { y: "6rem", opacity: 0 }, { y: 0, opacity: 1 });
    let x = "";
    if (odd) {
      x = "50%";
    } else {
      x = "-50%";
    }
    animate(text, { x: x, opacity: 0 }, { x: 0, opacity: 1 });
  }

  function firstSlideAnimation() {
    Array.from(document.querySelectorAll(".drawing path")).forEach(
      (element, index) => {
        animate(
          element,
          { strokeDashoffset: drawingLength[index] },
          { strokeDashoffset: 0 },
          AnimationDuration,
          AnimationSpeed * 2
        );
      }
    );
  }

  function initFullPage(e) {
    if (e.matches) {
      new fullpage("#fullpage", {
        autoScrolling: true,
        responsiveWidth: 1088,
        responsiveHeight: 700,
        scrollingSpeed: AnimationSpeed * 1000,
        scrollOverflow: true,
        onLeave: (origin, destination, direction) => {
          let section = destination.item;
          initialAnimation(
            section.querySelector("h1"),
            section.querySelector(".text"),
            destination.index % 2 === 0
          );
          if (destination.index === 0) {
            firstSlideAnimation();
          } else if (destination.index === 5) {
            animate(
              section.querySelector("form"),
              { y: "50%", opacity: 0 },
              { y: 0, opacity: 1 }
            );
            animate(
              section.querySelector("h1:last-of-type"),
              { opacity: 0 },
              { opacity: 1 },
              AnimationDuration,
              AnimationSpeed * 2
            );
          }
        },
      });
    } else {
      const images = document.querySelectorAll('img[loading="lazy"]');
      images.forEach((img) => {
        img.src = img.dataset.src;
      });
    }
  }

  // Writing text animation
  let drawingLength = [];
  document.querySelectorAll(".drawing path").forEach((element) => {
    let length = element.getTotalLength();
    element.style.strokeDasharray = length;
    drawingLength.push(length);
  });

  // Adaptive slider
  const FullPageCondition = window.matchMedia("(min-width: 68rem)");
  FullPageCondition.addListener(initFullPage);
  initFullPage(FullPageCondition);

  initialAnimation(
    document.querySelector("h1"),
    document.querySelector(".text"),
    true
  );
  firstSlideAnimation();
};
