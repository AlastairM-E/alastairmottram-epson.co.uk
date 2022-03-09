const stickyNav = document.getElementById('stickyNav');

window.addEventListener('scroll', () => {
    const MINOR_OFFSET_TO_PREVENT_UI_EFFECT = 30;
    if (!stickyNav) {
        return undefined;
    }

    if (stickyNav?.offsetTop < window.pageYOffset - MINOR_OFFSET_TO_PREVENT_UI_EFFECT)  {
        stickyNav?.classList.add('stickyNav');
    } else {
        stickyNav?.classList.remove('stickyNav');
    }

     return undefined;
});