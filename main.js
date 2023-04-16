let btns = document.querySelectorAll("button");

btns.forEach((btn) => {
    function getBooks() {
        btns.forEach((btn) => {
            btn.classList.remove("active");
            this.classList.add("active");
        });

        let myRequest = new XMLHttpRequest();
        myRequest.open(
            "get",
            "https://www.googleapis.com/books/v1/volumes?q=" + i,
            true
        );
        myRequest.send();
        myRequest.addEventListener("readystatechange", function() {
            if (this.readyState === 4 && this.status === 200) {
                let myResponse = JSON.parse(myRequest.responseText);
                let booksArray = myResponse.items;

                let cards = document.querySelector(".cards");
                let card = "";
                booksArray.forEach((book) => {
                    let bookTitle = book.volumeInfo.title.substr(0, 20);
                    let bookImage = book.volumeInfo.imageLinks.thumbnail;
                    let bookDescription =
                        book.volumeInfo.description || `No decsription for this book`;
                    bookDescription = bookDescription.substr(0, 100) + "...";

                    let visitPage = book.volumeInfo.previewLink;
                    card += ` 
                <div class="card">
                        <img src="${bookImage}" alt="">
                        <h2 class="title">${bookTitle}"</h2>
                        <p class="description">${bookDescription}</p>
                        <a href="${visitPage}" target = "blank">visit page</a>
                </div>
                    `;
                });
                cards.innerHTML = card;
            }
        });
    }
    let i = btn.innerHTML;
    btn.addEventListener("click", getBooks);
});