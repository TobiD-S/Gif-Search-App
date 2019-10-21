(function() {
    function giphySearch(keyword) {
        return fetch("https://api.giphy.com/v1/gifs/search?&q=${keyword}&api_key=kreBe1GKG5DEILVyXdR4fpdfH4SWeFJv&limit=20")
            .then(response => response.json());
    }

    function appendImage(img) {
        let $div = $('<div class="img-wrapper"></div>');
        $('<div class="inner"></div>').append(img).appendTo($div);
        $('#thumbs').append($div)
    }

    function showLoader() {
        $('.loader-wrapper').addClass('shown');
    }

    function hideLoader() {
        $('.loader-wrapper').removeClass('shown');
    }

    function onImgLoad(img) {
        return new Promise((resolve, reject) => {
            img.onload = resolve;
        });
    }

    (function listenOnFormSubmit() {
        $('#searchForm').submit((ev) => {
            ev.preventDefault();

            let $input = $('#searchInput');

            main($input.val());
        });
    })();

    async function main(keyword) {
        const result = await giphySearch(keyword);
        $('#thumbs').html('');
        showLoader();
        // let loadedImageCount = 0;
        let promises = [];
        result.data.forEach(gif => {
            let img = new Image();
            img.src = gif.images.original.url;
            promises.push(onImgLoad(img));
            // img.onload = () => {
            //   loadedImageCount++;
            //   if (loadedImageCount === result.data.length){
            //     hideLoader()
            //   }
            // };
            appendImage(img);
        });

        await Promise.all(promises);
        hideLoader();
    }
})();