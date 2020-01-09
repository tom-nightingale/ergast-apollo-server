import { ApolloServer } from 'apollo-server';

import {
  CircuitsProvider,
  ConstructorsProvider,
  DriversProvider,
  PitstopsProvider,
  QualifyingResultsProvider,
  ResultsProvider,
  ScheduleProvider
} from './providers';

import { resolvers, typeDefs } from './resolvers';

// MARK: types

export interface Context {
  dataSources: {
    circuitsProvider: CircuitsProvider;
    constructorsProvider: ConstructorsProvider;
    driversProvider: DriversProvider;
    pitstopsProvider: PitstopsProvider;
    qualifyingResultsProvider: QualifyingResultsProvider;
    resultsProvider: ResultsProvider;
    scheduleProvider: ScheduleProvider;
  };
}

// MARK: composition

const dataSources = (): Context['dataSources'] => {
  return {
    circuitsProvider: new CircuitsProvider(),
    constructorsProvider: new ConstructorsProvider(),
    driversProvider: new DriversProvider(),
    pitstopsProvider: new PitstopsProvider(),
    qualifyingResultsProvider: new QualifyingResultsProvider(),
    resultsProvider: new ResultsProvider(),
    scheduleProvider: new ScheduleProvider()
  };
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources
});

// MARK: main

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`); // tslint:disable-line no-console
});
