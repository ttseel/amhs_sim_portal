import React from 'react';
import {ResponsiveBar} from '@nivo/bar';

const data = [
  {
    country: 'AD',
    'hot dog': 188,
    'hot dogColor': 'hsl(355, 70%, 50%)',
    burger: 125,
    burgerColor: 'hsl(102, 70%, 50%)',
    sandwich: 118,
    sandwichColor: 'hsl(253, 70%, 50%)',
    kebab: 141,
    kebabColor: 'hsl(37, 70%, 50%)',
    fries: 58,
    friesColor: 'hsl(217, 70%, 50%)',
    donut: 2,
    donutColor: 'hsl(224, 70%, 50%)',
  },
  {
    country: 'AE',
    'hot dog': 104,
    'hot dogColor': 'hsl(100, 70%, 50%)',
    burger: 102,
    burgerColor: 'hsl(225, 70%, 50%)',
    sandwich: 105,
    sandwichColor: 'hsl(1, 70%, 50%)',
    kebab: 163,
    kebabColor: 'hsl(42, 70%, 50%)',
    fries: 62,
    friesColor: 'hsl(7, 70%, 50%)',
    donut: 107,
    donutColor: 'hsl(350, 70%, 50%)',
  },
  {
    country: 'AF',
    'hot dog': 95,
    'hot dogColor': 'hsl(86, 70%, 50%)',
    burger: 77,
    burgerColor: 'hsl(199, 70%, 50%)',
    sandwich: 194,
    sandwichColor: 'hsl(89, 70%, 50%)',
    kebab: 117,
    kebabColor: 'hsl(305, 70%, 50%)',
    fries: 57,
    friesColor: 'hsl(349, 70%, 50%)',
    donut: 102,
    donutColor: 'hsl(151, 70%, 50%)',
  },
  {
    country: 'AG',
    'hot dog': 154,
    'hot dogColor': 'hsl(22, 70%, 50%)',
    burger: 85,
    burgerColor: 'hsl(152, 70%, 50%)',
    sandwich: 172,
    sandwichColor: 'hsl(122, 70%, 50%)',
    kebab: 101,
    kebabColor: 'hsl(7, 70%, 50%)',
    fries: 22,
    friesColor: 'hsl(295, 70%, 50%)',
    donut: 118,
    donutColor: 'hsl(2, 70%, 50%)',
  },
  {
    country: 'AI',
    'hot dog': 116,
    'hot dogColor': 'hsl(146, 70%, 50%)',
    burger: 55,
    burgerColor: 'hsl(93, 70%, 50%)',
    sandwich: 161,
    sandwichColor: 'hsl(125, 70%, 50%)',
    kebab: 167,
    kebabColor: 'hsl(37, 70%, 50%)',
    fries: 137,
    friesColor: 'hsl(291, 70%, 50%)',
    donut: 0,
    donutColor: 'hsl(310, 70%, 50%)',
  },
  {
    country: 'AL',
    'hot dog': 174,
    'hot dogColor': 'hsl(199, 70%, 50%)',
    burger: 194,
    burgerColor: 'hsl(183, 70%, 50%)',
    sandwich: 28,
    sandwichColor: 'hsl(45, 70%, 50%)',
    kebab: 161,
    kebabColor: 'hsl(72, 70%, 50%)',
    fries: 31,
    friesColor: 'hsl(50, 70%, 50%)',
    donut: 13,
    donutColor: 'hsl(38, 70%, 50%)',
  },
  {
    country: 'AM',
    'hot dog': 164,
    'hot dogColor': 'hsl(21, 70%, 50%)',
    burger: 103,
    burgerColor: 'hsl(39, 70%, 50%)',
    sandwich: 59,
    sandwichColor: 'hsl(210, 70%, 50%)',
    kebab: 184,
    kebabColor: 'hsl(95, 70%, 50%)',
    fries: 138,
    friesColor: 'hsl(63, 70%, 50%)',
    donut: 154,
    donutColor: 'hsl(81, 70%, 50%)',
  },
];

const MyResponsiveBar = ({data}) => {
  return (
    <ResponsiveBar
      data={data}
      keys={['hot dog', 'burger', 'sandwich', 'kebab', 'fries', 'donut']}
      indexBy="country"
      margin={{top: 50, right: 130, bottom: 50, left: 60}}
      padding={0.3}
      valueScale={{type: 'linear'}}
      indexScale={{type: 'band', round: true}}
      colors={{scheme: 'nivo'}}
      defs={[
        {
          id: 'dots',
          type: 'patternDots',
          background: 'inherit',
          color: '#38bcb2',
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: 'lines',
          type: 'patternLines',
          background: 'inherit',
          color: '#eed312',
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: 'fries',
          },
          id: 'dots',
        },
        {
          match: {
            id: 'sandwich',
          },
          id: 'lines',
        },
      ]}
      borderColor={{from: 'color', modifiers: [['darker', 1.6]]}}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'country',
        legendPosition: 'middle',
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'food',
        legendPosition: 'middle',
        legendOffset: -40,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{from: 'color', modifiers: [['darker', 1.6]]}}
      legends={[
        {
          dataFrom: 'keys',
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: 'left-to-right',
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: 'hover',
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      ariaLabel="Nivo bar chart demo"
      barAriaLabel={function (e) {
        return e.id + ': ' + e.formattedValue + ' in country: ' + e.indexValue;
      }}
    />
  );
};

const InterfaceChart = ({interfaceId}) => {
  interfaceId = '12-13~';

  return (
    <article>
      <h4>{interfaceId}</h4>
      <div style={{height: 400, width: 700}}>
        <MyResponsiveBar data={data} />
      </div>
    </article>
  );
};

export default InterfaceChart;
