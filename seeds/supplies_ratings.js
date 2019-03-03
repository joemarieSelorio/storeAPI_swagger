/* eslint-disable linebreak-style */
require('app-module-path').addPath(require('app-root-path').toString());

const supplies = require('src/components/supplies/SuppliesData');
const ratings = require('src/components/ratings/RatingsData');

exports.seed = function(knex, Promise) {
  return knex('ratings').del()
      .then(()=>{
        return knex('supplies').del();
      })
      .then(()=>{
        return knex('supplies').insert(supplies);
      })
      .then(()=>{
        const ratingsPromise = [];
        ratings.forEach((rating)=>{
          const supply = rating.supply;
          ratingsPromise.push(createRating(knex, rating, supply));
        });
        return Promise.all(ratingsPromise);
      });
};

const createRating = (knex, rating, supply) =>{
  return knex('supplies').where('name', supply).first()
      .then((supplyRecord)=>{
        return knex('ratings').insert({
          user: rating.user,
          rating: rating.rating,
          supplyId: supplyRecord.id,
        });
      });
};
