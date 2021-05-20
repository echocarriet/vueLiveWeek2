const url = 'https://vue3-course-api.hexschool.io/';
const path = 'carrie';

const jsEmailInput = document.querySelector('.js-emailInput');
const jsPasswordInput = document.querySelector('.js-passwordInput');
const jsLoginBtn = document.querySelector('.js-loginBtn');

function login(e) {
    e.preventDefault();
    const username = jsEmailInput.value;
    const password = jsPasswordInput.value;
    const user = { username, password }

    //發送 API 到遠端並登入 (儲存 token和expired)
    axios.post(`${url}admin/signin`, user)
        .then((res) => {
            console.log(res);
            //定義
            // const token = res.data.token;
            // const expired = res.data.expired;
            const { token, expired } = res.data;
            if (res.data.success) {
                //把cookie存在瀏覽器裡(expires為unix timestamp 格式)
                document.cookie = `carrieHexToken=${token}; expires=${new Date(expired)}`;
                window.location = 'product.html';
            } else {
                console.log(res.data.message);
            }
        })
}


jsLoginBtn.addEventListener('click', login);