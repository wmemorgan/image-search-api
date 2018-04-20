# Image Search Abstraction Layer

An api that allows you to search for images and review recent searches

### User Stories:
    1. I can get the image URLs, alt text and page urls for a set of images relating to a given search string.
    2. I can paginate through the responses by adding a ?offset=2 parameter to the URL.
    3. I can get a list of the most recently submitted search strings.

### Image Search Example:
Go to:
```
[https://wme-image-search-api.glitch.me/api/imagesearch/]('https://wme-image-search-api.glitch.me/api/imagesearch/')
```

Enter the search terms and parameters in the URL
```
https://wme-image-search-api.glitch.me/api/imagesearch/lolcats%20?offset=10/
```

### Recent Searches:
To view the most recent searches go to:
```
[https://wme-image-search-api.glitch.me/api/latest/imagesearch/]('https://wme-image-search-api.glitch.me/api/latest/imagesearch/')
```
