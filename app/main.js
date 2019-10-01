{
    // Comprobar si la librería está...
    // console.log(interact);


    let position = Array.from(document.querySelectorAll('.widget_draggable')).map(e => { return { x: 0, y: 0 } });
    let attempts = 0;

    // Init dragging
    interact('.widget_draggable').draggable({
        listeners: {
            move(event) {
                let index = Array.from(document.querySelectorAll('.widget_draggable')).indexOf(event.target);
                position[index].x += event.dx
                position[index].y += event.dy
                event.target.style.transform =
                    `translate(${position[index].x}px, ${position[index].y}px)`
            }
        }
    });


    // Init dropping recognision
    interact('.widget_droppable').dropzone({
        listeners: {
            dragenter(event) {
                event.target.classList.add('drag_enter');
            },
            dragleave(event) {
                event.target.classList.remove('drag_enter');
            },
            drop(event) {
                event.target.classList.remove('drag_enter');
                let box = event.relatedTarget;
                let dropzone = event.target;

                if (box.getAttribute("drag-color") == dropzone.getAttribute("drop-color")) {
                    success();
                } else {
                    error();
                }
            }
        }
    });

    const init = () => {
        position = Array.from(document.querySelectorAll('.widget_draggable')).map(e => { return { x: 0, y: 0 } });
        Array.from(document.querySelectorAll('.widget_draggable')).forEach(e => {
            e.style.transform = "";
        });
    };
    const success = () => {
        let msg = document.querySelector('.question_response_success');
        msg.classList.add('visible');

        window.setTimeout(() => {
            msg.classList.remove('visible');
            init();
        }, 1200);
    };
    const error = () => {
        if (attempts < 2) {
            let msg = document.querySelector('.question_response_error');
            msg.classList.add('visible');

            window.setTimeout(() => {
                attempts++;
                msg.classList.remove('visible');
                init();
            }, 1200);
        } else {
            let msg = document.querySelector('.question_response_warning');
            msg.classList.add('visible');
            window.setTimeout(() => {
                msg.classList.remove('visible');
                init();
                attempts = 0;
            }, 1200);
        }
    };
}

{
    // console.log(anime);
    let starsBlock = document.querySelector('.stars');
    let stars = Array.from(starsBlock.querySelectorAll('.star'));
    let rating = 0;
    let starsSelected = [];

    stars.forEach(star => {
        star.addEventListener('click', function (ev) {
            rating = stars.indexOf(this);
            starsSelected = stars.slice(0, rating + 1);
            animateStars();
        });
    });

    const animateStars = () => {
        stars.forEach(star => {
            Object.assign(star.style, {
                transform: 'rotate(0) scale(1)',
                opacity: '.4',
                fill: '#e8b268',
            });
        });
        anime({
            targets: starsSelected,
            scale: 1.1,
            rotate: `${360}deg`,
            opacity: 1,
            fill: '#eb8f10',
            delay: anime.stagger(100),
            complete() {
                let msg = document.querySelector('.question_response_thanks');
                msg.classList.add('visible');

                window.setTimeout(() => {
                    msg.classList.remove('visible');
                }, 1200);
            }
        });
    };
}
