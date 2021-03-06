
{
    const passwordInput = document.querySelector('#password');




    const passwordFeedback = document.querySelector('#strength-output');

        const emailInput = document.querySelector('#email');


    const strengthStr = {
        0: 'Worst',
        1: 'Bad',
        2: 'Weak',
        3: 'Good',
        4: 'Strong'
    };



    const canvasWrapper = document.querySelector('.canvas-wrap');
    const canvas = canvasWrapper.querySelector('canvas');
    const poster = document.querySelector('.poster');
    const posterImg = poster.style.backgroundImage.match(/\((.*?)\)/)[1].replace(/('|")/g,'');
    imagesLoaded(poster, { background: true }, () => {
        document.body.classList.remove('loading');
    });

	const ctx = canvas.getContext('2d');
    const img = new Image();
    let imgRatio;
    let wrapperRatio;
    let newWidth;
    let newHeight;
    let newX;
    let newY;

    let pxFactor = 1;

    img.src = posterImg;
    img.onload = () => {
        const imgWidth = img.width;
        const imgHeight = img.height;
        imgRatio = imgWidth / imgHeight;
        setCanvasSize();
        render();
    };

    const setCanvasSize = () => {
        canvas.width = canvasWrapper.offsetWidth;
        canvas.height = canvasWrapper.offsetHeight;
    };

    const render = () => {
        const w = canvasWrapper.offsetWidth;
        const h = canvasWrapper.offsetHeight;

        newWidth = w;
        newHeight = h;
        newX = 0;
        newY = 0;
        wrapperRatio = newWidth / newHeight;

        if ( wrapperRatio > imgRatio ) {
            newHeight = Math.round(w / imgRatio);
            newY = (h - newHeight) / 2;
        } 
        else {
            newWidth = Math.round(h * imgRatio);
            newX = (w - newWidth) / 2;
        }

        const size = pxFactor * 0.01;

        ctx.mozImageSmoothingEnabled = size === 1 ? true : false;
        ctx.webkitImageSmoothingEnabled = size === 1 ? true : false;
        ctx.imageSmoothingEnabled = size === 1 ? true : false;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, w*size, h*size);
        ctx.drawImage(canvas, 0, 0, w*size, h*size, newX, newY, newWidth+.05*w, newHeight+.05*h);
    };

    window.addEventListener('resize', () => {
        setCanvasSize();
        render();
    });





    emailInput.addEventListener('input', () => {
        const val = emailInput.value;
        const result = zxcvbn(val);

        pxFactor = 99/11*Math.min(11,Math.round(result.guesses_log10)) + 1;
        
        if ( pxFactor != 1 && pxFactor != 100 ) {
            pxFactor -= pxFactor/100*50;
        }
        
        // passwordFeedback.innerHTML = val !== '' ? `Password strength: ${strengthStr[result.score]}` : '';
        render();
    });
}
