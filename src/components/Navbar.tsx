import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav>
        <a href="">
          <svg
            id="logo-51"
            width="200"
            height="75"
            viewBox="0 0 167 41"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.65417 3.89149C7.22351 4.89185 5.92981 6.0746 4.80676 7.40602C9.39606 6.97995 15.2266 7.67567 21.9958 11.0603C29.2244 14.6745 35.0452 14.7967 39.0962 14.0153C38.7286 12.9024 38.2658 11.8328 37.7177 10.816C33.0804 11.3051 27.1354 10.6577 20.207 7.1936C15.8074 4.9938 11.9292 4.08763 8.65417 3.89149ZM35.0088 6.96027C31.3467 2.86862 26.0248 0.293625 20.1014 0.293625C18.3619 0.293625 16.6741 0.515732 15.0651 0.933105C17.2443 1.52771 19.5593 2.39761 21.9958 3.61589C27.0684 6.15215 31.4478 6.96878 35.0088 6.96027ZM39.9623 17.9217C35.0683 18.8881 28.3102 18.6896 20.207 14.638C12.6314 10.8502 6.60187 10.8979 2.53534 11.8016C2.32544 11.8482 2.12048 11.8972 1.92047 11.9482C1.38806 13.1061 0.963074 14.3237 0.658142 15.5881C0.983826 15.5011 1.32037 15.4184 1.6676 15.3412C6.60101 14.2449 13.5715 14.2925 21.9958 18.5047C29.5715 22.2925 35.601 22.2448 39.6676 21.3411C39.8069 21.3102 39.9442 21.2782 40.0792 21.2452C40.094 20.9299 40.1014 20.6126 40.1014 20.2936C40.1014 19.4911 40.0542 18.6996 39.9623 17.9217ZM39.4262 25.4659C34.5797 26.3132 28.0184 25.988 20.207 22.0824C12.6314 18.2946 6.60187 18.3423 2.53534 19.246C1.63269 19.4465 0.820679 19.6908 0.10437 19.9487C0.102417 20.0634 0.10144 20.1784 0.10144 20.2936C0.10144 31.3393 9.05573 40.2936 20.1014 40.2936C29.3585 40.2936 37.1467 34.0045 39.4262 25.4659Z"
              className="custom"
              fill="#F4F4F9"
            ></path>{" "}
          </svg>
        </a>

        <div>
          <ul id="navbar">
            <li>
              <Link to={"/"}>Inicio</Link>
            </li>
            <li>
              <a>Métodos</a>
            </li>
            <li>
              <Link to={"/tutorials"}>Tutoriales</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
