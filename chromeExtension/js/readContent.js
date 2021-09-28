;(() => {
    // 当該ページの「後で買う」　に入っているもののURL
    function parse() {
        // Get text from "From today's featured article"

        var el = document.querySelector("#sc-saved-cart-items");
        var els = el.children;

        var urls = [];
        Array.from(els).forEach(function(child) {
            var a = child.querySelector('div > div.sc-list-item-content > div > div:nth-child(2) > ul > li.a-spacing-mini > span > a');
            var url = a.href;
            urls.push(url);
        })
        console.log('ret',urls);
        return urls;
    }
  
    try {
      return parse()
    } catch (e) {
      return null
    }
})()