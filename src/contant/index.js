const countryJson = require("../contant/country.json");
const areasJson = require("../contant/areas.json");
const citiesJson = require("../contant/cities.json");
const streetsJson = require("../contant/streets.json");
const homeJson = require("../contant/home.json");
const apartmentJson = require("../contant/apartment.json");

export function Choice(key) {
  switch (+key) {
    case 0:
      return countryJson;
    case 1:
      return areasJson;
    case 2:
      return citiesJson;
    case 3:
      return streetsJson;
    case 4:
      return homeJson;
    case 5:
      return apartmentJson;
    default:
      break;
  }
}

export function getName(key) {
  switch (+key) {
    case 0:
      return "Страна";
    case 1:
      return "Регион";
    case 2:
      return "Город";
    case 3:
      return "Улица";
    case 4:
      return "Дом";
    case 5:
      return "кв.";
    default:
      break;
  }
}
