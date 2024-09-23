const form = document.querySelector('#searchForm');
const container = document.querySelector(".container");
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const searchTerm = form.elements[0].value;
    form.elements[0].value = "";
    const config = { params: { q: searchTerm } }
    const res = await axios.get(`https://api.tvmaze.com/search/shows`, config)

    //makeImages(res.data)
    showDetails(res.data)


})

const makeImages = (shows) => {



    for (let result of shows) {

        if (result.show.image) {
            const img = document.createElement('IMG');
            img.src = result.show.image.medium;
            container.append(img);
        }
    }


}

const showDetails = (shows) => {


    const showBlockList = document.querySelectorAll('.showBlock');
    console.log(showBlockList);

    for (let showBlock of showBlockList) {
        showBlock.remove();
    }
    for (let result of shows) {

        if (result.show.image) {
            const showBlock = document.createElement('div');
            showBlock.classList.add('showBlock')
            const img = document.createElement('IMG');
            const h1 = document.createElement('h1');
            const h3 = document.createElement('h3');
            img.src = result.show.image.medium;
            h1.innerText = result.show.name;
            h3.innerText = result.show.premiered;
            showBlock.append(img);
            showBlock.append(h1);
            showBlock.append(h3);
            container.append(showBlock);
        }
    }
    

}
