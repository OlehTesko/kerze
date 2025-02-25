document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        let items = document.querySelectorAll('.menu__item');
        let count = 1;
        items.forEach(item => {
            item.style.cssText = `
            transition-duration: 0.6s;
			transition-delay: ${count * 0.2}s;
			transition-timing-function: ease;`;
            count++;
        });
    }, 500);

    //************************************************************************************************************************ */

    const damping = 0.994; // Коефіцієнт загасання швидкості
    const duration = 6000; // Тривалість уповільнення в мілісекундах
    let startTime = null;
    
    
    let imges = document.querySelectorAll('.hero__mascot');
    let parent = document.querySelector('.hero');
    let parentRect = parent.getBoundingClientRect();
    
    
    imges.forEach(img => {
        let posX = parentRect.width / 2 - img.width / 2, posY = parentRect.height / 4.3 - img.height / 2;
        img.style.transform = `translate(${posX}px, ${posY}px)`;
        let velocityX = (Math.random() * 5 + 1) * (Math.random() < 0.5 ? 1 : -1);
        let velocityY = (Math.random() * 5 + 1) * (Math.random() < 0.5 ? 1 : -1);
        function moveImage(timestamp, img) {
            if (!startTime) startTime = timestamp;
            let elapsedTime = timestamp - startTime;
            if (elapsedTime >= duration) {
                return; // Зупиняємо анімацію після 7 секунд
            }
            let rect = img.getBoundingClientRect();
            let parentRect = parent.getBoundingClientRect();
            
    
            // Відбивання від країв екрану
            if (rect.left <= parentRect.left || rect.right >= parentRect.right) {
                velocityX *= -1;
                if ((Math.random() < 0.2 ? 1 : -1) > 0) {
                    velocityY *= -1.1;
                    velocityX *= 1.1;
                }
            };
            if (rect.top + window.scrollY <= parentRect.top + window.scrollY || rect.bottom + window.scrollY >= parentRect.bottom + window.scrollY) {
                velocityY *= -1;
                if ((Math.random() < 0.2 ? 1 : -1) > 0) {
                    velocityX *= -1.1;
                    velocityY *= 1.1;
                }
            };
    
            posX += velocityX;
            posY += velocityY;
            img.style.transform = `translate(${posX}px, ${posY}px)`;
    
            // Поступове уповільнення
            velocityX *= damping;
            velocityY *= damping;
            requestAnimationFrame((t) => moveImage(t, img));
        };

        setTimeout(() => {
            let kentiky = document.querySelectorAll(".hero__mascot");
            let kentikyVideo = document.querySelector(".hero__video");
            kentikyVideo.play();
            kentiky.forEach((e) => {
                e.style.animation = "none";
            });
            requestAnimationFrame((t) => moveImage(t, img));
        }, 5000); // 5000 мс = 5 секунд
        
    
        



    
    });
});