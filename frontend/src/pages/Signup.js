import { useRef, useState, useEffect } from "react";
import { TiTick } from "react-icons/ti"; 
import { RxCross2 } from "react-icons/rx";
import axios from '../api/axios';
import '../styles/SignUp.css'
import { useLocation, useNavigate, useParams } from "react-router-dom";

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }

  return ComponentWithRouterProp;
}


const EMAIL_REGEX = /^[A-Za-z0-9_!#$%&'*+=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/signup';

const Signup = () => {
    const emailRef = useRef();
    const nameRef = useRef(); 
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [name, setName] = useState('');

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setValidEmail(PASSWORD_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPassword(PASSWORD_REGEX.test(password));
        setValidMatch(password === matchPassword);
    }, [password, matchPassword])

    useEffect(() => {
        setError('');
    }, [email, password, matchPassword])
      
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validEmail = EMAIL_REGEX.test(email);
        const validPassword = PASSWORD_REGEX.test(password);
        if (!validEmail) {
            setError("Invalid Email");
            return;
        } else if (!validPassword) {
            setError("Invalid Password");
            return;
        }
        try {
            console.log(JSON.stringify({ email, name, password }))
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ email, name, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    mode: 'cors',
                    withCredentials: true,
                }
            );
            console.log(response);
            // console.log(JSON.stringify(response?.data));
            setSuccess(true)
            setEmail('');
            setPassword('');
            setMatchPassword('');

        } catch (err) {
            if (!err?.response) {
                setError('No Server Response');
            } else if (err.response?.status === 409) {
                console.log('email taken');
                setError('Email Taken');
            } else {
                setError('Registration Failed')
            }
            // errRef.current.focus();
        }
    }

    return (
        <>

        {success ? (
            <section>
                <h1>Success!</h1>
                <p>
                    <a href="/profile-quiz">Find out your learning style.</a>
                </p>
            </section>
        ) : (
        <div className="signup-container">
            <section>
                <h1>Register</h1>
                <p ref={errRef} className={error ? "errmsg" : "offscreen"} aria-live="assertive">{error}</p>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">
                        Email:
                        <TiTick className={validEmail ? "valid" : "hide"} />
                        {/* <RxCross2 className={validEmail || !email ? "hide" : "invalid"} /> */}
                    </label>
                    <input
                        type="text"
                        id="email"
                        ref={emailRef}
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                        aria-invalid={validEmail ? "false" : "true"}
                        aria-describedby="emailnote"
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                        className="transparent-input"
                    />
                    <p id="emailnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                        Example: abc21@ic.ac.uk
                    </p>
                    <br/>

                    <label htmlFor="name">
                        Name:
                    </label>
                    <input
                        type="text"
                        id="name"
                        ref={nameRef}
                        autoComplete="off"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        required
                        className="transparent-input"
                    />
                    <br/>


                    <label htmlFor="password">
                        Password:
                        <TiTick className={validPassword ? "valid" : "hide"} />
                        <RxCross2 className={validPassword || !password ? "hide" : "invalid"} />
                    </label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                        aria-invalid={validPassword ? "false" : "true"}
                        aria-describedby="pwdnote"
                        onFocus={() => setPasswordFocus(true)}
                        onBlur={() => setPasswordFocus(false)}
                        className="transparent-input"
                    />
                    <p id="pwdnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                        8 to 24 characters.<br />
                        Must include uppercase and lowercase letters, a number and a special character.<br />
                        Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                    </p>

                    <br/> 

                    <label htmlFor="confirm_pwd">
                        Confirm Password:
                        <TiTick className={validMatch && matchPassword ? "valid" : "hide"} />
                        <RxCross2 className={(validMatch && matchPassword)|| !matchPassword ? "hide" : "invalid"} />
                    </label>
                    <input
                        type="password"
                        id="confirm_pwd"
                        onChange={(e) => setMatchPassword(e.target.value)}
                        value={matchPassword}
                        required
                        aria-invalid={validMatch ? "false" : "true"}
                        aria-describedby="confirmnote"
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                        className="transparent-input"
                    />
                    <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                        Must match the first password input field.
                    </p>

                    <br/>
                    <button>Sign Up</button>
                    {/* <button disabled={!validEmail || !validPassword || !validMatch ? true : false}>Sign Up</button> */}
                </form>

                <br/>
                
                <a className='login-link' href="/login">Already registered?</a>

            </section>
        </div>

        )}
        </>
    )
}

export default withRouter(Signup);