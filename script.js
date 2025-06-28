const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAnimation() {
    var tl = gsap.timeline();

    tl.from("#nav", {
        y: '-10',
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    })
    tl.to(".bounding-elem", {
        y: 0,
        ease: Expo.easeInOut,
        delay: -1,
        duration: 2,
        stagger: .2
    })
    tl.from("#hero-footer", {
        y: -10,
        opacity: 0,
        delay: -1,
        ease: Expo.easeInOut,
        duration: 1.5
    })
}

var timeOut;

function cursorDistort() {
    // define the default scale value
    var xscale = 1;
    var yscale = 1;

    var xPrev = 0;
    var yPrev = 0;

    window.addEventListener("mousemove", (dets) => {
        clearTimeout(timeOut);
        xscale = gsap.utils.clamp(.8, 1.2, dets.clientX - xPrev);
        yscale = gsap.utils.clamp(.8, 1.2, dets.clientY - yPrev);
        
        xPrev = dets.clientX;
        yPrev = dets.clientY;

        circleMouseFollower(xscale, yscale);

        timeOut = setTimeout(() => {
            document.querySelector("#cursor").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;    
        }, 100);
    });
}

function circleMouseFollower(xscale, yscale) {
    window.addEventListener("mousemove", (dets)=> {
        document.querySelector("#cursor").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`
    })
}

document.querySelectorAll(".elem").forEach((elem)=>{
    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener("mouseleave", function (dets) {
        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power3,
            duration: 0.5,
        });
    });

    elem.addEventListener("mousemove", (dets)=>{
        var diff = dets.clientY - elem.getBoundingClientRect().top;
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;
        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            top: diff,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
        });
    });
});

circleMouseFollower();
firstPageAnimation();
cursorDistort();