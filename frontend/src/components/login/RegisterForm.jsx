import { Form, Formik } from "formik";
import { useState } from "react";
import RegisterInput from "../inputs/registerinput";
import DotLoader from "react-spinners/DotLoader";
import axios from "axios"
import {useDispatch} from "react-redux"
import Cookies from "js-cookie"
import {useNavigate} from "react-router-dom"

export default function RegisterForm({setVisible}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
const userInfos = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    bYear: new Date().getFullYear(),
    bMonth: new Date().getMonth() + 1,
    bDay: new Date().getDate(),
    gender: "",
    };
    const [user, setUser] = useState(userInfos);
    const {
    first_name,
    last_name,
    email,
    password,
    bYear,
    bMonth,
    bDay,
    gender,
    } = user;
const yearTemp = new Date().getFullYear();
const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    };
    const years = Array.from(new Array(108), (val, index) => yearTemp - index);
    const months = Array.from(new Array(12), (val, index) => 1 + index);
    const getDays = () => {
    return new Date(bYear, bMonth, 0).getDate();
    };
    const days = Array.from(new Array(getDays()), (val, index) => 1 + index);
  
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [loading, setLoading] = useState("false")

    

    const registerSubmit = async() => {
      try {
        const {data} = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/register`,
        {
          first_name,
          last_name,
          email,
          password,
          bYear,
          bMonth,
          bDay,
          gender,
        }
        )
        setError("")
        setSuccess(data.message)
        const {message, ...rest} = data
        setTimeout(() => {
          dispatch({type: "LOGIN", payload: rest})
          Cookies.set("user", JSON.stringify(rest))
          navigate("/")
        }, 2000)
      } catch (error) {
        setLoading(false)
        setSuccess("")
        setError(error.response.data.message)
      }
    }

return (
    <div className="blur">
    <div className="register">
        <div className="register_header">
          <i className="exit_icon" onClick={() => setVisible(false)} ></i>
          <span>Sign Up</span>
          <span>it's quick and easy</span>
        </div>
        <Formik
        enableReinitialize
        initialValues={{
          first_name,
          last_name,
          email,
          password,
          bYear,
          bMonth,
          bDay,
          gender,
        }}
        onSubmit={registerSubmit}
        >
          {(formik) => (
            <Form className="register_form">
              <div className="reg_line">
                <RegisterInput
                  type="text"
                  placeholder="First name"
                  name="first_name"
                  onChange={handleRegisterChange}
                />
                <RegisterInput
                  type="text"
                  placeholder="Surname"
                  name="last_name"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  type="text"
                  placeholder="Mobile number or email address"
                  name="email"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  type="password"
                  placeholder="New password"
                  name="password"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_col">
                <div className="reg_line_header">
                  Date of birth <i className="info_icon"></i>
                </div>
                <div className="reg_grid">
                  <select
                    name="bDay"
                    value={bDay}
                    onChange={handleRegisterChange}
                  >
                    {days.map((day, i) => (
                      <option value={day} key={i}>
                        {day}
                      </option>
                    ))}
                  </select>
                  <select
                    name="bMonth"
                    value={bMonth}
                    onChange={handleRegisterChange}
                  >
                    {months.map((month, i) => (
                      <option value={month} key={i}>
                        {month}
                      </option>
                    ))}
                  </select>
                  <select
                    name="bYear"
                    value={bYear}
                    onChange={handleRegisterChange}
                  >
                    {years.map((year, i) => (
                      <option value={year} key={i}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="reg_col">
                <div className="reg_line_header">
                  Gender <i className="info_icon"></i>
                </div>
                <div className="reg_grid">
                  <label htmlFor="male">
                    Male
                    <input
                      type="radio"
                      name="gender"
                      id="male"
                      value="male"
                      onChange={handleRegisterChange}
                    />
                  </label>
                  <label htmlFor="female">
                    Female
                    <input
                      type="radio"
                      name="gender"
                      id="female"
                      value="female"
                      onChange={handleRegisterChange}
                    />
                  </label>
                  <label htmlFor="custom">
                    Custom
                    <input
                      type="radio"
                      name="gender"
                      id="custom"
                      value="custom"
                      onChange={handleRegisterChange}
                    />
                  </label>
                </div>
              </div>
              <div className="reg_infos">
                By clicking Sign Up, you agree to our{" "}
                <span>Terms, Data Policy &nbsp;</span>
                and <span>Cookie Policy.</span> You may receive SMS
                notifications from us and can opt out at any time.
              </div>
              <div className="reg_btn_wrapper">
                <button className="blue_btn open_signup" >Sign Up</button>
              </div>
              
              {error && <div className="error_text">{error}</div>}
              {success && <div className="success_text">{success}</div>}
              
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}