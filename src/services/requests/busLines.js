import api from "../api";
import proj4 from "proj4";
import moment from "moment";

const defaultProjection =
  "+proj=utm +zone=23 +south +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs";
const TYPE_NAME = {
  BUS_LINE: "semob:Linhas de onibus",
  BUS_POSITION: "semob:Ultima Posicao Transmitida",
  BUS_BY_OPERATOR: "semob:Frota por Operadora",
  BUS_STOPS: "semob:Paradas de onibus",
  SCHEDULED_ROUTES: "semob:Viagens Programadas por Linha",
};

export async function getBusLineRoute(busLine) {
  const cql_filter = `linha = '${busLine}'`;
  try {
    const response = await api.get("", {
      params: {
        cql_filter: cql_filter,
        typeName: TYPE_NAME.BUS_LINE,
      },
    });
    const busLineInfos = response.data.features[0];
    const coordinatesWGS = busLineInfos.geometry.coordinates.map(
      (coordinatePair) => {
        return {
          latitude: coordinatePair[1],
          longitude: coordinatePair[0],
        };
      },
    );
    return { coordinatesWGS, direction: busLineInfos.properties.sentido };
  } catch (e) {
    console.log(e);
    return {};
  }
}

export async function getBusesLinePosition(busLine) {
  const cql_filter = `numerolinha = '${busLine}'`;
  try {
    const response = await api.get("", {
      params: {
        cql_filter: cql_filter,
        typeName: TYPE_NAME.BUS_POSITION,
      },
    });
    return response.data.features;
  } catch (e) {
    console.log(e);
    return [];
  }
}

export async function getSurroundingBusStops(userLocationForBusStops) {
  let parsedCoordinates = proj4(defaultProjection).forward([
    userLocationForBusStops.longitude,
    userLocationForBusStops.latitude,
  ]);

  const cql_filter = `DWITHIN(geo_ponto_rede_pto, Point(${parsedCoordinates[0]} ${parsedCoordinates[1]}), 1000, meters) AND situacao NOT LIKE 'DESATIVADA'`;
  const response = await api.get("", {
    params: {
      typeName: TYPE_NAME.BUS_STOPS,
      cql_filter: cql_filter,
    },
  });
  const busStopsInfo = response.data.features;
  const busStopsCoordinatesWGS = busStopsInfo.map((busStop) => {
    return {
      coordinates: {
        latitude: busStop.geometry.coordinates[1],
        longitude: busStop.geometry.coordinates[0],
      },
      properties: {
        description: busStop.properties.descricao,
        title: busStop.properties.parada,
        condition: busStop.properties.situacao,
      },
    };
  });
  return busStopsCoordinatesWGS;
}

export async function getBusLineStops(busLine) {
  try {
    let lineString = "";
    busLine.forEach((point, index) => {
      if (index % 10 !== 0) return; // Aparently resquests cannot be too long, it causes bad request to be triggered with no motivation.

      let parsedCoordinates = proj4(defaultProjection).forward([
        point.longitude,
        point.latitude,
      ]);

      lineString += `${parsedCoordinates[0]} ${parsedCoordinates[1]}`;

      if (index !== busLine.length - 1) lineString += ", ";
    });
    if (lineString.substring(lineString.length - 1) === " ") {
      lineString = lineString.slice(0, -2);
    }
    const cql_filter = `DWITHIN(geo_ponto_rede_pto, LineString(${lineString}), 100, meters)`;

    const response = await api.get("", {
      params: {
        typeName: TYPE_NAME.BUS_STOPS,
        cql_filter: cql_filter,
      },
    });
    const busStopsInfo = response.data.features;
    const busStopsCoordinatesWGS = busStopsInfo.map((busStop) => {
      return {
        coordinates: {
          latitude: busStop.geometry.coordinates[1],
          longitude: busStop.geometry.coordinates[0],
        },
        properties: {
          description: busStop.properties.descricao,
          title: busStop.properties.parada,
          condition: busStop.properties.situacao,
        },
      };
    });
    return busStopsCoordinatesWGS;
  } catch (e) {
    console.log(e);
    return [];
  }
}

export async function searchBuslines(value) {
  const cql_filter = `linha ILIKE '%${value}%' OR nome ILIKE '%${value}%'`;
  const propertyName = "nome,linha,tarifa,operadora";
  try {
    const response = await api.get("", {
      params: {
        cql_filter: cql_filter,
        propertyName: propertyName,
        typeName: TYPE_NAME.BUS_LINE,
      },
    });
    const unfilteredData = response.data.features;
    const filteredData = [
      ...new Map(unfilteredData.map((v) => [v.properties.linha, v])).values(),
    ];

    return filteredData;
  } catch (e) {
    console.log(e);
    return {};
  }
}

const WEEKDAYS = {
  1: "st_segunda",
  2: "st_terca",
  3: "st_quarta",
  4: "st_quinta",
  5: "st_sexta",
  6: "st_sabado",
  7: "st_domingo",
};
export async function getBusLineExtraInfos(busLine) {
  const now = moment();
  const weekday = WEEKDAYS[now.isoWeekday()];
  const cql_filter = `cd_linha ILIKE '%${busLine}%' AND ${weekday} = 'S' AND hora_prevista GTE '${now.format("HH:mm")}' AND hora_prevista LTE '${now.add(2, "hours").format("HH:mm")}'`;
  const propertyName = `cd_linha,cs_sentido,hora_prevista`;
  try {
    const response = await api.get("", {
      params: {
        cql_filter: cql_filter,
        typeName: TYPE_NAME.SCHEDULED_ROUTES,
        propertyName: propertyName,
      },
    });
    const unfilteredFeatures = response.data.features;
    let scheduledHours = {};
    unfilteredFeatures.map((feature) => {
      let linha = feature.properties.cd_linha;
      if (scheduledHours[linha] && scheduledHours[linha].length < 3) {
        scheduledHours[linha].push(feature.properties.hora_prevista);
      }
      if (!scheduledHours[linha])
        scheduledHours[linha] = [feature.properties.hora_prevista];
    });
    return scheduledHours;
  } catch (e) {
    console.log(e);
    return [];
  }
}
