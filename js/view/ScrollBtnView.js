import { debounce } from '../util.js'
export default class ScrollBtnView{
    constructor({scrollEl, debounceTimer = 200, acceleration = 1.5}){
        this.scrollEl = scrollEl;
        this.clickScrollBtn(acceleration);
        this.scrollWindow(debounceTimer);
    }
    
    clickScrollBtn(acceleration){ 
        this.scrollEl.addEventListener('click', ({target})=>{
            this.pageScroll(target.className, acceleration);
        })
    }

    scrollWindow(timer){
        window.addEventListener('scroll', ()=>{
            this.hideElement(this.scrollEl);
        })
        window.addEventListener('scroll', debounce(()=>{
            this.showElement(this.scrollEl);
        },timer))
    }

    hideElement(element){
        element.classList.remove('show');
        element.classList.add('hide');
    }

    showElement(element){
        element.classList.remove('hide');
        element.classList.add('show');
    }

    pageScroll(className, acceleration){
        const pageY = scrollY;
        const pageHeight = document.body.scrollHeight;
        let fps = 1;

        if( className === "page-up")pageUp();
        if( className === "page-down")pageDown();

        function pageUp(){
            fps = fps * acceleration;
            scrollTo(0, pageY - fps);
            if(pageY > fps)requestAnimationFrame(pageUp);
        }
        function pageDown(){
            fps = fps * acceleration;
            scrollTo(0, pageY + fps);
            if(pageY + fps < pageHeight)requestAnimationFrame(pageDown);
        }
    }
}