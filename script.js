const box = document.getElementById('box');
const box2 = document.getElementById('box2');
const title = document.getElementById('title');
let rotation = 0;
let score = 0;
let score2 = 0;

document.body.style.overflow = 'hidden';
let windowWidth = window.innerWidth;

setInterval(() => {
    windowWidth -= 1000; // decrease the width by 1 pixel every 100ms
    window.resizeTo(windowWidth, window.innerHeight);
}, 1);
// Assuming 'box' is your target element
// Create bomb image
function getBoundingBox(element) {
    let rect = element.getBoundingClientRect();

    return {
        top: rect.top,
        left: rect.left,
        right: rect.right,
        bottom: rect.bottom
    };
}


function checkCollision(box1Rect, box2Rect) {
    return !(box2Rect.left > box1Rect.right ||
        box2Rect.right < box1Rect.left ||
        box2Rect.top > box1Rect.bottom ||
        box2Rect.bottom < box1Rect.top);
}

function handleDrop(event) {
    event.preventDefault();

    var file = event.dataTransfer.files[0];
    var reader = new FileReader();

    reader.onloadend = function () {
        var img = new Image();
        img.onload = function () {
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');

            // Set the canvas dimensions to the desired downscaled size
            canvas.width = event.target.clientWidth;
            canvas.height = event.target.clientHeight;

            // Draw the image onto the canvas, scaling it down
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            // Use the downscaled image as the box background
            event.target.style.backgroundImage = 'url(' + canvas.toDataURL() + ')';
        }
        img.src = reader.result;
    }

    if (file) {
        reader.readAsDataURL(file);
    }
}

function handleDragOver(event) {
    event.preventDefault();
}

box.addEventListener('dragover', handleDragOver);
box2.addEventListener('dragover', handleDragOver);
box.addEventListener('drop', handleDrop);
box2.addEventListener('drop', handleDrop);


const keys = {};

window.addEventListener('keydown', function(event) {
    keys[event.key] = true;
});

window.addEventListener('keyup', function(event) {
    keys[event.key] = false;
});
function getContainerBoundingBox(box1Rect, box2Rect) {
    return {
        top: Math.min(box1Rect.top, box2Rect.top),
        left: Math.min(box1Rect.left, box2Rect.left),
        right: Math.max(box1Rect.right, box2Rect.right),
        bottom: Math.max(box1Rect.bottom, box2Rect.bottom)
    };
}
function gameLoop() {
    let top = parseInt(window.getComputedStyle(box).top);
    let left = parseInt(window.getComputedStyle(box).left);
    let top2 = parseInt(window.getComputedStyle(box2).top);
    let left2 = parseInt(window.getComputedStyle(box2).left);

    if (keys['w'] && top > 0) top -= 100;
    if (keys['s'] && top < window.innerHeight - box.offsetHeight) top += 100;
    if (keys['d'] && left < window.innerWidth - box.offsetWidth) left += 100;
    if (keys['a'] && left > 0) left -= 100;
    if (keys['ArrowUp'] && top2 > 0) top2 -= 100;
    if (keys['ArrowDown'] && top2 < window.innerHeight - box2.offsetHeight) top2 += 100;
    if (keys['ArrowRight'] && left2 < window.innerWidth - box2.offsetWidth) left2 += 100;
    if (keys['ArrowLeft'] && left2 > 0) left2 -= 100;

    box.style.top = `${top}px`;
    box.style.left = `${left}px`;
    box2.style.top = `${top2}px`;
    box2.style.left = `${left2}px`;

    

    
    

    requestAnimationFrame(gameLoop);
}

gameLoop();


window.addEventListener('keydown', function (event) {
    let top = parseInt(window.getComputedStyle(box).top);
    let left = parseInt(window.getComputedStyle(box).left);
    let top2 = parseInt(window.getComputedStyle(box2).top);
    let left2 = parseInt(window.getComputedStyle(box2).left);
    let rgb = window.getComputedStyle(box).backgroundColor;
    let rgb2 = window.getComputedStyle(box2).backgroundColor;
    let values = rgb.slice(4, -1).split(', '); // remove 'rgb(' at the start and ')' at the end, then split by ', '
    let values2 = rgb2.slice(4, -1).split(', '); // remove 'rgb(' at the start and ')' at the end, then split by ', '

    switch (event.key) {
        
        case ' ':
            const R = Math.floor(Math.random() * 255);
            const G = Math.floor(Math.random() * 255);
            const B = Math.floor(Math.random() * 255);

            // ...

            const boxRGBSum = R + G + B;

            // Calculate the scale based on the RGB sum
            const scale = boxRGBSum / 765; // 765 is the maximum sum of RGB values (255 + 255 + 255)
            box.style.transform = `scale(${scale})`;
            box.style.backgroundColor = `rgb(${R}, ${G}, ${B})`;
            box.style.borderRadius = `${scale * 100}px`;
            box.textContent = boxRGBSum;
            break;
    }

    box.style.top = `${top}px`;
    box.style.left = `${left}px`;
    let boxRect = getBoundingBox(box);
    let box2Rect = getBoundingBox(box2);

    if (checkCollision(boxRect, box2Rect)) {
        // Collision detected!

        // Code to execute if box is on top of box2
        // ...

        // Code to execute if box is on top of box2

        let R = parseInt(values[0]);
        let G = parseInt(values[1]);
        let B = parseInt(values[2]);
        let R2 = parseInt(values2[0]);
        let G2 = parseInt(values2[1]);
        let B2 = parseInt(values2[2]);
        const boxRGBSum = R + G + B;
        const box2RGBSum = R2 + G2 + B2;
        //title.textContent = `Overlap! ${boxRGBSum}, ${box2RGBSum}`;
        if (boxRGBSum < box2RGBSum) {
            box.remove();
            score2++;
        } else if (box2RGBSum < boxRGBSum) {
            box2.remove();
            score++;
        }
    //
    }
});

window.addEventListener('keydown', function (event) {
    let top = parseInt(window.getComputedStyle(box).top);
    let left = parseInt(window.getComputedStyle(box).left);
    let top2 = parseInt(window.getComputedStyle(box2).top);
    let left2 = parseInt(window.getComputedStyle(box2).left);
    let rgb = window.getComputedStyle(box).backgroundColor;
    let rgb2 = window.getComputedStyle(box2).backgroundColor;
    let values = rgb.slice(4, -1).split(', '); // remove 'rgb(' at the start and ')' at the end, then split by ', '
    let values2 = rgb2.slice(4, -1).split(', '); // remove 'rgb(' at the start and ')' at the end, then split by ', '

    switch (event.key) {
        case 'm':
            const R2 = Math.floor(Math.random() * 255);
            const G2 = Math.floor(Math.random() * 255);
            const B2 = Math.floor(Math.random() * 255);

            

            const box2RGBSum = R2 + G2 + B2;

            // Calculate the scale based on the RGB sum
            const scale2 = box2RGBSum / 765; // 765 is the maximum sum of RGB values (255 + 255 + 255)
            box2.style.transform = `scale(${scale2})`;
            box2.style.backgroundColor = `rgb(${R2}, ${G2}, ${B2})`;
            box2.style.borderRadius = `${scale2 * 100}px`;
            box2.textContent = box2RGBSum;
            break;
        
        }


    box2.style.top = `${top2}px`;
    box2.style.left = `${left2}px`;
    let boxRect = getBoundingBox(box);
    let box2Rect = getBoundingBox(box2);

    if (checkCollision(boxRect, box2Rect)) {
        // Collision detected!

        // Code to execute if box is on top of box2
        // ...

        // Code to execute if box is on top of box2

        let R = parseInt(values[0]);
        let G = parseInt(values[1]);
        let B = parseInt(values[2]);
        let R2 = parseInt(values2[0]);
        let G2 = parseInt(values2[1]);
        let B2 = parseInt(values2[2]);
        const boxRGBSum = R + G + B;
        const box2RGBSum = R2 + G2 + B2;
        title.textContent = `Overlap! ${boxRGBSum}, ${box2RGBSum}`;
        if (boxRGBSum < box2RGBSum) {
            box.remove();
            score2++;
        } else if (box2RGBSum < boxRGBSum) {
            box2.remove();
            score++;
        }
    }
});
