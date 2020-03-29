// action with menu links 

document.querySelector('.navigation').addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
        removeSelectedLink();
        selectLink(event.target);
    }
});

const removeSelectedLink = () => {
    document.querySelector('.navigation .navigation__link_selected').classList.remove('navigation__link_selected');
}

const selectLink = (link) => {
    link.classList.add('navigation__link_selected');
}

const sections = [...document.querySelectorAll('section[navigation]')];

window.addEventListener('scroll', () => {

    const active_section = sections.filter((item) => item.offsetTop <= pageYOffset + 95 && item.offsetHeight + item.offsetTop - 95 >= pageYOffset);

    if (active_section.length > 0) {
        removeSelectedLink();
        selectLink(document.querySelector(`a[href="#${active_section[0].className}"]`));
    }
    else {
        removeSelectedLink();
        selectLink(document.querySelector('a[href="#"]'));
    }
});



// action with portfolio tags 

document.querySelector('.portfolio__tags').addEventListener('click', (e) => {
    if (event.target.classList.contains('tag')) {
        removeSelectedTag();
        selectClickedTag(e.target);
        let shuffle = shuffleItems();
        removePortfolioItems();
        setPortfolioItems(shuffle);
    }
});


const removeSelectedTag = () => {
    document.querySelector('.portfolio__tags .tag_active').classList.remove('tag_active');
}

const selectClickedTag = (tag) => {
    tag.classList.add('tag_active');
}

const getPortfolioItems = () => {
    return document.querySelectorAll('.portfolio-item');
}

const setPortfolioItems = (node) => {
    document.querySelector('.layout-4-column').append(...node);
}

const removePortfolioItems = () => {
    document.querySelector('.layout-4-column').innerHTML = ''; // bad practice or not?
}

const shuffleItems = () => {
    return shuffleArray(Array.from(getPortfolioItems()));
}

const shuffleArray = (array) => {
    array.sort(function () {
        return Math.random() - 0.5;
    });
    return array;
}

// action with portfolio items

document.querySelector('.layout-4-column').addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {

        console.log(e.target.parentNode.classList.contains('portfolio-item_border'))
        if (e.target.parentNode.classList.contains('portfolio-item_border')) {
            removeActivePortfolioItems();
        }
        else {
            removeActivePortfolioItems();
            selectPortfolioItem(e.target.parentNode);
        }
    }
});

const selectPortfolioItem = (item) => {
    item.classList.add('portfolio-item_border');
}

const removeActivePortfolioItems = () => {

    if (document.querySelector('.portfolio-item_border')) {
        document.querySelector('.portfolio-item_border').classList.remove('portfolio-item_border');
    }
}


// slider 

const itemsSlider = document.querySelectorAll('.slider__item');
let currentSlide = 0;
let nextSlide = 0;
let isAvaible = true;

document.querySelector('.slider__button_right').addEventListener('click', () => {
    if (isAvaible) {
        changeNextSlide(currentSlide + 1);
        moveItemsSlider('slider__item_right', 'slider__item_left');
    }
})

document.querySelector('.slider__button_left').addEventListener('click', () => {
    if (isAvaible) {
        changeNextSlide(currentSlide - 1);
        moveItemsSlider('slider__item_left', 'slider__item_right');
    }
})

const changeBackgrounColor = (removeColor, addColor) => {
    const sliderContent = document.querySelector('.slider__content');
    sliderContent.classList.toggle('slider__content_background-blue');
    sliderContent.classList.toggle('slider__content_background-red');
}

const changeNextSlide = (n) => {
    nextSlide = (n + itemsSlider.length) % itemsSlider.length;
}

const moveItemsSlider = (directionNextSlide, directionCurrentSlide) => {
    changeBackgrounColor();
    isAvaible = false;
    itemsSlider[nextSlide].classList.add(directionNextSlide);
    let promise = new Promise((resolve) => {
        setTimeout(() => {
            itemsSlider[nextSlide].classList.remove(directionNextSlide);
            itemsSlider[nextSlide].classList.add('slider__item_active');
            itemsSlider[currentSlide].classList.add(directionCurrentSlide);
        }, 10);
        itemsSlider[nextSlide].addEventListener('transitionend', () => resolve('result'));
    });
    promise.then(
        result => {
            itemsSlider[currentSlide].classList.remove('slider__item_active', directionCurrentSlide);
            currentSlide = nextSlide;
            isAvaible = true;
        },
    );
}

// on\off display phone


// очень плохой кусок кода, нужно переделать!

document.querySelector('.phones-slide1').addEventListener('click', (e) => {

    if (e.target.classList.contains('phones__image')) {
        e.target.classList.toggle('display_off');
        e.target.classList.toggle('display_on');
        if (e.target.classList.contains('phones__image-1')) {
            document.querySelectorAll('.phones__display')[0].classList.toggle('phones__display_off');
            document.querySelectorAll('.phones__display')[0].classList.toggle('phones__display_on');
        }
        if (e.target.classList.contains('phones__image-2')) {
            document.querySelectorAll('.phones__display')[1].classList.toggle('phones__display_off');
            document.querySelectorAll('.phones__display')[1].classList.toggle('phones__display_on');
        }
    }
});

// submit form 

document.querySelector('.get-contacts__form').addEventListener('submit', (e) => {
    e.preventDefault();
    const subjectText = document.querySelector('.field__subject').value;
    const descriptionText = document.querySelector('.field__description').value;

    document.querySelector('.text-subject').innerHTML = subjectText || 'No Subject';
    document.querySelector('.text-description').innerHTML = descriptionText || 'No Description';
    showModal();
});

document.querySelector('.modal__button-close').addEventListener('click', () => {
    restFieldsForm();
    hiddenModal();
});
const restFieldsForm = () => {
    document.querySelector('.get-contacts__form').reset();
}
const showModal = () => {
    document.querySelector('.modal').classList.remove('modal_hidden');
    document.querySelector('.modal').classList.add('modal_visible');
}

const hiddenModal = () => {
    document.querySelector('.modal').classList.add('modal_hidden');
    document.querySelector('.modal').classList.remove('modal_visible');
}
// hamburger menu

const hamburger = document.querySelector('.hamburger');
const logo = document.querySelector('.logo');
const hamburger_menu = document.querySelector('.hamburger-menu')
const nav_menu = document.querySelectorAll('.navigation__item');
const mav_mobile = document.querySelector('.navigation-mobile');
let flag = false;
hamburger.addEventListener('click', () => {
    if (!flag) {
        mav_mobile.append(...nav_menu);
        flag = true;
    }
    hamburger.classList.toggle('hamburger_close');
    hamburger.classList.toggle('hamburger_open');
    logo.classList.toggle('logo_open-hamburger');
    logo.classList.toggle('logo_close-hamburger');
    hamburger_menu.classList.toggle('hamburger-menu_open')
    hamburger_menu.classList.toggle('hamburger-menu_close');
});
