/**
 * Defines the API route we are using.
 */
var api_url = '';
var app_url = '';
var gaode_maps_js_api_key = '7845254a769ea8bee0df2972e10212fe';

switch( process.env.NODE_ENV ){
    case 'development':
        api_url = 'http://www.laravel.com/api/v1';
        app_url = 'http://www.laravel.com';
        break;
    case 'production':
        api_url = 'http://www.laravel.com/api/v1';
        app_url = 'http://www.laravel.com';
        break;
}

export const ROAST_CONFIG = {
    API_URL: api_url,
    APP_URL: app_url,
    GAODE_MAPS_JS_API_KEY: gaode_maps_js_api_key
};
