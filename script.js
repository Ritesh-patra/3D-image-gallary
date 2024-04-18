window.onload = function () {
  lenisFn();
  flip();
  const galary = document.querySelector(".gallery");
  const previewImage = document.querySelector(".preview-img img");

  document.addEventListener("mousemove", function (event) {
    const x = event.clientX;
    const y = event.clientY;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const percentX = (x - centerX) / centerX;
    const percentY = (y - centerY) / centerY;

    const rotateX = 55 + percentY * 2;
    const rotateY = percentX * 2;

    gsap.to(galary, {
      duration: 1,
      ease: "Power2.out",
      rotateX: rotateX,
      rotateY: rotateY,
      overwrite: "auto",
    });
  });

  for (let i = 0; i < 2.5; i++) {
    data.forEach( d => {
      const item = document.createElement("div");
    item.className = "item";
    const img = document.createElement("img");
    img.src = d;
    item.appendChild(img);
    galary.appendChild(item);
    })
   
  }

  const items = document.querySelectorAll(".item");
  const numberOfItem = items.length;
  const angleIncresement = 360 / numberOfItem;

  items.forEach((item, index) => {
    gsap.set(item, {
      rotationY: 90,
      rotationZ: index * angleIncresement - 90,
      transformOrigin: "50% 400px",
    });

    item.addEventListener("mousemove", function () {
      const imgInsideItem = item.querySelector("img");
      previewImage.src = imgInsideItem.src;

      gsap.to(item, {
        x: 10,
        y: 10,
        z: 50,
        ease: "Power2.out",
        duration: 0.5,
      });
    });

    item.addEventListener("mouseout", function () {
      const imgInsideItem = item.querySelector("img");
      previewImage.src = imgInsideItem.src;

      gsap.to(item, {
        x: 0,
        y: 0,
        z: 0,
        ease: "Power2.out",
        duration: 0.5,
      });
    });
  });

  ScrollTrigger.create({
    trigger:"body",
    start:"top top",
    end: "bottom bottom",
    scrub:2,
    onRefresh: setupRotation,
    onUpdate: (self) => {
        const rotationProgress = self.progress * 360 * 1 ;
        items.forEach(( item , index) => {
            const currentAngle = index * angleIncresement - 90 + rotationProgress;
            gsap.to(item,{
                rotationZ: currentAngle,
                duration:1,
                ease: "Power3.out",
                overwrite: "auto",  
            });
        })
    },
  })
};

function setupRotation () {}

function lenisFn() {
  const lenis = new Lenis({
      wheelMultiplier: 1,
      duration: 1.5,
      // easing: (x) => 1 - Math.pow(1 - x, 5),
      easing: (x) => x === 1 ? 1 : 1 - Math.pow(2, -10 * x),
      infinite: true
  })

  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time)=>{
    lenis.raf(time * 1000)
  })
  
  gsap.ticker.lagSmoothing(0)
};


function flip() {
  const container = document.querySelector('.container');
  
  let count = true;
  document.querySelector('.preview-img img').addEventListener('click', () => {
    const state = flip.getState('.preview-img, .preview-img img');
    document.querySelector('.preview-img').classList.toggle('active');

    flip.from(state, {
      absolute: true,
      duration: 1,
      ease: 'expo.inOut',
    })
  })
};
