const { MongoClient } = require('mongodb');
const fs = require('fs');
require('dotenv').config();

// MongoDB connection URI from environment variable
const uri = process.env.MONGODB_URI;

// Database and collection names
const dbName = 'geojson_desa_db';
const collectionName = 'features';

async function insertGeoJSON() {
  const client = new MongoClient(uri);

  try {
    // Connect to MongoDB
    await client.connect();
    console.log('Connected to MongoDB');

    // Get database and collection
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Read GeoJSON file
    const geojsonData = fs.readFileSync('geojson_desa.js', 'utf8');

    // Parse the JSON (remove any leading/trailing non-JSON content if needed)
    // The file is pure JSON, so parse directly
    const geojson = JSON.parse(geojsonData);

    // Extract features array
    const features = geojson.features;

    // Insert features into collection
    const result = await collection.insertMany(features);
    console.log(`${result.insertedCount} features inserted successfully`);

    // Optional: Create geospatial index on geometry for spatial queries
    await collection.createIndex({ "geometry": "2dsphere" });
    console.log('Geospatial index created on geometry field');

  } catch (error) {
    console.error('Error inserting GeoJSON:', error);
  } finally {
    // Close the connection
    await client.close();
    console.log('Connection closed');
  }
}

// Run the insertion
insertGeoJSON();