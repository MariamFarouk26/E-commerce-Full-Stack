import React, { memo, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAction, resetUser } from '../../Redux/Slice/User';
// import styles from '../../Styles/Navbar.module.css';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '../../Redux/Slice/Language';
// eslint-disable-next-line no-unused-vars
import i18n from '../../i18n';
// import logo from 'assets/img/logo.jpg';

export default memo(function Navbar() {
  const userAuth = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const JWT = cookies.get('x-auth-token');
  if (JWT) {
    var { user } = jwtDecode(JWT);
  }

  // console.log(user);

  const currentLanguage = useSelector((state) => state?.language?.language);
  const [t, i18n] = useTranslation();

  const handleLanguageChange = (event) => {
    const language = event.target.value;
    dispatch(changeLanguage(language));
    i18n.changeLanguage(language);
  };

  useEffect(() => {
    // console.log('Current Language:', currentLanguage);
  }, [currentLanguage]);

  function handleLogOut() {
    cookies.remove('x-auth-token');
    dispatch(resetUser());
    navigate('/');
  }

  useEffect(() => {
    dispatch(getUserAction());
  }, [dispatch]);

  const handleSignUp = () => {
    Swal.fire({
      title: 'Choose your role',
      text: 'Are you registering as a user or a seller?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'User',
      cancelButtonText: 'Seller',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Registering as User',
          text: 'Please fill in the required information to complete the registration as a user.',
          icon: 'info',
        });
        navigate('/signupUser');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Registering as Seller',
          text: 'Please fill in the required information to complete the registration as a seller.',
          icon: 'info',
        });
        navigate('/signupSeller');
      }
    });
  };

  return (
    <NavbarContainer
      id="navbar"
      className="navbar navbar-expand-md navbar-light bg-light sticky-top"
      style={{ boxShadow: '0 15px  5px  5px rgba(0, 0, 0, .06)' }}
      dir={`${i18n.language}` === 'en' ? 'ltr' : 'rtl'}
    >
      <div className="container-fluid d-flex">
        <NavLink className="navbar-brand m-0" to="/">
          {/* <span style={{ fontSize: "1.7rem", fontWeight: "800", color: '#088178' }}>{t('Cara')}</span> */}
          <img src='/assets/img/logo.jpg' alt="logo" />
        </NavLink>

        {/* <div className="navCont d-flex align-items-center flex-fill justify-content-end justify-content-sm-end "> */}
        <button
          className="navbar-toggler ms-3 border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav m-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                {t('Home')}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/shop">
                {t('Shop')}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                {t('About')}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">
                {t('Contact')}
              </NavLink>
            </li>

            <div className="cart d-flex d-md-none align-items-center">
              {/* PROFILE */}
              {JWT && (
                <div className="dropdown me-3">
                  <span
                    className="btn btn-outline-secondary dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fa-regular fa-user" /> Hi, {t(`${user.name}`)}
                  </span>
                  <ul className="dropdown-menu">
                    <li>
                      <NavLink className="dropdown-item" to="/profile/account">
                        <i
                          className="fa-regular fa-user"
                          style={{ width: '20px' }}
                        />
                        {t('Profile')}
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to="/profile/orders">
                        <i
                          className="fa-solid fa-box-open"
                          style={{ width: '20px' }}
                        ></i>
                        {t('Orders')}
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="dropdown-item"
                        to="/profile/favourite"
                      >
                        <i
                          className="fa-regular fa-heart"
                          style={{ width: '20px' }}
                        ></i>
                        {t('Favourite')}
                      </NavLink>
                    </li>

                    <li>
                      <hr className="dropdown-divider" />
                    </li>

                    <li className=" m-auto text-center">
                      <button
                        className="dropdown-item"
                        style={{ color: '#088178', fontWeight: '600' }}
                        onClick={handleLogOut}
                      >
                        {t('Logout')}
                      </button>
                    </li>
                  </ul>
                </div>
              )}
              {/* SIGN IN/ UP */}
              {!JWT && (
                <div id="signUpNav" className="dropdown me-3">
                  <span
                    className="btn dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {/* <b style={{ fontSize: '1rem' }}>S</b> */}
                    <b style={{ textTransform: 'lowercase', fontSize: '1rem' }}>
                      {t('Sign in')}
                    </b>
                  </span>
                  <ul className="dropdown-menu p-2 m-auto text-center">
                    {/* <li className="btn btn-warning p-0">
                      <NavLink
                        className="dropdown-item fw-bold"
                        to="/signin"
                        style={{ textTransform: 'lowercase' }}
                      >
                        <b
                          style={{
                            textTransform: 'lowercase',
                            fontSize: '0.8rem',
                          }}
                        >
                          {t('Sign in')}
                        </b>
                      </NavLink>
                    </li> */}
                    <ConfirmButton className=" btn btn-success p-0">
                      <NavLink
                        className="dropdown-item fw-bold"
                        to="/signin"
                        style={{ textTransform: 'lowercase', color: 'white' }}
                      >
                        {/* <b style={{ fontSize: "0.8rem" }}>S</b> */}
                        <b
                          style={{
                            textTransform: 'lowercase',
                            // fontSize: "0.8rem",
                          }}
                        >
                          {t('Sign in')}
                        </b>
                      </NavLink>
                    </ConfirmButton>
                    <li className="mt-3 p-0 w-100">
                      <span className="d-flex align-items-center w-100">
                        {' '}
                        <span
                          style={{
                            fontSize: '0.8rem',
                            flex: '1',
                            width: '100%',
                          }}
                        >
                          {t('New user')}
                        </span>
                        <NavLink
                          className="dropdown-item d-inline-block p-0 w-auto fw-bold"
                          to="/signup"
                          onClick={handleSignUp}
                        >
                          {t('Sign up')}
                        </NavLink>
                      </span>
                    </li>
                  </ul>
                </div>
              )}

              {JWT && (
                <>
                  <NavLink className="nav-link d-flex" to="/wishlist">
                    <span className="me-4 position-relative">
                      <i
                        className="fa-solid fa-heart"
                        style={{ fontSize: '1.5rem', color: '#088178' }}
                      ></i>
                      {userAuth?.wishlist?.length > 0 && (
                        <span
                          className="position-absolute top-0 start-100 translate-middle badge rounded-pill text-dark"
                          style={{
                            backgroundColor: 'rgb(181 188 195)',
                            fontSize: ' 0.6rem',
                          }}
                        >
                          {userAuth?.wishlist?.length}
                        </span>
                      )}
                    </span>
                  </NavLink>

                  <NavLink className="nav-link d-flex" to="/cart">
                    <span className="me-4 position-relative">
                      <i
                        className="fa-solid fa-cart-shopping"
                        style={{ fontSize: '1.5rem', color: '#088178' }}
                      ></i>
                      {userAuth?.cart?.length > 0 && (
                        <span
                          className="position-absolute top-0 start-100 translate-middle badge rounded-pill text-dark"
                          style={{
                            backgroundColor: 'rgb(181 188 195)',
                            fontSize: ' 0.6rem',
                          }}
                        >
                          {userAuth?.cart?.length}
                        </span>
                      )}
                    </span>
                  </NavLink>
                </>
              )}
            </div>
          </ul>
        </div>

        {/* LANGUAGE */}
        <div className="">
          <select
            className="btn btn-secondary me-3"
            onChange={handleLanguageChange}
          >
            <option value="en">En</option>
            <option value="ar">Ar</option>
          </select>
        </div>
        <div className="cart d-none d-md-flex align-items-center">
          {/* PROFILE */}
          {JWT && (
            <div className="dropdown me-3">
              <span
                className="btn btn-outline-secondary dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fa-regular fa-user" /> {t('Hi')},{' '}
                {user.name.split(' ')[0]}
              </span>
              <ul className="dropdown-menu">
                {user.isAdmin || user.isSeller === true ? (
                  <li>
                    <NavLink className="dropdown-item" to="/dashboard">
                      <i
                        className="fa-solid fa-chart-line"
                        style={{ width: '20px' }}
                      />
                      {t('Dashboard')}
                    </NavLink>
                  </li>
                ) : (
                  ''
                )}

                <li>
                  <NavLink className="dropdown-item" to="/profile/account">
                    <i
                      className="fa-regular fa-user"
                      style={{ width: '20px' }}
                    />
                    {t('Profile')}
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/profile/orders">
                    <i
                      className="fa-solid fa-box-open"
                      style={{ width: '20px' }}
                    ></i>
                    {t('Orders')}
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/profile/favourite">
                    <i
                      className="fa-regular fa-heart"
                      style={{ width: '20px' }}
                    ></i>
                    {t('Favourite')}
                  </NavLink>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li className=" m-auto text-center">
                  <button
                    className="dropdown-item"
                    style={{ color: '#088178', fontWeight: '600' }}
                    onClick={handleLogOut}
                  >
                    {t('Logout')}
                  </button>
                </li>
              </ul>
            </div>
          )}
          {/* SIGN IN/ UP */}
          {!JWT && (
            <div id="signUpNav" className="dropdown me-3">
              <span
                className="btn dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {/* <b style={{ fontSize: '1rem' }}>S</b> */}
                <b style={{ textTransform: 'lowercase', fontSize: '1rem' }}>
                  {t('Sign in')}
                </b>
              </span>
              <ul className="dropdown-menu p-2 m-auto text-center">
                <ConfirmButton className=" btn btn-success p-0">
                  <NavLink
                    className="dropdown-item fw-bold"
                    to="/signin"
                    style={{ textTransform: 'lowercase', color: 'white' }}
                  >
                    {/* <b style={{ fontSize: "0.8rem" }}>S</b> */}
                    <b
                      style={{
                        textTransform: 'lowercase',
                        // fontSize: "0.8rem",
                      }}
                    >
                      {t('Sign in')}
                    </b>
                  </NavLink>
                </ConfirmButton>
                <li className="mt-3 p-0 w-100">
                  <span className="d-flex align-items-center w-100">
                    {' '}
                    <span
                      style={{
                        fontSize: '0.8rem',
                        flex: '1',
                        width: '100%',
                      }}
                    >
                      {t('New user')}
                    </span>
                    <NavLink
                      className="dropdown-item d-inline-block p-0 w-auto fw-bold"
                      to="/signup"
                      onClick={handleSignUp}
                    >
                      {t('Sign up')}
                    </NavLink>
                  </span>
                </li>
              </ul>
            </div>
          )}

          {JWT && (
            <>
              <NavLink className="nav-link d-flex" to="/wishlist">
                <span className="me-4 position-relative">
                  <i
                    className="fa-solid fa-heart"
                    style={{ fontSize: '1.5rem', color: '#088178' }}
                  ></i>
                  {userAuth?.wishlist?.length > 0 && (
                    <span
                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill text-dark"
                      style={{
                        backgroundColor: 'rgb(181 188 195)',
                        fontSize: ' 0.6rem',
                      }}
                    >
                      {userAuth?.wishlist?.length}
                    </span>
                  )}
                </span>
              </NavLink>

              <NavLink className="nav-link d-flex" to="/cart">
                <span className="me-4 position-relative">
                  <i
                    className="fa-solid fa-cart-shopping"
                    style={{ fontSize: '1.5rem', color: '#088178' }}
                  ></i>
                  {userAuth?.cart?.length > 0 && (
                    <span
                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill text-dark"
                      style={{
                        backgroundColor: 'rgb(181 188 195)',
                        fontSize: ' 0.6rem',
                      }}
                    >
                      {userAuth?.cart?.length}
                    </span>
                  )}
                </span>
              </NavLink>
            </>
          )}
        </div>
      </div>
      {/* </div> */}
    </NavbarContainer>
  );
});

const NavbarContainer = styled.nav`
  background: linear-gradient(
    to right,
    rgba(139, 169, 192, 255),
    rgba(225, 229, 231, 255)
  );
  box-shadow: 0 15px 5px 5px rgba(0, 0, 0, 0.06);

  @media (max-width: 767px) {
    .navbar-toggler-icon {
      background-image: var(--mdb-navbar-toggler-icon-bg);
    }
  }
`;

const ConfirmButton = styled.button`
  // height: 4.125rem;
  // margin-top: 20px;
  background-color: #088178;
  color: white;
  white-space: nowrap;
  border-radius: 12px;
  // padding: 12px 30px;
  cursor: pointer;
  border: none;
  outline: none;
  // width: 12.5rem;

  &:hover {
    background-color: #065c68;
  }
`;
