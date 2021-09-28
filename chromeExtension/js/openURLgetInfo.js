;(() => {
    // URLを開き情報を取得して配列を返す
    function parse() {
        var array = new Array(3);
        var page_span = null;
        var page = '';
        var str_title;
        var str_auther;
        var str_page;

        // タイトル
        var title  = document.querySelector("#productTitle");
        if (title){
            row_cont = title.textContent;
            str_title = row_cont.split('\n');
            str_title = str_title.join('');
        }
        array[0] = str_title;

        // 著者名
        var auther = document.querySelector("#bylineInfo");
        if (auther){
            row_cont = auther.textContent;
            str_auther = row_cont.split('\n');
            str_auther = str_auther.join('');
            str_auther = str_auther.replace(/\{.*\}/g,'');
            str_auther = str_auther.replace(/\›.*/g,'');
        }
        array[1] = str_auther;
    
        //少し下まで移動(要素の出現を促す)
        var element = document.documentElement;
        // var length = element.scrollHeight - element.clientHeight;
        var length = element.clientHeight *(1.5);
        window.scroll(0, length);

        // 1秒待つ処理
        // const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));
        // await sleep(2000);

        function a() {
            // 読み込まれるまで少し待つ

            page_span = document.querySelector("#anonCarousel3 > ol > li:nth-child(1) > div > div.a-section.a-spacing-none.a-text-center.rpi-attribute-value > span")
            if (page_span == null){
                page_span = document.querySelector('#anonCarousel4 > ol > li:nth-child(1) > div > div.a-section.a-spacing-none.a-text-center.rpi-attribute-value > span');
            }

            console.log('x');
            if (page_span != null){
                page = page_span.innerHTML;
                }
            else{
                console.log('pagespan null');
                page = null;
            }

            console.log('y');
            if(page !=null){
                str_page = page.replace("ページ",'');
            }
            array[2] = str_page;

            console.log('z');
            console.log('ret',array);
            return array;
        }

        setTimeout( a(), 2000 );
 
        console.log('aaaa',array[2]);
        console.log('nn',array);
        return array;
       
    }
  
     try {
         var p = parse();
        return p;
      } catch (e) {
        console.log(e)
        return null
      }
})()