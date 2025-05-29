import _ from 'lodash';

export default (content) => {
  const lines = content.split('\n');
  const dataLines = lines.slice(1).filter(line => line.trim() !== '');
  
  const records = dataLines.map(line => {
    const parts = line.split(',');
    return {
      date: parts[0].trim(),
      maxTemp: parseFloat(parts[1]),
      minTemp: parseFloat(parts[2]),
      humidity: parseInt(parts[3].trim(), 10),
      city: parts[7].trim(),
    };
  });

  // Шаг 1: Количество записей
  console.log(`Count: ${records.length}`);

  // Шаг 2: Список городов
  const cities = _.uniqBy(records, r => r.city.toUpperCase()).map(r => r.city);
  const sortedCities = _.sortBy(cities, city => city.toUpperCase());
  console.log(`Cities: ${sortedCities.join(', ')}`);

  // Шаг 3: Влажность
  const humidities = records.map(r => r.humidity);
  console.log(`Humidity: Min: ${Math.min(...humidities)}, Max: ${Math.max(...humidities)}`);

  // Шаг 4: Самый жаркий день
  const hottestDay = _.maxBy(records, 'maxTemp');
  console.log(`HottestDay: ${hottestDay.date} ${hottestDay.city}`);

  // Шаг 5: Самый жаркий город (по средней макс. температуре)
  const cityTemps = _.groupBy(records, r => r.city.toUpperCase());
  const cityAverages = _.mapValues(cityTemps, cityRecords => 
    _.meanBy(cityRecords, 'maxTemp')
  );
  const hottestCityEntry = _.maxBy(
    Object.entries(cityAverages),
    ([city, avgTemp]) => avgTemp
  );

  const hottestCity = cityTemps[hottestCityEntry[0]][0].city;
  console.log(`HottestCity: ${hottestCity}`);
};