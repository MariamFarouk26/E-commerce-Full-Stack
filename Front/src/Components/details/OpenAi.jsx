import React, { memo, useEffect } from "react";
import OpenAI from "openai";
import axios from "axios";

export default memo(function OpenAi({ reviews, user, JWT, prodID }) {
  const openai = new OpenAI({
    apiKey: "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",
    dangerouslyAllowBrowser: true,
  });

  useEffect(() => {
    if (reviews && reviews.length > 0) {
      console.log(reviews);
      async function callOpenAI() {
        try {
          const result = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content: "you are a Sentiment analysis",
              },
              {
                role: "user",
                content: `Classify this review: The service was great
                Sentiment: Positive
                Classify this Jeview: My order did not arrive
                Sentiment: Negative
                Classify this review: ${reviews[reviews.length - 1].Comment}.
                Sentiment:`,
              },
            ],
            temperature: 0,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
          });
          console.log(result?.choices[0]?.message?.content);
          if (result?.choices[0]?.message?.content === "Negative") {
            try {
              const response = await axios.post(
                "http://localhost:3001/comments",
                {
                  productID: prodID,
                  status: "negative",
                  message: reviews[reviews.length - 1].Comment,
                  user: {
                    userID: user.userID,
                    phone: user.phone,
                    name: user.name,
                    address: user.address,
                    email: user.email,
                    password: user.password,
                    isAdmin: user.isAdmin,
                    isSeller: user.isSeller,
                    isUser: user.isUser,
                    flag: user.flag,
                    admit: user.admit,
                    recent: user.recent,
                    sellerProducts: user.sellerProducts,
                    wishlist: user.wishlist,
                    checkout: user.wishlist,
                    cart: user.cart,
                    image: user.image,
                  },
                },
                {
                  headers: {
                    "x-auth-token": JWT,
                  },
                }
              );
              console.log(response);
            } catch (error) {
              console.error("Error fetching comments:", error);
            }
          }
        } catch (e) {
          console.log(e);
        }
      }
      callOpenAI();

      console.log(user);
    }
  }, [reviews, user, JWT, prodID, openai.chat.completions]);

  return <div></div>;
});
