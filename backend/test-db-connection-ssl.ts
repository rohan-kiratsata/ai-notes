// cursor
import { Client } from "pg";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

async function testConnection() {
  // Get database URL from environment variable
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.error("❌ DATABASE_URL environment variable is not set");
    return false;
  }

  // Create a new PostgreSQL client with SSL enabled
  const client = new Client({
    connectionString: databaseUrl,
    ssl: {
      rejectUnauthorized: false, // Only use this for testing! In production, use proper SSL verification
    },
  });

  try {
    // Connect to the database
    await client.connect();
    console.log("✅ Database connection successful!");

    // Run a simple query to verify connection
    const res = await client.query("SELECT current_database(), version()");
    console.log("Database information:");
    console.log("Database name:", res.rows[0].current_database);
    console.log("PostgreSQL version:", res.rows[0].version);

    return true;
  } catch (error) {
    console.error("❌ Database connection failed");
    console.error(error);
    return false;
  } finally {
    // Close the connection
    await client.end();
  }
}

testConnection()
  .then((success) => {
    if (!success) {
      process.exit(1);
    }
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
