//update the current year
const yearEl = document.querySelector('.year');
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

//open and close mobile nav
const navBtnEl = document.querySelector('.mobile-nav-btn');
const headerEl = document.querySelector('.header');

navBtnEl.addEventListener('click', function() {
    headerEl.classList.toggle('nav-open');
})

//smooth scrolling for safari browser

const allLinks = document.querySelectorAll('a:link');
allLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const href = link.getAttribute('href');

        //scroll back to top
        if (href === '#') {window.scrollTo({
            top: 0, 
            behavior: 'smooth'
        });}
        
        //scroll to other links
        if (href !== '#' && href.startsWith('#')) {
                const sectionEl = document.querySelector(href);
                sectionEl.scrollIntoView({behavior: 'smooth'});                
            }

        //close mobile nav    
        if (link.classList.contains('main-nav-link')) {
                 headerEl.classList.toggle('nav-open');                
            }
        
    });
});


///////STICKY NAVIGATION

const sectionHeroEl = document.querySelector('.section-hero');

const obs = new IntersectionObserver(
    function(entries) {
    const ent = entries[0];
    console.log(ent);


    if (!ent.isIntersecting) {
        document.body.classList.add('sticky');             
    }

    if (ent.isIntersecting) {
        document.body.classList.remove('sticky');             
    }

}, {
    //in the viewport
    root: null,
    //percentage in the viewport is 0
    threshold: 0,
    rootMargin: '-80px'
    
});
obs.observe(sectionHeroEl);


//fixing flexbox gap property missing in some safari versions
function checkFlexGap () {
    var flex = document.createElement('div');
    flex.style.display = 'flex';
    flex.style.flexDirection = 'column';
    flex.style.rowGap = '1px';

    flex.appendChild(document.createElement('div'));
    flex.appendChild(document.createElement('div'));

    document.body.appendChild(flex);
    var isSupported = flex.scrollHeight === 1;
    flex.parentNode.removeChild(flex);
    console.log(isSupported);

    if (!isSupported) document.body.classList.add("no-flexbox-gap");
}

checkFlexGap();

