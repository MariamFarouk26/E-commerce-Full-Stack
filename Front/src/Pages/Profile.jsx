import React, { useEffect, useState } from 'react';
import Footer from '../Components/Home/footer';
import Navbar from '../Components/Home/Navbar';
import { NavLink, useParams } from 'react-router-dom';
import Account from '../Components/Profile/Account';
import Orders from '../Components/Profile/Orders';
import OrderDetails from '../Components/Profile/OrderDetails';
import Favourite from '../Components/Profile/Favourite';
import { useSelector } from 'react-redux';

export default function Profile() {
  const user = useSelector(state => state.user.user);
  const [params, setParams] = useState('');
  const { param } = useParams();
  
  useEffect(()=> {
    setParams(param);
  }, [param])

  return (
    <>
      <Navbar></Navbar>

      <div id="profile">
        <div className="container">
          <div className="main-body">
            <div className="row gutters-sm">
              <div className="col-md-4 mb-3">
                <div className="card">
                  <ul className="list-group list-group-flush">
                    <li className={`list-group-item d-flex justify-content-between align-items-center flex-wrap ${params === 'account' ? 'bgGrey' : ''}`}>
                      <NavLink className="nav-link w-100" to="/profile/account">
                        <h6 className="mb-0">
                          <i
                            className="fa-regular fa-user me-3"
                            style={{ width: '20px' }}
                          />
                          Profile
                        </h6>
                      </NavLink>
                    </li>
                    <li className={`list-group-item d-flex justify-content-between align-items-center flex-wrap ${params === 'orders' ? 'bgGrey' : ''} ${params === 'orderDetails' ? 'bgGrey' : ''}` }>
                      <NavLink className="nav-link w-100" to="/profile/orders">
                        <h6 className="mb-0">
                          <i
                            className="fa-solid fa-box-open me-3"
                            style={{ width: '20px' }}
                          ></i>
                          Orders
                        </h6>
                      </NavLink>
                    </li>

                    <li className={`list-group-item d-flex justify-content-between align-items-center flex-wrap ${params === 'favourite' ? 'bgGrey' : ''}`}>
                      <NavLink
                        className="nav-link w-100"
                        to="/profile/favourite"
                      >
                        <h6 className="mb-0">
                          <i
                            className="fa-regular fa-heart me-3"
                            style={{ width: '20px' }}
                          ></i>
                          Favourite
                        </h6>
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-8">
                <div className="card mb-3">
                  {params === 'account' && <Account userData={user} />}
                  {params === 'orders' && <Orders userData={user}  />}
                  {params === 'favourite' && <Favourite userData={user}  />}
                  {params === 'orderDetails' && <OrderDetails userData={user}  />}
                  {!params && <Account />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </>
  );
}
