const stickyNav = document.getElementById('stickyNav');

window.addEventListener('scroll', () => {
    if (!stickyNav) {
        return undefined;
    }

    if (stickyNav?.offsetTop < window.pageYOffset)  {
        stickyNav?.classList.add('stickyNav');
    } else {
        stickyNav?.classList.remove('stickyNav');
    }

     return undefined;
});