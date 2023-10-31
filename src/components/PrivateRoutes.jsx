import { Outlet, Navigate } from 'react-router-dom'
import Cookies from 'js-cookie';

const PrivateRoutes = () => {
    let auth = { 'token': Cookies.get('auth_token') }
    function parseJwt(token) {
        if (token !== undefined & token !== 'undefined' & token !== '') {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            return JSON.parse(jsonPayload);
        }
    }
    const data = () => {
        const data_ = parseJwt(auth.token)
        console.log(data_)
        if (data_ !== undefined){
            return data_['id_id']
        }
    }

    return (
        data() ? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateRoutes