export function goAnchor(selector) { 
    var anchor = this.$el.querySelector(selector); //获取元素 

    if (anchor) { 
        setTimeout(() => { //页面没有渲染完成时是无法滚动的，因此设置延迟 
            //anchor.scrollIntoView(); //js的内置方法，可滚动视图位置至元素位置  
            var targetOffset = $(selector).offset().top; 
            console.info("targetOffset", anchor, targetOffset) 
            $('html,body').animate({ 
                    scrollTop: targetOffset 
                },
                1000);

        }, 500);

    }

};

 