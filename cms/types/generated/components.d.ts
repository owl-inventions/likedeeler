import type { Schema, Attribute } from '@strapi/strapi';

export interface GeneralTraining extends Schema.Component {
  collectionName: 'components_general_trainings';
  info: {
    displayName: 'training';
    icon: 'calendar';
    description: '';
  };
  attributes: {
    start: Attribute.Time;
    end: Attribute.Time;
    location: Attribute.Component<'general.location'>;
    dayOfTheWeek: Attribute.Enumeration<
      [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ]
    >;
  };
}

export interface GeneralLocation extends Schema.Component {
  collectionName: 'components_general_locations';
  info: {
    displayName: 'Location';
    icon: 'pinMap';
  };
  attributes: {
    latitude: Attribute.Float;
    longitude: Attribute.Float;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'general.training': GeneralTraining;
      'general.location': GeneralLocation;
    }
  }
}
