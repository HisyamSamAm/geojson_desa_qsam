# GeoJSON Desa Project

This project contains GeoJSON data for village (desa) roads and a Node.js script to insert this data into MongoDB for geospatial analysis.

## Files

### geojson_desa.js
This file contains a GeoJSON FeatureCollection representing road and path data from a village area in Indonesia. The data was generated from OpenStreetMap using overpass-turbo.

**Key Features:**
- **Type:** FeatureCollection
- **Features:** 200+ individual road/path features
- **Geometry Type:** LineString (road segments)
- **Properties Include:**
  - `@id`: OpenStreetMap way ID
  - `highway`: Road type (primary, secondary, residential, living_street, unclassified, service, path, track)
  - `name`: Road name (in Indonesian)
  - `lanes`: Number of lanes
  - `width`: Road width in meters
  - `surface`: Road surface type (asphalt, concrete, paving_stones, unpaved)
  - `smoothness`: Road condition
  - `motorcar`/`motorcycle`: Vehicle access restrictions
  - `oneway`: Traffic direction
  - `access`: Access permissions

**Data Source:**
- Generated from OpenStreetMap data
- Timestamp: 2025-10-17T02:21:47Z
- Copyright: The data is made available under ODbL (Open Database License)

### insert_geojson.js
A Node.js script that reads the GeoJSON data and inserts it into MongoDB for storage and geospatial querying.

**Features:**
- Connects to MongoDB using connection string from environment variables
- Parses the GeoJSON file
- Inserts individual features into a MongoDB collection
- Creates a 2dsphere geospatial index for spatial queries
- Error handling and connection management

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or cloud service like MongoDB Atlas)
- npm or yarn package manager

## Installation

1. Clone or download this project
2. Install dependencies:
   ```bash
   npm install mongodb dotenv
   ```

3. Set up environment variables:
   Create a `.env` file in the project root with:
   ```
   MONGODB_URI=mongodb://localhost:27017/your_database
   # or for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/your_database
   ```

## Usage

### Running the Insertion Script

1. Ensure MongoDB is running (if using local installation)
2. Run the script:
   ```bash
   node insert_geojson.js
   ```

The script will:
- Connect to your MongoDB database
- Read and parse the `geojson_desa.js` file
- Insert all features into the `features` collection in `geojson_desa_db` database
- Create a geospatial index on the `geometry` field
- Display success messages and close the connection

### Expected Output
```
Connected to MongoDB
200 features inserted successfully
Geospatial index created on geometry field
Connection closed
```

## Database Structure

After insertion, your MongoDB will contain:

- **Database:** `geojson_desa_db`
- **Collection:** `features`
- **Documents:** Individual GeoJSON features with properties and geometry
- **Index:** 2dsphere index on `geometry` field for spatial queries

## Example Queries

Once data is inserted, you can perform geospatial queries:

```javascript
// Find all primary highways
db.features.find({ "properties.highway": "primary" })

// Find features within a specific area (requires geospatial index)
db.features.find({
  geometry: {
    $geoIntersects: {
      $geometry: {
        type: "Polygon",
        coordinates: [[[longitude1, latitude1], [longitude2, latitude2], ...]]
      }
    }
  }
})
```

## Notes

- The GeoJSON data contains Indonesian road names and follows OpenStreetMap tagging conventions
- All coordinates are in WGS84 (EPSG:4326) format
- The script assumes the GeoJSON file is in the same directory
- Make sure your MongoDB user has write permissions to the target database
- The geospatial index enables efficient spatial queries for location-based analysis

## License

The GeoJSON data is provided under the Open Database License (ODbL) as per OpenStreetMap licensing terms.