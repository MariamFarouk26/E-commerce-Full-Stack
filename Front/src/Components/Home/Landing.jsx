import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default memo(function Landing() {
  const [t, i18n] = useTranslation();

  return (
    <div id='landing' className=" section-p1" dir={`${i18n.language}`==='en'?"ltr":"rtl"}>
      <div className="row align-items-center">
        <div className="col-md-6 col-sm-12 my-4">
          <h4>{t('Trade-in offer')}</h4>
          <h2>{t('Super Value deals')}</h2>
          <h1>{t('On all products')}</h1>
          <p>{t('Save more width coupons & up to 70% off!')}</p>
          <Link to="/shop">
            <button>
            {t('Shop Now')}
            </button>
          </Link>
        </div>
        <div className="col-md-6 col-sm-12 d-flex justify-content-center">
          <img className='w-50' src="assets/img/15.WebP" alt="landingImage" />
        </div>
      </div>
    </div>
  );
});
