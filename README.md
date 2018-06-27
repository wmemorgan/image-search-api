# Image Search Abstraction Layer

An api that allows you to search for images and review recent searches

---
### Development
    * Frontend is built using HTML/CSS and is used to demo API functions
    * API is built using Node/Express and handles data creation, updates, and retrieval
    * Backend is a MongoDB document database that stores user and exercise data

---
### User Stories:
    1. I can get the image URLs, alt text and page urls for a set of images relating to a given search string.
    2. I can paginate through the responses by adding a ?offset=2 parameter to the URL.
    3. I can get a list of the most recently submitted search strings.

---
### Usage:
#### Image Search
**Endpoint:**
```/api/imagesearch/:search```

**Method:**
```GET```

**Parameters:**
```search=SEARCHTERM```
```offset=ENTERNUMBER```

**Example:**
```https://wme-image-search-api.glitch.me/api/imagesearch/:search?search=avengers&offset=2```

---
##### Recent Searches:
**Endpoint:**
```/api/latest/imagesearch/```

**Method:**
```GET```

To view the most recent searches access API at:

[https://wme-image-search-api.glitch.me/api/latest/imagesearch/]('https://wme-image-search-api.glitch.me/api/latest/imagesearch/')

---
**Go to API demo page:**
[https://wme-image-search-api.glitch.me]('https://wme-image-search-api.glitch.me')

