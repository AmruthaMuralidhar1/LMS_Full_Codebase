import * as moment from 'moment';

const formatDate = (date: moment.Moment): string =>
  date.format('MM/DD/YYYY');

export const today = formatDate(moment());
export const lastSevenDays = formatDate(moment().subtract(7, 'days'));

export const dateDropdownOptions = [
  {
    id: 'last-7',
    label: 'Last 7 days',
    from: lastSevenDays,
    to: today,
  },
  {
    id: 'today',
    label: 'Today',
    from: today,
    to: today,
  },
];

export const metrics = [
    {
      icon: 'assets/images/fleets.jpg',
      alt: 'Total Fleets Icon',
      title: 'Total Fleets',
      value: 1200
    },
    {
      icon: 'assets/images/trucks.jpg',
      alt: 'Total Shipments Icon',
      title: 'Total Shipments',
      value: 950
    },
    {
      icon: 'assets/images/drivers.jpg',
      alt: 'Active Drivers Icon',
      title: 'Active Drivers',
      value: 75
    },
    {
      icon: 'assets/images/trips.jpg',
      alt: 'Total Trips Today Icon',
      title: 'Total Trips Today',
      value: 145
    }
  ];

  export const charts = [
    {
      icon: 'assets/images/maintenance.jpg',
      alt: 'Scheduled Maintenance Icon',
      title: 'Scheduled Maintenance',
      value: 70,
      class:'chart-card1'
    },
    {
      icon: 'assets/images/fuel_efficiency.jpg',
      alt: 'Fuel Efficiency Icon',
      title: 'Fuel Efficiency',
      graphSrc: 'assets/images/fuel_efficiency_graph.png',
      graphAlt: 'Fuel Efficiency Graph',
      graphClass: 'fuel-graph',
      class:'chart-card'
    },
    {
      icon: 'assets/images/indents.jpg',
      alt: 'Indents Request Icon',
      title: 'Indents Request Status',
      graphSrc: 'assets/images/indents_request_graph.png',
      graphAlt: 'Indents Request Graph',
      graphClass: 'indents_req-graph',
      class:'chart-card'
    }
];

export const manufacturers = ['Acme Industries', 'Pace Industries', 'Rajeswari Industries'];

export const vehicles = [
    { number: 'TN 09 DL 7469', status: 'Active', location: 'Chennai' },
    { number: 'MH 68 BP 2997', status: 'Active', location: 'Mumbai' },
    { number: 'KA 08 DL 9632', status: 'Active', location: 'Bangalore' },
    { number: 'TN 96 BP 2985', status: 'Active', location: 'Chennai' },
    { number: 'TN 96 BP 3085', status: 'Inactive', location: 'Chennai' }
  ];
