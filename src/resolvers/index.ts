import { merge } from 'lodash';
import Session from './Session';
import { IResolvers } from 'graphql-tools';

export default<IResolvers> {
  Query: {
    ...Session.Query,
  },
  Mutation: {
    ...Session.Mutation,
  },
};