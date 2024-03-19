import React from 'react';

export default function Account({userData}) {
  return (
    <div>
      <div
        className="w-100 border-bottom"
        style={{ backgroundColor: '#cccccc13' }}
      >
        <h4 className="p-3 mb-0">Account Overview</h4>
      </div>
      <div className="card-body">
        <div className="mb-5">
          <div className="d-flex flex-column align-items-center text-center">
            <img
              src="https://bootdey.com/img/Content/avatar/avatar7.png"
              alt="Admin"
              className="rounded-circle"
              width={150}
            />
            <div className="mt-3">
              <h4>{userData?.name}</h4>
              <p className="text-secondary mb-1">ID: {userData?.userID}</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3">
            <h6 className="mb-0">Full Name</h6>
          </div>
          <div className="col-sm-9 text-secondary">{userData?.name}</div>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-3">
            <h6 className="mb-0">Email</h6>
          </div>
          <div className="col-sm-9 text-secondary">{userData?.email}</div>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-3">
            <h6 className="mb-0">Phone</h6>
          </div>
          <div className="col-sm-9 text-secondary">{userData?.phone}</div>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-3">
            <h6 className="mb-0">Address</h6>
          </div>
          <div className="col-sm-9 text-secondary">
            {userData?.address}
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
}
