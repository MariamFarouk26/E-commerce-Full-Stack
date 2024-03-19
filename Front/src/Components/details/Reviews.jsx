/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Cookies from 'universal-cookie';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getProductAction } from '../../Redux/Slice/prodetails';
import OpenAi from './OpenAi';

const RoundedShadowBox = styled.div`
  background: #f8f8f8;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  padding: 20px;
  font-family: 'Spartan', sans-serif;
`;

const ReviewsMembers = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Media = styled.div`
  display: flex;
`;

const Avatar = styled.div`
  border-radius: 50%;
  margin-right: 15px;
  width: 48px;
  height: 48px;
  padding: 10px;
  background-color: #088178;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
`;

const MediaBody = styled.div`
  flex: 1;
  font-size: 20px;
`;

const ReviewsMembersHeader = styled.div`
  display: block;
  margin-bottom: 3px;
`;

const LeaveCommentBox = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  padding: 20px;
  font-size: 20px;
  font-weight: 600;
  font-family: 'Spartan', sans-serif;
`;

const CommentTextArea = styled.textarea`
  width: 100%;
  height: 100px;
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 20px;
`;

const SubmitButton = styled.button`
  border: none;
  border-radius: 5px;
  background-color: #088178;
  color: #fff;
  padding: 10px 15px;
  margin-top: 10px;
  margin-bottom: 15px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const Star = styled.span`
  font-size: 18px;
  color: #fdba3b;
  cursor: pointer;
  margin-right: 5px;

  &:hover {
    color: #ffcc00;
  }
`;

const Reviews = () => {
  const dispatch = useDispatch();
  const prodetails = useSelector((state) => state.prodetails.prodetails);
  const [rating, setRating] = useState(0); // Initial rating is 0
  const [comment, setcomment] = useState('');
  const [reviews, setReviews] = useState([]);
  const cookies = new Cookies();
  let [productPurchased, setProductPurchased] = useState([]);

  const JWT = cookies.get('x-auth-token');

  if (JWT) {
    var { user } = jwtDecode(JWT);
  }
  const header = {
    headers: {
      'x-auth-token': JWT,
    },
  };

  const newComment = {
    ratings: rating,
    userName: user?.name,
    Comment: comment,
    userEmail: user?.email,
    userID: user?.userID,
  };

  useEffect(() => {
    if (prodetails && prodetails.comments) {
      setReviews(prodetails.comments);
    }
  }, [prodetails]);
  async function getProduct() {
    try {
      await axios.get(`http://localhost:3001/products/${prodetails.id}`);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  }
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!JWT) {
      toast.warning('Please Log in First!');
    } else if (productPurchased) {
      const purchasedProductIDs = productPurchased.map(
        (product) => product.productID
      );

      let map2 = purchasedProductIDs.map((pro) => pro.includes(prodetails.id));
      let filterForTrue = map2.find((pro) => pro === true);
      if (!filterForTrue) {
        toast.warning(
          'You need to purchase the product so you can comment and rate it '
        );
        return;
      } else {
        if (!comment.trim()) {
          toast.warning('Please enter a comment before submitting!');
          return; // Prevent the form from submitting
        }
        setReviews([...reviews, newComment]);
        await axios
          .patch(
            `http://localhost:3001/products/${prodetails.id}`,
            { comments: [...prodetails?.comments, newComment] },
            header
          )
          .then((response) => {
            if (response && response.status === 200) {
              setcomment('');
              toast.success(`Your review has been submitted successfully!`);
              getProduct();
              dispatch(getProductAction(prodetails.id));
            }
          });
      }
    }
  };
  async function getPurchasedProducts() {
    await axios
      .get(`http://localhost:3001/orders/userID/${user.userID}`)
      .then((response) => {
        setProductPurchased(response.data);
      });
  } //to affect db once add comment without need refresh
  useEffect(() => {
    if (JWT && prodetails) {
      getProduct();
      getPurchasedProducts();
    }
  }, [JWT, prodetails, reviews]);

  const handleRating = (selectedRating) => {
    setRating(selectedRating === rating ? rating - 1 : selectedRating);
  };

  //for avatar letters
  const getInitials = (name) => {
    const firstInitial = name ? name.charAt(0).toUpperCase() : '';
    return `${firstInitial}`;
  };

  return (
    <div className="container mt-5">
      <h5 className="mb-5 fs-4">All Ratings and Reviews</h5>

      {reviews.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        reviews.map((review, index) => (
          <RoundedShadowBox key={index}>
            <>
              <ReviewsMembers key={review.userID}>
                <Media>
                  <Avatar>{getInitials(review.userName)}</Avatar>
                  <MediaBody className="ml-auto align-self-center ">
                    <ReviewsMembersHeader>
                      <h6 className="mb-1 fs-5" style={{ fontWeight: '800' }}>
                        {`${review.userName}`}
                        <Star
                          style={{
                            fontSize: '13px',
                            fontWeight: '700',
                            margin: '5px',
                          }}
                        >
                          ★{review.ratings}/5
                        </Star>
                      </h6>
                    </ReviewsMembersHeader>
                    <div className="reviews-members-body col-11">
                      <p>{review.Comment}</p>
                    </div>
                  </MediaBody>
                </Media>
              </ReviewsMembers>
            </>
          </RoundedShadowBox>
        ))
      )}

      <LeaveCommentBox>
        <p>Rate the prodetails</p>
        <div>
          {[1, 2, 3, 4, 5].map((index) => (
            <Star key={index} onClick={() => handleRating(index)}>
              {index <= rating ? '★' : '☆'}
            </Star>
          ))}
        </div>
        <form onSubmit={handleCommentSubmit}>
          <div>
            <label>Your Comment</label>
            {/* <CommentTextArea value={comment} onChange={handleComment} /> */}
            <CommentTextArea
              value={comment}
              onChange={(e) => {
                setcomment(e.target.value);
              }}
            />
          </div>
          <div>
            <SubmitButton type="sumbit" className=" btn-sm">
              Submit Comment
            </SubmitButton>
          </div>
        </form>
      </LeaveCommentBox>
      <OpenAi
        reviews={reviews}
        user={user}
        JWT={JWT}
        prodID={prodetails?.id}
      ></OpenAi>
    </div>
  );
};

export default Reviews;
