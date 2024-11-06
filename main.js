let current_page = 1;
const items_per_page = 5;
let items = [];

function fetch_data() {
    items = [
        { id: 1, name: "Product 1"},
        { id: 2, name: "Product 2"},
        { id: 3, name: "Product 3"},
        { id: 4, name: "Product 4"},
        { id: 5, name: "Product 5"},
        { id: 6, name: "Product 6"},
        { id: 7, name: "Product 7"},
        { id: 8, name: "Product 8"},
        { id: 9, name: "Product 9"},
        { id: 10, name: "Product 10"},
        { id: 11, name: "Product 11"},
        { id: 12, name: "Product 12"},
        { id: 13, name: "Product 13"},
    ];
    render_page();
}

function update_pagination_links() {
    const head = document.head;
    const prev_link = document.querySelector('link[rel="prev"]');
    const next_link = document.querySelector('link[rel="next"]');

    if (prev_link) head.removeChild(prev_link);
    if (next_link) head.removeChild(next_link);

    if (current_page > 1) {
        const prev = document.createElement('link');
        prev.setAttribute('rel', 'prev');
        prev.setAttribute('href', `#page=${current_page - 1}`);
        head.appendChild(prev);
    }

    if (current_page < Math.ceil(items.length / items_per_page)) {
        const next = document.createElement('link');
        next.setAttribute('rel', 'next');
        next.setAttribute('href', `#page=${current_page + 1}`);
        head.appendChild(next);
    }
}

function render_page() {
    update_pagination_links()
    const start_index = (current_page - 1) * items_per_page;
    const end_index = start_index + items_per_page;
    const current_items = items.slice(start_index, end_index);

    const content_div = document.getElementById('container');
    content_div.innerHTML = "";
    current_items.forEach(item => {
        let product_div = document.createElement('div');
        product_div.textContent = item.name;
        product_div.classList.add('item');
        content_div.appendChild(product_div);
    });

    document.getElementById('page-number').textContent = `Page ${current_page}`;
    document.getElementById('prev').disabled = current_page <= 1;
    document.getElementById('next').disabled = current_page >= Math.ceil(items.length / items_per_page);

    window.history.pushState(null, null, `#page=${current_page}`);
}

function change_page(page) {
    if (page > 0 && page <= Math.ceil(items.length / items_per_page)){
        current_page = page;
        render_page();
    }
}

fetch_data();

window.addEventListener('popstate', () => {
    const url_params = new URLSearchParams(window.location.hash.slice(1));
    const page = parseInt(url_params.get('page'));
    if (page && (page !== current_page)){
        current_page = page;
        render_page();
    }
});