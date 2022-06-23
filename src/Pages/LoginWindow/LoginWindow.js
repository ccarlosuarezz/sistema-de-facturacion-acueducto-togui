import AqueductLogo from '../../components/AqueductLogo/AqueductLogo'
import LoginForm from '../../components/LoginForm/LoginForm'
import "./LoginWindow.css"

const LoginWindow = () => {
    return (
        <div className='Login'>
            <AqueductLogo></AqueductLogo>
            <LoginForm></LoginForm>
        </div>
    )
}

export default LoginWindow