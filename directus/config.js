const dotenv = require("dotenv");

const dev = process.env.NODE_ENV !== "production";

if (dev) {
  dotenv.config("../.env.local");
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// These values set environment variables which modify core settings of Directus.
//
// Values in square brackets are the default values.
//
// The following options are not all possible options. For more, see
// https://docs.directus.io/self-hosted/config-options/
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = function (env) {
  // if (!dev && !process.env.DIRECTUS_URL) {
  //   throw new Error("DIRECTUS_URL is required");
  // }

  return {
    ////// General
    // The URL where your API can be reached on the web. It is also used for things like OAuth redirects,
    // forgot-password emails, and logos that needs to be publicly available on the internet. ["/"]
    PUBLIC_URL: env.API_URL ?? "",

    // IP or host the API listens on ["0.0.0.0"]
    HOST: env.API_HOST ?? "localhost",

    // The port Directus will run on [8055]
    PORT: env.API_PORT ?? 8055,

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////// Database

    DB_CLIENT: "pg",
    DB_HOST: env.API_DB_HOST ?? "127.0.0.1",
    DB_PORT: env.API_DB_PORT ?? "5432",
    DB_DATABASE: env.API_DB_DATABASE ?? "selftrack_directus_dev",
    DB_USER: env.API_DB_USER ?? "",
    DB_PASSWORD: env.API_DB_PASSWORD ?? "",
    DB_SSL: env.API_DB_SSL ?? "false",

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////// Rate Limiting

    // Whether or not to enable rate limiting on the API [false]
    RATE_LIMITER_ENABLED: false,

    // Where to store the rate limiter counts [memory]
    // memory, redis, memcache
    // RATE_LIMITER_STORE: memory,
    // RATE_LIMITER_REDIS: "redis://@127.0.0.1:5105",
    // RATE_LIMITER_MEMCACHE: "localhost:5109",

    // The amount of allowed hits per duration [50]
    RATE_LIMITER_POINTS: 25,

    // The time window in seconds in which the hits are counted [1]
    RATE_LIMITER_DURATION: 1,

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////// Caching

    // Whether or not caching is enabled. [false]
    CACHE_ENABLED: false,

    // How long the cache is persisted ["5m"]
    // CACHE_TTL: "30m",

    // How to scope the cache data ["directus-cache"]
    // CACHE_NAMESPACE: "directus-cache",

    // Automatically purge the cache on create, update, and delete actions. [false]
    // CACHE_AUTO_PURGE: true,

    // memory | redis | memcache
    // CACHE_STORE: memory,

    // How long assets will be cached for in the browser. Sets the max-age value of the Cache-Control header ["30m"]
    // ASSETS_CACHE_TTL: "30m",

    // CACHE_REDIS="redis://@127.0.0.1:5105"
    // CACHE_MEMCACHE="localhost:5109"

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////// File Storage

    // A CSV of storage locations (eg: local,digitalocean,amazon) to use. You can use any names you'd like for these keys ["local"]
    STORAGE_LOCATIONS: dev ? "local" : "S3",
    STORAGE_LOCAL_DRIVER: "local",
    STORAGE_LOCAL_ROOT: "./uploads",
    STORAGE_S3_DRIVER: "s3",
    STORAGE_S3_BUCKET: env.STORAGE_S3_BUCKET,
    STORAGE_S3_KEY: env.STORAGE_S3_KEY,
    STORAGE_S3_SECRET: env.STORAGE_S3_SECRET,
    STORAGE_S3_REGION: "us-west-2",

    /// A comma-separated list of metadata keys to collect during file upload. Use * for all
    // Extracting all metadata might cause memory issues when the file has an unusually large set of metadata
    // [ifd0.Make,ifd0.Model,exif.FNumber,exif.ExposureTime,exif.FocalLength,exif.ISO]
    // FILE_METADATA_ALLOW_LIST: ""

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////// Security

    // Unique identifier for the project
    KEY: env.DIRECTUS_KEY ?? "oops",
    // Secret string for the project
    SECRET: env.DIRECTUS_SECRET ?? "oops",

    // The duration that the access token is valid ["15m"]
    // ACCESS_TOKEN_TTL: "15m",

    // The duration that the refresh token is valid, and also how long users stay logged-in to the App ["7d"]
    // REFRESH_TOKEN_TTL: "7d",

    // Whether or not to use a secure cookie for the refresh token in cookie mode [false]
    // REFRESH_TOKEN_COOKIE_SECURE: false,

    // Value for sameSite in the refresh token cookie when in cookie mode ["lax"]
    // REFRESH_TOKEN_COOKIE_SAME_SITE: "lax",

    // Name of refresh token cookie ["directus_refresh_token"]
    // REFRESH_TOKEN_COOKIE_NAME: "directus_refresh_token",

    // Which domain to use for the refresh cookie. Useful for development mode.
    // REFRESH_TOKEN_COOKIE_DOMAIN

    // The duration in milliseconds that a login request will be stalled for,
    // and it should be greater than the time taken for a login request with an invalid password [500]
    // LOGIN_STALL_TIME: 500,

    // Whether or not to enable the CORS headers [false]
    CORS_ENABLED: true,

    // Value for the Access-Control-Allow-Origin header. Use true to match the Origin header, or provide a domain or a CSV of domains for specific access [false]
    CORS_ORIGIN: true,

    // Value for the Access-Control-Allow-Methods header [GET,POST,PATCH,DELETE]
    // CORS_METHODS: "GET,POST,PATCH,DELETE",

    // Value for the Access-Control-Allow-Headers header [Content-Type,Authorization]
    // CORS_ALLOWED_HEADERS: "Content - Type, Authorization",

    // Value for the Access-Control-Expose-Headers header [Content-R
    // CORS_EXPOSED_HEADERS: "Content - Range",

    // Whether or not to send the Access-Control-Allow-Credentials header [true]
    // CORS_CREDENTIALS: true,

    // Value for the Access-Control-Max-Age header [18000]
    // CORS_MAX_AGE: 18000,

    CONTENT_SECURITY_POLICY_DIRECTIVES__FRAME_SRC:
      "www.youtube.com youtube.com twitframe.com",
    CONTENT_SECURITY_POLICY_DIRECTIVES__IMG_SRC:
      "array:'self',data:,blob:,https://*",

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////// Auth Providers

    // A comma-separated list of auth providers []
    // AUTH_PROVIDERS: "",

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////// Extensions

    // Path to your local extensions folder ["./extensions"]
    // EXTENSIONS_PATH: "./directus/extensions",

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////// Email

    // Email address from which emails are sent ["no-reply@directus.io"]
    EMAIL_FROM: "admin@newenglandvc.org",
    EMAIL_TRANSPORT: "sendgrid",

    /// Email (SendGrid Transport)
    EMAIL_SENDGRID_API_KEY: env.SENDGRID_API_KEY,

    // APPLY ENV OVERRIDES...
    // NOTE: we may want to whitelist these rather than take them wholesale...
    ...env,
  };
};
