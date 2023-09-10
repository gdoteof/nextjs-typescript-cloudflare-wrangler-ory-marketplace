source '../packages/middle/.dev.vars'
curl 'https://gateway.thriv.systems/api/facility'  -H 'Content-Type: application/json' \
  --data-raw '{"id":"","name":"daf","location":{"address_components":[{"long_name":"500","short_name":"500","types":["street_number"]},{"long_name":"Wellington Street West","short_name":"Wellington St W","types":["route"]},{"long_name":"Old Toronto","short_name":"Old Toronto","types":["sublocality_level_1","sublocality","political"]},{"long_name":"Toronto","short_name":"Toronto","types":["locality","political"]},{"long_name":"Toronto","short_name":"Toronto","types":["administrative_area_level_3","political"]},{"long_name":"Toronto","short_name":"Toronto","types":["administrative_area_level_2","political"]},{"long_name":"Ontario","short_name":"ON","types":["administrative_area_level_1","political"]},{"long_name":"Canada","short_name":"CA","types":["country","political"]},{"long_name":"M5V 1E3","short_name":"M5V 1E3","types":["postal_code"]}],"formatted_address":"500 Wellington St W, Toronto, ON M5V 1E3, Canada","geometry":{"location":{"lat":43.64337819999999,"lng":-79.3987573}},"place_id":"ChIJhWcWH980K4gRprvH2Tyc2Vs","html_attributions":[]},"amenities":["Golf Course","Soccer Field"],"associatedServiceProviders":[]}' \
  --compressed