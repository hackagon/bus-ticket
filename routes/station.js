const { Station } = require("../models/station");

// RESTFUll API
// req: request
// res: response
// Get station list
module.exports.getStations = (req, res, next) => {
  Station.find()
    .then(stations => {
      return res.status(200).json(stations);
    })
    .catch(err => res.status(500).json(err))
}


// Lay chi tiet 1 station
module.exports.getStationById = (req, res, next) => {
  const { stationId } = req.params;
  Station.findById(stationId)
    .then(station => {
      // if (!station) return res.status(404).json({ message: "Station not found" })
      if (!station) return Promise.reject({ message: "Station not found" })

      return res.status(200).json(station);
    })
    .catch(err => res.status(500).json(err))
}


// Create station
module.exports.createStation = (req, res, next) => {
  const { name, address, province } = req.body; // const name = req.name....

  const newStation = new Station({
    name, address, province
  })

  newStation.save()
    .then(station => {
      return res.status(201).json(station);
    })
    .catch(err => res.status(500).json(err))
}


// Update station
// PUT /api/stations/1
// PUT /api/stations/2
// Request co nhieu cho de thong tin
// Body (POST, PUT). GET, DELETE se ko co body
// params
// headers
// 200, 201, 204 ==> thanh cong
// 401, 403, 404
// 500, 502
module.exports.updateStationById = (req, res, next) => {
  // destructuring ES6
  const { stationId } = req.params; // const stationId = req.params.stationId
  const { name, address, province } = req.body;

  Station.findById(stationId) //  tim thay ==> tra ve mot document (object); tim ko thay ==> null
    .then(station => {
      // if (!station) return res.status(404).json({ message: "Station not found" })
      if (!station) return Promise.reject({ message: "Station not found" })

      station.name = name;
      station.address = address;
      station.province = province;

      return station.save()
    })
    .then(staion => res.status(200).json(staion))
    .catch(err => res.status(500).json(err))
}

// Delete
module.exports.deleteStationById = (req, res, next) => {
  const { stationId } = req.params;

  Station.deleteOne({ _id: stationId })
    .then(() => res.status(200).json({ message: "Delete successfully" }))
    .catch(err => res.status(500).json(err))
}
