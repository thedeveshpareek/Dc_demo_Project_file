import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import AuthService from "../services/AuthService";
import logo from "../assets/images/logo/logo.png";

const Login = () => {
    const navigator = useNavigate();
    const emailRef = useRef<any>();
    const errorRef = useRef<any>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        emailRef.current.focus();
    },[])

    useEffect(() => {
        setErrMsg('');
    }, [email, password])

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        AuthService.login(email,password).then(response =>{
            setError(false);
            setSuccess(true);
            navigator('/dashboard',{replace:true});
        }).catch(reason => {
            setError(true);
            setSuccess(false);
            setErrMsg(reason.response?.data?.message);
            errorRef.current.focus();
        })
    }

    return (
        <>
        <div className="app-content content">
            <div className="content-wrapper">
                <div className="content-header row">
                </div>
                <div className="content-body">
                    <section className="flexbox-container">
                        <div className="col-12 d-flex align-items-center justify-content-center">
                            <div className="col-lg-4 col-md-6 col-10 box-shadow-2 p-0">
                                <div className="card border-grey border-lighten-3 px-1 py-1 m-0">
                                    <div className="card-header border-0">
                                        <div className="text-center mb-1">
                                            <img src={logo} alt="branding logo" style={{maxWidth:300,width:'100%'}}/>
                                        </div>
                                        <div className="font-large-1  text-center">
                                            Login
                                        </div>
                                    </div>
                                    <div className="card-content">
                                        <div className="card-body">
                                            {success?(<div className="alert alert-success mb-2">Login Success!</div>):''}
                                            {error?((<div className="alert alert-danger mb-2">{errMsg}</div>)):''}
                                            <form className="form-horizontal" onSubmit={handleSubmit} noValidate>
                                                <fieldset className="form-group position-relative has-icon-left">
                                                    <input
                                                        type="text"
                                                        className="form-control round"
                                                        id="email"
                                                        placeholder="Your Username"
                                                        onChange={event => setEmail(event.target.value)}
                                                        value={email}
                                                        ref={emailRef}
                                                        required/>
                                                    <div className="form-control-position">
                                                        <i className="ft-user"></i>
                                                    </div>
                                                </fieldset>
                                                <fieldset className="form-group position-relative has-icon-left">
                                                    <input
                                                        type="password"
                                                        className="form-control round"
                                                        id="password"
                                                        placeholder="Enter Password"
                                                        onChange={event => setPassword(event.target.value)}
                                                        value={password}
                                                        required/>
                                                    <div className="form-control-position">
                                                        <i className="ft-lock"></i>
                                                    </div>
                                                </fieldset>
                                                <div className="form-group row">
                                                    <div className="col-md-6 col-12 text-center text-sm-left">
                                                    </div>
                                                    <div className="col-md-6 col-12 float-sm-left text-center text-sm-right">
                                                        <a href="/" className="card-link">Forgot Password?</a>
                                                    </div>
                                                </div>
                                                <div className="form-group text-center">
                                                    <button
                                                        type="submit"
                                                        className="btn round btn-block btn-glow btn-bg-gradient-x-purple-blue col-12 mr-1 mb-1">
                                                        Login
                                                    </button>
                                                </div>

                                            </form>
                                        </div>
                                        {/*<p className="card-subtitle line-on-side text-muted text-center font-small-3 mx-2 my-2 ">
                                            <span>OR Sign Up Using</span></p>
                                        <div className="text-center">
                                            <a href="src/pages/Login"
                                               className="btn btn-social-icon round mr-1 mb-1 btn-facebook"><span
                                                className="ft-facebook"></span></a>
                                            <a href="src/pages/Login" className="btn btn-social-icon round mr-1 mb-1 btn-twitter"><span
                                                className="ft-twitter"></span></a>
                                            <a href="src/pages/Login"
                                               className="btn btn-social-icon round mr-1 mb-1 btn-instagram"><span
                                                className="ft-instagram"></span></a>
                                        </div>*/}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
        </>
    );
};
export default Login;
