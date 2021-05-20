const url = `https://vue3-course-api.hexschool.io/`;
const path = `carrie`;

//取得商品資料
const app = {
    data: {
        products: [],
    },
    getProductData() {
        axios.get(`${url}api/${path}/admin/products`)
            .then((res) => {
                // console.log(res);
                if (res.data.success) {
                    this.data.products = res.data.products;
                    this.renderProduct(); //渲染商品在畫面上
                }
            })
    },
    renderProduct() {
        const productList = document.querySelector('#productList');
        const productCount = document.querySelector(`#productCount`);
        const template = this.data.products.map((item) =>
            `<tr>
                <td>${item.title}</td>
                <td width="120">
                    ${item.origin_price}
                </td>
                <td width="120">
                    ${item.price}
                </td>
                <td width="100">
                    <span class="${item.is_enabled ? 'text-success' : 'text-secondary'}">${item.is_enabled ? '啟用' : '未啟用'}</span>
                </td>
                <td width="120">
                    <button type="button" class="btn btn-sm btn-outline-danger move deleteBtn"
                        data-action="remove" data-id="${item.id}"> 刪除 </button>
                </td>
            </tr>`
        ).join('');
        productList.innerHTML = template;
        productCount.textContent = `${this.data.products.length}`;

        //刪除商品
        const deleteBtn = document.querySelectorAll('.deleteBtn');
        console.log(deleteBtn);
        deleteBtn.forEach((btn) => {
            btn.addEventListener('click', this.deleteProduct);
        })
    },
    deleteProduct(e) {
        const id = e.target.dataset.id;
        // console.log(id);
        axios.delete(`${url}api/${path}/admin/product/${id}`)
            .then((res) => {
                app.getProductData(); //DOM 搭配 addEventListener 時，此 this 所指向的則是該 DOM。所以沒有使用 this 
                alert(`商品刪除成功 !`);
            })
    },
    init() {
        //取得 Token
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)carrieHexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        //所有 axios 請求都會加上 token
        axios.defaults.headers.common['Authorization'] = token;

        this.getProductData();
    }
}
app.init();

